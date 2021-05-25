import React, {
  Suspense,
  useState,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import socketIOClient from 'socket.io-client';
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';
import CookieConsent from 'react-cookie-consent';
import useCurrentLocation from './hooks/useCurrentLocation';
import useWatchLocation from './hooks/useWatchLocation';
import { geolocationOptions } from './config';
import Location from './components/Location';
// import { AUTH_USER } from './actions/types/index';

import ParticlesRunebase from './components/ParticlesRunebase';
// import Snow from './components/Snow';
import {
  onVolume,
  authenticated,
  onUpdateTransaction,
  onInsertTransaction,
  onUpdateWallet,
  onInsertActivity,
  onUpdateWebslot,
  onUpdateJackpotTickets,
  onUpdatePrice,
  onUpdateJackpot,
  onUpdateTrade,
  onInsertMessage,
  onInsertMessageDispute,
  onUpdateCurrentTrade,
  setLocation,
  getPrice,
} from './actions'

import reducers from './reducers';
import Routes from './routes';
import history from './history';
import Header from './components/Header';
import FooterMenu from './components/FooterMenu';
// import GeoLocation from './components/GeoLocation';

// import Footer from './components/Footer';
import Notifier from './containers/Alert';

import Runebase from './assets/images/Runebase.png';
import Footer from './containers/Footer';

import '@fortawesome/fontawesome-free/css/all.css';
import './assets/fonts/texgyreheros-regular.woff';
import './theme/style.scss';
import './i18n';
import * as action from './actions/online';
import 'animate.css/source/animate.css';
// import ReactGA from 'react-ga';
// import usePageTracking from './hooks/usePageTracking'

const ENDPOINT = `//${window.location.host}`;
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
store.dispatch(authenticated());

// const user = JSON.parse(localStorage.getItem('user'));

const socket = socketIOClient(ENDPOINT);

socket.on('updateJackpot', (data) => {
  store.dispatch(onUpdateJackpot(data));
});

socket.on('Online', (data) => {
  store.dispatch(action.getSuccessPeople(data));
});

socket.on('Volume', (data) => {
  store.dispatch(onVolume(data));
});

socket.on('insertMessage', (data) => {
  store.dispatch(onInsertMessage(data));
});

socket.on('insertMessageDispute', (data) => {
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');
  console.log('insertMessageDispute');

  store.dispatch(onInsertMessageDispute(data));
});

socket.on('updateTransaction', (data) => {
  store.dispatch(onUpdateTransaction(data));
});

socket.on('insertTransaction', (data) => {
  store.dispatch(onInsertTransaction(data));
});

socket.on('updateWallet', (data) => {
  store.dispatch(onUpdateWallet(data.wallet));
});

socket.on('updateTrade', (data) => {
  store.dispatch(onUpdateTrade(data.trade));
});

socket.on('updateCurrentTrade', (data) => {
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log('updateCurrentTrade');
  console.log(data.trade);
  console.log('data');
  console.log(data);
  store.dispatch(onUpdateCurrentTrade(data.trade));
});

socket.on('Activity', (data) => {
  store.dispatch(onInsertActivity(data));
});

socket.on('updatePrice', (data) => {
  console.log('updatePrice');
  console.log('updatePrice');
  console.log('updatePrice');
  console.log('updatePrice');
  console.log('updatePrice');
  console.log('updatePrice');
  console.log('updatePrice');
  console.log('updatePrice');
  console.log(data);
  store.dispatch(onUpdatePrice(data));
});

socket.on('updateUniqueImpression', (data) => {
  store.dispatch(onUpdateWallet(data.wallet));
  // store.dispatch(onUpdateWebslot(data.webslot));
  store.dispatch(onUpdateJackpotTickets(data.jackpot_tickets));
});

socket.on('updateSurfComplete', (data) => {
  store.dispatch(onUpdateWallet(data.wallet));
  store.dispatch(onUpdateWebslot(data.webslot));
  store.dispatch(onUpdateJackpotTickets(data.jackpot_tickets));
});

const Loader = () => (
  <div className="container h-100 loader">
    <div className="row align-items-center h-100">
      <div className="col-6 mx-auto text-center">
        <img className="mx-auto" src={Runebase} alt="" />
        <p className="text-center">Loading</p>
        <div id="fountainG">
          <div id="fountainG_1" className="fountainG" />
          <div id="fountainG_2" className="fountainG" />
          <div id="fountainG_3" className="fountainG" />
          <div id="fountainG_4" className="fountainG" />
          <div id="fountainG_5" className="fountainG" />
          <div id="fountainG_6" className="fountainG" />
          <div id="fountainG_7" className="fountainG" />
          <div id="fountainG_8" className="fountainG" />
        </div>
      </div>
    </div>
  </div>
);

// if (user && user.token) {
//  store.dispatch({ type: AUTH_USER });
// }

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
}

const styles = {
  snack: {
    position: 'absolute',
    height: 50,
    bottom: 70,
    left: 10,
    backgroundColor: 'red',
    zIndex: 99999999999999,
  },
};

function App() {
  // Set up a piece of state, so that we have
  // a way to trigger a re-render.
  // console.log('RunesX App Started');
  // const { location: currentLocation, error: currentError } = useCurrentLocation(geolocationOptions);
  const { location, cancelLocationWatch, error } = useWatchLocation(geolocationOptions);
  // const [isWatchinForLocation, setIsWatchForLocation] = useState(true);
  const [rerender, setRerender] = useState(1);

  useEffect(() => {
    // if (!location) return;
    store.dispatch(getPrice());
  }, []);

  useEffect(() => {
    if (!location) return;
    if (rerender === 1) {
      store.dispatch(setLocation(location));
      cancelLocationWatch();
    }
    setRerender(rerender + 1);
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');
    console.log('WATCH LOCATION');

    // Cancel location watch after 3sec
    // setTimeout(() => {
    //  cancelLocationWatch();
    //  setIsWatchForLocation(false);
    // }, 3000);
  }, [
    location,
    // cancelLocationWatch,
  ]);

  return (
    <Provider store={store}>
      <SnackbarProvider
        ref={notistackRef}
        classes={{
          root: styles.snack,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        action={(key) => (
          <Button onClick={onClickDismiss(key)}>
            'Dismiss'
          </Button>
        )}
      >
        <Router
          history={history}
          routes={Routes}
        >
          <Suspense fallback={<Loader />}>
            <Notifier />

            <ParticlesRunebase />
            {/* <Snow /> */}
            <Header />
            {/* <p>Current position:</p>
            <Location location={currentLocation} error={currentError} />

            <p>
              Watch position: (Status:
              {' '}
              {isWatchinForLocation.toString()}
              )
            </p>
            <Location location={location} error={error} /> */}
            <Routes />
            <CookieConsent
              location="bottom"
              buttonText="Agree"
              cookieName="myAwesomeCookieName2"
              style={{ background: '#2B373B', zIndex: 6000, marginBottom: '35px' }}
              buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
            >
              By continuing to browse localrunes.com, you agree to our use of cookies.
            </CookieConsent>
            <FooterMenu />
            <Footer />
          </Suspense>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
