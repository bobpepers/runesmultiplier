module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Domain model.
  const PaymentMethodModel = sequelize.define('paymentMethod', modelDefinition, modelOptions);

  PaymentMethodModel.associate = (model) => {
    PaymentMethodModel.hasMany(model.postAd, {
      as: 'postAd',
    });
  };

  return PaymentMethodModel;
};
