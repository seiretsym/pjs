$(document).ready(function () {
    // Global variable
    var i;
    var userId;

    var signedin = false;
    
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("password")
    if (email && pass) {
        autoSignIn(email, pass);
    } else {
        $("#landing").modal({
            show: true,
            backdrop: false,
        })
    }

  

    $("#profile").on("click", function (event) {
        event.preventDefault();
        var query = "/api/" + userId;
        $.ajax({
            url: query,
            type: "GET"
        }).then(function(data) {
            console.log(data)
            $("#input-fname").val(data[0].firstname);
            $("#input-lname").val(data[0].lastname);
            $("#input-city").val(data[0].city);
            $("#input-state").val(data[0].state);
            $("#input-linkedin").val(data[0].linkedin);
            $("#input-skills").val(data[0].skills);
            var jobPreference = String(data[0].jobPreference).split(",");
            jobPreference.forEach(function(pref) {
                var element = "#input-job option[value='" + pref + "']";
                $(element).attr("selected", "selected");
            })
            $("#profilemodal").modal({
                show: true,
            })
            console.log(userId);
        })
    })

    $("#applied").on("click", function (event) {
        event.preventDefault();
        $("#j-applied").modal({
            show: true,
        })
    })

    $("#post").on("click", function (event) {
        event.preventDefault();
        $("#j-post").modal({
            show: true,
        })
    })

    $("#gtfo").on("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        location.reload();
    })

    $("#login").on("click", function (event) {
        event.preventDefault();

        // get email value
        var email = $("#email").val().trim()

        // check login state
        if ($(this).data("state") === "login") {
            $.ajax({
                url: "/api/user/",
                type: "PUT",
                data: { email: email }
            }).then(function (data) {
                if (data.length > 0) {
                    signIn();
                } else {
                    signUp();
                }
            }).catch(function (err) {
                console.log(err);
            })
        } else if ($(this).data("state") === "password") {
            // get password value
            var pw = $("#password").val();

            // compare with database
            $.ajax({
                url: "/api/user/",
                type: "PUT",
                data: {
                    email: email,
                    password: pw
                }
            }).then(function (data) {
                // if password matches...
                if (data) {
                    // store user data in browser storage for auto signin
                    if($("#remember:checked").length > 0) {
                        localStorage.setItem("email", data[0].email)
                        localStorage.setItem("password", data[0].password)
                    }
                    // change signedin state
                    signedin = true;
                    // run signedIn function
                    signedIn(data[0]);
                } else {
                    // let user know the password is wrong
                    $("#password").attr("placeholder", "Wrong Password!")
                    $("#password").val("")
                    $("#password").focus();
                }
            }).catch(function (err) {
                // error handling
                console.log(err)
            });

        } else if ($(this).data("state") === "signup") {
            // get password values
            var pw = $("#password").val();
            var pwConfirm = $("#pwConfirm").val();
            var type = $("input[name=p-type]:checked").val();

            // validate passwords
            if (pw === pwConfirm && pw) {
                $.ajax({
                    url: "/api/user",
                    type: "POST",
                    data: {
                        email: email,
                        password: pw,
                        accountType: type
                    }
                }).then(function (data) {
                    // run signedIn function
                    signedIn(data);
                }).catch(function (err) {
                    // error handling
                    console.log(err);
                });
            } else {
                // if the password isn't confirmed, let the user know
                $("#pwConfirm").attr("placeholder", "Password doesn't match")
                $("#pwConfirm").val("")
                $("#pwConfirm").focus();
            }
        }
    })

    function autoSignIn(email, pw) {
        // compare with database
        $.ajax({
            url: "/api/user/auto",
            type: "PUT",
            data: {
                email: email,
                password: pw
            }
        }).then(function (data) {
            // if password matches...
            if (data) {
                // change signedin state
                signedin = true;
                // run signedIn function
                signedIn(data[0]);
            }
        }).catch(function (err) {
            // error handling
            console.log(err)
        });
    }

    function signIn() {
        // create a password text input
        var pwInput = $("<input>").addClass("form-control form-control-lg mt-3 mb-2");
        pwInput.attr("type", "password");
        pwInput.attr("id", "password");
        pwInput.attr("placeholder", "Enter your password");
        pwInput.prop("required", true);

        var label = $("<label>").addClass("m-0");
        label.append("Remember Me:")

        var check = $("<input>").addClass("mx-2");
        check.attr("type", "checkbox");
        check.attr("id", "remember");
        check.attr("name", "remember");
        check.attr("value", "1");
        check.prop("checked", false)

        // set email input field to readonly
        $("#email").prop("readonly", true);

        // change login state to prompt password
        $("#login").data("state", "password");

        // append password input to modal
        $("#login-form").append(pwInput, label, check);
    }

    function signUp() {
        // create a password text input
        var pwInput = $("<input>").addClass("form-control form-control-lg mt-3");
        pwInput.attr("type", "password");
        pwInput.attr("id", "password");
        pwInput.attr("placeholder", "Enter your password");
        pwInput.prop("required", true);

        // create a password confirmation text input
        var pwConfirm = $("<input>").addClass("form-control form-control-lg mt-3 mb-2");
        pwConfirm.attr("type", "password");
        pwConfirm.attr("id", "pwConfirm");
        pwConfirm.attr("placeholder", "Confirm your password");
        pwConfirm.prop("required", true);

        var firstLabel = $("<label>").addClass("m-0");
        firstLabel.append("Account Type:")

        var employeeButton = $("<input>").addClass("mx-2");
        employeeButton.attr("type", "radio");
        employeeButton.attr("id", "p-type");
        employeeButton.attr("name", "p-type");
        employeeButton.attr("value", "1");
        employeeButton.prop("checked", true)

        var secondLabel = $("<label>").addClass("m-0");
        secondLabel.append("Employee")

        var employerButton = $("<input>").addClass("mx-2");
        employerButton.attr("type", "radio");
        employerButton.attr("id", "p-type");
        employerButton.attr("name", "p-type");
        employerButton.attr("value", "2");

        var thirdLabel = $("<label>").addClass("m-0");
        thirdLabel.append("Employer")

        // set email input field to readonly
        $("#email").prop("readonly", true);

        // change login state to signup
        $("#login").data("state", "signup");

        // append password input/confirm to modal
        $("#login-form").append(pwInput, pwConfirm, firstLabel, employeeButton, secondLabel, employerButton, thirdLabel);
    }

    // process page elements after user signs in
    function signedIn(data) {
        userId = data.id;
        if (parseInt(data.accountType) === 1) {
            $("#appliedwrap").removeClass("d-none");
            $("#savedwrap").removeClass("d-none");
            displayJobPosting();
        }
        if (parseInt(data.accountType) === 2) {
            $("#postwrap").removeClass("d-none");
            displayAllPosts()
        }
        $("#landing").modal("hide");
        $("#welcome").html("Welcome,")
        // ajax call to get user profile info
        // display user name if profile is set up
        // display email otherwise
        $("#user").html(data.email)
    }

    // On click of submit button, grab user input
    $("#submit-btn").on("click", function (event) {
        event.preventDefault();
        console.log("Inside submit button");

        var fname = $("#input-fname").val().trim();
        var lname = $("#input-lname").val().trim();
        // var job = $("#input-job").val().trim();
        var job = "";
        $("#input-job option:selected").each(function(){
            job += $(this).text() + ",";
            
        });
        // var job = $("#yourid option[value="+v+"]").text();
        console.log("JOB : " + job);
        var skills = $("#input-skills").val().trim();
        var linkedin = $("#input-linkedin").val().trim();
        var city = $("#input-city").val().trim();
        var state = $("#input-state").val().trim();

        populateProfile(userId, fname, lname, job, skills, linkedin, city, state);
        $("#profilemodal").modal("toggle")
    })

    // Function to insert values to profile table
    function populateProfile(id, fname, lname, job, skills, linkedin, city, state) {

        var newEmployee = {
            userId: id,
            fname: fname,
            lname: lname,
            job: job,
            skills: skills,
            linkedin: linkedin,
            city: city,
            state: state
        }
        // Post new employee profile to table
        $.ajax("/api/user/profile", {
            type: "PUT",
            data: newEmployee
        }).then(function () {
            console.log("Created new employee");
            // To reload the page
            // location.reload();
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
    // $("#view-btn").on("click", function (event) {
        // event.preventDefault();
    function displayAllEmployees(){
        $("#listTalent").empty();
        $.ajax("/api/all/employee", {
            type: "GET"
        }).then(function (data) {
            console.log("Client side view all employees");
            console.log(data);

            // Iterating through data to create a table
            for (i = 0; i < data.length; i++) {

                var item = $("<li>").addClass("list-group-item bg-dark text-light mb-2");
                item.append("<div class='d-flex'><h5>" + data[i].firstname + " " + data[i].lastname + 
                    "</h5><button class='card-link btn btn-primary ml-auto' id='invite-btn' data-id=" + data[i].id + ">Invite</button>"
                )
    
                $("#listTalent").append(item);
            }
        })
    }

    function displayAllPosts(){
        $("#content").empty();
        $.ajax("/api/all/employer/"+userId, {
            type: "GET"
        }).then(function (data) {
            console.log("Client side view all employees");
            console.log(data);

            // Iterating through data to create a table
            for (i = 0; i < data.length; i++) {

                var card = $("<div>").addClass("card bg-dark text-white ml-3 mt-3");
                var body = $("<div>").addClass("card-body");
                body.append(
                    "<h5 class='card-title mt-0'>" + data[i].title + "</h5>",
                    "<p class='card-text'>" + data[i].city + ", " + data[i].state + "</p>",
                    "<button class='card-link btn btn-primary' id='applicants-btn' data-id=" + data[i].id + ">Applicants</button>",
                    "<button class='card-link btn btn-warning' id='potential-btn' data-id=" + data[i].id + ">Find Talent</button>",
                )
                card.append("<img src='img/profile.png' class='card-img img-fluid'>", body)
    
                $("#content").append(card);
            }
        })
    }

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
        // var qualification = $("#input-qualification").val().trim();
        var qualification = "";
        $("#input-qualification option:selected").each(function(){
            qualification += $(this).text() + ",";
        var city = $("#input-city-employer").val().trim();
        var state = $("#input-state-employer").val().trim();

        var newEmployer = {
            userId: userId,
            title: title,
            desc: desc,
            qualification: qualification,
            city: city,
            state: state
        }
        $.ajax("/api/new/employer", {
            type: "POST",
            data: newEmployer
        }).then(function (result) {
            console.log(result);
            console.log("New employer created");
            // To reload the page
            // location.reload();
            displayAllPosts();
            $("#j-post").modal("toggle");

        })
    })
})

    // To retrieve all employer details
    // $("#view-btn-employer").on("click", function (event) {
        // event.preventDefault();

    function displayJobPosting(){
        $("#content").empty();
    $.ajax("/api/all/job/"+userId, {
        type: "GET"
    }).then(function (data) {
        console.log("Client side view all employers");
        console.log(data);

        // Iterating through data to create a table
        for (i = 0; i < data.length; i++) {
            if (data[i]) {
                var card = $("<div>").addClass("card bg-dark text-white ml-3 mt-3");
                var body = $("<div>").addClass("card-body");
                body.append(
                    "<h5 class='card-title mt-0'>" + data[i].title + "</h5>",
                    "<p class='card-text'>" + data[i].city + ", " + data[i].state + "</p>",
                    "<button class='card-link btn btn-primary' id='apply-btn' data-id=" + data[i].id + ">Apply</button>",
                    "<button class='card-link btn btn-warning' id='save-btn' data-id=" + data[i].id + ">Save</button>",
                    "<button class='card-link btn btn-danger' id='not-interested-btn' data-id=" + data[i].id + ">Nope</button>",
                )
                card.append("<img src='img/default.png' class='card-img img-fluid'>", body)

                $("#content").append(card);
            }
        }
    })
}

    // Acceptance of employee
    $(document).on("click", "#accept-btn", function (event) {
        event.preventDefault();

        var buttonId = $(this).data("id");
        console.log("Inside apply button");
        console.log(buttonId);
        employerTracker(buttonId, userId, true);
    })

    // Decline button
    $(document).on("click", "#decline-btn", function (event) {
        event.preventDefault();

        var buttonId = $(this).data("id");
        console.log("Inside decline button");
        console.log(buttonId);
        employerTracker(buttonId, userId, false);
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
        employeeTracker(userId, buttonId, true, false, false);

    })

    // Below function is triggered on click of save button by candidate
    $(document).on("click", "#save-btn", function (event) {
        event.preventDefault();

        var buttonId = $(this).data("id");
        console.log("Inside apply button");
        console.log(buttonId);
        employeeTracker(userId, buttonId, false, true, false);

    })

    // Below function is triggered on click of not interested button by candidate
    $(document).on("click", "#not-interested-btn", function (event) {
        event.preventDefault();

        var buttonId = $(this).data("id");
        console.log("Inside apply button");
        console.log(buttonId);
        employeeTracker(userId, buttonId, false, false, true);
        displayJobPosting();
    })

    // Function to update status table
    function employeeTracker(userId, jobId, applied, saved, noped) {

        var status = {
            userId: userId,
            jobId: jobId,
            appliedValue: applied,
            savedValue: saved,
            nopedValue: noped
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
        $("#j-applied").modal("toggle");
        $("#listApplied").empty();
        console.log("Inside view all apply button");
        $.ajax("/api/all/applied/" + userId, {
            type: "GET"
        }).then(function (data) {
            console.log("All jobs that are applied");
            console.log(data);
            // Iterating through data to create a table
            for (i = 0; i < data.length; i++) {
                var item = $("<li>").addClass("list-group-item bg-dark text-light mb-2");
                item.append(data[i].title + " - " + data[i].city + ", " + data[i].state)
                $("#listApplied").append(item);
            }
        })
    })

        // View all jobs that particular candidate had saved
        $(document).on("click", "#view-btn-saved", function (event) {
            event.preventDefault();
            $("#j-saved").modal("toggle");
            $("#listSaved").empty();
            console.log("Inside view all saved jobs");
            $.ajax("/api/all/saved/" + userId, {
                type: "GET"
            }).then(function (data) {
                console.log("All jobs that are saved");
                console.log(data);
    
                // Iterating through data to create a table
                for (i = 0; i < data.length; i++) {
                    var item = $("<li>").addClass("list-group-item bg-dark text-light mb-2");
                    item.append(data[i].title + " - " + data[i].city + ", " + data[i].state)
                    $("#listSaved").append(item);
                }
            })
        })
        
        // View all accepted candidates
        $(document).on("click", "#view-btn-accepted", function (event) {
            event.preventDefault();
            $("#j-accepted").modal("toggle");
    
            console.log("Inside view all accepted candidates");
            $.ajax("/api/all/accepted/" + userId, {
                type: "GET"
            }).then(function (data) {
                console.log("All accepted candidates");
                console.log(data);
    
                // Iterating through data to create a table
                for (i = 0; i < data.length; i++) {
                    // var list = $("<ul>");
                    var item = $("<li>").addClass("list-group-item bg-dark text-light mb-2");
                    item.append(data[i].firstname + " " + data[i].lastname + "</li>");
                    $("#listAccepted").append(item);
                }
            })
        })

        // View applicants for job
        $(document).on("click", "#applicants-btn", function (event) {
            event.preventDefault();
            $("#j-applicants").modal("toggle");
            $("#listApplicants").empty();

            console.log("View All Applicants");
            console.log("")
            $.ajax("/api/job/applied/" + $(this).data("id"), {
                type: "GET"
            }).then(function (data) {
                console.log("All applicants for this job");
                console.log(data);
    
                // Iterating through data to create a table
                for (i = 0; i < data.length; i++) {
                    // var list = $("<ul>");
                    var item = $("<li>").addClass("list-group-item bg-dark text-light mb-2");
                    item.append("<div class='d-flex'><h5>" + data[i].firstname + " " + data[i].lastname +
                        "</h5><button class='card-link btn btn-primary ml-auto' id='accept-btn' data-id=" + data[i].id + ">Accept</button>" +
                        "</h5><button class='card-link btn btn-danger' id='accept-btn' data-id=" + data[i].id + ">Decline</button>"
                    )
                    $("#listApplicants").append(item);
                }
            })
        })

        // View potential candidates for job
        $(document).on("click", "#potential-btn", function (event) {
            event.preventDefault();
            $("#j-talent").modal("toggle");
            displayAllEmployees();

            console.log("View All Potential Candidates");
            console.log("")
        })
})
