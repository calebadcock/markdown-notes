module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'Users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        googleId: {
          type: DataTypes.STRING,
          allowNull: false
        },
      }
    ).then(() =>
      queryInterface.addIndex(
        'Users',
        [DataTypes.fn('lower', DataTypes.col('email'))],
        {
          indexName: 'users_email',
          indicesType: 'unique'
        }
      )
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
