// var bcrypt = require("bcrypt-nodejs");

<<<<<<< HEAD
module.exports = function (sequelize, DataTypes) {
=======
module.exports = function(sequelize, DataTypes) {
>>>>>>> 4d98618c0da8855a386e6b3e1489fe8b985ffff1
    var User = sequelize.define("users", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
<<<<<<< HEAD
        // hashing password /encrypting
        // }, {
        //     instanceMethods: {
        //         generateHash(password) {
        //             return bcrypt.hash(password, bcrypt.genSaltSync(8))
        //         },
        //         validPassword(password) {
        //             return bcrypt.compare(password, this.password);
        //         }
        //     }
    });

=======
    // hashing password /encrypting
    // }, {
    //     instanceMethods: {
    //         generateHash(password) {
    //             return bcrypt.hash(password, bcrypt.genSaltSync(8))
    //         },
    //         validPassword(password) {
    //             return bcrypt.compare(password, this.password);
    //         }
    //     }
    });
    
>>>>>>> 4d98618c0da8855a386e6b3e1489fe8b985ffff1
    return User;
}