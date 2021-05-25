module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'user', // name of Target model
      'identityFront', // name of the key we're adding
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'user', // name of Target model
      'identityBack', // name of the key we're adding
      {
        type: DataTypes.STRING,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'user', // name of Target model
      'identityVerified', // name of the key we're adding
      {
        type: DataTypes.ENUM,
        defaultValue: 'init',
        values: [
          'init',
          'pending',
          'rejected',
          'accepted',
        ],
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('user', 'identityFront');
    await queryInterface.removeColumn('user', 'identityBack');
    await queryInterface.removeColumn('user', 'identityVerified');
  },
};
