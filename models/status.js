module.exports = function(sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        
        jobId: {
            type: DataTypes.BOOLEAN
        },
        profileId: {
            type: DataTypes.BOOLEAN
        },
        accepted: {
            type: DataTypes.BOOLEAN
        },
        applied: {
            type: DataTypes.BOOLEAN
        },
        saved: {
            type: DataTypes.BOOLEAN
        }
    });
    
    return Status;
};