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
      if(this.overx) {x = this.x+this.overx; this.attr({x: x});}
      if(this.overy) {y = this.y+this.overy; this.attr({y: y});}
      return this;
    }
  }
});
 
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

// The player character entity. Super complex!!
Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('Actor, Tween, player, Fourway, Collision, chardown, vulnerable, SpriteAnimation, Pausable')
        .attr({x: 0, y: 0, w: 36, h: 40, z: 1000})
        .attr({alpha: 1.0, name: "Flak"})
        .fourway(4)
        //.multiway(4, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})
        .animate("walk_left", 0, 1, 8)
        .animate("walk_right", 0, 2, 8)
        .animate("walk_up", 0, 3, 7)
        .animate("walk_down", 0, 0, 7)
        .collision([4,4], [32, 4], [32,34], [4,34]) // reduces hitbox to make collision match the sprite better.
                                                    // if there are any issues with collision & movement,
                                                    // revert last 2 y values to 36.
        .bind("NewDirection", function (direction) {
            pushing = 0;
            if(pushedblock) {this.detach(pushedblock); console.log('detached by direction'); pushedblock = '';}
            if (direction.x < 0) {
                if (!this.isPlaying("walk_left"))
                    this.stop().animate("walk_left", 10, -1);
                    dir.left = true; dir.right = false; facing = 'left';
                    /*if(swinging) {
                        Crafty('weapon').attr({
                            rotation: 90, 
                            x: Crafty('player').x, 
                            y: Crafty('player').y+Crafty('player').h/2-Crafty('weapon').w/2
                            });
                        }*/
            }
            if (direction.x > 0) {
                if (!this.isPlaying("walk_right"))
                    this.stop().animate("walk_right", 10, -1);
                    dir.right = true; dir.left = false; facing = 'right';
                   /* if(swinging) {
                        Crafty('weapon').attr({
                            rotation: 270, 
                            x: Crafty('player').x+Crafty('player').w, 
                            y: Crafty('player').y+Crafty('player').h/2+Crafty('weapon').w/2
                            });
                        }*/
            }
            if (direction.y < 0) {
                if (!this.isPlaying("walk_up"))
                    this.stop().animate("walk_up", 10, -1);
                    dir.up = true; dir.down = false; facing='up';
                  /*  if(swinging) {
                        Crafty('weapon').attr({
                            rotation: 180, 
                            x: Crafty('player').x+Crafty('player').w/2+Crafty('weapon').w/2, 
                            y: Crafty('player').y
                            });
                        }*/
            }
            if (direction.y > 0) {
                if (!this.isPlaying("walk_down"))
                    this.stop().animate("walk_down", 10, -1);
                    dir.down = true; dir.up = false; facing='down';
                   /* if(swinging) {
                        Crafty('weapon').attr({
                            rotation: 0, 
                            x: Crafty('player').x+Crafty('player').w/2-Crafty('weapon').w/2, 
                            y: Crafty('player').y+Crafty('player').h
                            });
                        }*/
            }
            if(!direction.x && !direction.y) {
                this.stop(); dir.up = false; dir.down = false; dir.left = false; dir.right = false;
            }
        })
        .onHit("Heart", function(data) {
            Crafty.audio.play('gulp');
            refillHearts(data[0].obj.value);
            data[0].obj.destroy();
            })
        .onHit("Rupee", function(data) {
            // tell('on exit');
            data[0].obj.attr({z:1002}).tween({y: data[0].obj.y-20}, 1);
            data[0].obj.removeComponent('Rupee') // stop from triggering multiple times
            .timeout(function(){
                Crafty.audio.play('rupee');
                getCoins(data[0].obj.value);
                data[0].obj.destroy();
                }, 60);
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
           if(this.hit('Monster')&&this.has('vulnerable')){
               tell('ouch!');
               damagePlayer(this.hit('Monster')[0].obj.strength);
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
                        this.attach(block); pushedblock = block;
                        block.bind("Change", this.checkBlock);/*function() {
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
        Crafty('player').detach(pushedblock); console.log('detached by distance');
        if(pushedblock.trigger) {eval(pushedblock.interact);}
        pushedblock.unbind('Change'); pushedblock = '';
        }
    }
});