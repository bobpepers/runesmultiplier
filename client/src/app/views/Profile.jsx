import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  Grid,
  Button,
  Tooltip,
  Modal,
  CircularProgress,
} from '@material-ui/core';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ReactCrop from 'react-image-crop';
import Backdrop from '@material-ui/core/Backdrop';
import Referrals from '../containers/Referrals';
import PhoneVerify from '../containers/PhoneVerify';
import IdentityVerify from '../containers/IdentityVerify';
import 'react-image-crop/dist/ReactCrop.css';
import uploadAvatarAction from '../actions/uploadAvatar';
import 'blueimp-canvas-to-blob/js/canvas-to-blob';
import * as actions from '../actions/auth';
import Fade from '@material-ui/core/Fade';
import { idleUploadIdentity } from '../actions/identity';
import {
  changeBioAction,
  changeStoreStatus,
} from '../actions/user';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}));
// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext('2d');
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight,
  );

  return tmpCanvas;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
}

const renderTextField = ({
  input,
  type,
  placeholder,
  meta: {
    touched,
    error,
  },
}) => (
  <div className={`addWebsite-description-wrapper input-group ${touched && error ? 'has-error' : ''}`}>
    <TextField
      // id="outlined-multiline-static"
      label="Bio"
      multiline
      style={{ width: '100%' }}
      rows={6}
      defaultValue=""
      inputProps={{
        maxLength: 400,
        // className: 'outlined-adornment-field',
      }}
      variant="outlined"
      {...input}
    />
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

const Profile = (props) => {
  const {
    user,
    uploadAvatar,
    handleSubmit,
    signinUser,
    verifyPhoneCodeProp,
    uploadIdentity,

  } = props;
  const dispatch = useDispatch();
  const [upImg, setUpImg] = useState(false);
  const classes = useStyles();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const inputFile = useRef(null)
  const [crop, setCrop] = useState({ unit: 'px', width: 100, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [rerender, setRerender] = useState(1);
  const [descriptionLength, setDescriptionLength] = useState(0);

  const [open, setOpen] = React.useState(false);
  const [openIdentity, setOpenIdentity] = React.useState(false);

  const onBasicFieldChange = (event, newValue, previousValue, name) => {
    setDescriptionLength(newValue.length);
  };
  const handleChangeStoreStatus = () => {
    console.log('2222222222222');
    dispatch(changeStoreStatus());
  };

  const handleOpenIdentityVerify = () => {
    setOpenIdentity(true);
  };

  const handleCloseIdentityVerify = () => {
    setOpenIdentity(false);
  };

  const handleOpenPhoneVerify = () => {
    setOpen(true);
  };

  const handleClosePhoneVerify = () => {
    setOpen(false);
  };

  useEffect(() => {
    setUpImg(false)
  }, [uploadAvatar]);

  useEffect(() => {
    dispatch(change('profile', 'description', user.bio));
    setDescriptionLength(user && user.bio && user.bio.length);
  }, [user]);

  useEffect(() => {
    dispatch(idleUploadIdentity());
  }, []);

  useEffect(() => {
    if (verifyPhoneCodeProp) {
      setOpen(false);
    }
  }, [verifyPhoneCodeProp]);

  useEffect(() => {
    if (uploadIdentity) {
      setOpenIdentity(false);
    }
  }, [uploadIdentity]);

  const handleClose = () => {
    setUpImg(false);
  }
  const handleFormSubmit = async (bio) => {
    await dispatch(changeBioAction(bio));
  }
  const uploadAvatarImage = (previewCanvas, crop) => {
    if (!crop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    canvas.toBlob(
      (blob) => {
        console.log('download image');
        dispatch(uploadAvatarAction(blob));
      },
      'image/png',
      1,
    );
    setRerender(rerender + 1);
  }

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  }, [completedCrop]);

  const onAvatarClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  return (
    <Grid container className="surfContainer">
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
        xl={4}
      >
        <div
          style={{ marginTop: '1em' }}
          className="avatar-image-wrapper"
        >
          <div className="avatar-image" onClick={onAvatarClick}>
            <img src={`/uploads/avatars/${user && user.avatar_path}`} alt="Avatar" />
            <span className="avatarEditHoverText">Edit</span>
          </div>
        </div>
        <div className="text-center">
          <h3>Store Information</h3>
          <p>
            {user && user.open_store ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleChangeStoreStatus}
              >
                Close Your Store
              </Button>
            )
              : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChangeStoreStatus}
                >
                  Open Your Store
                </Button>
              )}

          </p>
          {user && user.open_store ? (<p style={{ color: 'green' }}>Store Open</p>) : (<p style={{ color: 'red' }}>Store Closed</p>)}
          <p>
            User Name:
            {' '}
            {user ? user.username : ''}
          </p>
          <p>
            Full Name:
            {' '}
            {user ? user.firstname : ''}
            {' '}
            {user ? user.lastname : ''}
          </p>
          <p>
            Email:
            {' '}
            {user ? user.email : ''}
          </p>
          <p>
            Phone Number:
            {' '}
            {user ? `+${user.phoneNumber}` : ''}
          </p>
          <p>
            Account Created:
            {' '}
            {user ? user.createdAt : ''}
          </p>
          <p>
            Trust: Trusted By
            {' '}
            {user && user.trustedUsers ? user.trustedUsers.length : '0' }
            {' '}
            people
          </p>
          <p>
            Blocks: Blocked by
            {' '}
            {user && user.blockedUsers ? user.blockedUsers.length : '0' }
            {' '}
            people
          </p>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={8}
        xl={8}
      >
        <h3>Update Bio</h3>
        <div className="form-container index600 shadow-w signinContainer content">
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid item>
                  <Field
                    name="description"
                    component={renderTextField}
                    type="description"
                    placeholder="Bio"
                    onChange={onBasicFieldChange}
                  />
                  <div>
                    {descriptionLength}
                    {' '}
                    / 400
                  </div>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit" className="btn" fullWidth size="large">
                    Update
                  </Button>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12}>
              <h3>Update Password</h3>
              <Button
                type="button"
                variant="contained"
                color="primary"
              >
                Change Password
              </Button>
            </Grid>
            <Grid item xs={12}>
              <h3>Verification</h3>
              <p>
                E-mail verified:
                {' '}
                <span className="color-green">Verified</span>
              </p>
              <p>
                Identity verified:
                {' '}
                {user && user.identityVerified === 'init' && (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenIdentityVerify}
                  >
                    Verify Identity
                  </Button>
                )}
                {user && user.identityVerified === 'rejected' && (
                  <>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={handleOpenIdentityVerify}
                    >
                      Verify Identity
                    </Button>
                    <p className="color-red">Rejected</p>
                  </>
                )}
                {user && user.identityVerified === 'pending' && (
                  <span className="color-brown">Pending</span>
                )}
                {user && user.identityVerified === 'accepted' && (
                  <span className="color-green">Verified</span>
                )}

              </p>
              <p>
                Phone Number Verified:
                {' '}
                {user && user.phoneNumberVerified ? (<span className="color-green">Verified</span>) : (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleOpenPhoneVerify}
                  >
                    Add PhoneNumber
                  </Button>
                )}

              </p>
              <div>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={openIdentity}
                  onClose={handleCloseIdentityVerify}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openIdentity}>
                    <div className={classes.paper}>
                      <IdentityVerify />
                    </div>
                  </Fade>
                </Modal>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClosePhoneVerify}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <PhoneVerify />
                    </div>
                  </Fade>
                </Modal>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <div className="App">
        <div>
          <input key={rerender} style={{ display: 'none' }} type="file" accept="image/*" onChange={onSelectFile} ref={inputFile} />
        </div>
        <Modal
          open={upImg}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <Grid container className="height100" alignItems="center">
              <Grid
                item
                xs={4}
                align="center"
                style={{ padding: '20px' }}
              >
                <div className="w-100">
                  <div className="avatar-image">
                    <canvas
                      ref={previewCanvasRef}
                      // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                      style={{
                        width: '100px',
                        height: '100px',
                      }}
                    />
                  </div>

                </div>
                {
                        uploadAvatar
                        && uploadAvatar.isFetching
                          ? (<CircularProgress disableShrink />)
                          : (
                            <Button
                              type="button"
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={() => uploadAvatarImage(previewCanvasRef.current, completedCrop)}
                            >
                              Upload
                            </Button>
                          )
                      }
                <div style={{ paddingTop: '20px' }}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </div>

              </Grid>
              <Grid
                item
                xs={8}
                style={{
                  overflow: 'auto',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                }}
              >
                <div style={{ height: '100%' }}>
                  <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                  />
                </div>

              </Grid>
            </Grid>
            <div />

          </div>
        </Modal>

      </div>
      <Referrals
        user={user || []}
      />
    </Grid>
  )
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Email is required'
  }

  if (!formProps.password) {
    errors.password = 'Password is required'
  }

  if (!formProps.captchaResponse) {
    errors.captchaResponse = 'Please validate the captcha.';
  }

  return errors;
}

const selector = formValueSelector('profile');

const mapStateToProps = (state) => {
  console.log(state.uploadAvatar);
  return {
    uploadIdentity: state.uploadIdentity.data,
    errorMessage: state.auth.error,
    uploadAvatar: state.uploadAvatar,
    user: state.user.data,
    verifyPhoneCodeProp: state.verifyPhoneCode.data,
  }
}

// export default connect(mapStateToProps, null)(Profile);
export default connect(mapStateToProps, actions)(reduxForm({ form: 'profile', validate })(Profile));
