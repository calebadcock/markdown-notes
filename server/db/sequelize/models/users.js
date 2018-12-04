/* eslint-enable no-param-reassign */

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,

    instanceMethods: {
      toJSON() {
        return {
          id: this.id,
          email: this.email
        };
      }
    }
  });

  return User;
};
