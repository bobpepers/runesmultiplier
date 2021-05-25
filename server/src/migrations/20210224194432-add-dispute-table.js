module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('dispute', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      conclusion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('dispute');
  },
};
