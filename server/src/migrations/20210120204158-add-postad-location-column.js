module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'postAd', // name of Target model
      'location', // name of the key we're adding
      {
        type: DataTypes.STRING,
        defaultValue: false,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('postAd', 'location');
  },
};
