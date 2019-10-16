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

    // On click of view button
    $("#view-btn").on("click", function(event){
        event.preventDefault();
        $.ajax("/api/all/employee", {
            type: "GET"
        }).then(function (data){
            console.log("Client side view all employees");
            console.log(data);
        })
    })

    // Function to retrieve employee profile based on their city
    function getProfileByCity(cityName){
        // Get profile from table based on city
        $.ajax("/api/new/profile/" + cityName, {
            type: "GET"
        }).then(function (data) {
            console.log("Retrived data client side");
            console.log(data);
            for(var i=0; i<data.length; i++){
                var list = $("<ul>");
                list.append("<li>" + data[i].firstname + " " + data[i].lastname + "</li>");
                list.append("<li>" + data[i].jobPreference + "</li>");
                list.append("<li>" + data[i].skills + "</li>");
                list.append("<li>" + data[i].linkedin + "</li>");
                list.append("<hr>");
                // Appending to DOM
                $("#searchResult").append(list);
            }
            // To reload the page
            // location.reload();
        })
    }

    // To retrive all employers details
    $("#submit-btn-employer").on("click", function(event){
        event.preventDefault();

        // Input values
        var title = $("#input-title").val().trim();
        var desc = $("#input-desc").val().trim();
        var qualification = $("#input-qualification").val().trim();

        var newEmployer = {
            title: title,
            desc: desc,
            qualification: qualification
        }
        $.ajax("/api/new/employer", {
            type: "POST",
            data: newEmployer
        }).then(function(result){
            console.log("New employer created");

        })
    })
})