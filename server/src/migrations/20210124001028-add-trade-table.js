module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('trade', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: [
          'init',
          'accepted',
          'disputed',
          'done',
          'disputedDone',
        ],
      },
      userOneComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userTwoComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      amount: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      postAdId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'postAd',
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
    await queryInterface.dropTable('trade');
  },
};
