module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    startsAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(Date.now()),
    },
    endsAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),
    },
    phase: {
      type: DataTypes.ENUM,
      values: [
        'running',
        'complete',
      ],
      defaultValue: 'running',
    },
    first_place_reward: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    second_place_reward: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    third_place_reward: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Domain model.
  const ReferralContestModel = sequelize.define('referralContest', modelDefinition, modelOptions);

  ReferralContestModel.associate = (model) => {
    ReferralContestModel.belongsTo(model.user, {
      as: 'winner_first',
      foreignKey: 'winnerFirstId',
    });
    ReferralContestModel.belongsTo(model.user, {
      as: 'winner_second',
      foreignKey: 'winnerSecondId',
    });
    ReferralContestModel.belongsTo(model.user, {
      as: 'winner_third',
      foreignKey: 'winnerThirdId',
    });
  };

  return ReferralContestModel;
};
