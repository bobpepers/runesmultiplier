module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'dispute', // name of Target model
      'updatedAt', // name of the key we're adding
      {
        allowNull: false,
        type: DataTypes.DATE,
      },
    );
    await queryInterface.addColumn(
      'dispute', // name of Target model
      'createdAt', // name of the key we're adding
      {
        allowNull: false,
        type: DataTypes.DATE,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('dispute', 'updatedAt');
    await queryInterface.removeColumn('dispute', 'createdAt');
  },
};
