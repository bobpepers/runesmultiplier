module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'user', // name of Target model
      'phoneNumber', // name of the key we're adding
      {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
    );
    await queryInterface.addColumn(
      'user', // name of Target model
      'phoneNumberVerified', // name of the key we're adding
      {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('user', 'phoneNumber');
    await queryInterface.removeColumn('user', 'phoneNumberVerified');
  },
};
