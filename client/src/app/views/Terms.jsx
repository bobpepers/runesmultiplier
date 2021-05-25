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
import TermsImage from '../assets/images/terms.svg'

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
          <TermsImage />
        </Grid>
        <Grid item xs={12}>
          <h2 className="text-center"><u>Terms of Service</u></h2>
        </Grid>
        <Grid item xs={12}>
          <h3>
            <b>Welcome to LocalRunes.com</b>
          </h3>
        </Grid>
        <Grid item xs={12}>
          <h3>ACCEPTANCE OF TERMS OF SERVICE</h3>
          <p>
            By using this Site, and further by registering to use our Service, you ("You, Your or Yourself") are agreeing to accept and comply with the terms and conditions of use stated below ("Terms of Use"). You should read the entire Terms of Use carefully before you use this web site ("Site") or any of the services of this Site. As used herein, "LocalRunes" refers to the company MENSBOB Co. Ltd., including without limitation thereby, its owners, directors, investors, employees or other related parties. Depending upon context, “LocalRunes" may also refer to the services, products, Site, content or other materials (collectively, "Materials") provided by LocalRunes. The Service operated by LocalRunes allows buyers ("Buyers") and sellers ("Sellers"), to buy and sell the Internet currency known as “Runes/Bitcoin" (see http://bitcoin.org / http://runebase.io).
          </p>
          <p>
            The Service operated by LocalRunes also allows all registered users of the Service ("Members") to:
          </p>
          <p>
            Transfer Runes/Bitcoins to you or other Members or other users of Runes/Bitcoin outside the LocalRunes site.
          </p>
          <p>
            Use Runes/Bitcoins for purchasing goods.
          </p>
          <p>
            Depending on Your country of residence, You may not be able to use all the functions of the Site. It is your responsibility to follow those rules and laws in Your country of residence and/or country from which You access this Site and Services. As long as you agree to and actually comply with these Terms of Use, LocalRunes grants to you a personal, non-exclusive, non-transferable, non-sublicensable and limited right to enter and use the Site and the Service.

          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            <b>Acceptance and Change of Terms</b>
          </h3>
          <p>
            Before using any of our services, you must first agree to these Terms of Service and the Privacy Policy. By accessing our services or by otherwise using them, you confirm that you agree to these Terms of Service, you agree to follow our Acceptable Use Policy and agree to be bound by them ("Agreement"). You also agree that your personal data and electronic communications on our platform will be processed in accordance with our Privacy Policy, which are incorporated here by reference.
          </p>
          <p>
            Minors are not allowed to use the services. You affirm that you are at least eighteen (18) years of age, or the age of legal majority in your jurisdiction if that is higher than eighteen (18) years of age.
          </p>
          <p>
            You affirm that you have the right, power, capacity and authority to lawfully enter into this Agreement.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Change of Terms
          </h3>
          <p>
            We have the right, at our sole discretion, to make modifications and revisions to the terms of this Agreement to reflect changes in technology, standards, legislation, administrative or business practices, or the costs structure for providing the services. Such modifications and revisions will be notified to you through the service no later than thirty (30) days before they become effective.
          </p>
          <p>
            You will be deemed to have accepted all modifications and revisions by continuing to use the service. If you do not agree to the changes, you can terminate this Agreement at any time by concluding any outstanding trades and other obligations, withdrawing any remaining balances and closing down your account.
          </p>
          <p>
            We also have the right, at our sole discretion, to make modifications and revisions to the services and to the terms of this Agreement at any time which are due to security or compliance reasons, or for reasons suspected fraudulent activity. Such modifications will be published on our site and notified to you without undue delay.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>RISKS</h3>
          <p>
            The trading of goods and products, real or virtual, as well as virtual currencies involves significant risk. Prices can and do fluctuate on any given day. Due to such price fluctuations, you may increase or lose value in your assets at any given moment. Any currency - virtual or not - may be subject to large swings in value and may even become worthless. There is an inherent risk that losses will occur as a result of buying, selling or trading anything on a market.
          </p>
          <p>
            Bitcoin/Runes trading also has special risks not generally shared with official currencies or goods or commodities in a market. Unlike most currencies, which are backed by governments or other legal entities, or by commodities such as gold or silver, Bitcoin/Runes is a unique kind of "fiat" currency, backed by technology and trust. There is no central bank that can take corrective measure to protect the value of Bitcoins in a crisis or issue more currency.
          </p>
          <p>
            Instead, Bitcoin is an as-yet autonomous and largely unregulated worldwide system of currency firms and individuals. Traders put their trust in a digital, decentralized and partially anonymous system that relies on peer-to-peer networking and cryptography to maintain its integrity.
          </p>
          <p>
            Bitcoin/Runes trading is probably susceptible to irrational (or rational) bubbles or loss of confidence, which could collapse demand relative to supply. For example, confidence might collapse in Bitcoin because of unexpected changes imposed by the software developers or others, a government crackdown, the creation of superior competing alternative currencies, or a deflationary or inflationary spiral. Confidence might also collapse because of technical problems: if the anonymity of the system is compromised, if money is lost or stolen, or if hackers or governments are able to prevent any transactions from settling.
          </p>
          <p>
            There may be additional risks that we have not foreseen or identified in our Terms of Use.
          </p>
          <p>
            You should carefully assess whether your financial situation and tolerance for risk is suitable for buying, selling or trading Bitcoins.
          </p>
          <p>
            We use our banking providers in order to receive client moneys and making payments. Our banking providers DO NOT transfer Bitcoins/Runes, exchange Bitcoins/Runes, or provide any services in connection with Bitcoins/Runes.

          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>Registration and User Account</h3>
          <p>
            To use our services, you must first register with us by creating a user account ("User Account" or "account"). An account will only be issued once you have provided all necessary information required for by us for registration and the information has been examined according to the applicable legal requirements placed upon us by the authorities. This examination and requirements include, but are not limited to, anti-money laundering and counter-terrorism regulations as well as, in the case of company accounts, the examination of the details of your business, including the beneficial owners. All the information that we request you to provide in connection with the registration must be true, accurate and complete. If we believe that the information is not true, accurate or complete, we have the right to refuse your access to the site, or any of its resources, and to deny, terminate or suspend your account.
          </p>
          <p>
            A person may only have one account at the time (except in the case of legal entities). You may not use the services or create an account on behalf of someone other than yourself. You may not act as an intermediary or broker. You are not allowed to sell, borrow, share or otherwise make available your account or any detail necessary to access your account to ANYONE other than yourself.
          </p>
          <p>
            You are responsible for maintaining adequate security and control of your username, password, authentication code or any other code or credential that you use to access the services.
          </p>
          <p>
            You must not provide any misleading or fraudulent information, including, but not limited to having a non-personal phone number. Creating fake reputation information for your account, faking your country of origin or providing fraudulent identification documents is prohibited and will lead to termination or suspension of your account.
          </p>
          <p>
            You have the right to delete your account and to terminate this Agreement at any time. You are responsible for all the obligations which have arisen up until the termination.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Company accounts
          </h3>
          <p>
            If you wish to use our services as a legal entity you are required to register an account in the name of that entity as the main account for that entity ("company account"). When creating a company account, you confirm that you are duly authorized and have the legal capacity to execute this Agreement and that this Agreement is legally binding on such entity.
          </p>
          <p>
            After registration of the main company account, one or more other company sub-accounts may be registered for the same legal entity so that the company account and each sub-account is registered in the name of and operated by separate natural persons on behalf of the entity.
          </p>
          <p>
            The same legal entity may place several advertisements on our platform, created by different company account holders, but such advertisements may not be fully overlapping (e.g. using the same trade limits with the same price in the same payment method category in the same country).
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>Identity Verification</h3>
          <p>
            In order to ensure LocalRunes remains a safe platform for all of our users, and for us to comply with mandatory legal obligations which we are subjected to, we may require you to verify your identity to access the services we offer. Identity verification may be required when you create advertisements, pass certain trade volume limits, during trade disputes, fraud investigations, and to ensure account ownership. As part of our ID verification process we require you to provide us with your full name as well as documents and photographs that verify your identity (e.g. valid passport).
          </p>
          <p>
            In certain situations (e.g. due to the regulatory or legal requirements) we may require enhanced identity verification. This may include requirements to verify details or sources of funds regarding payments you have made or received during trades on LocalBitcoins as well as bitcoin transactions that you have sent or received from your account.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>TERMINATION</h3>
          <p>
            You may terminate this agreement with LocalRunes, and close your Account at any time, following settlement of any pending transactions.
          </p>
          <p>
            You also agree that LocalRunes may, by giving notice, in its sole discretion terminate Your access to the Site and to Your Account, including without limitation, our right to: limit, suspend or terminate the service and Members' Accounts, prohibit access to the Site and its content, services and tools, delay or remove hosted content, and take technical and legal steps to keep Members off the Site if we think that they are creating problems or possible legal liabilities, infringing the intellectual property rights of third parties, or acting inconsistently with the letter or spirit of these Terms. Additionally, we may, in appropriate circumstances and at our discretion, suspend or terminate Accounts of Members for any reason, including without limitation:
          </p>
          <p>
            (1) attempts to gain unauthorized access to the Site or another Member's account or providing assistance to others' attempting to do so.
          </p>
          <p>
            (2) overcoming software security features limiting use of or protecting any content.
          </p>
          <p>
            (3) usage of the Service to perform illegal activities such as money laundering, illegal gambling operations, financing terrorism, or other criminal activities.

          </p>
          <p>
            (4) violations of these Terms of Use.
          </p>
          <p>
            (5) failure to pay or fraudulent payment for Transactions.
          </p>
          <p>
            (6) unexpected operational difficulties.
          </p>
          <p>
            (7) upon the request of law enforcement or other government agencies, if deemed to be legitimate and compelling by LocalRunes, acting in its sole discretion.

          </p>
          <p>
            (8) use any tools or softwares to conceal identities or having abnormal or unclear activities.
          </p>
          <p>
            (9) share personal contact for other traders in trade messages.
          </p>
          <p>
            We also reserve the right to cancel unconfirmed Accounts or Accounts that have been inactive for a period of 6 months or more, and/or to modify or discontinue our Site or Service or request to verify information to be able to continue using the Service. Members agree that LocalRunes will not be liable to them or to any third party for termination of their Account or access to the Site.

          </p>
          <p>
            Unless with an acceptable reason, one person ID number is allowed to open one account only. We will close all other accounts and keep one active account only.
          </p>
          <p>
            The suspension of an Account shall not affect the payment of the commissions due for past Transactions. Upon termination, Members shall communicate a valid bank account to allow for the transfer of any currencies credited to their account. Said bank account shall be held by the Member. Bitcoins/Runes may be transferred to a valid bank account only after conversion into a currency. LocalRunes shall transfer the currencies as soon as possible following the Member's request in the time frames specified by LocalRunes.

          </p>
          <p>
            LocalRunes will send to You the credit balance of Your account, however in circumstances a number of intermediaries may be involved in an international payment and these or the beneficiary bank may deduct charges. We will use reasonable efforts to ensure that such charges are disclosed to You prior to sending Your payment, however where they cannot be avoided, You acknowledge that these charges cannot always be calculated in advance, and that you agree to be responsible for such charges.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            AVAILABILITY
          </h3>
          <p>
            All services are provided without warranty of any kind, either express or implied. We do not represent that this Site will be available 100% of the time to meet your needs. We will strive to provide You with the Service as soon as possible but there are no guarantees that access will not be interrupted, or that there will be no delays, failures, errors, omissions or loss of transmitted information.

          </p>
          <p>
            We will use reasonable endeavours to ensure that the Site can normally be accessed by You in accordance with these Terms of Use. We may suspend use of the Site for maintenance and will make reasonable efforts to give you notice. You acknowledge that this may not be possible in an emergency.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Fees and Pricing
          </h3>
          <p>
            You agree to pay the fees and charges for the use of the Services according to the price list which is available on our site. Such fees may include fees for incoming and outgoing transactions and percentage based fees for trades completed.
          </p>
          <p>
            Unless otherwise specified, you accept that fees are automatically deducted from your LocalBitcoins wallet balance or deposit at the time when the service is rendered or completed.
          </p>
          <p>
            We reserve the right to change the fees or the principles of pricing from time to time in accordance with the terms of this Agreement.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Supporting Blockchain Forks and Other Cryptocurrencies
          </h3>
          <p>
            From time to time, new and alternative cryptocurrencies and/or forks of the bitcoin blockchain may be created. This may result in holders of private keys containing a bitcoin balance receiving a corresponding amount of the new cryptocurrency on the newly created blockchain (“air-drop”). We reserve the right at our sole discretion to decide if and how we support any new cryptocurrencies and/or blockchain forks in our services including defining which blockchain shall be deemed as bitcoin within the meaning of this Agreement. We strive to communicate our decisions concerning any significant new forks or cryptocurrencies on our website in a timely manner. If we decide to not support a new cryptocurrency we may, but are not obligated to, compensate users who held bitcoin in their LocalBitcoins account at the time of the air-drop in a manner deemed appropriate by us. We reserve the right to provide compensation by converting all of the available new cryptocurrency to bitcoin and sharing all of the converted bitcoin between users who held a bitcoin balance on their account at the time of the creation of the new cryptocurrency. In case such a conversion takes place we may charge you a reasonable processing fee (which shall not exceed the amount of compensation payable to you).
          </p>
          <p>
            If we decide to support a new cryptocurrency, unless otherwise communicated by us, this Agreement, including any reference to bitcoin, shall be equally applied to the new cryptocurrency.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Allowed Jurisdictions
          </h3>
          <p>
            LocalBitcoins does not offer the use of its services in the States of New York or Washington in the United States of America. You confirm that you are not a resident or governed by the laws and regulations of these jurisdictions.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Termination of Business
          </h3>
          <p>
            Although we are not contemplating doing it, we have the right to cease the services altogether and terminate this Agreement in case our business is terminated for whatever reason or if the business is transferred, sold to or merged with a third party. Before the cessation of services we will give a notice to our users and inform them of the procedure to complete outstanding trades and unresolved disputes as well as to withdraw any bitcoins users may have in their LocalBitcoins wallet. The users are guaranteed at least one year's time to withdraw their bitcoins, after which additional steps are taken to ensure lawful closure of the business, as agreed from time to time with the supervising authority.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Intellectual Property Rights
          </h3>
          <p>
            You acknowledge and agree that all copyrights, trademarks and all other intellectual property rights in and related to this site and our services is exclusively the property of LocalBitcoins and our licensors. We grant you a revocable, non-exclusive, non-sublicensable, non-transferable and limited license, subject to the terms of this Agreement, to access and use our site and service, as well as related content, materials and information (collectively, the "Content") solely for approved purposes as permitted by us from time to time. Any other use of the Content is expressly prohibited and you agree not to copy, transmit, distribute, sell, license, reverse engineer, modify, publish, or participate in the transfer or sale of, create derivative works from, or in any other way exploit any of the Content, in whole or in part.
          </p>
        </Grid>
        <Grid item xs={12}>
          <h3>
            Disclaimer of Warranties and Limitation of Liability
          </h3>
          <p>
            This site and the services are provided on an “as is” and “as available” basis without any representation or endorsement. To the maximum extent permitted by applicable law, we make no warranties of any kind, whether express or implied, in relation to the site or the services, including but not limited to, implied warranties of fitness for a particular purpose or non-infringement, or any implied warranty arising from course of dealing or usage.
          </p>
          <p>
            LocalBitcoins is not associated with or does not itself support or claim to be in partnership with any of the payment methods, services or companies which may appear visible in the Online Payment method lists or advertisement details. Also, services provided by LocalBitcoins are not authorized, approved, endorsed or sponsored by any of the payment methods listed on the website or their respective trademark owners.
          </p>
          <p>
            LocalBitcoins is not responsible for any user-generated content on its site including but not limited to messages, feedbacks or advertisements and may remove said content without notice (unless such notice is required by applicable law) or liability at any time in its sole discretion.
          </p>
          <p>
            LocalBitcoins reserves the right to modify or discontinue, temporarily or permanently, all or any part of this site and/or any services on this site, with or without notice, and/or to establish general guidelines and limitations on their use.
          </p>
          <p>
            Our liability, and the liability of our affiliates, directors and employees, is limited to the maximum extent permitted by applicable law. In particular, we will not be liable for indirect damage.
          </p>
          <p>
            Nothing in this Agreement shall exclude or limit our liability based on willful misconduct or gross negligence.
          </p>
          <p>
            Notwithstanding any other provision in this Agreement, nothing shall limit your rights as a consumer under mandatory provisions of applicable consumer protection legislation which are relevant for our services.
          </p>
        </Grid>

      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({ errorMessage: state.auth.error })

export default withRouter(connect(mapStateToProps, actions)(Home));
