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

// Grass --> Sand transition tiles
Crafty.c('GrassL', {init: function() {this.requires('Actor, grassL');},});
Crafty.c('GrassR', {init: function() {this.requires('Actor, grassR');},});
Crafty.c('GrassT', {init: function() {this.requires('Actor, grassT');},});
Crafty.c('GrassB', {init: function() {this.requires('Actor, grassB');},});

Crafty.c('GrassTL', {init: function() {this.requires('Actor, grassTL');},});
Crafty.c('GrassBL', {init: function() {this.requires('Actor, grassBL');},});
Crafty.c('GrassTR', {init: function() {this.requires('Actor, grassTR');},});
Crafty.c('GrassBR', {init: function() {this.requires('Actor, grassBR');},});

// Bones, remains, etc., for use in dungeons and lairs
Crafty.c('Remains1', {init: function() {this.requires('Actor, remains1');},});
Crafty.c('Remains2', {init: function() {this.requires('Actor, remains2');},});
Crafty.c('Remains3', {init: function() {this.requires('Actor, remains3');},});
Crafty.c('Remains4', {init: function() {this.requires('Actor, remains4');},});
Crafty.c('Remains5', {init: function() {this.requires('Actor, remains5');},});
Crafty.c('Remains6', {init: function() {this.requires('Actor, remains6');},});

// Basic Wall component
Crafty.c('Wall', {init: function() {this.requires('Barricade');}, });
// Basic Door component
Crafty.c('Door', {init: function() {this.requires('Barricade');}, });
// Dungeon Walls
Crafty.c('WallL', {init: function() {this.requires('Wall, wallL').attr({h:40, w:40}).collision([0, 0], [16, 0], [16, 40], [0, 40]);},});
Crafty.c('WallR', {init: function() {this.requires('Wall, wallR').attr({h:40, w:40}).collision([24, 0], [40, 0], [40, 40], [24, 40]);},});
Crafty.c('WallT', {init: function() {this.requires('Wall, wallT').attr({h:40, w:40}).collision();},});
Crafty.c('WallB', {init: function() {this.requires('Wall, wallB').attr({h:40, w:40}).collision();},});
Crafty.c('WallTL', {init: function() {this.requires('Wall, wallTL').attr({h:40, w:40}).collision();},});
Crafty.c('WallTR', {init: function() {this.requires('Wall, wallTR').attr({h:40, w:40}).collision();},});
Crafty.c('WallBL', {init: function() {this.requires('Wall, wallBL').attr({h:40, w:40}).collision();},});
Crafty.c('WallBR', {init: function() {this.requires('Wall, wallBR').attr({h:40, w:40}).collision();},});
// Dungeon Doors
Crafty.c('DoorT', {init: function() {this.requires('Door, doorT').attr({h:40, w:40}).collision();},});
Crafty.c('DoorB', {init: function() {this.requires('Door, doorB').attr({h:40, w:40}).collision();},});
Crafty.c('DoorL', {init: function() {this.requires('Door, doorL').attr({h:40, w:40}).collision().collision([0, 0], [16, 0], [16, 40], [0, 40]);},});
Crafty.c('DoorR', {init: function() {this.requires('Door, doorR').attr({h:40, w:40}).collision().collision([24, 0], [40, 0], [40, 40], [24, 40]);},});

// Basic water component
Crafty.c('Water', {
  init: function() {
    this.requires('Actor, Solid, Collision').attr({h:40, w:40});
  },
});

Crafty.c('WaterTL', {
    init: function() {
        this.requires('Water, waterTL').collision([30,20], [40, 20], [40, 40], [20, 40], [20, 30]);
    },
});

Crafty.c('WaterT', {
    init: function() {
        this.requires('Water, waterT').collision([0,20], [40, 20], [40, 40], [0, 40]);
    },
});


Crafty.c('WaterTR', {
    init: function() {
        this.requires('Water, waterTR').collision([0,20], [10, 20], [20, 30], [20, 40], [0, 40]);
    },
});

Crafty.c('WaterR', {
    init: function() {
        this.requires('Water, waterR').collision([0, 0], [20, 0], [20, 40], [0, 40]);
    },
});

Crafty.c('WaterBR', {
    init: function() {
        this.requires('Water, waterBR').collision([0,0], [20, 0], [20,10], [10, 20], [0, 20]);
    },
});

Crafty.c('WaterB', {
    init: function() {
        this.requires('Water, waterB').collision([0,0], [40, 0], [40, 20], [0, 20]);
    },
});

Crafty.c('WaterBL', {
    init: function() {
        this.requires('Water, waterBL').collision([20,0], [40, 0], [40, 20], [30, 20], [20, 10]);
    },
});

Crafty.c('WaterL', {
    init: function() {
        this.requires('Water, waterL').collision([20,0], [40, 0], [40, 40], [20, 40]);
    },
});
Crafty.c('WaterM', {
    init: function() {
        this.requires('Water, waterM').collision();
    },
});

Crafty.c('SandTLw', {init: function() {this.requires('Water, sandTLw').collision([0,0], [40, 0], [40, 10], [10, 40], [0, 40]);},});
Crafty.c('SandTRw', {init: function() {this.requires('Water, sandTRw').collision([0,0], [40, 0], [40, 40], [30, 40], [0, 10]);},});
Crafty.c('SandBRw', {init: function() {this.requires('Water, sandBRw').collision([30,0], [40, 0], [40, 40], [0, 40], [0, 30]);},});
Crafty.c('SandBLw', {init: function() {this.requires('Water, sandBLw').collision([0,0], [10, 0], [40, 30], [40, 40], [0, 40]);},});

Crafty.c('SandTLg', {init: function() {this.requires('Actor, sandTLg');},});
Crafty.c('SandTRg', {init: function() {this.requires('Actor, sandTRg');},});
Crafty.c('SandBRg', {init: function() {this.requires('Actor, sandBRg');},});
Crafty.c('SandBLg', {init: function() {this.requires('Actor, sandBLg');},});
 
// An EXIT is just an Actor with a certain color
Crafty.c('Exit', {
  init: function() {
    this.requires('Actor, Color')
        .attr({overx: 10, overy: 10, h: 20, w: 20})
      .color('rgb(0, 0, 0)');
  },
});
 
// A Grass is just an Actor with a certain color
Crafty.c('Grass', {
  init: function() {
    this.requires('Actor, grass')
  //.color('rgb(20, 125, 40)');
  },
});

// A Sand is just an Actor with a certain color
Crafty.c('Sand', {
  init: function() {
    this.requires('Actor, sand')
  //.color('rgb(20, 125, 40)');
  },
});
 
// A Grass is just an Actor with a certain color
Crafty.c('Cobble_Dark', {
  init: function() {
    this.requires('Actor, cobble_dark')
  //.color('rgb(20, 125, 40)');
  },
});

// Basic building block for anything that occupies a full square and blocks attacks
Crafty.c('Barricade', { init: function() { this.requires('Actor, Solid, Collision, Guard'); }, }); 
 
// Tree
Crafty.c('Tree', { init: function() { this.requires('Barricade, tree').collision(); }, }); 
// Walkable Tree
Crafty.c('TreeWalkable', { init: function() { this.requires('Actor, tree'); }, });
// Cactus
Crafty.c('Cactus', { init: function() { this.requires('Barricade, cactus').collision(); }, }); 
// Bush
Crafty.c('Bush', { init: function() { this.requires('Actor, Solid, bush, Collision').collision(); }, });
// When you chop down a bush, you make a dead bush
Crafty.c('BushDead', { init: function() { this.requires('Actor, bush_dead') }, });

// Tile for Hell
Crafty.c('FireT', {
  init: function() {
    this.requires('Actor, fireT')
  },
});
// Fire sprite for Hell
Crafty.c('Fire', {
  init: function() {
    this.requires('Actor, Solid, fire, Collision, SpriteAnimation').attr({h:40, w:40}).collision()
        .animate("blaze", 0, 0, 4).animate("blaze", 16, -1);
  },
}); 



// A NPC is just an Actor with a certain color, and dialogue.
Crafty.c('NPC', {
  init: function() {
    this.requires('Actor, Color, Solid, poi, Collision').collision()
      .color('rgb(255, 185, 40)');
  },
});

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
        .collision([4,4], [32, 4], [32,34], [4,34]) // reduce hitbox to make collision match the sprite better
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

Crafty.c('Rock', {
  init: function() {
    this.requires('Actor, Color, Solid, Collision, Guard, rock')
      .color('rgb(150, 125, 40)').collision();
  }
});

Crafty.c('RockP', {
  init: function() {
    this.requires('Actor, Color, Solid, Collision, rock, Guard, pushable')
      .color('rgb(150, 125, 40)').collision()
      .bind('Moved', function(from) {
            console.log(from);
           if(this.hit('Solid')){
                this._parent.detach(this); console.log(this._parent);
               this.attr({x: from.x, y:from.y});
            }
        })
      ;
  }
});

Crafty.c('Hole1', {
  init: function() {
    this.requires('Actor, Collision, Tween, hole, pit')
        .attr({w:40, h:40})
        //.color('rgb(0,0,0)')
        .collision([8,8], [32, 8], [32, 16], [8, 16]);
  }
});

Crafty.c('Hole', {
  init: function() {
    this.requires('Actor, Color, Collision, Tween, hole')
        .attr({w:40, h:40, interact:"fallEndless(current_scene);"})
        .color('rgb(0,0,0)')
        .collision([0,4], [40, 4], [40, 16], [0, 16]);
  }
});