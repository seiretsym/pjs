module.exports = function(sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        accepted: {
            type: DataTypes.BOOLEAN
        },
        applied: {
            type: DataTypes.BOOLEAN
        },
        saved: {
            type: DataTypes.BOOLEAN
        },
        noped: {
            type: DataTypes.BOOLEAN
        }
    });
    
    return Status;
};