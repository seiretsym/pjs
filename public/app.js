$(document).ready(function(){
    // On click of submit button, grab user input
$("#submit-btn").on("click", function(event){
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
function populateProfile(fname, lname, job, skills, linkedin, city, state){

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
    }).then(function(){
        console.log("Created new employee");
        // To reload the page
        // location.reload();
    })
}
})