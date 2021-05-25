module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'dispute', // name of Target model
      'tradeId', // name of the key we're adding
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'trade', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.addColumn(
      'dispute', // name of Target model
      'initiatorId', // name of the key we're adding
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'user', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.addColumn(
      'dispute', // name of Target model
      'releasedToId', // name of the key we're adding
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'user', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('dispute', 'tradeId');
    await queryInterface.removeColumn('dispute', 'initiatorId');
    await queryInterface.removeColumn('dispute', 'releasedToId');
  },
};
