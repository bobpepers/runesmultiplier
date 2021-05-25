module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'user',
    'countryId',
    {
      type: Sequelize.BIGINT,
      defaultValue: 1,
      references: {
        model: 'country',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'user',
    'countryId',
  ),
};
