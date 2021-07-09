$('#q2_expand_button').click(function(e) {
    $('.quadrant').toggleClass('fullscreen');
    $('.quadrant').hasClass("fullscreen") ? $(this).text("") : $(this).text("");
});