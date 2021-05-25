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
        'buy',
        'sell',
      ],
    },
    priceType: {
      type: DataTypes.ENUM,
      defaultValue: 'static',
      values: [
        'static',
        'margin',
      ],
    },
    margin: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    min: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    max: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    paymentDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Domain model.
  const PostAdModel = sequelize.define('postAd', modelDefinition, modelOptions);

  PostAdModel.associate = (model) => {
    PostAdModel.belongsTo(model.currency, {
      as: 'currency',
    });
    PostAdModel.belongsTo(model.paymentMethod, {
      as: 'paymentMethod',
    });
    PostAdModel.belongsTo(model.user, {
      as: 'user',
    });
    PostAdModel.belongsTo(model.country, {
      as: 'country',
    });
    PostAdModel.hasMany(model.trade, {
      foreignKey: 'postAdId',
      as: 'trade',
    });
  };

  return PostAdModel;
};
