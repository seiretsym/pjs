module.exports = function(sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        
        applied: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        saved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        doNotWant: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        declined: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    
    Status.associate = function(models) {
        models.Status.belongsTo(models.Job, {
           foreignKey: {
               allowNull: false
           } 
        });
    };

    Status.associate = function(models) {
        models.Status.belongsTo(models.Profile, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return Status;
};