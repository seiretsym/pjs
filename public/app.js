$(document).ready(function () {
    // Global variable
    var i;
    var employeeId = 1;
    var employerId = 2;

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
            location.reload();
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
        console.log("Inside apply button");
        console.log(buttonId);
        employerTracker(buttonId, employerId, true);
    })

    // Decline button
    $(document).on("click", "#decline-btn", function (event) {
        event.preventDefault();

        var buttonId = $(this).data("id");
        console.log("Inside decline button");
        console.log(buttonId);
        employerTracker(buttonId, employerId, false);
    })

    // Function to update status table
    function employerTracker(userId, jobId, value) {

        var status = {
            userId: userId,
            jobId: jobId,
            accepted: value
        }
        $.ajax("/api/employer/status", {
            type: "POST",
            data: status
        }).then(function (result) {
            console.log("Values inserted to status table");
            console.log(result);
        })
    }

    // Below function is triggered on click of apply button by candidate
    $(document).on("click", "#apply-btn", function (event) {
        event.preventDefault();

        var buttonId = $(this).data("id");
        console.log("Inside apply button");
        console.log(buttonId);
        employeeTracker(employeeId, buttonId, true, false);

    })

    // Below function is triggered on click of save button by candidate
    $(document).on("click", "#save-btn", function (event) {
        event.preventDefault();

        var buttonId = $(this).data("id");
        console.log("Inside apply button");
        console.log(buttonId);
        employeeTracker(employeeId, buttonId, false, true);

    })

    // Below function is triggered on click of not interested button by candidate
    $(document).on("click", "#not-interested-btn", function (event) {
        event.preventDefault();

        var buttonId = $(this).data("id");
        console.log("Inside apply button");
        console.log(buttonId);
        employeeTracker(employeeId, buttonId, false, false);

    })

    // Function to update status table
    function employeeTracker(userId, jobId, value1, value2) {

        var status = {
            userId: userId,
            jobId: jobId,
            appliedValue: value1,
            savedValue: value2
        }
        $.ajax("/api/employee/status", {
            type: "POST",
            data: status
        }).then(function (result) {
            console.log("Values inserted to status table");
            console.log(result);
        })
    }

    // View all jobs that particular candidate had applied
    $(document).on("click", "#view-btn-applied", function (event) {
        event.preventDefault();

        console.log("Inside view all apply button");
        $.ajax("/api/all/applied/" + employeeId, {
            type: "GET"
        }).then(function (data) {
            console.log("All jobs that are applied");
            console.log(data);

            // Iterating through data to create a table
            for (i = 0; i < data.length; i++) {
                var list = $("<ul>");
                list.append("<li>" + data[i].title + "</li>");
                list.append("<li>" + data[i].description + "</li>");
                list.append("<li>" + data[i].qualifications + "</li>");
                list.append("<hr>");
                $("#applied-jobs").append(list);
            }
        })
    })

        // View all jobs that particular candidate had saved
        $(document).on("click", "#view-btn-saved", function (event) {
            event.preventDefault();
    
            console.log("Inside view all saved jobs");
            $.ajax("/api/all/saved/" + employeeId, {
                type: "GET"
            }).then(function (data) {
                console.log("All jobs that are saved");
                console.log(data);
    
                // Iterating through data to create a table
                for (i = 0; i < data.length; i++) {
                    var list = $("<ul>");
                    list.append("<li>" + data[i].title + "</li>");
                    list.append("<li>" + data[i].description + "</li>");
                    list.append("<li>" + data[i].qualifications + "</li>");
                    list.append("<hr>");
                    $("#saved-jobs").append(list);
                }
            })
        })
        
        // View all accepted candidates
        $(document).on("click", "#view-btn-accepted", function (event) {
            event.preventDefault();
    
            console.log("Inside view all accepted candidates");
            $.ajax("/api/all/accepted/" + employerId, {
                type: "GET"
            }).then(function (data) {
                console.log("All accepted candidates");
                console.log(data);
    
                // Iterating through data to create a table
                for (i = 0; i < data.length; i++) {
                    var list = $("<ul>");
                    list.append("<li>" + data[i].firstname + data[i].lastname + "</li>");
                    list.append("<li>" + data[i].jobPreference + "</li>");
                    list.append("<li>" + data[i].skills + "</li>");
                    list.append("<li>" + data[i].linkedin + "</li>");
                    list.append("<hr>");
                    $("#accepted-candidates").append(list);
                }
            })
        })
})
