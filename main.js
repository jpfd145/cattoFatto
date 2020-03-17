class CattoFatto {
    constructor() {
        this.proxyCors = 'https://cors-anywhere.herokuapp.com/';
        this.endpoint = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=';
        this.endpointDetail = 'https://cat-fact.herokuapp.com/facts/';
    }

    getFatos(amount) {
        this.beginLoading();
        var settings = {
            'cache': false,
            'dataType': "json",
            "async": true,
            "crossDomain": true,
            "url": this.proxyCors + this.endpoint + amount,
            "method": "GET",
            "headers": {
                "accept" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        }

        $.ajax(settings).done(function (response) {
            $('#listFatos').html('');
            var id = "";
            $.each(response, function(key, val) {
                if (key == '_id') {
                    id = val;
                }

                if (key === 'text') {
                    $('#listFatos').append('<a href="#" id="'+id+'" onclick="cattoFatto.getDetailFatos(this);" class="list-group-item list-group-item-action">'+val+'</a>');
                }

                if (!isNaN(parseFloat(key)) && isFinite(key)) {
                    id = val._id;
                    $('#listFatos').append('<a href="#" id="'+id+'" onclick="cattoFatto.getDetailFatos(this);" class="list-group-item list-group-item-action">'+val.text+'</a>');
                }
            });

            $('#buttonExecute').attr('disabled', false).html('Executar');
        });
    }

    getDetailFatos(obj) {
        $('#' + obj.id).html('Carregando ...');

        var settings = {
            'cache': false,
            'dataType': "json",
            "async": true,
            "crossDomain": true,
            "url": this.proxyCors + this.endpointDetail + obj.id,
            "method": "GET",
            "headers": {
                "accept" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        }

        $.ajax(settings).done(function (response) {
            $('#' + obj.id).html(response.text);
        });
    }

    beginLoading() {
        $('#buttonExecute').attr('disabled', true).html('Carregando ...');
    }
}