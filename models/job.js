module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
        // using uuid because it's more unique than counting up from 1
        // uuid: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV1,
        //     primaryKey: true
        // },
        // job title
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // job description
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // job location
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 2]
            }
        },
        accepted: {
            type: DataTypes.BOOLEAN
        },
        declined: {
            type: DataTypes.BOOLEAN
        },
 
        qualifications: {
            type: DataTypes.STRING,

            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    
    // Job.associate = function (models) {
    //     models.Job.belongsTo(models.Profile, {
          
          
    //     });
    //   };

    Job.associate = function(models) {
        models.Job.hasMany(models.Status, { foreignkey: "jobId", sourceKey: "id" });
    };
    
    return Job;
}