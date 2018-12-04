module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'Notes', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        text: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
