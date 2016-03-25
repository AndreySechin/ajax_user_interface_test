var new_urls = [];
var resend = false;

function analis(url) {
    if (!url.trim()){
        $('#errors').html("<div class='alert'> <a class='close' data-dismiss='alert'>×</a> <strong>Sorry</strong> <br> but field should not be empty </div>");
    }
    else {
        var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
        var regex = new RegExp(expression);

        if (url.match(regex)) {
            if (!gon.mass.includes(url) && !new_urls.includes(url)) {
                new_urls.push(url);
                $('#url').val('');
                $('#urls').prepend("<a href= http://"+ url +"> <div class='alert alert-url'> "+ url +" </div> </a>");
                $('#errors').html("<div class='alert alert-success'> <a class='close' data-dismiss='alert'>×</a> <strong>Cool!</strong> <br> URL has been added: <br>" + url + " </div>");
            } else {
                $('#errors').html("Url has already been taken")
            }
            if (!resend && new_urls.length > 0) {
                send(new_urls)
            }
        }
        else {
            $('#errors').html("<div class='alert'> <a class='close' data-dismiss='alert'>×</a> <strong>Sorry</strong> <br> but it does not seem to link: <br>" + url + " </div>");
        }
    }
}

function send(urls) {
    $.ajax({
        method: "POST",
        url: "url/add_to_db",
        dataType: "script",
        data: {url: urls}
    })
    .done(function() {
        resend = false;
        new_urls = [];
    })
    .fail(function() {
        setTimeout(function(){
            resend = true;
            send(new_urls);
            console.log('start timeout')
        }, 5000);
    })
}

$( document ).ready(function() {
    $('#form').keypress(function(e){
        if(e.which == 13){
            var url = $('#url').val();
            analis(url)
        }
    });
});


