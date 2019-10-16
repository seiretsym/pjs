$(function () {
    var signedin = false;

    // $("#landing").modal({
    //     show: true,
    //     backdrop: false,
    // })

    $("#profile").on("click", function (event) {
        event.preventDefault();
        $("#profilemodal").modal({
            show: true,
            backdrop: false,
        })
    })

    $("#applied").on("click", function (event) {
        event.preventDefault();
        $("j-applied").modal({
            show: true,
            backdrop: false,
        })
    })

    $("#gtfo").on("click", function (event) {
        event.preventDefault();
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
                if (data.length > 0) {
                    // change signedin state
                    signedin = true;
                    // run signedIn function
                    signedIn(email);
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

            // validate passwords
            if (pw === pwConfirm) {
                $.ajax({
                    url: "/api/user",
                    type: "POST",
                    data: {
                        email: email,
                        password: pw
                    }
                }).then(function (data) {
                    // run signedIn function
                    signedIn(email);
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

    function signIn() {
        // create a password text input
        var pwInput = $("<input>").addClass("form-control form-control-lg mt-3");
        pwInput.attr("type", "password");
        pwInput.attr("id", "password");
        pwInput.attr("placeholder", "Enter your password");
        pwInput.prop("required", true);

        // set email input field to readonly
        $("#email").prop("readonly", true);

        // change login state to prompt password
        $("#login").data("state", "password");

        // append password input to modal
        $("#login-form").append(pwInput);
    }

    function signUp() {
        // create a password text input
        var pwInput = $("<input>").addClass("form-control form-control-lg mt-3");
        pwInput.attr("type", "password");
        pwInput.attr("id", "password");
        pwInput.attr("placeholder", "Enter your password");
        pwInput.prop("required", true);

        // create a password confirmation text input
        var pwConfirm = $("<input>").addClass("form-control form-control-lg mt-3");
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
        employeeButton.attr("value", "Employee");

        var secondLabel = $("<label>").addClass("m-0");
        secondLabel.append("Employee")

        var employerButton = $("<input>").addClass("mx-2");
        employerButton.attr("type", "radio");
        employerButton.attr("id", "p-type");
        employerButton.attr("name", "p-type");
        employerButton.attr("value", "Employer");

        var thirdLabel = $("<label>").addClass("m-0");
        thirdLabel.append("Employer")

        // set email input field to readonly
        $("#email").prop("readonly", true);

        // change login state to signup
        $("#login").data("state", "signup");

        // append password input/confirm to modal
        $("#login-form").append(pwInput, pwConfirm, firstLabel, employeeButton, secondLabel, employerButton, thirdLabel);
    }

    function signedIn(email) {
        $("#landing").modal("hide");
        $("#welcome").html("Welcome,")
        // ajax call to get user profile info
        // display user name if profile is set up
        // display email otherwise
        $("#user").html(email)
    }
})
