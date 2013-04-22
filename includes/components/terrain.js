// Tiles
// Overworld
// Grass
Crafty.c('Grass', {init: function() {this.requires('Actor, grass');},});
// Grass --> Sand transition tiles || Corners are for grass surrounded by sand
Crafty.c('GrassL', {init: function() {this.requires('Actor, grassL');},});
Crafty.c('GrassR', {init: function() {this.requires('Actor, grassR');},});
Crafty.c('GrassT', {init: function() {this.requires('Actor, grassT');},});
Crafty.c('GrassB', {init: function() {this.requires('Actor, grassB');},});
Crafty.c('GrassTL', {init: function() {this.requires('Actor, grassTL');},});
Crafty.c('GrassBL', {init: function() {this.requires('Actor, grassBL');},});
Crafty.c('GrassTR', {init: function() {this.requires('Actor, grassTR');},});
Crafty.c('GrassBR', {init: function() {this.requires('Actor, grassBR');},});

// Sand
Crafty.c('Sand', {init: function() {this.requires('Actor, sand');},});
// Corners for sand surrounded by grass
Crafty.c('SandTLg', {init: function() {this.requires('Actor, sandTLg');},});
Crafty.c('SandTRg', {init: function() {this.requires('Actor, sandTRg');},});
Crafty.c('SandBRg', {init: function() {this.requires('Actor, sandBRg');},});
Crafty.c('SandBLg', {init: function() {this.requires('Actor, sandBLg');},});

// Bones, remains, etc., for use in dungeons and lairs
Crafty.c('Remains1', {init: function() {this.requires('Actor, remains1');},});
Crafty.c('Remains2', {init: function() {this.requires('Actor, remains2');},});
Crafty.c('Remains3', {init: function() {this.requires('Actor, remains3');},});
Crafty.c('Remains4', {init: function() {this.requires('Actor, remains4');},});
Crafty.c('Remains5', {init: function() {this.requires('Actor, remains5');},});
Crafty.c('Remains6', {init: function() {this.requires('Actor, remains6');},});

// Water
// Basic water component
Crafty.c('Water', {init: function() {this.requires('Actor, Solid, Collision').attr({h:40, w:40});},});
// Water: Top Left clockwise through Left; plus Middle || Corners are for water surrounded by sand
Crafty.c('WaterTL', {init: function() {this.requires('Water, waterTL').collision([30,20], [40, 20], [40, 40], [20, 40], [20, 30]);},});
Crafty.c('WaterT', {init: function() {this.requires('Water, waterT').collision([0,20], [40, 20], [40, 40], [0, 40]);},});
Crafty.c('WaterTR', {init: function() {this.requires('Water, waterTR').collision([0,20], [10, 20], [20, 30], [20, 40], [0, 40]);},});
Crafty.c('WaterR', {init: function() {this.requires('Water, waterR').collision([0, 0], [20, 0], [20, 40], [0, 40]);},});
Crafty.c('WaterBR', {init: function() {this.requires('Water, waterBR').collision([0,0], [20, 0], [20,10], [10, 20], [0, 20]);},});
Crafty.c('WaterB', {init: function() {this.requires('Water, waterB').collision([0,0], [40, 0], [40, 20], [0, 20]);},});
Crafty.c('WaterBL', {init: function() {this.requires('Water, waterBL').collision([20,0], [40, 0], [40, 20], [30, 20], [20, 10]);},});
Crafty.c('WaterL', {init: function() {this.requires('Water, waterL').collision([20,0], [40, 0], [40, 40], [20, 40]);},});
Crafty.c('WaterM', {init: function() {this.requires('Water, waterM').collision();},});

// Corners for sand surrounded by water
Crafty.c('SandTLw', {init: function() {this.requires('Water, sandTLw').collision([0,0], [40, 0], [40, 10], [10, 40], [0, 40]);},});
Crafty.c('SandTRw', {init: function() {this.requires('Water, sandTRw').collision([0,0], [40, 0], [40, 40], [30, 40], [0, 10]);},});
Crafty.c('SandBRw', {init: function() {this.requires('Water, sandBRw').collision([30,0], [40, 0], [40, 40], [0, 40], [0, 30]);},});
Crafty.c('SandBLw', {init: function() {this.requires('Water, sandBLw').collision([0,0], [10, 0], [40, 30], [40, 40], [0, 40]);},});

// Dungeons
// Dark Cobblestone for Dungeon Tiles
Crafty.c('Cobble_Dark', {init: function() {this.requires('Actor, cobble_dark');},});

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
 
 
// Props
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

// A rock is a barricade that looks like a Link to the Past ziggurat.
Crafty.c('Rock', {init: function() {this.requires('Barricade, rock').collision();},});
// Literally exactly the same as a rock, but pushable.
Crafty.c('RockP', {init: function() {this.requires('Rock, pushable').collision();},});


// Hell (Defeat Screen)
// Hell Tile
Crafty.c('FireT', {init: function() {this.requires('Actor, fireT')},});
// Fire sprite for Hell
Crafty.c('Fire', {
  init: function() {
    this.requires('Actor, Solid, fire, Collision, SpriteAnimation').attr({h:40, w:40}).collision()
        .animate("blaze", 0, 0, 4).animate("blaze", 16, -1);
  },
}); 

// Normal holes and chasms.
Crafty.c('Hole', {
  init: function() {
    this.requires('Actor, Color, Collision, Tween, hole')
        .attr({w:40, h:40, interact:"fallEndless(current_scene);"})
        .color('rgb(0,0,0)').collision([0,4], [40, 4], [40, 16], [0, 16]);
  }
});

// Special pits.
Crafty.c('Hole1', {
  init: function() {
    this.requires('Actor, Collision, Tween, hole, pit')
        .attr({w:40, h:40})
        .collision([8,8], [32, 8], [32, 16], [8, 16]);
  }
});
