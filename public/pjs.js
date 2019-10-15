$(function() {
    $("#landing").modal({
        show: true,
        backdrop: false,
    })
    $("#login").on("click", function(event) {
        event.preventDefault();
        
        $.ajax({
            url: "/api/user/",
            type: "GET",
            data: { email: $("#email").val().trim() }
        }).then(function(data) {
            console.log(data)
        }).catch(function(err) {
            console.log(err)
        })
    })
})
