var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index", { test: "test" })
    })

    app.get("/api/user/", function (req, res) {
        db.user.find({
            where: {
                email: req.body.email
            }
        }).then(function(data) {
            res.json(data)
        }).catch(function(err) {
            res.json(err)
        })
    })

    app.post("/api/user/", function (req, res) {
        db.user.create(req.body).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err)
        })
    })
}

