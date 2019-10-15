var db = require("../models");

module.exports = function(app) {
    app.post("/api/new/profile", function(req, res){
        // Server side javascript to create new employee profile
        db.Profile.create({
            firstname: req.body.fname,
            lastname: req.body.lname,
            jobPreference: req.body.job,
            skills: req.body.skills,
            linkedin: req.body.linkedin,
            city: req.body.city,
            state: req.body.state 
    
        }).then(function(result){
            res.json(result);
        })
    })

    // Get employee profile based on city name
    app.get("/api/new/profile/:cityName", function(req, res){
        var cityName = req.params.cityName;

        db.Profile.findAll({
            where: {
              city: cityName
            }
          }).then(function(result) {
            console.log(result);
            res.json(result);
          });
    })
}