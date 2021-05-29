module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Loto100', {
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
    await queryInterface.dropTable('Loto100');
  },
};
