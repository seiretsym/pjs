// // var express = require("express");
// // var router = express.Router();

// var jobs = require("../models/jobs.js");

// module.exports = function (app) {
//     app.get("/api/status", function (req, res) {

//         // jobs.findAll({}).then(function(results) {
//         // res.json(results);

//         res.json(jobs);
//     });

//     app.post("/api/status", function (req, res) {
//         var newJobs = req.body;
//         newJobs.post = newJobs.post.replace(/\s+/g, "").toLowerCase();
//         console.log(newJobs);

//         jobs.push(newJobs);
//     });

//     // app.post("/api/status", function(req, res) {
//     // console.log("User Data: ");
//     // console.log(req.body);

//     // jobs.create({
//     // uniqueId: req.body.uniqueId,
//     // jobId: req.body.jobId,
//     // applied: req.body.applied,
//     // saved: req.body.saved,
//     // doNotWant: req.body.doNotWant,
//     // declined: req.body.declined
//     // }).then(function(results) {
//     // res.end();
//     // }


//     app.get("/api/users", function (req, res) {
//         // jobs.findAll({}).then(function(results) {
//         res.json(jobs);
//         // res.json(results);
//     });

//     app.post("/api/users", function (req, res) {
//         var newJobs = req.body;
//         newJobs.post = newJobs.post.replace(/\s+/g, "").toLowerCase();
//         console.log(newJobs);

//         jobs.push(newJobs);
//     });

//     // app.post("/api/users", function(req, res) {
//     // console.log("User Data: ");
//     // console.log(req.body);

//     // jobs.create({
//     // uniqueId: req.body.uniqueId,
//     // email: req.body.email,
//     // password: req.body.password
//     // }).then(function(results) {
//     // res.end();
//     // }

//     app.get("/api/profiles", function (req, res) {
//         // jobs.findAll({}).then(function(results) {
//         // res.json(results);
//         res.json(jobs);
//     });

//     app.post("/api/profiles", function (req, res) {
//         var newJobs = req.body;
//         newJobs.post = newJobs.post.replace(/\s+/g, "").toLowerCase();
//         console.log(newJobs);

//         jobs.push(newJobs);
//     });

//     // app.post("/api/profiles", function(req, res) {
//     // console.log("User Data: ");
//     // console.log(req.body);

//     // jobs.create({
//     // uniqueId: req.body.uniqueId,
//     // firstName: req.body.firstName,
//     // lastName: req.body.lastName,
//     // jobPreference: req.body.jobPreference,
//     // skills: req.body.skills,
//     // linkedIn: req.body.linkedIn,
//     // city: req.body.linkedIn,
//     // state: req.body.state,
//     // accountType: req.body.accountType
//     // }).then(function(results) {
//     // res.end();
//     // }

//     app.get("/api/jobInfo", function (req, res) {

//         // jobs.findAll({}).then(function(results) {
//         // res.json(results);

//         res.json(jobs);
//     });

//     app.post("/api/jobInfo", function (req, res) {
//         var newJobs = req.body;
//         newJobs.post = newJobs.post.replace(/\s+/g, "").toLowerCase();
//         console.log(newJobs);

//         jobs.push(newJobs);
//     });


//     // app.post("/api/jobInfo", function(req, res) {
//     // console.log("User Data: ");
//     // console.log(req.body);

//     // jobs.create({
//     // uniqueId: req.body.uniqueId,
//     // jobTitle: req.body.jobTitle,
//     // jobDescription: req.body.jobDescription,
//     // jobQualifications: req.body.jobQualifications
//     // }).then(function(results) {
//     // res.end();
//     // }
// }