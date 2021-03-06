// Basic Heart component
Crafty.c('Heart', { init: function() { this.requires('Actor, Collision, Tween').attr({h: 14, overy: 13}); } });

Crafty.c('HeartFull', {
    init: function() {
        this.requires('Heart, refill_heart').attr({value: 22, w: 16, overx: 12}).collision();
        }
    });
Crafty.c('HeartHalf', {
    init: function() {
        this.requires('Heart, refill_half').attr({value: 11, w: 8, overx: 16}).collision();
        }
    });

// Heart Container in the Wild
Crafty.c('HeartContainer', {
    init: function() {
        this.requires('Actor, Collision, Tween, heart_container')
        .attr({rotation: 0, overx: 6, overy: 5, w: 30, h: 28}).collision();
        } 
    });

// Basic Bomb component
Crafty.c('BombDrop', {init: function() {this.requires('Actor, SpriteAnimation, Collision, Tween, bomb_drop').attr({rotation: 0, overx: 10, overy: 10, w: 19, h: 20, value: 1}); } });

// Basic Rupee component
Crafty.c('Rupee', {init: function() {this.requires('Actor, SpriteAnimation, Collision, Tween').attr({rotation: 0, overx: 12, overy: 6}); } });

Crafty.c('RupeeG', {
    init: function() {
        this.requires('Rupee, rupeeG1').attr({value: 1})
        .reel("shine", 500, 0, 0, 3).animate("shine", -1)
        .attr({w: 16, h: 28})
        .collision([8, 0], [16, 8], [16, 20], [8, 28], [0, 20], [0, 8]);
        }
    });
Crafty.c('RupeeB', {
    init: function() {
        this.requires('Rupee, rupeeB1').attr({value: 5})
        .reel("shine", 500, 3, 0, 3).animate("shine", -1)
        .attr({w: 16, h: 28})
        .collision([8, 0], [16, 8], [16, 20], [8, 28], [0, 20], [0, 8]);
        }
    }); 
Crafty.c('RupeeY', {
    init: function() {
        this.requires('Rupee, rupeeY1').attr({value: 10})
        .reel("shine", 500, 6, 0, 3).animate("shine", -1)
        .attr({w: 16, h: 28})
        .collision([8, 0], [16, 8], [16, 20], [8, 28], [0, 20], [0, 8]);
        }
    });
Crafty.c('RupeeR', {
    init: function() {
        this.requires('Rupee, rupeeR1').attr({value: 20})
        .reel("shine", 500, 9, 0, 3).animate("shine", -1)
        .attr({w: 16, h: 28})
        .collision([8, 0], [16, 8], [16, 20], [8, 28], [0, 20], [0, 8]);
        }
    });
    
Crafty.c('Chest', {
    init: function() {
        this.requires('Actor, Solid, SpriteAnimation, Collision, chest_closed_up, poi')
        .attr({h: 32, w: 32, overx: 4, overy: 4, direction: "up", interact:"openChest(interlocutor)"})
        .collision([0, 0], [32, 0], [32, 16], [0, 16])  // allow the hero to walk 'onto' the chest a bit
        ;
        }
    });
    
Crafty.c('Reward', {
    init: function() {
        this.requires('2D, DOM').attr({w: 40, h: 40});
        }
    });