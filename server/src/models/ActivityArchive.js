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
  const ActivityArchiveModel = sequelize.define('activityArchive', modelDefinition, modelOptions);

  ActivityArchiveModel.associate = (model) => {
    ActivityArchiveModel.belongsTo(model.ip, {
      as: 'ip',
    });
    ActivityArchiveModel.belongsTo(model.user, {
      as: 'archivedSpender',
      foreignKey: 'spenderId',
    });
    ActivityArchiveModel.belongsTo(model.user, {
      as: 'archivedEarner',
      foreignKey: 'earnerId',
    });
    ActivityArchiveModel.belongsTo(model.transaction, {
      as: 'txActivity',
      foreignKey: 'txId',
    });
  };

  return ActivityArchiveModel;
};
