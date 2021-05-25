module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'user', // name of Target model
      'volume', // name of the key we're adding
      {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
    );
    await queryInterface.addColumn(
      'trade', // name of Target model
      'userOneCancel', // name of the key we're adding
      {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
    await queryInterface.addColumn(
      'trade', // name of Target model
      'userTwoCancel', // name of the key we're adding
      {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('user', 'volume');
    await queryInterface.removeColumn('trade', 'userOneCancel');
    await queryInterface.removeColumn('trade', 'userTwoCancel');
  },
};
