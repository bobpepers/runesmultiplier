module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn(
      'trade', // name of Target model
      'reponseTime', // name of the key we're adding
      {
        allowNull: true,
        type: DataTypes.DATE,
      },
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('trade', 'reponseTime');
  },
};
