module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'user', // name of Target model
      'referralCode', // name of the key we're adding
      {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('user', 'referralCode');
  },
};
