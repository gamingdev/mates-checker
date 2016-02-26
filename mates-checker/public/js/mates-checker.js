$(function () {
    var str,
        lines,
        names = [],
        url = "http://#{regionUrl}.op.gg/summoner/userName=",
        regex = /^(.*) (?:a rejoint|joined the)/,
        tempo = null;

    // declared as public to be launchable in timeout
    parseEntry = function() {
        var $textarea = $('textarea[name="input"]');
        str = $textarea.val();

        lines = str.replace(/\r\n/, "\n").split("\n");
        lines.forEach(function (element, index, array) {
            if ((match = regex.exec(element)) !== null) {
                names.push(match[1].trim());
            }
        });
        // supprime les doublons
        names = _.uniq(names);
        //retirer le userName
        names = _.without(names, userName);

        if (!_.isEmpty(names)) {
            $('#nameList').empty();
            $('.openAll').removeClass('hidden').addClass('show');
            // affiche les nom dans la liste
            _.each(names, function(val) {
                $('#nameList').append('<li><a href="'+ url + val +'" target="_blank" class="btn btn-success">'+ val +'</a></li>');
            });
        }
    };

    // tout ce lance au keyup sur le textarea
    $('#input').on('keyup', function (event) {
        // reset la tempo
        clearTimeout(tempo);
        // lance la tempo
        tempo = window.setTimeout('parseEntry()', 500);
    });

    // on met le focus dans l'input
    $('#input').focus();

    $('#openAll').on('click', function(event) {
        event.preventDefault();

        // boucle sur les noms
        _.each(names, function (val, key) {
            window.open('http://euw.op.gg/summoner/userName=' + val, '_blank');
        });
    });

    var $feedbackHelp = $('.feedback-help'),
        hideFeedbackForm = function() {
            if (!$feedbackHelp.hasClass('show') && !$feedbackHelp.hasClass('hover')) {
                $feedbackHelp.addClass('hidden');
            }
        };

    // gestion du bouton
    $('.feedback-button')
        .on('mouseenter', function(event){
            $feedbackHelp.removeClass('hidden');
        })
        .on('mouseleave', function(event) {
            setTimeout(hideFeedbackForm, 1000);
        })
        .on('click', function(event) {
            $feedbackHelp.removeClass('hidden').addClass('show');
        });

    // gestion de la modal
    $feedbackHelp
        .on('mouseenter', function(event) {
            $feedbackHelp.addClass('hover');
        })
        .on('mouseleave', function(event) {
            $feedbackHelp.removeClass('hover');
            setTimeout(hideFeedbackForm, 1000);
        })
        .on('click', 'textarea', function(event) {
            $feedbackHelp.addClass('show');
        });

    // fermeture de modal
    $('.close-modal').on('click', function(event) {
        event.preventDefault();

        $feedbackHelp.removeClass('show hover').addClass('hidden');
    });

    // gestion de l'envoi de message
    $feedbackHelp.on('click', 'input[type="submit"]', function(event) {
        event.preventDefault();

        $('.feedback-help .form-group.body, .feedback-help .form-group.buttons').addClass('hidden');
        $('.uil-ring-css').removeClass('hidden');

        $.post(
            '/sendMessage',
            { corp: $('.feedback-help textarea[name="corp"]').val() },
            function(data, textStatus) {
                $('.uil-ring-css').addClass('hidden');
                $('.success').removeClass('hidden');
            }
        ).always(function() {
            setTimeout(function() {
                $('.feedback-help .form-group.body, .feedback-help .form-group.buttons').removeClass('hidden');
                $('.success').addClass('hidden');
                $feedbackHelp.removeClass('show').addClass('hidden');
                $feedbackHelp.find('textarea[name="body"]').val('');
            }, 1000);
        });
    });
});
