$(document).ready(function () {
    let url = window.location.href;
    let id = url.split('/')[4];


    // Switching between: Message, Text, Embed, Image


        if($("#choice1").prop('checked')) {
            $('#msg').removeClass('hidden-display')
            if($("#choice11").prop('checked')) {
                $("#msg-text").removeClass('hidden-display')
            } else if($("#choice12").prop('checked')) {
                $("#msg-embed").removeClass('hidden-display')
            }
        } else if($("#choice2").prop('checked')) {
            $('#image').removeClass('hidden-display')
        }


        // Switch to Message
        $('#choice1').on('click', function() {
            $('#msg').removeClass('hidden-display')
            $('#image').addClass('hidden-display')
            updateChoice('text')
            $("#msg-text").removeClass('hidden-display')
            $("#msg-embed").removeAttr("checked");

        })

            // Change to text
            $('#choice11').on('click', function() {
                updateChoice('text')
                $("#msg-text").removeClass('hidden-display')
                $("#msg-embed").addClass('hidden-display')
            })

            // Change to embed
            $('#choice12').on('click', function() {
                updateChoice('embed')
                $("#msg-text").addClass('hidden-display')
                $("#msg-embed").removeClass('hidden-display')
            })



        // Switch to Image
        $('#choice2').on('click', function() {
            updateChoice('image')
            $('#msg').addClass('hidden-display')
            $('#image').removeClass('hidden-display')

        })



    // Changing welcome channel
        $("#wchannel").on('change', function() {
            let data= {
                channel: $(this).val()
            }
            $.ajax({
                type: "POST",
                url: `/dashboard/${id}/welcome/update?channel=true`,
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
                    $('.save-msg.error').children().text('Error accured while changing welcome channel!')
                    setTimeout(function() {
                        $(`.save-msg.error`).addClass('hidden')
                        $(`.save-msg.error`).children().empty()
                    }, 4000)
                }
            });
        })

    // Changing welcome text message
        $('#wmessage-button').on('click', function() {
            let msg = $('#wmessage').val()
            if(!msg) {
                $(`.save-msg.error`).removeClass('hidden')
                $(`.save-msg.error`).children().text('Please provide a message before updating!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 5000)
                return;
            } else {

                let data= {
                    msg: msg
                }

                $.ajax({
                    type: "POST",
                    url: `/dashboard/${id}/welcome/update?msg=true`,
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
                        $('.save-msg.error').children().text('Error accured while changing welcome message!')
                        setTimeout(function() {
                            $(`.save-msg.error`).addClass('hidden')
                            $(`.save-msg.error`).children().empty()
                        }, 4000)
                    }
                });

            }
        })


})


function changeMsgText() {
    let msg = $('#wmessage').val()

    let data= {
        msg: msg
    }

    $.ajax({
        type: "POST",
        url: `/dashboard/${id}/welcome/update?msg=true`,
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
            $('.save-msg.error').children().text('Error accured while changing welcome message!')
            setTimeout(function() {
                $(`.save-msg.error`).addClass('hidden')
                $(`.save-msg.error`).children().empty()
            }, 4000)
        }
    });

}


function updateChoice(type1) {
    if(type1 == 'text') {
        post(`/dashboard/${id}/welcome/update?format=1`)
    } else if(type1 == 'embed') {
        post(`/dashboard/${id}/welcome/update?format=2`)
    } else if(type1 == 'image') {
        post(`/dashboard/${id}/welcome/update?format=0`)
    }
}

function post(url, data) {
    $.ajax({
        type: "POST",
        url: url,
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
            $('.save-msg.error').children().text('Error accured while changing welcome message!')
            setTimeout(function() {
                $(`.save-msg.error`).addClass('hidden')
                $(`.save-msg.error`).children().empty()
            }, 4000)
        }
    });
}