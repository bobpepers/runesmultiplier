module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface
      .changeColumn('activity', 'type', {
        type: DataTypes.ENUM(
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
          'sellTradeInit',
          'buyTradeInit',
          'sellTradeStart',
          'buyTradeStart',
          'sellTradeCanceled',
          'buyTradeCanceled',
          'sellTradeComplete',
          'buyTradeComplete',
        ),
      });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface
      .changeColumn('activity', 'type', {
        type: DataTypes.ENUM(
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
        ),
      });
  },
};
