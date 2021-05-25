module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'postAd', // name of Target model
      'paymentDetails', // name of the key we're adding
      {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('postAd', 'paymentDetails');
  },
};
