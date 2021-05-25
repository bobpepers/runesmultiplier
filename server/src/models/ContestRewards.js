module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '50 USD',
    },
    secondPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '2000 RUNES',
    },
    thirdPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1000 RUNES',
    },
    firstPlaceNext: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '25 USD',
    },
    secondPlaceNext: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1000 RUNES',
    },
    thirdPlaceNext: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '500 RUNES',
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Domain model.
  const ContestRewardsnModel = sequelize.define('contestRewards', modelDefinition, modelOptions);
  return ContestRewardsnModel;
};
