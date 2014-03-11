    
    // PAUSE ON BLUR
      Crafty.addEvent(this, window, "blur", function() {
            if(started) {
            pauseAll();
            if (!Crafty.dontPauseOnBlur) Crafty.pause();
            tell('blur');
            }
      });
      Crafty.addEvent(this, window, "focus", function() {
            if(started) {
            if (Crafty._paused) Crafty.pause();
            if(!talking) {resumeAll();}
            }
      });
      
      
    // FOURWAY WITHOUT QWASDZ KEY BINDINGS  
  Crafty.c("FourwayFlak", {

	init: function () {
		this.requires("Multiway");
	},

	/**@
	* #.fourway
	* @comp Fourway
	* @sign public this .fourway(Number speed)
	* @param speed - Amount of pixels to move the entity whilst a key is down
	* Constructor to initialize the speed. Component will listen for key events and move the entity appropriately.
	* This includes `Up Arrow`, `Right Arrow`, `Down Arrow`, `Left Arrow` as well as `W`, `A`, `S`, `D`.
	*
	* When direction changes a NewDirection event is triggered with an object detailing the new direction: {x: x_movement, y: y_movement}
	* When entity has moved on either x- or y-axis a Moved event is triggered with an object specifying the old position {x: old_x, y: old_y}
	*
	* The key presses will move the entity in that direction by the speed passed in the argument.
	* 
	* @see Multiway
	*/
	fourway: function (speed) {
	   //tell('workin'); //debug
		this.multiway(speed, {
			UP_ARROW: -90,
			DOWN_ARROW: 90,
			RIGHT_ARROW: 0,
			LEFT_ARROW: 180,
		});

		return this;
	}
});
