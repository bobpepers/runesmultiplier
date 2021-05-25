module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'referralContest',
    'winnerFirstId',
    {
      type: Sequelize.BIGINT,
      references: {
        model: 'user',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  )
    .then(() => queryInterface.addColumn(
      'referralContest',
      'winnerSecondId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ))
    .then(() => queryInterface.addColumn(
      'referralContest',
      'winnerThirdId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    )),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'referralContest',
    'winnerFirstId',
  )
    .then(() => queryInterface.removeColumn(
      'referralContest',
      'winnerSecondId',
    ))
    .then(() => queryInterface.removeColumn(
      'referralContest',
      'winnerThirdId',
    ))

  ,
};
