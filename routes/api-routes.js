var db = require("../models");
const Op = db.Profile.Op;

module.exports = function (app) {
    app.post("/api/new/profile", function (req, res) {
        // Server side javascript to create new employee profile
        db.Profile.create({
            firstname: req.body.fname,
            lastname: req.body.lname,
            jobPreference: req.body.job,
            skills: req.body.skills,
            linkedin: req.body.linkedin,
            city: req.body.city,
            state: req.body.state

        }).then(function (result) {
            res.json(result);
        }).catch(function(err) {
            console.log(err);
        })
    })

    // Get employee profile based on city name
    app.get("/api/new/profile/:cityName", function (req, res) {
        var cityName = req.params.cityName;

        db.Profile.findAll({
            where: {
                city: cityName
            }
        }).then(function (result) {
            console.log(result);
            res.json(result);
        });
    })

    //   Retrieve all names of employee
    app.get("/api/all/employee", function (req, res) {

        db.Profile.findAll({}).then(function (data) {
            // var profileObj = {
            //     data: data
            // }
            console.log("All profiles");
            // console.log(profileObj.data);
            // result.render("index", profileObj);
            res.json(data);
        })
    })

    // Post a new employer
    app.post("/api/new/employer", function (req, res) {
        console.log("Employer Data: ");
        // console.log(req.body);
        db.Job.create({
            title: req.body.title,
            description: req.body.desc,
            qualifications: req.body.qualification

        }).then(function (result) {
            console.log(result);
            res.json(result);
        }).catch(function(err) {
            console.log(err);
        })
    });

    // Get all job postings
    app.get("/api/all/employer", function (req, res) {
        db.Job.findAll({

        }).then(function(results){
            res.json(results);
        });
    });

    // Update query
    app.put("/api/employer/:id", function(req, res){
            var id = req.params.id;
            db.Job.update({
            accepted: req.body.accepted,
            ProfileId: id
          }, {
            where: {
              id: req.body.employerId
            }
          }).then(function(result){
              console.log("Updated accepted status to Job table");
              res.json(result);
          })
    })

    // POST value to status table for employer
    app.post("/api/employer/status", function(req, res){
        
            db.Status.create({
                jobId: req.body.jobId,
                profileId: req.body.userId,
                accepted: req.body.accepted
    
            }).then(function (result) {
                // console.log(result);
                res.json(result);
            })
        })

           // POST value to status table for employee
    app.post("/api/employee/status", function(req, res){
        
        db.Status.create({
            jobId: req.body.jobId,
            profileId: req.body.userId,
            applied: req.body.appliedValue,
            saved: req.body.savedValue

        }).then(function (result) {
            console.log(result);
            res.json(result);
        }).catch(function(err) {
            console.log(err);
        })
    })

    // All jobs applied by a particular employee
    app.get("/api/all/applied/:employeeId", function (req, res) {
        db.Job.findAll({
            include: [{
                model: db.Status,
                attributes: ['profileId', 'applied'],
                where: {
                    profileId: req.params.employeeId,
                    applied: 1
                  }}],
            
          }).then(function(result) {
            res.json(result);
          }).catch(function(err){
              console.log(err);
          })
    });

        // All jobs saved by a particular employee
        app.get("/api/all/saved/:employeeId", function (req, res) {
            db.Job.findAll({
                include: [{
                    model: db.Status,
                    attributes: ['profileId', 'saved'],
                    where: {
                        profileId: req.params.employeeId,
                        saved: 1
                      }}],
                
              }).then(function(result) {
                res.json(result);
              }).catch(function(err){
                  console.log(err);
              })
        });
        
                // All accepted candidates
                app.get("/api/all/accepted/:employerId", function (req, res) {
                    db.Profile.findAll({
                        include: [{
                            model: db.Status,
                            attributes: ['jobId', 'accepted'],
                            where: {
                                jobId: req.params.employerId,
                                accepted: 1
                              }}],
                        
                      }).then(function(result) {
                        res.json(result);
                      }).catch(function(err){
                          console.log(err);
                      })
                });
}