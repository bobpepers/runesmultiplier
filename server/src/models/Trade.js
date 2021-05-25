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
        'init',
        'requested',
        'accepted',
        'disputed',
        'done',
        'disputedDone',
      ],
    },
    userOneComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userTwoComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    reponseTime: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    userOneCancel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userTwoCancel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const TradeModel = sequelize.define('trade', modelDefinition, modelOptions);

  // 4: Wallet belongs to User
  TradeModel.associate = (model) => {
    TradeModel.belongsTo(model.user, { as: 'user' });
    TradeModel.belongsTo(model.postAd, { as: 'postAd' });
    TradeModel.hasMany(model.messages, { as: 'messages' });
    TradeModel.hasMany(model.dispute, { as: 'dispute' });
    TradeModel.hasMany(model.activity, { as: 'activity' });
  };

  // 5: Wallet has many addresses
  return TradeModel;
};
