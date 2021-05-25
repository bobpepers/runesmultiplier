import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
// import { Link } from 'react-router-dom';
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
} from '@material-ui/core';

// import { makeStyles } from '@material-ui/core/styles';
import {
  reduxForm,
  Field,
  // formValueSelector,
  // change,
} from 'redux-form';
import {
  fetchAdminContestRewardData,
  // addAdminCurrency,
  // updateCurrency,
  updateMargin,
  updateAdminContestRewards,
  // dddCountryAdmin,
} from '../../actions/admin';

const AdminContestRewardView = (props) => {
  const {
    adminContestReward,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [unitFirstPlace, setUnitFirstPlace] = useState(null);
  const [unitSecondPlace, setUnitSecondPlace] = useState(null);
  const [unitThirdPlace, setUnitThirdPlace] = useState(null);

  const [unitFirstPlaceNext, setUnitFirstPlaceNext] = useState(null);
  const [unitSecondPlaceNext, setUnitSecondPlaceNext] = useState(null);
  const [unitThirdPlaceNext, setUnitThirdPlaceNext] = useState(null);

  const onEdit = ({
    id,
    currentUnitFirstPlace,
    currentUnitSecondPlace,
    currentUnitThirdPlace,
    currentUnitFirstPlaceNext,
    currentUnitSecondPlaceNext,
    currentUnitThirdPlaceNext,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitFirstPlace(currentUnitFirstPlace);
    setUnitSecondPlace(currentUnitSecondPlace);
    setUnitThirdPlace(currentUnitThirdPlace);
    setUnitFirstPlaceNext(currentUnitFirstPlaceNext);
    setUnitSecondPlaceNext(currentUnitSecondPlaceNext);
    setUnitThirdPlaceNext(currentUnitThirdPlaceNext);
  }

  const onSave = async ({ id }) => {
    // await dispatch(updateCurrency(id, unitMargin));
    await dispatch(
      updateAdminContestRewards(
        id,
        unitFirstPlace,
        unitSecondPlace,
        unitThirdPlace,
        unitFirstPlaceNext,
        unitSecondPlaceNext,
        unitThirdPlaceNext,
      ),
    );
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitFirstPlace(null);
    setUnitSecondPlace(null);
    setUnitThirdPlace(null);
    setUnitFirstPlaceNext(null);
    setUnitSecondPlaceNext(null);
    setUnitThirdPlaceNext(null);
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    })
    // reset the unit price state value
    setUnitFirstPlace(null);
    setUnitSecondPlace(null);
    setUnitThirdPlace(null);
    setUnitFirstPlaceNext(null);
    setUnitSecondPlaceNext(null);
    setUnitThirdPlaceNext(null);
  }

  useEffect(() => dispatch(fetchAdminContestRewardData()), [dispatch]);
  useEffect(() => { }, [adminContestReward]);

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">first place</TableCell>
              <TableCell align="right">second place</TableCell>
              <TableCell align="right">third place</TableCell>
              <TableCell align="right">next week first place</TableCell>
              <TableCell align="right">next week second place</TableCell>
              <TableCell align="right">next week third place</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminContestReward
                && adminContestReward.data
                && adminContestReward.data.map((cReward, i) => {
                  console.log(cReward);
                  return (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {cReward.id}
                      </TableCell>
                      <TableCell align="right">
                        {
                                        inEditMode.status && inEditMode.rowKey === cReward.id ? (
                                          <input
                                            value={unitFirstPlace}
                                            onChange={(event) => setUnitFirstPlace(event.target.value)}
                                          />
                                        ) : (
                                          cReward.firstPlace
                                        )
                                    }

                      </TableCell>
                      <TableCell align="right">
                        {
                                        inEditMode.status && inEditMode.rowKey === cReward.id ? (
                                          <input
                                            value={unitSecondPlace}
                                            onChange={(event) => setUnitSecondPlace(event.target.value)}
                                          />
                                        ) : (
                                          cReward.secondPlace
                                        )
                                    }

                      </TableCell>
                      <TableCell align="right">
                        {
                                        inEditMode.status && inEditMode.rowKey === cReward.id ? (
                                          <input
                                            value={unitThirdPlace}
                                            onChange={(event) => setUnitThirdPlace(event.target.value)}
                                          />
                                        ) : (
                                          cReward.thirdPlace
                                        )
                                    }

                      </TableCell>
                      <TableCell align="right">
                        {
                                        inEditMode.status && inEditMode.rowKey === cReward.id ? (
                                          <input
                                            value={unitFirstPlaceNext}
                                            onChange={(event) => setUnitFirstPlaceNext(event.target.value)}
                                          />
                                        ) : (
                                          cReward.firstPlaceNext
                                        )
                                    }

                      </TableCell>
                      <TableCell align="right">
                        {
                                        inEditMode.status && inEditMode.rowKey === cReward.id ? (
                                          <input
                                            value={unitSecondPlaceNext}
                                            onChange={(event) => setUnitSecondPlaceNext(event.target.value)}
                                          />
                                        ) : (
                                          cReward.secondPlaceNext
                                        )
                                    }

                      </TableCell>
                      <TableCell align="right">
                        {
                                        inEditMode.status && inEditMode.rowKey === cReward.id ? (
                                          <input
                                            value={unitThirdPlaceNext}
                                            onChange={(event) => setUnitThirdPlaceNext(event.target.value)}
                                          />
                                        ) : (
                                          cReward.thirdPlaceNext
                                        )
                                    }

                      </TableCell>
                      <TableCell align="right">
                        {
                                        inEditMode.status && inEditMode.rowKey === cReward.id ? (
                                          <>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              size="large"
                                              onClick={() => onSave({
                                                id: cReward.id,
                                                firstPlace: unitFirstPlace,
                                                secondPlace: unitSecondPlace,
                                                thirdPlace: unitThirdPlace,
                                                firstPlaceNext: unitFirstPlaceNext,
                                                secondPlaceNext: unitSecondPlaceNext,
                                                thirdPlaceNext: unitThirdPlaceNext,
                                              })}
                                            >
                                              Save
                                            </Button>

                                            <Button
                                              variant="contained"
                                              color="primary"
                                              size="large"
                                              style={{ marginLeft: 8 }}
                                              onClick={() => onCancel()}
                                            >
                                              Cancel
                                            </Button>
                                          </>
                                        ) : (
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            onClick={() => onEdit({
                                              id: cReward.id,
                                              currentUnitFirstPlace: cReward.firstPlace,
                                              currentUnitSecondPlace: cReward.secondPlace,
                                              currentUnitThirdPlace: cReward.thirdPlace,
                                              currentUnitFirstPlaceNext: cReward.firstPlaceNext,
                                              currentUnitSecondPlaceNext: cReward.secondPlaceNext,
                                              currentUnitThirdPlaceNext: cReward.thirdPlaceNext,
                                            })}
                                          >
                                            Edit
                                          </Button>
                                        )
                                    }
                      </TableCell>
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    adminContestReward: state.adminContestReward,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
  }
  if (!formProps.iso) {
    errors.iso = 'Iso is required'
  }

  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'adminCountries', validate })(AdminContestRewardView));
