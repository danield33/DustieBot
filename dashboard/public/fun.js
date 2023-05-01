$(document).ready(function () {
    let url = window.location.href;
    let id = url.split('/')[4];



    $("#meme").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "meme",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Meme command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#joke").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "joke",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Joke command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#cat").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "cat",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Cat command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#dog").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "dog",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Dog command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#catfact").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "catfact",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Catfact command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#dogfact").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "dogfact",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Dogfact command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#flip").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "flip",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Flip command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#gottem").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "gottem",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Gottem command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#eightball").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "eightball",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing 8ball command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#roll").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "roll",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Roll command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#image").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "image",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing Image command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $("#tictactoe").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {toggleTo = "on"} else {toggleTo = "off"}
        let data = {cmd: "tictactoe",toggleTo: toggleTo}
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/fun/update`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while changing TicTacToe command!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })





})