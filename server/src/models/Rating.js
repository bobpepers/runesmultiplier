module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userRatingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userRatedId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const RatingModel = sequelize.define('rating', modelDefinition, modelOptions);

  // 4: Wallet belongs to User

  RatingModel.associate = (model) => {
    RatingModel.belongsTo(model.user, {
      as: 'userRating',
      foreignKey: 'userRatingId',
    });
    RatingModel.belongsTo(model.user, {
      as: 'userRated',
      foreignKey: 'userRatedId',
    });
  };

  // 5: Wallet has many addresses

  return RatingModel;
};
