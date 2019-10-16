// Model for vocabulary table
module.exports = function(sequelize, DataTypes){
    var Profile = sequelize.define("Profile",{
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jobPreference: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
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
            type: DataTypes.STRING,
            
        }
    })

    Profile.associate = function(models) {
        models.Profile.hasMany(models.Job, {
          onDelete: "CASCADE"
        });
      };

      Profile.associate = function(models) {
          models.Profile.hasOne(models.Status, {
              onDelete: "CASCADE"
          });
      };

    return Profile;
}

