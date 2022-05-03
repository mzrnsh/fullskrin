$(document).ready(function() {
  $('#text').focus(function() {
    $('#text').select();
  });

  $('#text').focus();

  // TODO there is only one element so each should not be used
  $('#text').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow:hidden;resize:none');
  }).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  $('#supported').text('Supported/allowed: ' + !!screenfull.enabled);

  if (!screenfull.enabled) return false;

  $('#the-button').click(function () {
    // Set #text-follower content to whatever was typed in the #text textarea
    textToShow = $("#text").val()

    if (textToShow.trim().length < 1) {
      textToShow = 'Did you type anything?'
    }

    $("#text-follower").text(textToShow);

    screenfull.request($('#text-wrapper')[0]);
     
    if (typeof(splitbee) !== 'undefined') {
      splitbee.track("Went fullscreen")
    }
  });

  $('#text').keydown(function (e) {
    if ((event.keyCode == 10 || event.keyCode == 13) && (event.ctrlKey || event.metaKey)) {
      $('#the-button').trigger('click');
    }
  });

  if (screenfull.enabled) {
    document.addEventListener(screenfull.raw.fullscreenchange, function() {
      if (screenfull.isFullscreen) {
        $('#text-wrapper').addClass('fullscreen');

        // Exit fullscreen on tap, click, or keyboard press
        $('#text-wrapper').click(function() { screenfull.exit(); });
        $(document).keypress(function()     { screenfull.exit(); });

        // Hide mouse pointer
        var idleTime     = 0;
        var idleInterval = setInterval(timerIncrement, 1000);

        // Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
          idleTime = 0;
          $('#text-wrapper').removeClass('hide-cursor');
        });
        $(this).keypress(function (e) {
          idleTime = 0;
          $('#text-wrapper').removeClass('hide-cursor');
        });

        function timerIncrement() {
          idleTime = idleTime + 1;
          if (idleTime > 1) {
            $('#text-wrapper').addClass('hide-cursor');
          }
        }
      }
      else {
        $('#text-wrapper').removeClass('fullscreen');
        $('#text').focus();
      }
    });
  }
});
