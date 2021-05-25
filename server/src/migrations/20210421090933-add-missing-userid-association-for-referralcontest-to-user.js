module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'referralContest',
    'userId',
    {
      type: Sequelize.BIGINT,
      references: {
        model: 'user',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'referralContest',
    'userId',
  ),
};
