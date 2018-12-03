export default (sequelize, DataTypes) => {
    const Session = sequelize.define('session', {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        sess: {
            type: DataTypes.JSON
        },
        expire: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false,
        tableName: 'session'
    });
    return Session;
};
