/* eslint no-underscore-dangle: [2, { "allow": ["_eventName", "_address", "_time", "_orderId"] }] */

import db from '../models';

const _ = require('lodash');
const moment = require('moment');
// const BigNumber = require('bignumber.js');
// const { forEach } = require('p-iteration');
// const abi = require('ethjs-abi');
// const { sendSyncInfo } = require('../publisher');
// const { getLogger } = require('../utils/logger');
// const { Utils } = require('rweb3');
const { Sequelize, Transaction, Op } = require('sequelize');
const { isMainnet } = require('./rclientConfig');
// const { BLOCK_0_TIMESTAMP, SATOSHI_CONVERSION, fill } = require('../constants');
// const { db, DBHelper } = require('../db');
// const MarketMaker = require('../models/marketMaker');
// const network = require('../api/network');

const { getInstance } = require('./rclient');

const RPC_BATCH_SIZE = 5;
const BLOCK_BATCH_SIZE = 5;
const SYNC_THRESHOLD_SECS = 2400;
const BLOCK_0_TIMESTAMP = 0;

// hardcode sender address as it doesnt matter
// let MetaData;
let senderAddress;

const sequentialLoop = (iterations, process, exit) => {
  let index = 0;
  let done = false;
  let shouldExit = false;

  const loop = {
    next() {
      if (done) {
        if (shouldExit && exit) {
          return exit();
        }
      }

      if (index < iterations) {
        index++;
        process(loop);
      } else {
        done = true;

        if (exit) {
          exit();
        }
      }
    },

    iteration() {
      return index - 1; // Return the loop number we're on
    },

    break(end) {
      done = true;
      shouldExit = end;
    },
  };
  loop.next();
  return loop;
};

const syncTransactions = async (startBlock, endBlock, io, onlineUsers) => {
  const transactions = await db.transaction.findAll({
    where: {
      phase: 'confirming',
    },
    include: [{
      model: db.address,
      as: 'address',
      include: [{
        model: db.wallet,
        as: 'wallet',
      }],
    }],
  });
  console.log(transactions);
  transactions.forEach(async (trans) => {
    const transaction = await getInstance().getTransaction(trans.txid);
    await Promise.all(transaction.details.map(async (detail) => {
      db.sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }, async (t) => {
        const wallet = await db.wallet.findOne({
          where: {
            userId: trans.address.wallet.userId,
          },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        console.log('update transaction');
        console.log(transaction);
        let updatedTransaction;
        let updatedWallet;
        console.log(transaction.confirmations);
        if (transaction.confirmations < 10) {
          updatedTransaction = await trans.update({
            confirmations: transaction.confirmations,
          }, {
            transaction: t,
            lock: t.LOCK.UPDATE,
          });
        }
        if (transaction.confirmations >= 10) {
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log('transaction');
          console.log(transaction);
          // transaction.details.forEach(async (detail) => {

          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');
          console.log('detail');

          console.log(detail);

          if (detail.category === 'send' && trans.type === 'send') {
            console.log(detail.amount);
            console.log(((detail.amount * 1e8) / 0.99));
            const removeLockedAmount = Math.abs(((detail.amount * 1e8) / 0.99));
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');
            console.log('removeLockedAmount');

            console.log(removeLockedAmount);
            updatedWallet = await wallet.update({
              locked: wallet.locked - removeLockedAmount,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }
          if (detail.category === 'receive' && trans.type === 'receive') {
            updatedWallet = await wallet.update({
              available: wallet.available + (detail.amount * 1e8),
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          }

          updatedTransaction = await trans.update({
            confirmations: transaction.confirmations,
            phase: 'confirmed',
          }, {
            transaction: t,
            lock: t.LOCK.UPDATE,
          });

          if (detail.category === 'receive' && trans.type === 'receive') {
            const createActivity = await db.activity.create({
              earnerId: updatedWallet.userId,
              type: 'depositComplete',
              amount: detail.amount * 1e8,
              earner_balance: updatedWallet.available + updatedWallet.locked,
              txId: updatedTransaction.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });

            const activity = await db.activity.findOne({
              where: {
                id: createActivity.id,
              },
              attributes: [
                'createdAt',
                'type',
                'amount',
              ],
              include: [
                {
                  model: db.user,
                  as: 'earner',
                  required: false,
                  attributes: ['username'],
                },
                {
                  model: db.transaction,
                  as: 'txActivity',
                  required: false,
                  attributes: ['txid'],
                },
              ],
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            io.emit('Activity', activity);
          }
          if (detail.category === 'send' && trans.type === 'send') {
            const createActivity = await db.activity.create({
              spenderId: updatedWallet.userId,
              type: 'withdrawComplete',
              amount: detail.amount * 1e8,
              spender_balance: updatedWallet.available + updatedWallet.locked,
              txId: updatedTransaction.id,
            }, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });

            const activity = await db.activity.findOne({
              where: {
                id: createActivity.id,
              },
              attributes: [
                'createdAt',
                'type',
                'amount',
              ],
              include: [
                {
                  model: db.user,
                  as: 'spender',
                  required: false,
                  attributes: ['username'],
                },
                {
                  model: db.transaction,
                  as: 'txActivity',
                  required: false,
                  attributes: ['txid'],
                },
              ],
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
            console.log(activity);
            console.log('io.emit activity sync');
            io.emit('Activity', activity);
          }
        }
        t.afterCommit(() => {
          if (onlineUsers[trans.address.wallet.userId.toString()]) {
            onlineUsers[trans.address.wallet.userId.toString()].emit('updateTransaction', { transaction: updatedTransaction });
            if (updatedWallet) {
              onlineUsers[trans.address.wallet.userId.toString()].emit('updateWallet', { wallet: updatedWallet });
            }
          }
        });
      });
    }));
  });
  console.log(transactions.length);
};

const getInsertBlockPromises = async (startBlock, endBlock) => {
  let blockHash;
  let blockTime;
  const insertBlockPromises = [];

  for (let i = startBlock; i <= endBlock; i += 1) {
    console.log(i);
    const blockPromise = new Promise((resolve) => {
      try {
        getInstance().getBlockHash(i).then((blockHash) => {
          getInstance().getBlock(blockHash, 2).then((blockInfo) => {
            db.block.findOne({
              where: {
                id: i,
              },
            }).then(async (obj) => {
              if (obj) {
                await obj.update({
                  id: i,
                  blockTime: blockInfo.time,
                });
              }
              if (!obj) {
                await db.block.create({
                  id: i,
                  blockTime,
                });
              }
              resolve();
            });
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
      }
    });

    insertBlockPromises.push(blockPromise);
  }

  return { insertBlockPromises };
};

const peerHighestSyncedHeader = async () => {
  let peerBlockHeader = null;
  try {
    const res = await getInstance().getPeerInfo();
    _.each(res, (nodeInfo) => {
      if (_.isNumber(nodeInfo.synced_headers) && nodeInfo.synced_headers !== -1) {
        peerBlockHeader = Math.max(nodeInfo.synced_headers, peerBlockHeader);
      }
    });
  } catch (err) {
    console.log(`Error calling getPeerInfo: ${err.message}`);
    return null;
  }

  return peerBlockHeader;
};

const calculateSyncPercent = async (blockCount, blockTime) => {
  const peerBlockHeader = await peerHighestSyncedHeader();
  if (_.isNull(peerBlockHeader)) {
    // estimate by blockTime
    let syncPercent = 100;
    const timestampNow = moment().unix();
    // if blockTime is 20 min behind, we are not fully synced
    if (blockTime < timestampNow - SYNC_THRESHOLD_SECS) {
      syncPercent = Math.floor(((blockTime - BLOCK_0_TIMESTAMP) / (timestampNow - BLOCK_0_TIMESTAMP)) * 100);
    }
    return syncPercent;
  }

  return Math.floor((blockCount / peerBlockHeader) * 100);
};

const sync = async (io, onlineUsers) => {
  const currentBlockCount = Math.max(0, await getInstance().getBlockCount());
  const currentBlockHash = await getInstance().getBlockHash(currentBlockCount);
  const currentBlockTime = (await getInstance().getBlock(currentBlockHash)).time;
  let startBlock = 230000;

  // const blocks = await db.Blocks.cfind({}).sort({ blockNum: -1 }).limit(1).exec();
  const blocks = await db.block.findAll({
    limit: 1,
    order: [['id', 'DESC']],
  });

  if (blocks.length > 0) {
    startBlock = Math.max(blocks[0].id + 1, startBlock);
  }

  const numOfIterations = Math.ceil(((currentBlockCount - startBlock) + 1) / BLOCK_BATCH_SIZE);

  sequentialLoop(
    numOfIterations,
    async (loop) => {
      const endBlock = Math.min((startBlock + BLOCK_BATCH_SIZE) - 1, currentBlockCount);

      await syncTransactions(startBlock, endBlock, io, onlineUsers);
      console.log('Synced syncTrade');

      const { insertBlockPromises } = await getInsertBlockPromises(startBlock, endBlock);
      await Promise.all(insertBlockPromises);
      console.log('Inserted Blocks');

      startBlock = endBlock + 1;
      loop.next();
    },
    async () => {
      if (numOfIterations > 0) {
        // sendSyncInfo(
        //  currentBlockCount,
        //  currentBlockTime,
        //  await calculateSyncPercent(currentBlockCount, currentBlockTime),
        //  await network.getPeerNodeCount(),
        //  await getAddressBalances(),
        // );
      }
      console.log('sleep');
      // setTimeout(startSync, 5000);
    },
  );
};

async function startSync(io, onlineUsers) {
  // const transactions = await getInstance().listTransactions(1000);
  // console.log(transactions);

  // TransactionModel.findAll
  // MetaData = await getContractMetadata();
  senderAddress = isMainnet() ? 'RKBLGRvYqunBtpueEPuXzQQmoVsQQTvd3a' : '5VMGo2gGHhkW5TvRRtcKM1RkyUgrnNP7dn';
  console.log('startSync');
  sync(io, onlineUsers);
}

module.exports = {
  startSync,
  calculateSyncPercent,
  // getAddressBalances,
};
