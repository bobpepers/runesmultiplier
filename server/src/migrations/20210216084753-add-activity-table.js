module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('activity', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: [
          'login',
          'register',
          'registerVerified',
          'resetpass',
          'resetpassComplete',
          'logout',
          'depositAccepted',
          'depositComplete',
          'withdrawRequested',
          'withdrawAccepted',
          'withdrawComplete',
          'withdrawRejected',
          'banned',
          'referralBonus',
        ],
      },
      amount: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      spender_balance: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      earner_balance: {
        type: DataTypes.BIGINT,
        allowNull: true,
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
    await queryInterface.dropTable('activity');
  },
};
