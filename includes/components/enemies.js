// ~~~~~
// ~~~~~
// ENEMIES
// ~~~~~
// ~~~~~

// Monster base - actors with collision
Crafty.c('Monster', { init: function() { this.requires('Actor, Collision, Pausable').attr({z: 2}); },});

// Some monsters hurt you just by touch 
Crafty.c('Painful', { init: function() { this.bind("Moved", function(from) {
       if(this.hit('player')&&Crafty('player').has('vulnerable')){
           tell('ouch!');
           damagePlayer(this.strength);
        }
    }); },});

// Adds a "fire projectile" method to a monster. Centers the projectile relative the face firing it.
// Relies on 4-direction facing; monster needs attributes for projectile,
// pw (projectile width), and ph (projectile height)
Crafty.c("Shooter", {
    fireProjectile: function() {
        if(this.facing=='left') {
            var newRock = Crafty.e(this.projectile).attr({x:this.x-this.pw, y: this.y+this.h/2-this.ph/2});
            newRock.bind("EnterFrame", function() {if(!this.paused) {this.trigger("Slide", [-1,0]);}});
            return;
            }
        if(this.facing=='right') {
            var newRock = Crafty.e(this.projectile).attr({x:this.x+this.w, y: this.y+this.h/2-this.ph/2});
            newRock.bind("EnterFrame", function() {if(!this.paused) {this.trigger("Slide", [1,0]);}});
            return;
            }
        if(this.facing=='up') {
            var newRock = Crafty.e(this.projectile).attr({y:this.y-this.ph, x: this.x+this.w/2-this.pw/2});
            newRock.bind("EnterFrame", function() {if(!this.paused) {this.trigger("Slide", [0,-1]);}});
            return;
            }
        if(this.facing=='down') {
            var newRock = Crafty.e(this.projectile).attr({y:this.y+this.h, x: this.x+this.w/2-this.pw/2});
            newRock.bind("EnterFrame", function() {if(!this.paused) {this.trigger("Slide", [0,1]);}});
            return;
            }
        return false;
        }
    });


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
    
// Our slide component - listens for slide events
// and smoothly slides to another tile location
  Crafty.c("Slide", {
    init: function() {
      this._stepFrames = 1;
      //this._tileSize = 1;
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
        this._destX = this.x + direction[0] * this.speed;
        this._destY = this.y + direction[1] * this.speed;

        // Get our x and y velocity
        this._vx = direction[0] * this.speed / this._stepFrames;
        this._vy = direction[1] * this.speed / this._stepFrames;

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
    this.requires('Slide, Tween');
    this.timeout(function() {this.checkMovement();}, 5)
      .bind('Moved', function(from) {
           if(this.hit('Solid')||this.hit('Exit')||this.hit('Monster')){
               this.cancelSlide(); this.dir = this._randomDirection();
               //this.checkMovement(true);
            }
        });    // initialize movement
  },
  
  checkMovement: function() {
        this.dir = this._randomDirection();                 // get initial random direction
        this.bind("EnterFrame", function() {
            if(!this.paused) {this.trigger("Slide", this.dir);} // don't move if paused
            });      
        },
        
  _randomDirection: function() {
    return this._directions[Math.floor(Math.random()*4)];
  }
});
   
// animation binds for simple four-directional slide enemies
Crafty.c('FourSlide', {init: function(){this.bind('Slide', function(direction){
    if(direction[0]==1) {
            if (!this.isPlaying("walk_right")) {
                this.facing = "right";
                this.stop().animate("walk_right", 8, -1);
                return;
                }
            }
        if(direction[0]==-1) {
            if (!this.isPlaying("walk_left")) {
                this.facing = "left";
                this.stop().animate("walk_left", 8, -1);
                return;
                }
            }
        if(direction[1]==1) {
            if (!this.isPlaying("walk_down")) {
                this.facing = "down";
                this.stop().animate("walk_down", 8, -1);
                return;
                }
            }
        if(direction[1]==-1) {
            if (!this.isPlaying("walk_up")) {
                this.facing = "up";
                this.stop().animate("walk_up", 8, -1);
                return;
                }
            }
        return false;
    });},});
   
// Gives monsters a "Rotate" trigger || currently used only for 4-way octoroks
Crafty.c('Rotator', {init: function(){this.bind('Rotate', function(args){
    var rotateDir = args[0]; var spriteBase = args[1]; // get rotation direction & sprite base name
    var keepw = this.w; var keeph = this.h; // get height and width to preserve after rotation
    if(this.facing=="left") {
            if (rotateDir=='cw') {
                this.facing = "up";
                this.addComponent(spriteBase+this.facing).attr({w: keepw, h: keeph}).collision();
                return true;
                }
            if (rotateDir=='ccw') {
                this.facing = "down";
                this.addComponent(spriteBase+this.facing).attr({w: keepw, h: keeph}).collision();
                return true;
                }
            }
    if(this.facing=="up") {
            if (rotateDir=='cw') {
                this.facing = "right";
                this.addComponent(spriteBase+this.facing).attr({w: keepw, h: keeph}).collision();
                return true;
                }
            if (rotateDir=='ccw') {
                this.facing = "left";
                this.addComponent(spriteBase+this.facing).attr({w: keepw, h: keeph}).collision();
                return true;
                }
            }
    if(this.facing=="right") {
            if (rotateDir=='cw') {
                this.facing = "down";
                this.addComponent(spriteBase+this.facing).attr({w: keepw, h: keeph}).collision();
                return true;
                }
            if (rotateDir=='ccw') {
                this.facing = "up";
                this.addComponent(spriteBase+this.facing).attr({w: keepw, h: keeph}).collision();
                return true;
                }
            }
    if(this.facing=="down") {
            if (rotateDir=='cw') {
                this.facing = "left";
                this.addComponent(spriteBase+this.facing).attr({w: keepw, h: keeph}).collision();
                return true;
                }
            if (rotateDir=='ccw') {
                this.facing = "right";
                this.addComponent(spriteBase+this.facing).attr({w: keepw, h: keeph}).collision();
                return true;
                }
            }
    return false;
    });},});
    
// Pink Slime Foundation -- uses old RandomAI
Crafty.c('SlimeBase', {
  init: function() {
    this.requires('Monster, RandomAIOld, SpriteAnimation, FourSlide, Painful, ooze, slimedown')
      //.color('#ff5ec4')
        .animate("walk_up", 0, 0, 2)
        .animate("walk_right", 0, 1, 2)
        .animate("walk_down", 0, 2, 2)
        .animate("walk_left", 0, 3, 2)
        .attr({w:40, h:40, hp: 5, strength: 11}).collision()
      .bind('Moved', function(from) {
           if(this.hit('Solid')||this.hit('Exit')||this.hit('Monster')){
               this.cancelSlide(); tell('switching dirs');
               this.checkMovement(true);
            }
        })
        .moveChance(1);
  },
});

// Normal Pink Slime
Crafty.c('Slime', {init: function() {this.requires("SlimeBase, Minion").attr({death: "random"})},});

// Big Pink Slime
Crafty.c('KingSlime', {
    init: function() {
        this.requires("SlimeBase, Stable")
        .attr({h:80, w:80, hp: 10, strength: 22, death: "slimeSplit"}).collision();
        },
    });
        // big pink slime turns into lots of little pink slimes
        // kind of rough around edges atm - they appear and start moving before the big slime dies completely
        // but it works =)
        function slimeSplit(x,y) {
            monsters_on_screen += 4;
            Crafty.e('Slime').attr({x:x, y:y});
            Crafty.e('Slime').attr({x:x+40, y:y});
            Crafty.e('Slime').attr({x:x, y:y+40});
            Crafty.e('Slime').attr({x:x+40, y:y+40});
            }
    
// Octorok with better movement
Crafty.c('Octorok', {
  init: function() {
    this.timeTillNextShot = 60 + 20 * Math.floor((Math.random()*5)+1);
    //this.shotInterval = 1500 + 100 * Math.floor((Math.random()*30)+1); // stop & shoot every 1.5-4.5 seconds
    this.requires('Monster, RandomAI, SpriteAnimation, FourSlide, Shooter, Painful, Rotator, Minion, octorok, octdown')
      //.color('#ff5ec4')
        .animate("walk_down", 0, 0, 3)
        .animate("walk_up", 0, 1, 3)
        .animate("walk_left", 0, 2, 3)
        .animate("walk_right", 0, 3, 3)
        .attr({w:40, h:40, hp: 5, strength: 11, death: "random", speed: 2, 
            projectile: "RockProjectile", pw: 16, ph: 16}).collision()
        .bind("EnterFrame", this.countToShot);
  },
    countToShot: function() { // counts down to shooting phase
        if(Crafty('player').paused) {return false;}
        this.timeTillNextShot--;
        if(this.timeTillNextShot<=0) {
            this.unbind("EnterFrame", this.countToShot);
            this.timeTillNextShot = 32; 
            this.removeComponent('Pausable'); // global (un)pause stops working
            this.bind("EnterFrame", this.countToCount);
            }
        },
    countToCount: function() { // executes shooting phase while counting down to movement
        if(Crafty('player').paused) {return false;}
        this.timeTillNextShot--;
        if(this.timeTillNextShot == 31) {
            this.trigger("Pause");          // pause monster to stop movement
            this.stop();                    // stop animation
            this.fireProjectile();          // fire!!
            return;
            }
        if(this.timeTillNextShot<=0) {
            this.addComponent('Pausable');  // global pause works again
            this.unbind("EnterFrame", this.countToCount); 
            this.timeTillNextShot = 60 + 20 * Math.floor((Math.random()*5)+1);
            this.bind("EnterFrame", this.countToShot);
            this.trigger("Run");            // resume movement
            this.dir = this._randomDirection(); // in a new random direction
            return; 
            }
        }
    });

// Golden octorok has more HP and hurts more. Also fires bigger rocks.
Crafty.c('OctorokGold', {
    init: function() {
        this.requires("Octorok, octGdown").attr({projectile: "RockProjectileBig", pw: 24, ph: 24, hp: 20, strength: 22});
        }
    });

// Blue octorok shoots in 4 directions and also takes more punishment than red octoroks.
Crafty.c('OctorokBlue', {
  init: function() {
    this.timeTillNextShot = 60 + 20 * Math.floor((Math.random()*5)+1);
    //this.shotInterval = 1500 + 100 * Math.floor((Math.random()*30)+1); // stop & shoot every 1.5-4.5 seconds
    this.requires('Monster, RandomAI, SpriteAnimation, FourSlide, Shooter, Painful, Rotator, Minion, octorok, octBdown')
      //.color('#ff5ec4')
        .animate("walk_down", 0, 0, 3)
        .animate("walk_up", 0, 1, 3)
        .animate("walk_left", 0, 2, 3)
        .animate("walk_right", 0, 3, 3)
        .attr({w:40, h:40, hp: 10, strength: 11, death: "random", speed: 2, 
            projectile: "RockProjectile", pw: 16, ph: 16}).collision()
        .bind("EnterFrame", this.countToShot);
  },
    countToShot: function() {
        if(Crafty('player').paused) {return false;}
        this.timeTillNextShot--;
        if(this.timeTillNextShot<=0) {
            this.unbind("EnterFrame", this.countToShot);
            this.timeTillNextShot = 124; 
            this.removeComponent('Pausable');
            this.bind("EnterFrame", this.countToCount);
            }
        },
    countToCount: function() {
        if(Crafty('player').paused) {return false;}
        this.timeTillNextShot--;
        if(this.timeTillNextShot == 123) {
            this.trigger("Pause"); 
            this.stop();
            this.fireProjectile(); 
            return;
            }
        if(this.timeTillNextShot == 94) {
            this.trigger("Rotate", ['cw', 'octB']);
            this.fireProjectile(); 
            return; 
            }
        if(this.timeTillNextShot == 64) {
            this.trigger("Rotate", ['cw', 'octB']);
            this.fireProjectile(); 
            return; 
            }
        if(this.timeTillNextShot == 32) {
            this.trigger("Rotate", ['cw', 'octB']);
            this.fireProjectile(); 
            return; 
            }
        if(this.timeTillNextShot<=0) {
            this.addComponent('Pausable');
            this.unbind("EnterFrame", this.countToCount);
            this.timeTillNextShot = 60 + 20 * Math.floor((Math.random()*5)+1);
            this.bind("EnterFrame", this.countToShot);
            this.trigger("Run"); 
            this.dir = this._randomDirection();
            return; 
            }
        }
    });

// Basic projectile component
Crafty.c('Projectile', {init:function() {this.requires("Actor, Collision, Slide, SpriteAnimation, Pausable");}});

// Small rock projectile, for red and blue octoroks
Crafty.c('RockProjectile', {
    init: function() {
        this.requires('Projectile, projectile, projectile_rock')
        .attr({z: 1003, w: 16, h: 16, speed: 6, strength: 11}).collision()
        .onHit("Guard", function() {
            this.destroy();
            })
        .onHit("player", function() {
            damagePlayer(this.strength);
            this.destroy();
            });
        }
    });

// Large rock projectile, for gold octoroks
Crafty.c('RockProjectileBig', {
    init: function() {
        this.requires('RockProjectile, projectile_rock_big')
        .attr({ w: 24, h: 24, strength: 22}).collision();
        }
    });