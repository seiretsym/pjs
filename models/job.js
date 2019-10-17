module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
        // using uuid because it's more unique than counting up from 1
        // uuid: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV1,
        //     primaryKey: true
        // },
        // job title
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
        // example: "2 years, CSS, JS, REACT, Node"
        // string will be parsed into an array for comparing with user skills/experience/etc
        qualifications: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        accepted: {
            type: DataTypes.BOOLEAN
        },
        declined: {
            type: DataTypes.BOOLEAN
        }
    });
    
    Job.associate = function (models) {
        models.Job.belongsTo(models.Profile, {
          
          
        });
      };

      Job.associate = function(models) {
          models.Job.hasMany(models.Status, {
              onDelete: "CASCADE"
          });
      };
    
    return Job;
}