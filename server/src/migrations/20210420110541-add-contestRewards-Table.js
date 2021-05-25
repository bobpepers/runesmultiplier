module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('contestRewards', {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('contestRewards');
  },
};
