module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    state: {
      type: DataTypes.ENUM,
      values: [
        'running',
        'finished',
      ],
    },
  };

  const modelOptions = {
    freezeTableName: true,
  };

  const Loto100Model = sequelize.define('Loto100', modelDefinition, modelOptions);

  Loto100Model.associate = (model) => {
    Loto100Model.hasMany(model.Loto100Cell);
  };

  return Loto100Model;
};
