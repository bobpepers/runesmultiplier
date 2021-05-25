module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'postAd', // name of Target model
      'active', // name of the key we're adding
      {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('postAd', 'active');
  },
};
