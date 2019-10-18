// Model for vocabulary table
module.exports = function(sequelize, DataTypes){
    var Profile = sequelize.define("Profile",{
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        jobPreference: {
            type: DataTypes.STRING,
        },
        skills: {
            type: DataTypes.STRING,
        },
        linkedin: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
            
        },
        accountType: {
            type: DataTypes.INTEGER,
        }
    })

    // Profile.associate = function(models) {
    //     models.Profile.hasMany(models.Job, {
    //       onDelete: "CASCADE"
    //     });
    //   };

    Profile.associate = function(models) {
        models.Profile.hasMany(models.Status, { foreignKey: "profileId", sourceKey: "id" });
    };

    return Profile;
}

