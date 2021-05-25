import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../actions/auth';

import {
  fetchPaymentMethodData,
} from '../actions/paymentMethods';

import {
  fetchCurrenciesData,
} from '../actions/currencies';

import {
  fetchCountriesData,
} from '../actions/countries';

import {
  addPostAdAction,
  fetchPostAdData,
} from '../actions/postAd';

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
      label="Optional"
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

const radioButton = ({
  input,
  meta: {
    touched,
    error,
  },
  ...rest
}) => (
  <div className={`addWebsite-description-wrapper input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel value="buy" control={<Radio />} label="Buy" />
        <FormControlLabel value="sell" control={<Radio />} label="Sell" />
      </RadioGroup>
    </FormControl>
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

const radioButtonPriceType = ({
  input,
  meta: {
    touched,
    error,
  },
  // checked,
  ...rest
}) => (
  <div className={`addWebsite-description-wrapper input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl>
      <RadioGroup {...input} {...rest}>
        <FormControlLabel
          value="static"
          control={<Radio />}
          label="Static Price (keep static price)"
          // checked
        />
        <FormControlLabel
          value="margin"
          control={<Radio />}
          label="Margin Price (move price with coinpaprika.com index value)"
        />
      </RadioGroup>
    </FormControl>
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

const renderField = ({
  input, type, placeholder, meta: { touched, error },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <TextField
        // className="outlined-email-field"
        label={placeholder}
        type={type}
        variant="outlined"
        inputProps={{ className: 'outlined-email-field' }}
        {...input}
      />
      { touched && error && <div className="form-error">{error}</div> }
    </FormControl>
  </div>
);

const renderSelectField = ({
  input,
  label,
  defaultValue,
  name,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl
    variant="outlined"
    error={touched && error}
    style={{ width: '100%' }}
  >
    <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: input.name,
        // id: 'age-native-simple',
      }}
    >
      {children}
    </Select>
    { touched && error && <div className="form-error">{error}</div> }
  </FormControl>
)

const PostAd = (props) => {
  const {
    handleSubmit,
    paymentMethods,
    currencies,
    countries,
    location,
    price,
    selectedCurrency,
    marginFieldValue,
    priceFieldValue,
    currencyFieldValue,
    postAd,

  } = props;
  const dispatch = useDispatch();
  const [descriptionLength, setDescriptionLength] = useState(0);
  console.log('RunesX Home View');
  useEffect(() => dispatch(fetchPaymentMethodData()), [dispatch]);
  useEffect(() => dispatch(fetchCurrenciesData()), [dispatch]);
  useEffect(() => dispatch(fetchCountriesData()), [dispatch]);

  useEffect(() => {
    dispatch(change('postad', 'priceType', 'static'));
  }, [paymentMethods, currencies]);
  useEffect(() => {}, [paymentMethods, currencies]);

  useEffect(() => {
    console.log(selectedCurrency);
    if (location) {
      dispatch(change('postad', 'country', location.id));
    }
    if (location.currency) {
      dispatch(change('postad', 'currency', location.currency.id));
    }
  }, [location]);

  const handleFormSubmit = async (obj) => {
    console.log(obj);
    await dispatch(addPostAdAction(obj));
  }
  const onBasicFieldChange = (event, newValue, previousValue, name) => {
    setDescriptionLength(newValue.length);
  };

  const onChangeRunesPrice = (event) => {
    const selectedFieldCurrency = currencies
    && currencies.filter((object) => object.id === Number(currencyFieldValue));
    if (selectedFieldCurrency && selectedFieldCurrency.length) {
      const selectedFieldPrice = price
      && price.filter((object) => object.currency === selectedFieldCurrency[0].iso);
      if (selectedFieldPrice && selectedFieldPrice.length && selectedFieldPrice[0].price) {
        const actualPrice = Number(selectedFieldPrice[0].price);
        const margin = ((((event - actualPrice) / actualPrice) * 100) + 100).toFixed(2);
        // const margin = priceFieldValue / selectedCurrency[0].price;
        console.log('margin');
        console.log(margin);

        dispatch(change('postad', 'margin', margin));
      }
    }
  };

  const onChangeMargin = (event) => {
    console.log('event');
    console.log(event);
    const selectedFieldCurrency = currencies
    && currencies.filter((object) => object.id === Number(currencyFieldValue));
    if (selectedFieldCurrency && selectedFieldCurrency.length) {
      const selectedFieldPrice = price
      && price.filter((object) => object.currency === selectedFieldCurrency[0].iso);
      if (selectedFieldPrice && selectedFieldPrice.length && selectedFieldPrice[0].price) {
        const actualPrice = Number(selectedFieldPrice[0].price);
        const result = (actualPrice / 100) * Number(event);
        console.log(result);
        dispatch(change('postad', 'runesPrice', result.toFixed(8)));
      }
    }
  }

  const onChangeCurrency = (e) => {
    const selectedFieldCurrency = currencies
    && currencies.filter((object) => object.id === Number(e));
    if (selectedFieldCurrency && selectedFieldCurrency.length) {
      const selectedFieldPrice = price
      && price.filter((object) => object.currency === selectedFieldCurrency[0].iso);
      if (
        marginFieldValue
        && selectedFieldPrice
        && selectedFieldPrice.length
        && selectedFieldPrice[0].price
      ) {
        const actualPrice = Number(selectedFieldPrice[0].price);
        const result = (actualPrice / 100) * Number(marginFieldValue);
        console.log(result);
        dispatch(change('postad', 'runesPrice', result.toFixed(8)));
      }
    }
  }

  return (
    <div className="height100 content surfContainer">
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <h3 className="text-center">Advertisement rules and requirements</h3>
            <ul className="listPostAd">
              <li>Minmum Trade is 5 RUNES</li>
              <li>Each completed trade costs advertisers 1% of the total trade amount. See all fees on our fees page.</li>
              <li>Once a trade is opened the price is final, except when there is a clear mistake in the pricing.</li>
              <li>You are not allowed to buy or sell RUNES on behalf of someone else (brokering).</li>
              <li>You may only use payment accounts that are registered in your own name (no third party payments!).</li>
              <li>You must provide your payment details in the advertisement payment details or in the trade chat.</li>
              <li>All communication must happen on LocalRunes.com</li>
              <li>Payment methods marked High Risk have a significant risk of fraud. Be careful and always verify your trading partners when using high risk payment methods.</li>
              <li>For your advertisement to show you have to last seen at least 3 days ago</li>
              <li>Trade Fee: 1%</li>
            </ul>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container>
              <Grid item xs={12}>
                <h3>Trade type</h3>
                <p>I want to</p>
                <Field name="type" component={radioButton}>
                  <Radio value="buy" label="buy" />
                  <Radio value="sell" label="sell" />
                </Field>
              </Grid>
              <Grid item xs={12}>
                <p>Country</p>
                <Field
                  name="country"
                  component={renderSelectField}
                  label="country"
                  style={{ width: '100%' }}
                >
                  <option value="" />
                  {countries
                  && countries.data
                  && countries.data.map((item) => <option value={item.id}>{item.name}</option>)}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <p>Location</p>
                <Field
                  name="location"
                  component={renderField}
                  type="text"
                  placeholder="Location"
                />
              </Grid>
              <Grid item xs={12}>
                <p>Payment Method</p>
                <Field
                  name="paymentMethod"
                  component={renderSelectField}
                  label="Payment Method"
                  style={{ width: '100%' }}
                >
                  <option value="" />
                  {paymentMethods
                  && paymentMethods.data
                  && paymentMethods.data.map((item) => <option value={item.id}>{item.name}</option>)}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <h3>Additional Trade Information</h3>
              </Grid>
              <Grid item xs={12}>
                <p>Min. Amount (RUNES)</p>
                <Field
                  name="minAmount"
                  component={renderField}
                  type="text"
                  placeholder="Min Amount"
                />
              </Grid>
              <Grid item xs={12}>
                <p>Max. Amount (RUNES)</p>
                <Field
                  name="maxAmount"
                  component={renderField}
                  type="text"
                  placeholder="Max Amount"
                />
              </Grid>
              <Grid item xs={12}>
                <p>Currency</p>
                <Field
                  name="currency"
                  component={renderSelectField}
                  label="Currency"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    console.log(e);
                    console.log('eeeeeeeeeeeeeeeeeee');
                    const val = e.currentTarget.value
                    // whatever stuff you want to do
                    onChangeCurrency(val)
                  }}
                >
                  <option value="">
                    None
                  </option>
                  {currencies
                && currencies.map((item) => <option value={item.id}>{item.currency_name}</option>)}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <h3>Price type</h3>
                <Field name="priceType" component={radioButtonPriceType}>
                  <Radio value="static" label="Static Price (keep static price)" />
                  <Radio value="margin" label="Margin Price (move price with coinpaprika.com index value)" />
                </Field>
              </Grid>
              <Grid item xs={12}>
                <p>Price/RUNES</p>
                <Field
                  name="runesPrice"
                  component={renderField}
                  type="number"
                  placeholder="Price/RUNES"
                  onChange={(e) => {
                    const val = e.target.value
                    // whatever stuff you want to do
                    onChangeRunesPrice(val)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <p>Margin %</p>
                <Field
                  name="margin"
                  component={renderField}
                  type="number"
                  placeholder="Margin %"
                  onChange={(e) => {
                    const val = e.target.value
                    // whatever stuff you want to do
                    onChangeMargin(val)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <p>Payment Details:</p>
                <Field
                  name="paymentDetails"
                  component={renderTextField}
                  type="message"
                  placeholder="Payment Details"
                  onChange={onBasicFieldChange}
                />
                <div>
                  {descriptionLength}
                  {' '}
                  / 400
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                {
                  postAd && postAd.isFetching
                    ? (<CircularProgress />)
                    : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="btn"
                        fullWidth
                        size="large"
                      >
                        Post Advertisement
                      </Button>
                    )
                }

              </Grid>
            </Grid>

          </form>
        </Grid>
      </Grid>
    </div>
  )
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.type) {
    errors.type = 'Type is required'
  }
  if (!formProps.location) {
    errors.location = 'Location is required'
  }
  if (!formProps.country) {
    errors.location = 'Country is required'
  }
  if (!formProps.paymentMethod) {
    errors.paymentMethod = 'Payment Method is required'
  }
  if (!formProps.currency) {
    errors.currency = 'Currency Method is required'
  }
  if (!formProps.minAmount) {
    errors.minAmount = 'Minimum Amount is required'
  }
  if (!formProps.maxAmount) {
    errors.maxAmount = 'Maximum Amount is required'
  }
  if (!formProps.runesPrice) {
    errors.runesPrice = 'Price is required'
  }
  if (!formProps.margin) {
    errors.margin = 'Margin is required'
  }
  if (!formProps.priceType) {
    errors.priceType = 'priceType is required'
  }

  return errors;
}

const selector = formValueSelector('postad');

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  paymentMethods: state.paymentMethods,
  currencies: state.currencies.data,
  countries: state.countries,
  location: state.location.data,
  price: state.price.data,
  selectedCurrency: state.selectedCurrency.data,
  marginFieldValue: selector(state, 'margin'),
  priceFieldValue: selector(state, 'price'),
  currencyFieldValue: selector(state, 'currency'),
  postAd: state.postAd.data,
})

// export default withRouter(connect(mapStateToProps, actions)(PostAd));
export default connect(mapStateToProps, actions)(reduxForm({
  form: 'postad',
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  updateUnregisteredFields: true,
  validate,
})(PostAd));
