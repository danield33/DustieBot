let url = window.location.href;
let id = url.split('/')[4]

if(!id) {
    $('#sidebarCollapse').hide()
}

$(document).ready(function () {


    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('.flexdatalist').flexdatalist({
        minLength: 0
   });



   $('#moderation').on('click', function() {
    let toggleTo;
    if($( "#moderation" ).hasClass( "actived" )) {toggleTo = false} else {toggleTo = true}
    let data = {module: "moderation",toggleTo: toggleTo}
    $.ajax({
        type: "POST",
        url: `/dashboard/${id}/modules/update`,
        data: data,
        success: function(res){
            if(toggleTo) {
                $("#moderation").removeClass('deactived')
                $("#moderation").addClass('actived')
                $("#modNav").removeClass('disabled')
                $("#modNav").addClass('activated')
            } else {
                $("#moderation").removeClass('actived')
                $("#moderation").addClass('deactived')
                $("#modNav").removeClass('activated')
                $("#modNav").addClass('disabled')
            }
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
   $('#logs').on('click', function() {
    let toggleTo;
    if($( "#logs" ).hasClass( "actived" )) {toggleTo = false} else {toggleTo = true}
    let data = {module: "logs",toggleTo: toggleTo}
    $.ajax({
        type: "POST",
        url: `/dashboard/${id}/modules/update`,
        data: data,
        success: function(res){
            if(toggleTo) {
                $("#logs").removeClass('deactived')
                $("#logs").addClass('actived')
                $("#logNav").removeClass('disabled')
                $("#logNav").addClass('activated')
            } else {
                $("#logs").removeClass('actived')
                $("#logs").addClass('deactived')
                $("#logNav").removeClass('activated')
                $("#logNav").addClass('disabled')
            }
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

   $('#fun').on('click', function() {
    let toggleTo;
    if($( "#fun" ).hasClass( "actived" )) {toggleTo = false} else {toggleTo = true}
    let data = {module: "fun",toggleTo: toggleTo}
    $.ajax({
        type: "POST",
        url: `/dashboard/${id}/modules/update`,
        data: data,
        success: function(res){
            if(toggleTo) {
                $("#fun").removeClass('deactived')
                $("#fun").addClass('actived')
                $("#funNav").removeClass('disabled')
                $("#funNav").addClass('activated')
            } else {
                $("#fun").removeClass('actived')
                $("#fun").addClass('deactived')
                $("#funNav").removeClass('activated')
                $("#funNav").addClass('disabled')
            }
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

   $('#welcome').on('click', function() {
    let toggleTo;
    if($( "#welcome" ).hasClass( "actived" )) {toggleTo = false} else {toggleTo = true}
    let data = {module: "welcome",toggleTo: toggleTo}
    $.ajax({
        type: "POST",
        url: `/dashboard/${id}/modules/update`,
        data: data,
        success: function(res){
            if(toggleTo) {
                $("#welcome").removeClass('deactived')
                $("#welcome").addClass('actived')
                $("#welcomeNav").removeClass('disabled')
                $("#welcomeNav").addClass('activated')
            } else {
                $("#welcome").removeClass('actived')
                $("#welcome").addClass('deactived')
                $("#welcomeNav").removeClass('activated')
                $("#welcomeNav").addClass('disabled')
            }
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



   $('#newOwner').on('click', function() {
        let elem = document.getElementById('ownerid')
        let msg = 'Added {owner} to Owner List!'
        let newOwner = {
            newOwner: elem.value,
            msg:msg
        }
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/update?name=${elem.name}&add=true`,
            data: newOwner,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(res.msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 5000)
                if(res.status == "success") {
                    $('.owner-list').append(`
                        <li>
                            <input style="border-bottom:none;width: 80%;" name="owner" type="text" value="${res.ownertag}" readonly>
                            <button id="removeRole" type="button" class="btn btn-delete" ><span aria-hidden="true">&times;</span></button>
                        </li>
                    `)
                }
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



   $(".owner-list li").on('click', function(event) {
        let targ = event.target
        if(targ.type=='button' || $(targ).parent().map(function(){return this.type}).get() == "button") {
            let li = $(targ).parents('li')
            $(li).remove()
            let elem = $(li).children('input')[0]
            let owner = {
                owner: elem.value
            }
            $.ajax({
                type: "POST",
                url: `/dashboard/${id}/update?name=newOwner&remove=true`,
                data: owner,
                success: function(res){
                    $(`.save-msg.${res.status}`).removeClass('hidden')
                    $(`.save-msg.${res.status}`).children().text(res.msg)
                    setTimeout(function() {
                        $(`.save-msg.${res.status}`).addClass('hidden')
                        $(`.save-msg.${res.status}`).children().empty()
                    }, 4000)
                },
                error: function(res) {
                    $('.save-msg.error').removeClass('hidden')
                    $('.save-msg.error').children().text('Error accured while adidng new onwer!')
                    setTimeout(function() {
                        $(`.save-msg.error`).addClass('hidden')
                        $(`.save-msg.error`).children().empty()
                    }, 4000)
                }
            })
        }
   })


});

function newChanges(elem, msg) {
    let type = elem.type
    if(type == "text" && elem.name != "newOwner") {
        let data = {
            newValue: elem.value
        }
        $.ajax({
            type: "POST",
            url: `/dashboard/${id}/update?name=${elem.name}`,
            data: data,
            success: function(res){
                $(`.save-msg.${res.status}`).removeClass('hidden')
                $(`.save-msg.${res.status}`).children().text(msg)
                setTimeout(function() {
                    $(`.save-msg.${res.status}`).addClass('hidden')
                    $(`.save-msg.${res.status}`).children().empty()
                }, 4000)
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
    } else if(type == "checkbox") {
        if(elem.checked) {
            msg += 'enabled!'
            let data={
                turnto: true,
                msg:msg
            }
            $.ajax({
                type: "POST",
                url: `/dashboard/${id}/update?name=${elem.name}`,
                data: data,
                success: function(res){
                    $(`.save-msg.${res.status}`).removeClass('hidden')
                    $(`.save-msg.${res.status}`).children().text(msg)
                    setTimeout(function() {
                        $(`.save-msg.${res.status}`).addClass('hidden')
                        $(`.save-msg.${res.status}`).children().empty()
                    }, 4000)
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
        } else {
            msg += 'disabled!'
            let data={
                turnto: false,
                msg:msg
            }
            $.ajax({
                type: "POST",
                url: `/dashboard/${id}/update?name=${elem.name}`,
                data: data,
                success: function(res){
                    $(`.save-msg.${res.status}`).removeClass('hidden')
                    $(`.save-msg.${res.status}`).children().text(msg)
                    setTimeout(function() {
                        $(`.save-msg.${res.status}`).addClass('hidden')
                        $(`.save-msg.${res.status}`).children().empty()
                    }, 4000)
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
        }
    }
}