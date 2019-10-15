$(function() {
    $("#landing").modal({
        show: true,
        backdrop: false,
    })
    $("#login").on("click", function(event) {
        event.preventDefault();
        var query = "/api/user/" + $("#email").val().trim()
        $.ajax({
            url: query,
            type: "GET"
        }).then(function(data) {
            console.log(data)
        })
    })
})
