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
    avatar_path: {
      type: DataTypes.STRING,
      defaultValue: 'avatar.png',
      allowNull: false,
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastSeen: {
      type: DataTypes.DATE,
      allowNull: true,
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

    // UserModel.hasMany(model.bannerslot);

    UserModel.hasMany(model.activity, {
      as: 'spender',
      foreignKey: 'spenderId',
    });

    UserModel.hasMany(model.activity, {
      as: 'earner',
      foreignKey: 'earnerId',
    });

    UserModel.hasMany(model.activityArchive, {
      as: 'archivedSpender',
      foreignKey: 'spenderId',
    });

    UserModel.hasMany(model.activityArchive, {
      as: 'archivedEarner',
      foreignKey: 'earnerId',
    });

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

    UserModel.hasMany(model.Referrals, {
      foreignKey: 'referredById',
      as: 'referredBy',
    });
    UserModel.hasMany(model.Referrals, {
      foreignKey: 'referrerID',
      as: 'referrer',
    });
  };

  return UserModel;
};
// module.exports = UserModel;
