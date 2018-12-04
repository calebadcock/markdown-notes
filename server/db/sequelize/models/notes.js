/* eslint-enable no-param-reassign */

export default (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,

    instanceMethods: {
        toJSON() {
            return {
                id: this.id,
                test: this.text,
                userId: this.userId
            };
        }
    }
  });

  return Note;
};
