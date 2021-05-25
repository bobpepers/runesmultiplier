module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    trustedId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const TrustedModel = sequelize.define('trusted', modelDefinition, modelOptions);

  // 4: Wallet belongs to User

  TrustedModel.associate = (model) => {
    TrustedModel.belongsTo(model.user, {
      as: 'userTrust',
      foreignKey: 'userId',
    });
    TrustedModel.belongsTo(model.user, {
      as: 'userTrusted',
      foreignKey: 'trustedId',
    });
  };

  // 5: Wallet has many addresses

  return TrustedModel;
};
