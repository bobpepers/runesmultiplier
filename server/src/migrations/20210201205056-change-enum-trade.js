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
        ),
      });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface
      .changeColumn('trade', 'type', {
        type: DataTypes.ENUM(
          'init',
          'accepted',
          'disputed',
          'done',
          'disputedDone',
        ),
      });
  },
};
