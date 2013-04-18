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
 
// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

// Grass - to - Sand
Crafty.c('GrassL', {init: function() {this.requires('Actor, grassL');},});
Crafty.c('GrassR', {init: function() {this.requires('Actor, grassR');},});
Crafty.c('GrassT', {init: function() {this.requires('Actor, grassT');},});
Crafty.c('GrassB', {init: function() {this.requires('Actor, grassB');},});

Crafty.c('GrassTL', {init: function() {this.requires('Actor, grassTL');},});
Crafty.c('GrassBL', {init: function() {this.requires('Actor, grassBL');},});
Crafty.c('GrassTR', {init: function() {this.requires('Actor, grassTR');},});
Crafty.c('GrassBR', {init: function() {this.requires('Actor, grassBR');},});

Crafty.c('Remains1', {init: function() {this.requires('Actor, remains1');},});
Crafty.c('Remains2', {init: function() {this.requires('Actor, remains2');},});
Crafty.c('Remains3', {init: function() {this.requires('Actor, remains3');},});
Crafty.c('Remains4', {init: function() {this.requires('Actor, remains4');},});
Crafty.c('Remains5', {init: function() {this.requires('Actor, remains5');},});
Crafty.c('Remains6', {init: function() {this.requires('Actor, remains6');},});

Crafty.c('Wall', {init: function() {this.requires('Actor, Solid, Collision, Guard');}, });
Crafty.c('Door', {init: function() {this.requires('Actor, Solid, Collision, Guard');}, });
// Dungeon Walls
Crafty.c('WallL', {init: function() {this.requires('Wall, wallL').attr({h:40, w:40}).collision([0, 0], [16, 0], [16, 40], [0, 40]);},});
Crafty.c('WallR', {init: function() {this.requires('Wall, wallR').attr({h:40, w:40}).collision([24, 0], [40, 0], [40, 40], [24, 40]);},});
Crafty.c('WallT', {init: function() {this.requires('Wall, wallT').attr({h:40, w:40}).collision();},});
Crafty.c('WallB', {init: function() {this.requires('Wall, wallB').attr({h:40, w:40}).collision();},});

Crafty.c('WallTL', {init: function() {this.requires('Wall, wallTL').attr({h:40, w:40}).collision();},});
Crafty.c('WallTR', {init: function() {this.requires('Wall, wallTR').attr({h:40, w:40}).collision();},});
Crafty.c('WallBL', {init: function() {this.requires('Wall, wallBL').attr({h:40, w:40}).collision();},});
Crafty.c('WallBR', {init: function() {this.requires('Wall, wallBR').attr({h:40, w:40}).collision();},});

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
 
// A Tree is just an Actor with a certain color
Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Solid, tree, Collision, Guard').collision()
    //  .color('rgb(20, 125, 40)');
  },
}); 

// A Fire Tile is just an Actor with a certain color
Crafty.c('FireT', {
  init: function() {
    this.requires('Actor, fireT')
  //.color('rgb(20, 125, 40)');
  },
});
// A Fire is just an Actor with a certain color
Crafty.c('Fire', {
  init: function() {
    this.requires('Actor, Solid, fire, Collision, SpriteAnimation').attr({h:40, w:40}).collision()
        .animate("blaze", 0, 0, 4).bind("EnterFrame", function() {
                if (!this.isPlaying("blaze"))
                    this.stop().animate("blaze", 16, -1);
            });
    //  .color('rgb(20, 125, 40)');
  },
}); 
// A Tree is just an Actor with a certain color
Crafty.c('TreeWalkable', {
  init: function() {
    this.requires('Actor, tree');
    //  .color('rgb(20, 125, 40)');
  },
});
// A Cactus is just an Actor with a certain color
Crafty.c('Cactus', {
  init: function() {
    this.requires('Actor, Solid, cactus, Collision').collision()
    //  .color('rgb(20, 125, 40)');
  },
});
 
// A Bush is just an Actor with a certain color
Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Solid, bush, Collision').collision()
     // .color('rgb(20, 185, 40)');
  },
});
 
// A Bush is just an Actor with a certain color
Crafty.c('BushDead', {
  init: function() {
    this.requires('Actor, bush_dead')
     // .color('rgb(20, 185, 40)');
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
        .collision([4,4], [32, 4], [32,36], [4,36]) // reduce hitbox to make collision match the sprite better
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
       /* .onHit("pushable", function(data) {
            console.log(data[0].obj.slide);
            if(data[0].obj.slide == facing) {
                this.attach(data[0].obj);
                this.bind("NewDirection", function() {
                    this.detach(data[0].obj); console.log('detached');
                    });
                }
            })*/
        .onHit("Rupee", function(data) {
            // tell('on exit');
            data[0].obj.tween({y: data[0].obj.y-20}, 1);
            data[0].obj.removeComponent('Rupee') // stop from triggering multiple times
                .timeout(function(){coins += data[0].obj.value; updateCoins();
            Crafty.audio.play('rupee');
            data[0].obj.destroy();}, 60);
            })  
        .onHit("hole", function(data) {
            // tell('on exit');
            current_hole = data[0].obj;
            fall();
            })   
        .onHit("Exit", function(data) {
            // tell('on exit');
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
                else {interlocutor = false; //console.log(interlocutor);
                    }
                if(this.hit('pushable')){
                    pushing++; //console.log(pushing)
                    var derp = this.hit('pushable'); 
                    var block = derp[0].obj;
                    this.attr({x: from.x, y:from.y});
                    
                    if(pushing>14 && block.slide == facing && block.x < block.maxX && block.x > block.minX && block.y < block.maxY && block.y > block.minY) {
                        this.attach(block); pushedblock = block;
                        block.bind("Change", this.test);/*function() {
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
  test: function(data) {
    if(pushedblock.x >= pushedblock.maxX || pushedblock.x <= pushedblock.minX || pushedblock.y >= pushedblock.maxY || pushedblock.y <= pushedblock.minY) {
        Crafty('player').detach(pushedblock); console.log('detached by distance');
        if(pushedblock.trigger) {eval(pushedblock.interact);}
        pushedblock.unbind('Change'); pushedblock = '';
        }
    }
});

Crafty.c('Rupee', {
    init: function() {
        this.requires('Actor, SpriteAnimation, Collision, Tween');
        }
    });

Crafty.c('RupeeG', {
    init: function() {
        this.requires('Rupee, rupeeG1').attr({value: 1})
        .animate("shine", 0, 0, 2).animate("shine", 24, -1)
        .attr({w: 16, h: 28, z: 1002, rotation: 0, overx: 12, overy: 6})
        .collision([8, 0], [16, 8], [16, 20], [8, 28], [0, 20], [0, 8]);
        }
    });

Crafty.c('RupeeB', {
    init: function() {
        this.requires('Rupee, rupeeB1').attr({value: 5})
        .animate("shine1", 3, 0, 5).animate("shine1", 24, -1)
        .attr({w: 16, h: 28, z: 1002, rotation: 0, overx: 12, overy: 6})
        .collision([8, 0], [16, 8], [16, 20], [8, 28], [0, 20], [0, 8]);
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

Crafty.c('Pausable', {
    paused: false,
    init: function() {
    this.bind("Pause", this.pause)
    .bind("Run", this.run);
        },
    pause: function() {
        this.paused = true; //console.log(this.paused)
        },
    run: function() {
        this.paused = false; //console.log(this.paused);
        },
    });

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
Crafty.c('Monster', {
  init: function() {
    this.requires('Actor, Collision, Pausable');
  },
  pause: function() {
    this.paused = true; console.log(this.paused)
    },
  run: function() {
    this.paused = false; console.log(this.paused);
    },
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
    
// Slime
Crafty.c('SlimeBase', {
  init: function() {
    this.requires('Monster, RandomAI, ooze, slimedown, SpriteAnimation')
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

Crafty.c('Weapon', {
    init: function() {
        this.requires("Actor, Collision, SpriteAnimation, Tween")
        .onHit('Monster', function(data) {
            if(this.hit('Guard')) {potent = false;} // block attacks that pass through "guards"
            if(potent) {potent = false;             // make sure we don't hit once per frame!
            //console.log(this.damage);
            //console.log(data[0].obj.hp);
            data[0].obj.hp -= this.damage; 
            if(data[0].obj.hp<1) {killMonster(data[0].obj);}
                }
            //this.unbind("EnterFrame");
            });
        }
    });

Crafty.c('Wooden Sword', {
    init: function() {
        this.requires("Weapon, wooden_sword")
        .attr({h: 30, w: 10, damage: 5, z: 2, length: 30}).collision()
        .animate("swing", 0, 0, 2)
        .onHit('Bush', function(data) {
            if(potent) {potent = false;
                Crafty.e('BushDead').attr({x:data[0].obj.x, y:data[0].obj.y});            
                var loot_result = Math.floor((Math.random()*2)+1); console.log(loot_result);
                var loot_table = ['', 'RupeeG'];
                if(!loot_table[loot_result]) {return;}
                else { if(loot_table[loot_result]=='RupeeG') {Crafty.e('RupeeG').attr({x:data[0].obj.x+12, y:data[0].obj.y+6});} }
                }
            data[0].obj.destroy();
            })
        ;
        },
    });


Crafty.c('Longspear', {
    init: function() {
        this.requires("Weapon, longspear")
        .attr({h: 60, w: 6, damage: 3, z: 2, length: 60}).collision()
        ;
        },
    });