module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'country',
      'currencyId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'currency',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('country', 'currencyId');
  },
};
