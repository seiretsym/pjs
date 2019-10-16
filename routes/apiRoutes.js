var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index", { test: "test" })
    })

    app.put("/api/user/", function (req, res) {
<<<<<<< HEAD
        db.users.findAll({
            where: {
                email: req.body.email
            }
=======
        console.log(req)
        db.users.findAll({
            where: req.body
>>>>>>> 4d98618c0da8855a386e6b3e1489fe8b985ffff1
        }).then(function(data) {
            res.json(data)
        }).catch(function(err) {
            res.json(err)
        })
    })

    app.post("/api/user/", function (req, res) {
        db.users.create(req.body).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err)
        })
    })
}

