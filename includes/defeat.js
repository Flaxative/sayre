Crafty.scene('defeat', function() {
    Crafty.audio.stop();
    current_scene = this;
    // sidebar();
    tileAll('FireT');
    trackplayer.x = 250; trackplayer.y = 150;
    placePlayer();
    initOccupy();
    Crafty.e("2D, DOM, Text, Solid, Collision").attr({ x: 200, y: 200, w: 100, h: 100, interact:"Crafty.scene('game');"}).text("You died. Refresh to try again.").textColor('#ffffff').collision();
    Crafty('player').trigger("Pause").pauseAnimation().disableControl().addComponent('charleft').attr({rotation: 90, h: 40, w: 36}).collision();
    
    edgePop('Fire');
    $('.sidebar').html('');
    });