module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const MessageModel = sequelize.define('messages', modelDefinition, modelOptions);

  // 4: Wallet belongs to User

  MessageModel.associate = (model) => {
    MessageModel.belongsTo(model.trade, { as: 'trade' });
    MessageModel.belongsTo(model.user, { as: 'user' });
  };

  // 5: Wallet has many addresses

  return MessageModel;
};
