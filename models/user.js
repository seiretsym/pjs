module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("users", {
        // uuid: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV1,
        //     primaryKey: true
        // },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountType: {
            type: DataTypes.STRING,
            allowNull: false, 
        }


    // hashing password /encrypting
    
    });
    
    return User;
}