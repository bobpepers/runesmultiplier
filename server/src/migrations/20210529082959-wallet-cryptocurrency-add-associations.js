module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'wallet',
      'cryptocurrencyId',
      {
        type: Sequelize.BIGINT,
        defaultValue: 1,
        references: {
          model: 'cryptocurrency',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('wallet', 'cryptocurrencyId');
  },
};
