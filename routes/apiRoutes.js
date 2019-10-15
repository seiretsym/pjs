var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index", { test: "test" })
    })

    app.post("/api/user/", function (req, res) {
        db.users.create(req.body).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err)
        })
    })
}