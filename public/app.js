$(document).ready(function () {
    // Global variable
    var i;
    var employeeId = 2;
    var employerId = 1;

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
    $("#search-btn").on("click", function (event) {
        // To prevent page from reloading
        event.preventDefault();
        var searchCityName = $("#profile-city").val().trim();
        getProfileByCity(searchCityName);
    })

    // On click of view button
    $("#view-btn").on("click", function (event) {
        event.preventDefault();
        $.ajax("/api/all/employee", {
            type: "GET"
        }).then(function (data) {
            console.log("Client side view all employees");
            console.log(data);

            // Iterating through data to create a table
            for (i = 0; i < data.length; i++) {
                var list = $("<ul>");
                list.append("<li>" + data[i].firstname + "</li>");
                list.append("<li>" + data[i].lastname + "</li>");
                list.append("<li>" + data[i].jobPreference + "</li>");
                list.append("<li>" + data[i].linkedin + "</li>");
                list.append("<li>" + data[i].skills + "</li>");
                list.append("<li>" + data[i].state + "</li>");
                list.append("<button type = 'button' class='btn btn-primary' id='accept-btn' data-id=" + data[i].id + ">Accept</button>&nbsp&nbsp");
                list.append("<button type = 'button' class='btn btn-danger' id='decline-btn' data-id=" + data[i].id + ">Decline</button>");
                $("#allEmployees").append(list);

            }
        })
    })

    // Function to retrieve employee profile based on their city
    function getProfileByCity(cityName) {
        // Get profile from table based on city
        $.ajax("/api/new/profile/" + cityName, {
            type: "GET"
        }).then(function (data) {
            console.log("Retrived data client side");
            console.log(data);
            for (i = 0; i < data.length; i++) {
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

    // To post all employers details
    $("#submit-btn-employer").on("click", function (event) {
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
        }).then(function (result) {
            console.log(result);
            console.log("New employer created");
            // To reload the page
            location.reload();

        })
    })

    // To retrieve all employer details
    $("#view-btn-employer").on("click", function (event) {
        event.preventDefault();

        $.ajax("/api/all/employer", {
            type: "GET"
        }).then(function (data) {
            console.log("Client side view all employers");
            console.log(data);

            // Iterating through data to create a table
            for (i = 0; i < data.length; i++) {
                var list = $("<ul>");
                list.append("<li>" + data[i].title + "</li>");
                list.append("<li>" + data[i].description + "</li>");
                list.append("<li>" + data[i].qualifications + "</li>");
                list.append("<button type = 'button' class='btn btn-success' id='apply-btn' data-id=" + data[i].id + ">Apply</button>&nbsp&nbsp");
                list.append("<button type = 'button' class='btn btn-primary' id='save-btn' data-id=" + data[i].id + ">Save</button>&nbsp&nbsp");
                list.append("<button type = 'button' class='btn btn-danger' id='not-interested-btn' data-id=" + data[i].id + ">Not Interested</button>");
                // <button type="submit" class="btn btn-primary"id="submit-btn-employer">Submit</button><br><br></br>

                $("#allEmployers").append(list);

            }
        })
    })

    // Acceptance of employee
    $(document).on("click", "#accept-btn", function (event) {
        event.preventDefault();
        var buttonId = $(this).data("id");
        console.log("Inside accept button");
        console.log(buttonId);

        var newStatus = {
            id: buttonId,
            employerId: employerId,
            accepted: true
        }
    
        // Update Job table 
        $.ajax("/api/employer/" + buttonId, {
            type: "PUT",
            data: newStatus
        }).then(function (result) {
            console.log(result);
            console.log("Updated accepted value");
            employerTracker(buttonId, employerId, true);

        })
    })

    // Decline button
    $(document).on("click", "#decline-btn", function (event) {
        event.preventDefault();
        var buttonId = $(this).data("id");
        console.log("Inside decline button");
        console.log(buttonId);

        var status = {
            id: buttonId,
            declined: true
        }
        // Update job table
        $.ajax("/api/employer/" + buttonId, {
            type: "PUT",
            data: status
        }).then(function (result) {
            console.log(result);
            console.log("Updated declined value");
            employerTracker(buttonId, employerId, false);
        })
    })

    // Function to update status table
    function employerTracker(userId, jobId, value){

        var status = {
            userId: userId,
            jobId: jobId,
            value: value
        }
        $.ajax("/api/status", {
            type: "POST",
            data: status
        }).then(function(result){
            console.log("Values inserted to status table");
            console.log(result);
        })
    }

    // Below function is triggered on click of apply button by candidate
    $(document).on("click", function(event){
        event.preventDefault();
    })
})