$(document).ready(function () {
    let url = window.location.href;
    let id = url.split('/')[4];



    $("#logchannel").on('change', function() {
        let data= {
            logchannel: $(this).val()
        }
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/moderation/update?log=true`,
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
                $('.save-msg.error').children().text('Error accured while adidng new owner!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    $('input.flexdatalist').on('select:flexdatalist', function(event, selected, options) {
        let roleToAdd = selected.value
        let data = {
            role: roleToAdd
        }

        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/moderation/update?add=true`,
            data: data,
            success: function(res){
                // $(`#${res.roleid}`).addClass('hidden-display')
                $(`#${res.roleid}`).remove();
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while adidng new onwer!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });

    });

    $('input.flexdatalist').on('after:flexdatalist.remove', function(event, role) {
        let roleToRemove= $(role).text().split('×')[0]

        let data = {
            role: roleToRemove
        };

        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/moderation/update?remove=true`,
            data: data,
            success: function(res){
                // $(`#${res.roleid}`).removeClass('hidden-display')
                $(`#roles`).append(`
                    <option id="${res.roleid}" value="${res.rolename}">${res.rolename}</option>
                `)
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
            },
            error: function(res) {
                $('.save-msg.error').removeClass('hidden')
                $('.save-msg.error').children().text('Error accured while adidng new onwer!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    });

    // $("#modRoles").on('change', function() {
    //     let data= {
    //         role: $(this).val().split(/[,]+/).pop()
    //     }



        // $.ajax({
        //     type: "POST",
        //     url: `/dashboard/${id}/moderation/update?add=true`,
        //     data: data,
        //     success: function(res){
        //         $(`#${res.roleid}`).remove()
        //         $(`.save-msg.${res.status}`).removeClass('hidden')
        //         $(`.save-msg.${res.status}`).children().text(res.msg)
        //         setTimeout(function() {
        //             $(`.save-msg.${res.status}`).addClass('hidden')
        //             $(`.save-msg.${res.status}`).children().empty()
        //         }, 5000)
        //     },
        //     error: function(res) {
        //         $('.save-msg.error').removeClass('hidden')
        //         $('.save-msg.error').children().text('Error accured while adidng new onwer!')
        //         setTimeout(function() {
        //             $(`.save-msg.error`).addClass('hidden')
        //             $(`.save-msg.error`).children().empty()
        //         }, 4000)
        //     }
        // });
    // })





    // Commands

    // Ban Cmd
    $("#ban").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {
            toggleTo = "on"
        } else {
            toggleTo = "off"
        }
        let data = {
            cmd: "ban",
            toggleTo: toggleTo
        }
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/moderation/update?cmd=true`,
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
                $('.save-msg.error').children().text('Error accured while adidng new onwer!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    // Kick Cmd
    $("#kick").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {
            toggleTo = "on"
        } else {
            toggleTo = "off"
        }
        let data = {
            cmd: "kick",
            toggleTo: toggleTo
        }
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/moderation/update?cmd=true`,
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
                $('.save-msg.error').children().text('Error accured while adidng new onwer!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })


    // Warn Cmd
    $("#warn").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {
            toggleTo = "on"
        } else {
            toggleTo = "off"
        }
        let data = {
            cmd: "warn",
            toggleTo: toggleTo
        }
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/moderation/update?cmd=true`,
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
                $('.save-msg.error').children().text('Error accured while adidng new onwer!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

    // Mute Cmd
    $("#mute").on('click', function() {
        let toggleTo;
        if($(this).prop('checked') == true) {
            toggleTo = "on"
        } else {
            toggleTo = "off"
        }
        let data = {
            cmd: "mute",
            toggleTo: toggleTo
        }
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/moderation/update?cmd=true`,
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
                $('.save-msg.error').children().text('Error accured while adidng new onwer!')
                setTimeout(function() {
                    $(`.save-msg.error`).addClass('hidden')
                    $(`.save-msg.error`).children().empty()
                }, 4000)
            }
        });
    })

})