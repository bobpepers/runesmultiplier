import db from '../models';

const { Sequelize, Transaction, Op } = require('sequelize');
const crypto = require('crypto');

const sha256 = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

const referralLinkCost = 50000 * 1e8;
const referralLinkReferralBonus = (referralLinkCost / 100) * 95;

export const buyReferralLink = async (req, res, next) => {
    
    await db.sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }, async (t) => {
        const randomSalt = crypto.randomBytes(16).toString('base64');
        const referralHash = sha256(`${randomSalt}${req.user}`);
        if (req.user.referralState) {
            throw new Error('ALREADY_BOUGHT_REFERRAL_LINK');
        }
        if (!req.user.referralState) {
            const wallet = await db.wallet.findOne({
                where: {
                  userId: req.user.id,
                },
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
            if (wallet.available < referralLinkCost) {
                throw new Error('NOT_ENOUGH_FUNDS');
            }
            if (wallet.available >= referralLinkCost) {
                const user = db.user.findOne({
                    where: {
                        id: wallet.userId,
                    },
                    transaction: t,
                    lock: t.LOCK.UPDATE,
                });
                const updatedWallet = await wallet.update({
                    available: wallet.available - referralLinkCost,
                }, {
                    transaction: t,
                    lock: t.LOCK.UPDATE,
                });
                const updatedUser = await user.update({
                    referralState: true,
                    referralCode: referralHash,
                }, {
                    transaction: t,
                    lock: t.LOCK.UPDATE,
                });
                const isReferredUser = await db.Referrals.findOne({
                    where: {
                      referrerID: user.id,
                    },
                    include: [
                      {
                        model: db.user,
                        as: 'userReferred',
                        attributes: [
                          'id',
                          'username',
                        ],
                        include: [
                          {
                            model: db.wallet,
                            as: 'wallet',
                          },
                        ],
                      },
                    ],
                    transaction: t,
                    lock: t.LOCK.UPDATE,
                });
                if (isReferredUser) {
                    console.log(isReferredUser.userReferred.wallet);
                    await isReferredUser.update({
                      earned: isReferredUser.earned + referralLinkReferralBonus,
                    }, {
                      transaction: t,
                      lock: t.LOCK.UPDATE,
                    });
                    res.locals.referredWallet = await isReferredUser.userReferred.wallet.update({
                      available: isReferredUser.userReferred.wallet.available + referralLinkReferralBonus,
                      //earned: isReferredUser.userReferred.wallet.earned + referralLinkReferralBonus,
                    }, {
                      transaction: t,
                      lock: t.LOCK.UPDATE,
                    });
                    const createReferredActivity1 = await db.activity.create({
                      type: 'referralBonus',
                      amount: referralLinkReferralBonus,
                      earnerId: res.locals.referredWallet.userId,
                      earner_balance: ((res.locals.referredWallet.locked + res.locals.referredWallet.available)),
                      spenderId: isReferredUser.referrerID,
                      // orderId: ticket.order.id,
                    }, {
                      transaction: t,
                      lock: t.LOCK.UPDATE,
                    });
                }
                
            }
        }
        console.log(randomSalt);
        console.log(referralHash);
    
        //res.locals.trade = trade;
        t.afterCommit(() => {
          next();
        });
      }).catch((err) => {
        console.log(err.message);
        res.locals.error = err.message;
        next();
      });
};

