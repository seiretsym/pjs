$(document).ready(function () {
    // On click of submit button, grab user input
    $("#submit-btn").on("click", function (event) {
        event.preventDefault();
        console.log("Inside submit button");

        var fname = $("#input-fname").val().trim();
        var lname = $("#input-lname").val().trim();
        var job = $("#input-job").val().trim();
        var skills = $("#input-skills").val().trim();
        var linkedin = $("#input-linkedin").val().trim();
        var city = $("#input-city").val().trim();
        var state = $("#input-state").val().trim();

        populateProfile(fname, lname, job, skills, linkedin, city, state);
    })

    // Function to insert values to profile table
    function populateProfile(fname, lname, job, skills, linkedin, city, state) {

        var newEmployee = {
            fname: fname,
            lname: lname,
            job: job,
            skills: skills,
            linkedin: linkedin,
            city: city,
            state: state
        }
        // Post new employee profile to table
        $.ajax("/api/new/profile", {
            type: "POST",
            data: newEmployee
        }).then(function () {
            console.log("Created new employee");
            // To reload the page
            location.reload();
        })
    }

    // On click of search button
    $("#search-btn").on("click", function(event){
        // To prevent page from reloading
        event.preventDefault();
        var searchCityName = $("#profile-city").val().trim();
        getProfileByCity(searchCityName);
    })

    // Function to retrieve employee profile based on their city
    function getProfileByCity(cityName){
        // Get profile from table based on city
        $.ajax("/api/new/profile/" + cityName, {
            type: "GET"
        }).then(function (data) {
            console.log("Retrived data client side");
            console.log(data);
            // To reload the page
            // location.reload();
        })
    }
})