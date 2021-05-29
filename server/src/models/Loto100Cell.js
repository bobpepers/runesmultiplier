module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cellNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  };

  const modelOptions = {
    freezeTableName: true,
  };

  const Loto100CellModel = sequelize.define('Loto100Cell', modelDefinition, modelOptions);

  Loto100CellModel.associate = (model) => {
    Loto100CellModel.belongsTo(model.user);
    Loto100CellModel.belongsTo(model.Loto100);
  };

  return Loto100CellModel;
};
