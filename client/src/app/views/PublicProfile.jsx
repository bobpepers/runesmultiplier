import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';
import {
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import Rating from 'react-rating';
import * as actions from '../actions/auth';
import PolicyImage from '../assets/images/policy.svg';
import { fetchSpecificUserData } from '../actions/user';
import { trustAction } from '../actions/trust';
import { blockAction } from '../actions/block';
// import Globe from '../containers/Globe';
import {
  fetchPostAdData,
} from '../actions/postAd';
import TableAds from '../components/TableAds';
import Pagination from '../components/Pagination';
import Posts from '../components/Posts';
import EmptyStar from '../assets/images/Empty_Star.svg';
import FullStar from '../assets/images/Full_Star_Yellow.svg';

import {
  addUserFeedBack,
  idleCreateUserFeedback,
  removeUserFeedBackAction,
} from '../actions/feedback';

const headCellsBuy = [
  {
    id: 'seller', numeric: false, disablePadding: true, label: 'Seller',
  },
  {
    id: 'country', numeric: true, disablePadding: false, label: 'Country',
  },
  {
    id: 'paymentMethod', numeric: true, disablePadding: false, label: 'Payment Method',
  },
  {
    id: 'price', numeric: true, disablePadding: false, label: 'Price / RUNES',
  },
  {
    id: 'currency', numeric: true, disablePadding: false, label: 'Currency',
  },
  // {
  //  id: 'actual', numeric: true, disablePadding: false, label: 'Over/Under Price %',
  // },
  {
    id: 'limits', numeric: true, disablePadding: false, label: 'Limits',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Actions',
  },
];

const headCellsSell = [
  {
    id: 'buyer', numeric: false, disablePadding: true, label: 'Buyer',
  },
  {
    id: 'country', numeric: true, disablePadding: false, label: 'Country',
  },
  {
    id: 'paymentMethod', numeric: true, disablePadding: false, label: 'Payment Method',
  },
  {
    id: 'price', numeric: true, disablePadding: false, label: 'Price / RUNES',
  },
  {
    id: 'currency', numeric: true, disablePadding: false, label: 'Currency',
  },
  // {
  //  id: 'actual', numeric: true, disablePadding: false, label: 'Over/Under Price %',
  // },
  {
    id: 'limits', numeric: true, disablePadding: false, label: 'Limits',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Actions',
  },
];

function getAverageRating(scores) {
  const sum = scores.reduce((a, b) => a + b.rating, 0);
  const avg = (sum / scores.length) || 0;
  console.log(sum);
  console.log('avg');
  console.log('avg');
  console.log('avg');
  console.log('avg');
  console.log('avg');
  console.log('avg');
  console.log('avg');
  console.log('avg');
  console.log('avg');
  console.log(avg);
  return Number(avg.toFixed(2));
}

const PublicProfile = (props) => {
  const {
    match: {
      params,
    },
    specificUser,
    user,
    postAd,
    createUserFeedback,
    removeUserFeedback,
  } = props;
  console.log('RunesX Home View');
  const userName = params[0];
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchSpecificUserData(userName)), [dispatch]);
  const [value, setValue] = React.useState('');
  const [valueStars, setValueStars] = React.useState(2);

  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [page, setPage] = React.useState(0);
  const [filteredFeedback, setFilteredFeedback] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [averageUserRating, setAverageUserRating] = useState(0.00);

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };
  const handleChangeStars = (event) => {
    console.log('event');
    console.log(event);
    setValueStars(event);
  };

  const handleFeedbackSubmit = (username) => {
    // console.log(event.target.value);
    // setValue(event.target.value);
    dispatch(addUserFeedBack(value, valueStars, username));
  };
  const handleFeedbackRemove = (username) => {
    // console.log(event.target.value);
    // setValue(event.target.value);
    dispatch(removeUserFeedBackAction(username));
  };

  const clickTrust = (specificuserName) => {
    dispatch(trustAction(specificuserName));
  }
  const clickBlock = (specificuserName) => {
    dispatch(blockAction(specificuserName));
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const userToFetch = specificUser && specificUser.username ? specificUser.username : 'all';

  useEffect(() => {
    dispatch(idleCreateUserFeedback());
    // dispatch(fetchAverageUserRating());
  }, []);
  useEffect(() => {
    setValue('');
    setValueStars(2);
  }, [removeUserFeedback]);

  useEffect(() => {
  }, [specificUser, user, postAd]);
  useEffect(() => {
    if (specificUser && specificUser.userRated && user) {
      setAverageUserRating(getAverageRating(specificUser.userRated));
      console.log(user);
      const ok = specificUser.userRated.filter((person) => {
        console.log(person.userRating.username);
        console.log(user.username);
        return person.userRating.username === user.username;
      })
      console.log(ok);
      setFilteredFeedback(ok);

      console.log('55555555555555555555555555');
      console.log('55555555555555555555555555');
      console.log('55555555555555555555555555');
      console.log('55555555555555555555555555');
      console.log('55555555555555555555555555');
      console.log('55555555555555555555555555');
      console.log('55555555555555555555555555');
      console.log('55555555555555555555555555');
      console.log(filteredFeedback);

      console.log(getAverageRating(specificUser.userRated));
      console.log(averageUserRating);
      console.log('averageUserRating');
    }
  }, [specificUser, user]);

  useEffect(() => {
    console.log(filteredFeedback);
    console.log('filteredFeedback');
    console.log(filteredFeedback);
    console.log('filteredFeedback');
    console.log(filteredFeedback);
    console.log('filteredFeedback');
    console.log(filteredFeedback);
    console.log('filteredFeedback');
    console.log(filteredFeedback);
    console.log('filteredFeedback');
    console.log(filteredFeedback);
    console.log('filteredFeedback');
    console.log(filteredFeedback);
    console.log('filteredFeedback');
    console.log(filteredFeedback);
    console.log('filteredFeedback');
    if (filteredFeedback.length) {
      setValueStars(filteredFeedback[0].rating);
      setValue(filteredFeedback[0].feedback);
    }
  }, [filteredFeedback]);

  useEffect(() => {
    console.log(averageUserRating);
    console.log('averageUserRating');
    console.log(averageUserRating);
    console.log('averageUserRating');
    console.log(averageUserRating);
    console.log('averageUserRating');
    console.log(averageUserRating);
    console.log('averageUserRating');
    console.log(averageUserRating);
    console.log('averageUserRating');
    console.log(averageUserRating);
    console.log('averageUserRating');
    console.log(averageUserRating);
    console.log('averageUserRating');
    console.log(averageUserRating);
    console.log('averageUserRating');
  }, [averageUserRating]);

  useEffect(() => {
    if (specificUser) {
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log('specificUser.username');
      console.log(specificUser.username);
      dispatch(fetchPostAdData(
        'sell',
        'all',
        'all',
        'all',
        'all',
        'all',
        specificUser.username,
      ));
      dispatch(fetchPostAdData(
        'buy',
        'all',
        'all',
        'all',
        'all',
        'all',
        specificUser.username,
      ));
    }
  }, [specificUser]);

  const userTrusted = (username) => {
    if (specificUser && specificUser.trustedUsers) {
      return specificUser.trustedUsers.some((el) => el.userTrust.username === username);
    }
  }

  const userBlocked = (username) => {
    if (specificUser && specificUser.blockedUsers) {
      return specificUser.blockedUsers.some((el) => el.userBlock.username === username);
    }
  }

  return (
    <div className="height100 content surfContainer">
      <Grid
        container
        // align="center"
        // alignConent="center"
        // alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          align="center"
          alignItems="center"
        >
          <h3>{specificUser && specificUser.username }</h3>
          <div className="avatar-image-wrapper">
            <div className="avatar-image">
              <img
                src={`/uploads/avatars/${specificUser && specificUser.avatar_path}`}
                alt="avatar"
              />
            </div>
          </div>
          <div
            className="starsPublicProfile"
            style={{ width: '100%' }}
          >
            <Rating
              readonly
              initialRating={averageUserRating}
              emptySymbol={<EmptyStar />}
              fullSymbol={<FullStar />}
            />
          </div>
          <h4>
            Information on
            {' '}
            {specificUser && specificUser.username }
          </h4>
          {/* <p>
            Full Name:
            {' '}
            {specificUser && specificUser.firstname }
            {' '}
            {specificUser && specificUser.lastname }
          </p> */}
          <p>
            Trade Volume:
            {' '}
            {specificUser && (specificUser.volume / 1e8) }
            {' '}
            RUNES
          </p>
          <p>
            Number of completed trades:
            {' '}
            {specificUser && specificUser.tradeCount ? specificUser.tradeCount.toString() : '0' }
          </p>
          <p>
            First trade:
            {' '}
            {specificUser && specificUser.firstTrade ? specificUser.firstTrade : 'never'}
          </p>
          <p>
            Account created:
            {' '}
            {specificUser && specificUser.createdAt }
          </p>
          <p>
            Language: english
          </p>
          {/* <p>
            Phone Number: +
            {specificUser && specificUser.phoneNumber }
          </p> */}
          <p>
            Phone verified:
            {' '}
            {specificUser && specificUser.phoneNumberVerified ? (<span className="color-green">Verified</span>) : (<span className="color-red">Not Verified</span>) }
          </p>
          <p>
            Identity:
            {' '}
            {specificUser && specificUser.identityVerified === 'init' && (<span className="color-red">Not Verified</span>)}
            {specificUser && specificUser.identityVerified === 'pending' && (<span className="color-red">Not Verified</span>) }
            {specificUser && specificUser.identityVerified === 'accepted' && (<span className="color-green">Verified</span>)}
            {specificUser && specificUser.identityVerified === 'rejected' && (<span className="color-red">Not Verified</span>) }
          </p>
          <p>
            email:
            {' '}
            {specificUser && specificUser.authused ? (<span className="color-green">Verified</span>) : (<span className="color-red">Not Verified</span>) }
          </p>
          <p>
            Trusted by
            {' '}
            {specificUser && specificUser.trustedUsers ? specificUser.trustedUsers.length : '0' }
            {' '}
            people
          </p>
          <p>
            Blocked by
            {' '}
            {specificUser && specificUser.blockedUsers ? specificUser.blockedUsers.length : '0' }
            {' '}
            people
          </p>
          <Grid container item xs={12}>
            {specificUser && specificUser.username === user.username ? (
              <p>
                Can't Trust or Block yourself
              </p>
            ) : (
              <>

                <Grid container item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => clickTrust(specificUser && specificUser.username)}
                  >

                    {userTrusted(user && user.username) ? 'Untrust' : 'Trust'}
                  </Button>
                </Grid>
                <Grid container item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => clickBlock(specificUser && specificUser.username)}
                  >
                    {userBlocked(user && user.username) ? 'Unblock' : 'Block'}
                  </Button>
                </Grid>
              </>
            ) }

          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          // align="center"
          // alignItems="center"
        >
          <Grid item xs={12}>
            <h3>
              Rate
              {' '}
              {specificUser && specificUser.username }
            </h3>
            <div
              className="starsPublicProfile"
              style={{ width: '100%' }}
            >
              <Rating
            // readonly
                initialRating={valueStars}
                emptySymbol={<EmptyStar />}
                fullSymbol={<FullStar />}
                onChange={handleChangeStars}
              />
            </div>
            <TextField
              label="Feedback"
              multiline
              style={{ width: '100%' }}
              rows={4}
              value={value}
              onChange={handleChange}
              // defaultValue=""
              inputProps={{
                maxLength: 400,
                // className: 'outlined-adornment-field',
              }}
              variant="outlined"
            />
            {filteredFeedback.length
              ? (
                <>
                  <div style={{
                    marginBottom: '20px',
                    marginTop: '20px',
                  }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      onClick={() => handleFeedbackSubmit(specificUser && specificUser.username)}
                    >
                      Update Feedback
                    </Button>
                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="btn"
                    fullWidth
                    size="large"
                    onClick={() => handleFeedbackRemove(specificUser && specificUser.username)}
                  >
                    Remove Feedback
                  </Button>
                </>
              )
              : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="btn"
                    fullWidth
                    size="large"
                    onClick={() => handleFeedbackSubmit(specificUser && specificUser.username)}
                  >
                    Add Feedback
                  </Button>
                </>
              )}

          </Grid>
          <Grid item xs={12}>
            <h3>Rating</h3>
          </Grid>
          <Grid item xs={12}>
            <ul className="list-group mb-4">
              {specificUser
                && specificUser.userRated
                && specificUser.userRated
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((post, index) => {
                    console.log('3333333333333333333333333')

                    return (
                      <li
                        key={post.id}
                        className="list-group-item"
                        style={{
                          borderBottom: '1px solid black',
                        }}
                      >
                        <Grid container>
                          <Grid container item xs={12}>
                            <Grid container item xs={6}>
                              <div
                                style={{
                                  maxHeight: '50px',
                                  maxWidth: '50px',
                                }}
                                className="avatar-image"
                              >
                                <img
                                  src={`/uploads/avatars/${post.userRating.avatar_path}`}
                                  alt="avatar"
                                />
                              </div>
                              <p style={{ width: '100%' }}>
                                {post.userRating.username}
                                :
                              </p>
                            </Grid>
                            <Grid container item xs={6}>
                              <div
                                className="datetime"
                                style={{ width: '100%' }}
                              >
                                {post.updatedAt}
                              </div>
                              <div
                                className="datetime"
                              >
                                <Rating
                                  readonly
                                  initialRating={post.rating}
                                  emptySymbol={(
                                    <EmptyStar />
          )}
                                  fullSymbol={(
                                    <FullStar />
          )}
                                />
                              </div>
                            </Grid>
                          </Grid>
                          <Grid container item xs={12}>
                            <p style={{ width: '100%' }}>
                              {post.feedback}
                            </p>
                          </Grid>
                        </Grid>
                      </li>
                    );
                  })}
            </ul>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10, 20]}
              component="div"
              count={specificUser && specificUser.userRated ? specificUser.userRated.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Grid>

          {/* <Grid container item xs={12}>
            <Grid container item xs={12}>
              <h3>
                Feedback
              </h3>
            </Grid>
            <Grid container item xs={12}>
              <p>
                december 14 2020 16:59pm, Bago
              </p>
            </Grid>
            <Grid container item xs={12}>
              <p>
                Good trader, fast delivery
              </p>
            </Grid>
          </Grid> */}
        </Grid>
        <Grid container item xs={12}>
          <h3>
            Buy RUNES from
            {' '}
            {specificUser && specificUser.username}
          </h3>
        </Grid>
        <Grid item xs={12}>
          <TableAds
            defaultPageSize={3}
            headCells={headCellsBuy || []}
            postAd={postAd && postAd.sell ? postAd.sell : []}
          />
        </Grid>
        <Grid container item xs={12}>
          <h3>
            Sell RUNES to
            {' '}
            {specificUser && specificUser.username}
          </h3>
        </Grid>
        <Grid item xs={12}>
          <TableAds
            defaultPageSize={3}
            headCells={headCellsSell || []}
            postAd={postAd && postAd.buy ? postAd.buy : []}
          />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  specificUser: state.specificUser.data,
  user: state.user.data,
  postAd: state.postAd,
  createUserFeedback: state.createUserFeedback.data,
  removeUserFeedback: state.removeUserFeedback.data,
})

export default withRouter(connect(mapStateToProps, actions)(PublicProfile));
