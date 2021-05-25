module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'trade', // name of Target model
      'price', // name of the key we're adding
      {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('trade', 'price');
  },
};
