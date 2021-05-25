module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'postAd',
    'countryId',
    {
      type: Sequelize.BIGINT,
      references: {
        model: 'country',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'postAd',
    'countryId',
  ),
};
