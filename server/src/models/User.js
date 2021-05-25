// The User model.
const bcrypt = require('bcrypt-nodejs');
// import bcrypt from 'bcrypt-nodejs';
// 0: helpers
// Compares two passwords.
function comparePasswords(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

// Hashes the password for a user object.
function hashPassword(user, options) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) reject(err);
        user.setDataValue("password", hash);
        resolve();
      });
    });
  });
}

module.exports = (sequelize, DataTypes) => {
// 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authtoken: {
      type: DataTypes.STRING,
    },
    authused: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    authexpires: {
      type: DataTypes.DATE,
    },
    resetpasstoken: {
      type: DataTypes.STRING,
    },
    resetpassused: {
      type: DataTypes.BOOLEAN,
    },
    resetpassexpires: {
      type: DataTypes.DATE,
    },
    role: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    reputation: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 50,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    webslot_amount: {
      type: DataTypes.SMALLINT,
      defaultValue: 2,
    },
    bannerslot_amount: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
    },
    tfa: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tfa_secret: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    // tfa_secret_auth: {
    //  type: Sequelize.BOOLEAN,
    //  defaultValue: false,
    // },
    surf_count: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    click_count: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    jackpot_tickets: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    lastClicked: {
      type: DataTypes.DATE,
    },
    avatar_path: {
      type: DataTypes.STRING,
      defaultValue: 'avatar.png',
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    phoneNumberVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    identityFront: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    identityBack: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    identitySelfie: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    identityVerified: {
      type: DataTypes.ENUM,
      defaultValue: 'init',
      values: [
        'init',
        'pending',
        'rejected',
        'accepted',
      ],
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    open_store: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastSeen: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    firstTrade: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    volume: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    tradeCount: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
    hooks: {
      beforeCreate: hashPassword,
    },
  };

  // 3: Define the User model.
  const UserModel = sequelize.define('user', modelDefinition, modelOptions);
  UserModel.prototype.comparePassword = async function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.getDataValue('password'), (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  };

  UserModel.associate = (model) => {
    UserModel.hasMany(model.referralContest, {
      as: 'winner_first',
    });

    UserModel.hasMany(model.referralContest, {
      as: 'winner_second',
    });

    UserModel.hasMany(model.referralContest, {
      as: 'winner_third',
    });

    UserModel.hasMany(model.dispute, {
      as: 'initiator',
      foreignKey: 'initiatorId',
    });
    UserModel.hasMany(model.dispute, {
      as: 'releasedTo',
      foreignKey: 'releasedToId',
    });
    UserModel.hasMany(model.messagesDispute, {
      as: 'messagesDispute',
    });
    UserModel.hasMany(model.messages, {
      as: 'messages',
    });

    // UserModel.hasMany(model.bannerslot);

    UserModel.hasMany(model.activity, {
      as: 'spender',
      foreignKey: 'spenderId',
    });

    UserModel.hasMany(model.activity, {
      as: 'earner',
      foreignKey: 'earnerId',
    });

    UserModel.hasMany(model.postAd, {
      as: 'postAd',
    });

    UserModel.hasMany(model.activityArchive, {
      as: 'archivedSpender',
      foreignKey: 'spenderId',
    });

    UserModel.hasMany(model.activityArchive, {
      as: 'archivedEarner',
      foreignKey: 'earnerId',
    });

    // UserModel.hasMany(model.faucet);

    // UserModel.hasMany(model.report);

    // UserModel.hasMany(model.webslot);
    // UserModel.hasMany(model.SurfTicket);

    UserModel.hasOne(model.wallet);
    UserModel.belongsTo(model.country, {
      as: 'country',
    });

    UserModel.belongsToMany(model.ip, {
      through: 'IpUser',
      as: 'ips',
      foreignKey: 'userId',
      otherKey: 'ipId',
    });

    UserModel.hasMany(model.rating, {
      foreignKey: 'userRatingId',
      as: 'userRating',
    });
    UserModel.hasMany(model.rating, {
      foreignKey: 'userRatedId',
      as: 'userRated',
    });

    UserModel.hasMany(model.Referrals, {
      foreignKey: 'referredById',
      as: 'referredBy',
    });
    UserModel.hasMany(model.Referrals, {
      foreignKey: 'referrerID',
      as: 'referrer',
    });

    UserModel.hasMany(model.trusted, {
      foreignKey: 'userId',
      as: 'trustedBy',
    });
    UserModel.hasMany(model.trusted, {
      foreignKey: 'trustedId',
      as: 'trustedUsers',
    });

    UserModel.hasMany(model.blocked, {
      foreignKey: 'userId',
      as: 'blockedBy',
    });
    UserModel.hasMany(model.blocked, {
      foreignKey: 'blockedId',
      as: 'blockedUsers',
    });
    UserModel.hasMany(model.trade, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return UserModel;
};
// module.exports = UserModel;
