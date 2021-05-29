module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Loto100Cell',
      'Loto100Id',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'Loto100',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.addColumn(
      'Loto100Cell',
      'UserId',
      {
        type: Sequelize.BIGINT,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('Loto100Cell', 'Loto100Id');
    await queryInterface.removeColumn('Loto100Cell', 'UserId');
  },
};
