module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    conclusion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Domain model.
  const DisputeModel = sequelize.define('dispute', modelDefinition, modelOptions);

  DisputeModel.associate = (model) => {
    DisputeModel.hasMany(model.messagesDispute, { as: 'messagesDispute' });
    DisputeModel.belongsTo(model.trade, {
      as: 'trade',
    });
    DisputeModel.belongsTo(model.user, {
      as: 'initiator',
    });
    DisputeModel.belongsTo(model.user, {
      as: 'releasedTo',
    });
    DisputeModel.hasMany(model.activity, {
      as: 'activity',
    });
  };

  return DisputeModel;
};
