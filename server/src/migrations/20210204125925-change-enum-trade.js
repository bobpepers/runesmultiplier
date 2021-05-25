module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface
      .changeColumn('trade', 'type', {
        type: DataTypes.ENUM(
          'init',
          'requested',
          'accepted',
          'disputed',
          'done',
          'disputedDone',
          'canceled',
        ),
      });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface
      .changeColumn('trade', 'type', {
        type: DataTypes.ENUM(
          'init',
          'requested',
          'accepted',
          'disputed',
          'done',
          'disputedDone',
        ),
      });
  },
};
