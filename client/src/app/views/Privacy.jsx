import React, {
  useEffect,
  useState,
  // Fragment,
} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  // Button,
} from '@material-ui/core';
import * as actions from '../actions/auth';
import PolicyImage from '../assets/images/policy.svg'
// import Globe from '../containers/Globe';

const Home = () => {
  console.log('RunesX Home View');

  return (
    <div className="height100 content surfContainer">
      <Grid container align="center" alignConent="center" alignItems="center">
        <Grid
          item
          xs={8}
          align="center"
          alignItems="center"
          style={{ margin: 'auto' }}
        >
          <PolicyImage />
        </Grid>
        <Grid item xs={12}>
          <h3 className="mb15">About us</h3>
        </Grid>
        <Grid item xs={12}>
          <p>
            LocalRunes.com provides escrowed to person to person crypto trading at lowest fees and highest security with 24/7 customer care. Making it easier for the crypto trading and crypto currency learning through Buy/Sell Runes in P2P alternative coin market place.
          </p>
          <p>
            People from different countries can exchange their local currency into Runes. We allow users to create advertisements where they can choose the payment method and exchange rate for buying and selling Runes from and to other LocalRunes’ users. By replying to these advertisements, a trade chat is opened and escrow protection is automatically activated. Escrow protects both buyer and seller by keeping the runes safe until the payment is done and the seller releases runes to the buyer. LocalRunes also provides a web wallet from where you can send and receive Runes transactions.

          </p>
          <p>
            Please contact us at the following email:
            support@localrunes.com: If you need assistance with an order or transaction.
          </p>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({ errorMessage: state.auth.error })

export default withRouter(connect(mapStateToProps, actions)(Home));
