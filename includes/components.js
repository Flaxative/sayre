// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },
 
  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
    
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      if(this.overx) {x = this.x+this.overx; this.attr({x: x}); tell(this.overx);}
      if(this.overy) {y = this.y+this.overy; this.attr({y: y}); tell(this.overy);}
      return this;
    }
  }
});

function to_grid(x, y, method) {
    //tell(x); tell(y); //debug
    if(method=="round") {return [Math.round(x/Game.map_grid.tile.width), Math.round(y/Game.map_grid.tile.height)];}
    else if(method=="floor") {return [Math.floor(x/Game.map_grid.tile.width), Math.floor(y/Game.map_grid.tile.height)];}
    }


// set up walkability
Crafty.c('open', { init: function() {this.attr({walkability: 0}); }, }); 
Crafty.c('swimmable', { init: function() {this.attr({walkability: 1}); }, });
Crafty.c('hoverable', { init: function() {this.attr({walkability: 2}); }, });
Crafty.c('blocking', { init: function() {this.attr({walkability: 3}); }, });
Crafty.c('forcefield', { init: function() {this.attr({walkability: 4}); }, });

// set up movement type
Crafty.c('ground', { init: function() {this.attr({movement_type: 0}); }, });
 
// Pausable component for PCs and monsters
Crafty.c('Pausable', {
    paused: false,
    init: function() {
        this.bind("Pause", this.pause)
        .bind("Run", this.run);
        },
    pause: function() { this.paused = true; /*console.log(this.paused);*/ },
    run: function() { this.paused = false; /*console.log(this.paused);*/ },
    });
 
// An "Actor" is an entity that is drawn in 2D on canvas via our logical coordinate grid
Crafty.c('Actor', { init: function() { this.requires('2D, Canvas, Grid'); }, });
 
// EXITS are used off-screen to move between scenes
Crafty.c('Exit', {
    init: function() {
        this.requires('Actor, Color')
            .attr({overx: 10, overy: 10, h: 20, w: 20})
            .color('rgb(0, 0, 0)');
        },
});

// A NPC is just an Actor with a certain color, and dialogue.
// This needs a lot of work - it's a barebones implementation of NPCs atm.
// Would like support for: different sprites, some animations, facings, etc.
Crafty.c('NPC', {
  init: function() {
    this.requires('Actor, Color, Solid, Collision, poi').collision()
      .color('rgb(255, 185, 40)');
  },
});

Crafty.c('NPC2', {
    init: function() {
    this.requires('Actor, Solid, Collision, Tween, SpriteAnimation, poi, blocking');
    }
});

Crafty.c('Old Man', {
    init: function() {
    this.requires('NPC2').attr({w:29, h:40, overx: 5.5}).collision();
        }    
});
Crafty.c('Shy Kid', {init: function() {this.requires('NPC2').attr({w:29, h:34, overx:5.5, overy:4}).collision(); } });
Crafty.c('Healer', {init: function() {this.requires('NPC2').attr({w:24, h:32, overx:8, overy:3}).collision(); } });

// The player character entity. Super complex!!
Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('Actor, Tween, Player, FourwayFlak, Collision, chardown, vulnerable, SpriteAnimation, Pausable')
        .attr({x: 0, y: 0, w: 36, h: 40, z: 1000, facing: 'down'})
        .attr({alpha: 1.0, name: "Flak"})
        .fourway(4)
        //.multiway(4, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
        .reel("walk_left", 500, 0, 1, 9)//.animate("walk_left", -1)
        .reel("walk_right", 500, 0, 2, 9)
        .reel("walk_up", 500, 0, 3, 8)
        .reel("walk_down", 500, 0, 0, 8)
        .collision([4,4], [32, 4], [32,34], [4,34]) // reduces hitbox to make collision match the sprite better.
                                                    // if there are any issues with collision & movement,
                                                    // revert last 2 y values to 36.
        .bind("NewDirection", function (direction) {
            pushing = 0;
            //if(pushedblock) {this.detach(pushedblock); console.log('detached by direction'); pushedblock = '';}
            if (direction.x < 0) {
                if (!this.isPlaying("walk_left")&&!this.disableControls) {
                    this.pauseAnimation().animate("walk_left", -1);
                    dir.left = true; dir.right = false; facing = 'left'; this.facing = 'left';
                    }
                    /*if(swinging) {
                        Crafty('weapon').attr({
                            rotation: 90, 
                            x: Crafty('player').x, 
                            y: Crafty('player').y+Crafty('player').h/2-Crafty('weapon').w/2
                            });
                        }*/
            }
            if (direction.x > 0) {
                if (!this.isPlaying("walk_right")&&!this.disableControls) {
                    this.pauseAnimation().animate("walk_right", -1);
                    dir.right = true; dir.left = false; facing = 'right'; this.facing = 'right';
                    }
                   /* if(swinging) {
                        Crafty('weapon').attr({
                            rotation: 270, 
                            x: Crafty('player').x+Crafty('player').w, 
                            y: Crafty('player').y+Crafty('player').h/2+Crafty('weapon').w/2
                            });
                        }*/
            }
            if (direction.y < 0) {
                if (!this.isPlaying("walk_up")&&!this.disableControls) {
                    this.pauseAnimation().animate("walk_up", -1);
                    dir.up = true; dir.down = false; facing='up'; this.facing = 'up';
                    }
                  /*  if(swinging) {
                        Crafty('weapon').attr({
                            rotation: 180, 
                            x: Crafty('player').x+Crafty('player').w/2+Crafty('weapon').w/2, 
                            y: Crafty('player').y
                            });
                        }*/
            }
            if (direction.y > 0) {
                if (!this.isPlaying("walk_down")&&!this.disableControls) {
                    this.pauseAnimation().animate("walk_down", -1);
                    dir.down = true; dir.up = false; facing='down'; this.facing = 'down';
                    }
                   /* if(swinging) {
                        Crafty('weapon').attr({
                            rotation: 0, 
                            x: Crafty('player').x+Crafty('player').w/2-Crafty('weapon').w/2, 
                            y: Crafty('player').y+Crafty('player').h
                            });
                        }*/
            }
            if(!direction.x && !direction.y) {
                this.pauseAnimation(); dir.up = false; dir.down = false; dir.left = false; dir.right = false;
            }
        })
        .onHit("Heart", function(data) {
            Crafty.audio.play('gulp');
            refillHearts(data[0].obj.value);
            data[0].obj.destroy();
            })
        .onHit("BombDrop", function(data) {
            Crafty.audio.play('pickup');
            data[0].obj.destroy();
            getBombs(data[0].obj.value);
            })
        .onHit("Rupee", function(data) {
            // tell('on exit');
            data[0].obj.attr({z:1002}).tween({y: data[0].obj.y-20}, 31);
            data[0].obj.removeComponent('Rupee') // stop from triggering multiple times
            .timeout(function(){
                Crafty.audio.play('rupee');
                getCoins(data[0].obj.value);
                data[0].obj.destroy();
                }, 60);
            })  
        .onHit("HeartContainer", function(data) {
            // tell('on exit');
            //data[0].obj.attr({z:1002}).tween({y: data[0].obj.y-20}, 1);
            data[0].obj.removeComponent('HeartContainer') // stop from triggering multiple times
            Crafty.audio.play('gulp');
            chestNotice('Heart Container');
            data[0].obj.destroy();
            })  
        .onHit("hole", function(data) {
            current_hole = data[0].obj;
            fall();
            })   
        .onHit("Exit", function(data) {
            trackplayer.x = this.x; trackplayer.y = this.y; // tell (this.x +', '+ this.y);
            Crafty.scene(data[0].obj.direction);
            })     
      .bind('Moved', function(from) {
            // if for any reason direction is messed up, reset walking animation and facing
            // need to find a way to only do this if a player is moving himself with the controls :)
            // unless all non-controlled movement will be done with tween or something, which is possible 
            if(from.y<this.y&&!this.isPlaying()) {this.animate("walk_down", -1); facing="down";}
            if(from.y>this.y&&!this.isPlaying()) {this.animate("walk_up", -1); facing="up";}
            if(from.x>this.x&&!this.isPlaying()) {this.animate("walk_left", -1); facing="left";}
            if(from.x<this.x&&!this.isPlaying()) {this.animate("walk_right", -1); facing="right"}
    
          if(this.hit('Painful')&&this.has('vulnerable')){
               tell('ouch!'); Crafty.audio.play('ow');
               damagePlayer(this.hit('Painful')[0].obj.strength);
            }
           if(this.hit('Solid')){
                if(this.hit('poi')){
                    var herp = this.hit('poi');
                    interlocutor = herp[0].obj;
                    //console.log(interlocutor);
                    }
                else {interlocutor = false;}
                if(this.hit('pushable')){
                    pushing++; //console.log(pushing)
                    var derp = this.hit('pushable'); 
                    var block = derp[0].obj;
                    this.attr({x: from.x, y:from.y});
                    
                    if(pushing>14 && block.slide == facing && block.x < block.maxX && block.x > block.minX && block.y < block.maxY && block.y > block.minY) {
                        world[block.at().x][block.at().y] = 0;
                        this.attach(block); pushedblock = block; tell("attached");
                        
                        // need to pause the player properly here, 
                        // right now things can get funky fast with pausing/actions :p
                            // OK, fixed I think!!
                        
                        disableActions();
                        player.disableControl().timeout(function(){player.enableControl();enableActions();}, 300);
                        
                        // play pushing animations, shove player along with block
                        if(facing=='left') {player.tween({x:player.x-40}, 300).animate("walk_left", -1);}
                        if(facing=='right') {player.tween({x:player.x+40}, 300).animate("walk_right", -1);}
                        if(facing=='up') {player.tween({y:player.y-40}, 300).animate("walk_up", -1);}
                        if(facing=='down') {player.tween({y:player.y+40}, 300).animate("walk_down", -1);}
                        
                        block.bind("Move", this.checkBlock);/*function() {
                            this.detach(derp[0].obj); this.unbind("EnterFrame"); console.log('detached');
                            }*/
                        }
                    }
               else {this.attr({x: from.x, y:from.y});}
            }
            else {interlocutor = false;}
        })
      ;
      
  },
  checkBlock: function(data) {
    if(pushedblock.x >= pushedblock.maxX || pushedblock.x <= pushedblock.minX || pushedblock.y >= pushedblock.maxY || pushedblock.y <= pushedblock.minY) {
        Crafty('Player').detach(pushedblock); console.log('detached by distance');
        if(pushedblock.trigger) {eval(pushedblock.interact);}
        var newx = pushedblock.x/40; 
        var newy = pushedblock.y/40;
        world[newx][newy] = 3;
        pushedblock.unbind('Move'); pushedblock = ''; 
        }
    }
});