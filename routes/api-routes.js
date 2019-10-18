var db = require("../models");
const Op = db.Profile.Op;
var bcrypt = require("bcrypt");

module.exports = function (app) {
    // Index page
    app.get("/", function (req, res) {
        res.render("index", { test: "test" })
    })

    app.put("/api/user/", function (req, res) {
        var pw = req.body.password;
        db.users.findAll({
            where: {
                email: req.body.email
            }
        }).then(function(data) {
            if (pw) {
                var hash = data[0].dataValues.password;
                bcrypt.compare(pw, hash, function(err, conf) {
                    if (err) throw err;

                    if (conf) {
                        res.json(data)
                    } else {
                        res.send(conf)
                    }
                })
            } else {
                res.json(data);
            }
        }).catch(function(err) {
            console.log(err)
        })
    })

    // auto signin process
    app.put("/api/user/auto", function (req, res) {
        db.users.findAll({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function(data) {
            res.json(data)
        }).catch(function(err) {
            console.log(err)
        })
    })

    app.post("/api/user/", function (req, res) {
        var pw = req.body.password
        bcrypt.hash(pw, 10, function(err, hash) {
            db.users.create({
                email: req.body.email,
                password: hash,
                accountType: req.body.accountType
            }).then(function (data) {
                db.Profile.create({
                    userId: data.dataValues.id,
                    accountType: req.body.accountType
                })
                res.json(data);
            }).catch(function (err) {
                res.json(err)
            })
        })
    })

    app.put("/api/user/profile", function (req, res) {
        // Server side javascript to create new employee profile
        db.Profile.update({
            firstname: req.body.fname,
            lastname: req.body.lname,
            jobPreference: req.body.job,
            skills: req.body.skills,
            linkedin: req.body.linkedin,
            city: req.body.city,
            state: req.body.state
        }, {
            where: {
                userId: req.body.userId,
            }
        }).then(function (result) {
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
    })

    app.get("/api/:user", function (req, res) {
        db.Profile.findAll({
            where: {
                userId: req.params.user
            }
        }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.log(err)
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

    // get job post by id
    app.get("/api/job/:id", function(req, res) { 
        db.Job.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(result) {
            res.json(result)
        }).catch(function(err) {
            console.log(err)
        })
    })

    //   Retrieve all names of employee
    app.get("/api/all/employee", function (req, res) {

        db.Profile.findAll({
            where: {
                accountType: 1
            }
        }).then(function (data) {
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
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.desc,
            qualifications: req.body.qualification,
            city: req.body.city,
            state: req.body.state

        }).then(function (result) {
            console.log(result);
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
    });

    // Get all job postings
    app.get("/api/all/job/:id", function (req, res) {
        db.Job.findAll({
        }).then(function (results) {
            var data = []
            Promise.all(results.map(function(job) {
                var promise = new Promise(function(resolve) {
                    db.Job.findAll({
                        include: [{
                            model: db.Status,
                            attributes: ['profileId', 'jobId', 'noped'],
                            where: {
                                profileId: req.params.id,
                                jobId: job.dataValues.id,
                                noped: 1
                            }
                        }],
                    }).then(function(noped) {
                        if (noped.length < 1) {
                            resolve(job);
                        } else {
                            resolve();
                        }
                    })
                });
                return promise.then(function(jobPost) {
                    data.push(jobPost);
                });
            })).then(function() {
                res.json(data);
            })
        }).catch(function(err){
            console.log(err);
        })
    });

    // get employer's job postings
    app.get("/api/all/employer/:id", function (req,res) {
        db.Job.findAll({
            where: {
                userId: req.params.id
            }
        }).then(function (results) {
            console.log(results)
            res.json(results);
        }).catch(function(err) {
            console.log(err)
        })
    })

    // Update query
    app.put("/api/employer/:id", function (req, res) {
        var id = req.params.id;
        db.Job.update({
            accepted: req.body.accepted,
            ProfileId: id
        }, {
            where: {
                id: req.body.employerId
            }
        }).then(function (result) {
            console.log("Updated accepted status to Job table");
            res.json(result);
        })
    })

    // POST value to status table for employer
    app.post("/api/employer/status", function (req, res) {

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
    app.post("/api/employee/status", function (req, res) {

        db.Status.create({
            JobId: req.body.jobId,
            profileId: req.body.userId,
            applied: req.body.appliedValue,
            saved: req.body.savedValue,
            noped: req.body.nopedValue

        }).then(function (result) {
            console.log(result);
            res.json(result);
        }).catch(function (err) {
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
                }
            }],

        }).then(function (result) {
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
    });

    // All applicants for specific job
    app.get("/api/job/applied/:jobId", function (req, res) {
        db.Job.findAll({
            include: [{
                model: db.Status,
                attributes: ['jobId', 'applied', "profileId"],
                where: {
                    jobId: req.params.jobId,
                    applied: 1
                }
            }],

        }).then(function (result) {
            var appList = []
            Promise.all(result.map(function(applicant) {
                var promise = new Promise(function(resolve) {
                    var id = applicant.dataValues.Statuses[0].dataValues.profileId;
                    db.Profile.findAll({
                        where: {
                            id: id
                        }
                    }).then(function(data) {
                        var user = {
                            firstname: data[0].dataValues.firstname,
                            lastname: data[0].dataValues.lastname,
                            id: data[0].dataValues.id
                        }
                        resolve(user);
                    })
                })
                return promise.then(function(applicant) {
                    appList.push(applicant)
                })
            })).then(function() {
                console.log(appList);
                res.json(appList);
            })
        }).catch(function (err) {
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
                }
            }],

        }).then(function (result) {
            res.json(result);
        }).catch(function (err) {
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
                }
            }],

        }).then(function (result) {
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
    });
}

async function newFunction(promise) {
    return await promise;
}
