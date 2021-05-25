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
  const MessagesDisputeModel = sequelize.define('messagesDispute', modelDefinition, modelOptions);

  // 4: Wallet belongs to User

  MessagesDisputeModel.associate = (model) => {
    MessagesDisputeModel.belongsTo(model.dispute, { as: 'dispute' });
    MessagesDisputeModel.belongsTo(model.user, { as: 'user' });
  };

  // 5: Wallet has many addresses

  return MessagesDisputeModel;
};
