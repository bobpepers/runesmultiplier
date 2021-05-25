module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('referralContest', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      startsAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(Date.now()),
      },
      endsAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),
      },
      phase: {
        type: DataTypes.ENUM,
        values: [
          'running',
          'complete',
        ],
        defaultValue: 'running',
      },
      first_place_reward: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      second_place_reward: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      third_place_reward: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('referralContest');
  },
};
