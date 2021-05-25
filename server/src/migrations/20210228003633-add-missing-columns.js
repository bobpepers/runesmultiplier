module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'postAd', // name of Target model
      'priceType', // name of the key we're adding
      {
        type: DataTypes.ENUM,
        defaultValue: 'static',
        values: [
          'static',
          'margin',
        ],
      },
    );
    await queryInterface.addColumn(
      'postAd', // name of Target model
      'margin', // name of the key we're adding
      {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('postAd', 'priceType');
    await queryInterface.removeColumn('postAd', 'margin');
  },
};
