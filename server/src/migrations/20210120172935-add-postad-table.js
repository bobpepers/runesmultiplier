module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('postAd', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: [
          'buy',
          'sell',
        ],
      },
      amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      min: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      max: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      price: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      currencyId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'currency',
          key: 'id',
        },
      },
      paymentMethodId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'paymentMethod',
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
    await queryInterface.dropTable('postAd');
  },
};
