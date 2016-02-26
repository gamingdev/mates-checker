$(function () {
    var names = [],
        url = "http://#{regionUrl}.op.gg/summoner/userName=",
        regex = /^(.*) (?:a rejoint|joined the)/,
        tempo = null;

    // force focus into the main textarea taht you can just paste your logs
    $('#input').focus();

    /**
     * bootstrap tooltip need init
     */
    $('[data-toggle="tooltip"]').tooltip();

    /**
     * parse the input to extract names and create the list of buttons
     *
     * declared as public to be launchable in timeout
     */
    parseEntry = function() {
        // reset names list
        names = [];

        var str = $('textarea[name="input"]').val();

        var lines = str.replace(/\r\n/, "\n").split("\n");
        lines.forEach(function (element, index, array) {
            if ((match = regex.exec(element)) !== null) {
                names.push(match[1].trim());
            }
        });

        names = _.uniq(names);
        // remove summoner's name from the list
        names = _.without(names, userName);

        if (!_.isEmpty(names)) {
            $('#nameList').empty();
            $('.openAll').removeClass('hidden').addClass('show');

            console.log(names);
            // affiche les nom dans la liste
            _.each(names, function(val) {
                console.log(val);
                $('#nameList').append('<li><a href="'+ url + val +'" target="_blank" class="btn btn-success">'+ val +'</a></li>');
            });
        }
    };

    /**
     * Call the parse function on keyup
     */
    $('#input').on('keyup', function (event) {
        clearTimeout(tempo);
        tempo = window.setTimeout('parseEntry()', 500);
    });

    /**
     * On openAll button click, I iterate over each names
     */
    $('#openAll').on('click', function(event) {
        event.preventDefault();

        _.each(names, function (val, key) {
            window.open('http://euw.op.gg/summoner/userName=' + val, '_blank');
        });
    });
});
