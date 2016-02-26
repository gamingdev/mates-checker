$(function () {
    var feedbackHelp = $('.feedback-help'),
        hideFeedbackForm = function() {
            if (!feedbackHelp.hasClass('show') && !feedbackHelp.hasClass('hover')) {
                feedbackHelp.addClass('hidden');
            }
        };

    /**
     * Handle the button behaviour
     */
    $('.feedback-button')
        .on('mouseenter', function(event){
            feedbackHelp.removeClass('hidden');
        })
        .on('mouseleave', function(event) {
            setTimeout(hideFeedbackForm, 1000);
        })
        .on('click', function(event) {
            feedbackHelp.removeClass('hidden').addClass('show');
        });

    /**
     * handle the feedback form behaviour
     */
    feedbackHelp
        .on('mouseenter', function(event) {
            feedbackHelp.addClass('hover');
        })
        .on('mouseleave', function(event) {
            feedbackHelp.removeClass('hover');
            setTimeout(hideFeedbackForm, 1000);
        })
        .on('click', 'textarea', function(event) {
            feedbackHelp.addClass('show');
        });

    /**
     * feedback form close button
     */
    $('.close-modal').on('click', function(event) {
        event.preventDefault();

        feedbackHelp.removeClass('show hover').addClass('hidden');
    });

    /**
     * Sending message
     */
    feedbackHelp.on('click', 'input[type="submit"]', function(event) {
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
                feedbackHelp.removeClass('show').addClass('hidden');
                feedbackHelp.find('textarea[name="body"]').val('');
            }, 1000);
        });
    });

});
