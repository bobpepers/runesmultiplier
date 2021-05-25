module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        'login',
        'register',
        'registerVerified',
        'resetpass',
        'resetpassComplete',
        'logout',
        'depositAccepted',
        'depositComplete',
        'withdrawRequested',
        'withdrawAccepted',
        'withdrawComplete',
        'withdrawRejected',
        'banned',
        'referralBonus',
        'sellTradeInit',
        'buyTradeInit',
        'sellTradeStart',
        'buyTradeStart',
        'sellTradeCanceled',
        'buyTradeCanceled',
        'sellTradeComplete',
        'buyTradeComplete',
      ],
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    spender_balance: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    earner_balance: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Domain model.
  const ActivityModel = sequelize.define('activity', modelDefinition, modelOptions);

  ActivityModel.associate = (model) => {
    ActivityModel.belongsTo(model.ip, {
      as: 'ip',
    });
    ActivityModel.belongsTo(model.user, {
      as: 'spender',
      foreignKey: 'spenderId',
    });
    ActivityModel.belongsTo(model.user, {
      as: 'earner',
      foreignKey: 'earnerId',
    });
    ActivityModel.belongsTo(model.transaction, {
      as: 'txActivity',
      foreignKey: 'txId',
    });
    ActivityModel.belongsTo(model.transaction, {
      as: 'transaction',
      foreignKey: 'transactionId',
    });
  };

  return ActivityModel;
};
