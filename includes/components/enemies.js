// ~~~~~
// ~~~~~
// ENEMIES
// ~~~~~
// ~~~~~

// method to remove vulnerability from a monster upon it being hit - 
// this prevents bombs from instagibbing everything, for instance
function hurtMonster(monster) { 
    monster.removeComponent('vulnerable').timeout(function() {
        monster.addComponent('vulnerable')
        }, 200); // during this delay, the monster should be knocked back.
        // 200ms is how long it takes us to knock our monsters back. we might want to make this monster specific.
        // when we do, just have it be an attr of the monster, so we can check it both for knockback time & invulnerable time
        // also, at some point, we should hook some graphics into this
    }

// Monster base - actors with collision
Crafty.c('Monster', { init: function() { this.requires('Actor, Collision, Pausable, ground'/* remove 'ground' when you introduce more movement types, and assign it to individual monster species */).attr({z: 2}); },});

// Some monsters hurt you just by touch 
Crafty.c('Painful', { init: function() { this.bind("Moved", function(from) {
       if(this.hit('Player')&&Crafty('Player').has('vulnerable')){
           tell('ouch!'); Crafty.audio.play('ow');
           damagePlayer(this.strength);
           //if(this.has('Slide')) {this.cancelSlide(); tell('hi');} // fail debug
        }
    }); },});

// Adds a "fire projectile" method to a monster. Centers the projectile relative the face firing it.
// Relies on 4-direction facing; monster needs attributes for projectile,
// pw (projectile width), and ph (projectile height)
Crafty.c("Shooter", {
    fireProjectile: function() {
        //tell('yes2'); tell(this.projectile); //debug
        if(this.facing=='left') {
            var newRock = Crafty.e(this.projectile).attr({shotDir: "left", x:this.x-this.pw, y: this.y+this.h/2-this.ph/2});
            newRock.dir = [-1,0];
            newRock.bind("EnterFrame", function() {if(!this.paused) {this.trigger("Slide", this.dir);}});
            return;
            }
        if(this.facing=='right') {
            var newRock = Crafty.e(this.projectile).attr({shotDir: "right", x:this.x+this.w, y: this.y+this.h/2-this.ph/2});
            newRock.dir = [1,0];
            newRock.bind("EnterFrame", function() {if(!this.paused) {this.trigger("Slide", this.dir);}});
            return;
            }
        if(this.facing=='up') {
            var newRock = Crafty.e(this.projectile).attr({shotDir: "up", y:this.y-this.ph, x: this.x+this.w/2-this.pw/2});
            newRock.dir = [0,-1];
            newRock.bind("EnterFrame", function() {if(!this.paused) {this.trigger("Slide", this.dir);}});
            return;
            }
        if(this.facing=='down') {
            var newRock = Crafty.e(this.projectile).attr({shotDir: "down", y:this.y+this.h, x: this.x+this.w/2-this.pw/2});
            newRock.dir = [0,1];
            newRock.bind("EnterFrame", function() {if(!this.paused) {this.trigger("Slide", this.dir);}});
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
               this.cancelSlide(); // tell('switching dirs'); // debug
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
      }).bind("EnterFrame", this.moveFunc);

    }, 
    moveFunc: function(e) {
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

// first pathfinding AI, "homes" but doesn't move on diagonals
// moves in grid tiles, sliding block to block
// navigates obstacles
Crafty.c("Beeline",{
  _directions:  [[0,-1], [0,1], [1,0], [-1,0]],
    init: function() {
        this.requires('Slide, Tween');
        //this.timeout(function()  {this.checkMovement();}, 5)
        this.timeout(this.checkMovement, 5)
        .bind('Moved', function(from) {
            if(this.hit('Solid')||this.hit('Exit')||this.hit('Monster')){
                this.cancelSlide();// this.checkMovement();
                }
                });
            },
        
  checkMovement: function() {
        // get position of monster, get position of player
        if(!this.paused&&this) {
            console.log([this.at().x, this.at().y]);
            var start = [Math.round(this.at().x), Math.round(this.at().y)];
            this.at(start[0],start[1]);
            var goal = [Math.round(player.at().x), Math.round(player.at().y)];
            // get path
            var path = findPath(world, start, goal);
            if(path[1][0]>path[0][0]) {this.dir = [1,0];}
            if(path[1][0]<path[0][0]) {this.dir = [-1,0];}
            if(path[1][1]>path[0][1]) {this.dir = [0,1];}
            if(path[1][1]<path[0][1]) {this.dir = [0,-1];}
        
            //this.dir = this._randomDirection();                 // get initial random direction
            this.bind("EnterFrame", function() {
                if(!this.paused) {this.trigger("Slide", this.dir);} // don't move if paused
                });  
            }
        this.timeout(function(){this.cancelSlide();this.checkMovement();}, 800);    
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
                this.pauseAnimation().animate("walk_right", -1);
                return;
                }
            }
        if(direction[0]==-1) {
            if (!this.isPlaying("walk_left")) {
                this.facing = "left";
                this.pauseAnimation().animate("walk_left", -1);
                return;
                }
            }
        if(direction[1]==1) {
            if (!this.isPlaying("walk_down")) {
                this.facing = "down";
                this.pauseAnimation().animate("walk_down", -1);
                return;
                }
            }
        if(direction[1]==-1) {
            if (!this.isPlaying("walk_up")) {
                this.facing = "up";
                this.pauseAnimation().animate("walk_up", -1);
                return;
                }
            }
        return false;
    });},});
   
// Gives monsters a "Rotate" trigger || currently used only for 4-way octoroks
Crafty.c('Rotator', {init: function(){this.bind('Rotate', function(args){
    tell('rotation happening');
    var rotateDir = args[0]; var spriteBase = args[1]; // get rotation direction & sprite base name
    var keepw = this.w; var keeph = this.h; // get height and width to preserve after rotation
    if(this.facing=="left") {
            if (rotateDir=='cw') {
                this.animate("walk_up", 1, 1).reelPosition(1).pauseAnimation();
                this.facing = "up";
                return true;
                }
            if (rotateDir=='ccw') {
                this.animate("walk_down", 1, 1).reelPosition(1).pauseAnimation();
                this.facing = "down";
                return true;
                }
            }
    if(this.facing=="up") {
            if (rotateDir=='cw') {
                this.animate("walk_right", 1, 1).reelPosition(1).pauseAnimation();
                this.facing = "right";
                return true;
                }
            if (rotateDir=='ccw') {
                this.animate("walk_left", 1, 1).reelPosition(1).pauseAnimation();
                this.facing = "left";
                return true;
                }
            }
    if(this.facing=="right") {
            if (rotateDir=='cw') {
                this.animate("walk_down", 1, 1).reelPosition(1).pauseAnimation();
                this.facing = "down";
                return true;
                }
            if (rotateDir=='ccw') {
                this.animate("walk_up", 1, 1).reelPosition(1).pauseAnimation();
                this.facing = "up";
                return true;
                }
            }
    if(this.facing=="down") {
            if (rotateDir=='cw') {
                this.animate("walk_left", 1, 1).reelPosition(1).pauseAnimation();
                this.facing = "left";
                return true;
                }
            if (rotateDir=='ccw') {
                this.animate("walk_right", 1, 1).reelPosition(1).pauseAnimation();
                this.facing = "right";
                return true;
                }
            }
    return false;
    });},});
    
// Pink Slime Foundation -- uses old RandomAI
Crafty.c('SlimeBase', {
  init: function() {
    this.requires('Monster, RandomAIOld, Tween, SpriteAnimation, FourSlide, Painful, vulnerable, ooze, slimedown')
      //.color('#ff5ec4')
        .reel("walk_up", 300, 0, 0, 3)
        .reel("walk_right", 300, 0, 1, 3)
        .reel("walk_down", 300, 0, 2, 3)
        .reel("walk_left", 300, 0, 3, 3)
        .attr({w:40, h:40, hp: 5, strength: 11, hitNoise: 'grunt'}).collision()
      .bind('Moved', function(from) {
           if(this.hit('Solid')||this.hit('Exit')||this.hit('Monster')){
               this.cancelSlide(); // tell('switching dirs'); // debug
               this.checkMovement(true);
            }
        })
        .moveChance(1);
  },
});

// Normal Pink Slime
Crafty.c('Slime', {init: function() {this.requires("SlimeBase, Minion").attr({death: "random", knockback_distance: 40}).collision(new Crafty.circle(20, 20, 20));},});

// Big Pink Slime
Crafty.c('KingSlime', {
    init: function() {
        this.requires("SlimeBase, Stable")
        .attr({h:80, w:80, hp: 10, strength: 22, death: "slimeSplit"}).collision(new Crafty.circle(40, 40, 40));
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
    
// Octorok that doesn't shoot
Crafty.c('OctorokGreen', {
    init: function() {
        this.requires('Monster, Beeline, SpriteAnimation, FourSlide, Painful, Minion, vulnerable, octorok, octGreendown')
        .reel("walk_down", 300, 0, 0, 4)
        .reel("walk_up", 300, 0, 1, 4)
        .reel("walk_left", 300, 0, 2, 4)
        .reel("walk_right", 300, 0, 3, 4)
        .attr({w:40, h:40, hp: 10, strength: 11, death: "random", speed: 2, knockback_distance: 40, 
            projectile: "RockProjectile", pw: 16, ph: 16, hitNoise: 'octorok_pain'}).collision();
            
            // test some pathfinding
           /* this.bind("Pause", function(data){
                //tell(this.at().x+', '+this.at().y);
                var start = [Math.round(this.at().x), Math.round(this.at().y)];
                var goal = [Math.round(player.at().x), Math.round(player.at().y)];
                console.log(goal);
                colorPath(start, goal);
                });
            this.bind("Run", function(data){clearPath();});*/
            }
        });
    
// Octorok with better movement
Crafty.c('Octorok', {
  init: function() {
    this.timeTillNextShot = 60 + 20 * Math.floor((Math.random()*5)+1);
    //this.shotInterval = 1500 + 100 * Math.floor((Math.random()*30)+1); // stop & shoot every 1.5-4.5 seconds
    this.requires('Monster, RandomAI, SpriteAnimation, FourSlide, Shooter, Painful, Rotator, Minion, vulnerable, octorok, octdown')
      //.color('#ff5ec4')
        .reel("walk_down", 300, 0, 0, 4)
        .reel("walk_up", 300, 0, 1, 4)
        .reel("walk_left", 300, 0, 2, 4)
        .reel("walk_right", 300, 0, 3, 4)
        .attr({w:40, h:40, hp: 5, strength: 11, death: "random", speed: 2, knockback_distance: 20, 
            projectile: "RockProjectile", pw: 16, ph: 16, hitNoise: 'octorok_pain'}).collision()
        .bind("EnterFrame", this.countToShot);
  },
    countToShot: function() { // counts down to shooting phase
        if(Crafty('Player').paused) {return false;}
        this.timeTillNextShot--;
        if(this.timeTillNextShot<=0) {
            this.unbind("EnterFrame", this.countToShot);
            this.timeTillNextShot = 32; 
            this.removeComponent('Pausable'); // global (un)pause stops working
            this.bind("EnterFrame", this.countToCount);
            }
        },
    countToCount: function() { // executes shooting phase while counting down to movement
        if(Crafty('Player').paused) {return false;}
        this.timeTillNextShot--;
        if(this.timeTillNextShot == 31) {
            this.trigger("Pause");          // pause monster to stop movement
            this.pauseAnimation();                    // stop animation
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
    this.requires('Monster, RandomAI, SpriteAnimation, FourSlide, Shooter, Painful, Rotator, Minion, vulnerable, octorok, octBdown')
      //.color('#ff5ec4')
        .reel("walk_down", 300, 0, 0, 4)
        .reel("walk_up", 300, 0, 1, 4)
        .reel("walk_left", 300, 0, 2, 4)
        .reel("walk_right", 300, 0, 3, 4)
        .attr({w:40, h:40, hp: 10, strength: 11, death: "random", speed: 2, knockback_distance: 20, 
            projectile: "RockProjectile", pw: 16, ph: 16, hitNoise: 'octorok_pain'}).collision()
        .bind("EnterFrame", this.countToShot);
  },
    countToShot: function() {
        if(Crafty('Player').paused) {return false;}
        this.timeTillNextShot--;
        if(this.timeTillNextShot<=0) {
            this.unbind("EnterFrame", this.countToShot);
            this.timeTillNextShot = 124; 
            this.removeComponent('Pausable');
            this.bind("EnterFrame", this.countToCount);
            }
        },
    countToCount: function() {
        if(Crafty('Player').paused) {return false;}
        this.timeTillNextShot--;
        if(this.timeTillNextShot == 123) {
            this.trigger("Pause"); 
            this.pauseAnimation();
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
        .onHit("Guard", function(data) {
            bounce(data[0].obj.x, data[0].obj.y, 'bounce_quiet');
            this.destroy();
            })
        .onHit("Player", function() {
            Crafty.audio.play('ow');
            damagePlayer(this.strength);
            this.destroy();
            });
        }
    });

// Large rock projectile, for gold octoroks
Crafty.c('RockProjectileBig', {
    init: function() {
        this.requires('RockProjectile, Guard, projectile_rock_big')
        .attr({ w: 24, h: 24, strength: 22}).collision();
        }
    });