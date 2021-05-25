/* eslint-disable */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import resetPassword from './resetPassword';
import user from './user';
import contact from './contact';
//import chainInfo from "./chainInfo";
import online from "./online";
import registered from "./registered";
import volume from "./volume";
import createWithdraw from "./createWithdraw";
import tfa from "./tfa";
import theme from './changeTheme';
import price from './price';


import alert from "./alert";
import activity from "./activity";
import recentUserActivity from "./recentUserActivity";
import uploadAvatar from "./uploadAvatar";

import adminWithdrawals from "./admin/adminWithdrawals";
import adminUserList from "./admin/adminUserList";
import adminUser from "./admin/adminUser";
import adminBanners from "./admin/adminBanners";
import adminPublishers from "./admin/adminPublishers";
import adminReviewPublishers from "./admin/adminReviewPublishers";
import adminReviewBanners from "./admin/adminReviewBanners";
import adminDomains from "./admin/adminDomains";
import adminCountries from "./admin/adminCountries";
import adminCurrencies from "./admin/adminCurrencies";
import adminPaymentMethods from "./admin/adminPaymentMethods";
import adminPendingIdentity from "./admin/adminPendingIdentity";
import adminDeposits from "./admin/adminDeposits";
import adminTrades from "./admin/adminTrades";
import adminPendingWithdrawals from "./admin/adminPendingWithdrawals";
import adminPendingWithdrawalsCount from "./admin/adminPendingWithdrawalsCount";
import adminPendingIdentityCount from "./admin/adminPendingIdentityCount";
import adminSingleTrade from "./admin/adminSingleTrade";
import adminCompleteDispute from "./admin/adminCompleteDispute";
import adminPendingDisputeCount from "./admin/adminPendingDisputeCount";
import adminPendingDisputes from "./admin/adminPendingDisputes";
import adminMargin from "./admin/adminMargin";
import adminMassMail from "./admin/adminMassMail";

import adminContestReward from "./admin/adminContestReward";
import adminNodeBalance from "./admin/adminNodeBalance";
import adminLiability from "./admin/adminLiability";



//import createReport from './createReport';

import verifyPhoneCode from './verifyPhoneCode';
import getPhoneCode from './getPhoneCode';
import uploadIdentity from './uploadIdentity';
import specificUser from './fetchSpecificUser';
import paymentMethods from './paymentMethods';
import currencies from './currencies';
import postAd from './postAd';
import trade from './trade';
import tradeSecondStep from './tradeSecondStep';
import currentTrade from './currentTrade';
import cancelTrade from './cancelTrade';
import acceptTrade from './acceptTrade';
import message from './message';
import countries from './countries';
import myAds from './myAds';
import deleteAd from './deleteAd';
import location from './location';
import selectedCurrency from './selectedCurrency';
import createDispute from './createDispute';
import createUserFeedback from './createUserFeedback';
import removeUserFeedback from './removeUserFeedback';
import startTrade from './startTrade';

import referralContestRewards from './referralContestRewards';
import referralContestStats from './referralContestStats';
import referralContests from './referralContests';



const rootReducer = combineReducers({
  form,
  auth: auth,
  resetPass: resetPassword,
  user: user,
  contact: contact,
  //chaininfo: chainInfo,
  online: online,
  registered: registered,
  volume: volume,
  createWithdraw: createWithdraw,
  tfa: tfa,
  theme: theme,
  price: price,
  alert: alert,
  activity: activity,
  recentUserActivity: recentUserActivity,
  uploadAvatar: uploadAvatar,
  //createReport: createReport,

  adminWithdrawals: adminWithdrawals,
  adminUserList: adminUserList,
  adminUser: adminUser,
  adminPublishers: adminPublishers,
  adminBanners: adminBanners,
  adminReviewBanners: adminReviewBanners,
  adminReviewPublishers: adminReviewPublishers,
  adminDomains: adminDomains,
  adminCountries: adminCountries,
  adminCurrencies: adminCurrencies,
  adminPaymentMethods: adminPaymentMethods,
  adminPendingIdentity: adminPendingIdentity,
  adminDeposits: adminDeposits,
  adminTrades: adminTrades,
  adminPendingWithdrawals: adminPendingWithdrawals,
  adminPendingWithdrawalsCount: adminPendingWithdrawalsCount,
  adminPendingIdentityCount: adminPendingIdentityCount,
  adminPendingDisputeCount: adminPendingDisputeCount,
  adminSingleTrade: adminSingleTrade,
  adminCompleteDispute: adminCompleteDispute,
  adminPendingDisputes: adminPendingDisputes,
  adminMargin: adminMargin,
  adminMassMail: adminMassMail,
  adminContestReward: adminContestReward,
  adminLiability: adminLiability,
  adminNodeBalance: adminNodeBalance,

  verifyPhoneCode: verifyPhoneCode,
  getPhoneCode: getPhoneCode,
  uploadIdentity: uploadIdentity,
  specificUser: specificUser,
  paymentMethods: paymentMethods,
  currencies: currencies,
  postAd: postAd,
  trade: trade,
  tradeSecond: tradeSecondStep,
  currentTrade: currentTrade,
  cancelTrade: cancelTrade,
  acceptTrade: acceptTrade,
  message: message,
  countries: countries,
  myAds: myAds,
  deleteAd: deleteAd, 
  location: location,
  selectedCurrency: selectedCurrency,
  createDispute: createDispute,
  createUserFeedback: createUserFeedback,
  removeUserFeedback: removeUserFeedback,
  startTrade: startTrade,
  referralContestRewards: referralContestRewards,
  referralContestStats: referralContestStats,
  referralContests: referralContests,
  
});

export default rootReducer;
