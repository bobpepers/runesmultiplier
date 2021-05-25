import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect, useDispatch } from 'react-redux';
import {
  TextField,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Divider,
  List,
  ListItem,
  // ListItemText,
  Dialog,
  Grid,
  Button,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { red, purple } from '@material-ui/core/colors';
import DisputePostDialog from './DisputePostDialog';
import { createDisputeAction } from '../actions/trade';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: red[500],
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DisputeDialog = (props) => {
  const {
    tradeId,
    createDispute,
  } = props;
  const classes = useStyles();
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const textFieldRef = useRef();
  const subjectFieldRef = useRef();

  const onBasicFieldChange = () => {
    setDescriptionLength(textFieldRef.current.value.length);
    setReason(textFieldRef.current.value);
    console.log(reason);
    console.log('reason')
  };

  const onFieldChange = () => {
    setSubject(subjectFieldRef.current.value);
  };

  const onProceed = () => {
    console.log('223');
    console.log(tradeId);
    console.log(subject);
    console.log(reason);
    dispatch(createDisputeAction(tradeId, subject, reason));
    console.log('123')
  }

  useEffect(() => {

  }, [createDispute]);

  return (
    <div>
      <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
        fullWidth
        onClick={handleClickOpen}
        size="large"
      >
        Dispute This Trade
      </ColorButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
            >
              Dispute Trade
            </Typography>
            <DisputePostDialog
              onProceed={onProceed}
            />
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <TextField
              id="outlined-basic"
              label="Subject"
              variant="outlined"
              fullWidth
              inputRef={subjectFieldRef}
              onChange={onFieldChange}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <Grid container>
              <Grid container item xs={12}>
                <TextField
      // id="outlined-multiline-static"
                  label="Reason"
                  multiline
                  style={{
                    width: '100%',
                  }}
                  rows={20}
                  inputRef={textFieldRef}
                  defaultValue=""
                  onChange={onBasicFieldChange}
                  inputProps={{
                    maxLength: 1200,
                    // className: 'outlined-adornment-field',
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid container item xs={12}>
                <div>
                  {descriptionLength}
                  {' '}
                  / 1200
                </div>
              </Grid>

            </Grid>

          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  createDispute: state.createDispute.data,
})

export default connect(mapStateToProps, null)(DisputeDialog);
