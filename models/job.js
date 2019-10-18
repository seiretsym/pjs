module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("jobs", {
        // using uuid because it's more unique than counting up from 1
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        // job title
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // job description
        desc: {
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
 
        qualifications: {
            type: DataTypes.STRING,

            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    
    return Job;
}