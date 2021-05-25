module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('messagesDispute', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      disputeId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'dispute',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('messagesDispute');
  },
};
