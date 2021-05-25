module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'activity', // name of Source model
    'ipId', // name of the key we're adding
    {
      type: Sequelize.BIGINT,
      references: {
        model: 'ip', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  )
    .then(() => queryInterface.addColumn(
      'activity', // name of Source model
      'txId', // name of the key we're adding
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'transaction', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    )),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'activity',
    'ipId',
  )
    .then(() => queryInterface.removeColumn(
      'activity',
      'txId',
    ))
  ,
};
