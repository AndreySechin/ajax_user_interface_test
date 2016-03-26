var new_urls = [];
var resend = false;
var all_url;

function analis(url) {
    url = url.trim();
    if (!url){
        $('#errors').html("<div class='alert'> <a class='close' data-dismiss='alert'>×</a> <strong>Sorry</strong> <br> but field should not be empty </div>");
    }
    else {
        var expression = /(((http|ftp|https):\/{2})?(([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)+))\b/im;
        var regex = new RegExp(expression);
        var result = url.match(regex);

        if (result != null) {
            var final_url = result[0].toLowerCase();
            result = final_url.match( new RegExp(/(http|ftp|https):\/{2}/im));
            if(result == null){
                final_url = "https://"+final_url;
            }

            if (!all_url.includes(final_url) && !new_urls.includes(final_url)) {
                new_urls.push(final_url);
                $('#url').val('');
                $('#urls').prepend("<a href="+ final_url +"> <div class='alert alert-url'> "+ final_url +" </div> </a>");
                $('#errors').html("<div class='alert alert-success'> <a class='close'>×</a> <strong>Cool!</strong> <br> URL has been added: <br>" + final_url + " </div>");
            } else {
                $('#errors').html("<div class='alert'> <a class='close'>×</a> <strong>Sorry</strong> <br>but Url has already been taken: <br>" + final_url + " </div>")
            }
            if (!resend && new_urls.length > 0) {
                send(new_urls)
            }
        }
        else {
            $('#errors').html("<div class='alert'> <a class='close'>×</a> <strong>Sorry</strong> <br> but url incorrect: <br>" + url + " </div>");
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
        all_url.push.apply(all_url, new_urls);//.concat(new_urls);
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
    all_url = gon.mass;

    $("#errors" ).on( 'click', '.close', function() {
        $('#errors .alert' ).slideUp();
    });

    $('#form').keypress(function(e){
        if(e.which == 13){
            var url = $('#url').val();
            analis(url)
        }
    });
});


