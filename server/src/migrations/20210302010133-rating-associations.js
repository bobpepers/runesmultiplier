module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'rating',
      'userRatingId',
      {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    );
    await queryInterface.addColumn(
      'rating',
      'userRatedId',
      {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('rating', 'userRatingId');
    await queryInterface.removeColumn('rating', 'userRatedId');
  },
};
