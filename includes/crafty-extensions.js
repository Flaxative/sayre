      Crafty.addEvent(this, window, "blur", function() {
        pauseAll();
        if (!Crafty.dontPauseOnBlur) Crafty.pause();
        tell('blur');
      });
      Crafty.addEvent(this, window, "focus", function() {
        if (Crafty._paused) Crafty.pause();
        resumeAll();
      });