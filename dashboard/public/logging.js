$(document).ready(function () {
    let url = window.location.href;
    let id = url.split('/')[4];



    $("#logchannel").on('change', function() {
        let data= {
            logchannel: $(this).val()
        }
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/logging/update`,
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
                $('.save-msg.error').children().text('Error accured while changing logging channel!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })
})