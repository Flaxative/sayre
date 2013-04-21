// ~~~~~
// ~~~~~
// ENEMIES
// ~~~~~
// ~~~~~

// Our slide component - listens for slide events
// and smoothly slides to another tile location
  Crafty.c("Slide", {
    init: function() {
      this._stepFrames = 32;
      this._tileSize = 40;
      this._moving = false;
      this._vx = 0; this._destX = 0; this._sourceX = 0;
      this._vy = 0; this._destY = 0; this._sourceY = 0;
      this._frames = 0;

      this.bind("Slide", function(direction) {
        // Don't continue to slide if we're already moving
        if(this._moving) return false;
        this._moving = true;

        // Let's keep our pre-movement location
        // Hey, Maybe we'll need it later :)
        this._sourceX = this.x;
        this._sourceY = this.y;

        // Figure out our destination
        this._destX = this.x + direction[0] * 40;
        this._destY = this.y + direction[1] * 40;

        // Get our x and y velocity
        this._vx = direction[0] * this._tileSize / this._stepFrames;
        this._vy = direction[1] * this._tileSize / this._stepFrames;

        this._frames = this._stepFrames;
      }).bind("EnterFrame",function(e) {
        if(!this._moving) return false;

        // If we'removing, update our position by our per-frame velocity
        this.x += this._vx;
        this.y += this._vy;
        this._frames--;

        if(this._frames == 0) {
          // If we've run out of frames,
          // move us to our destination to avoid rounding errors.
          this._moving = false;
          this.x = this._destX;
          this.y = this._destY;
        }
        this.trigger('Moved', {x: this.x, y: this.y});
      });

    }, 
    slideFrames: function(frames) { 
       this._stepFrames = frames;
    },

    // A function we'll use later to 
    // cancel our movement and send us back to where we started
    cancelSlide: function() {
      this.x = this._sourceX;
      this.y = this._sourceY;
      this._moving = false;
    }
  });
  
// random direction slide AI
Crafty.c("RandomAI",{
  _directions:  [[0,-1], [0,1], [1,0], [-1,0]],
  init: function() {
    this._moveChance = 0.5;
    this.requires('Slide, Tween');
    this.timeout(function() {
        this.checkMovement();
        }, 5);
  },
  
  checkMovement: function(ignore) {
    if(!this.paused) {
        if(Math.random() < this._moveChance) {
            this.trigger("Slide", this._randomDirection());
            //this._currentdir = this._randomDirection();
          }
        }
    if(!ignore) {this.timeout(function() {this.checkMovement();}, 1000);}
    },

  moveChance: function(val) {
    this._moveChance = val;

  },
  _randomDirection: function() {
    return this._directions[Math.floor(Math.random()*4)];
  }

});

// Monster base - actors with collision
Crafty.c('Monster', { init: function() { this.requires('Actor, Collision, Pausable').attr({z: 2}); },});

// Minion component; tells a monster it's ok to fall to its death on movement.
Crafty.c('Minion', {
    init: function() {
        this.onHit("hole", function(data) {
            fallFoe(this, data[0].obj);
            });
        },
    });

// Stability component; prevents a monster with RandomAI from falling to its death.
Crafty.c('Stable', {
    init: function() {
        this.bind('Moved', function(from) {
           if(this.hit('hole')){
               this.cancelSlide(); tell('switching dirs');
               this.checkMovement(true);
            }
        });
        },
    });
    
// Slime
Crafty.c('SlimeBase', {
  init: function() {
    this.requires('Monster, RandomAI, SpriteAnimation, ooze, slimedown')
      //.color('#ff5ec4')
        .animate("walk_up", 0, 0, 2)
        .animate("walk_right", 0, 1, 2)
        .animate("walk_down", 0, 2, 2)
        .animate("walk_left", 0, 3, 2)
        .attr({w:40, h:40, hp: 5, strength: 11}).collision()
      .bind('Slide', function(direction) {
        if(direction[0]==1) {
            if (!this.isPlaying("walk_right")) {
                this.stop().animate("walk_right", 10, -1);
                }
            }
        if(direction[0]==-1) {
            if (!this.isPlaying("walk_left")) {
                this.stop().animate("walk_left", 10, -1);
                }
            }
        if(direction[1]==1) {
            if (!this.isPlaying("walk_down")) {
                this.stop().animate("walk_down", 10, -1);
                }
            }
        if(direction[1]==-1) {
            if (!this.isPlaying("walk_up")) {
                this.stop().animate("walk_up", 10, -1);
                }
            }
        })
      .bind('Moved', function(from) {
           if(this.hit('Solid')||this.hit('Exit')||this.hit('Monster')){
               this.cancelSlide(); tell('switching dirs');
               this.checkMovement(true);
            }
           if(this.hit('player')&&Crafty('player').has('vulnerable')){
               tell('ouch!');
               damagePlayer(this.strength);
            }
        })
        .moveChance(1);
  },
});

Crafty.c('Slime', {
    init: function() {
        this.requires("SlimeBase, Minion").attr({death: "random"})
    },
    });
Crafty.c('KingSlime', {
    init: function() {
        this.requires("SlimeBase, Stable")
        .attr({h:80, w:80, hp: 10, strength: 22}).collision();
    },
    });