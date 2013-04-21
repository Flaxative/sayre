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

// Basic Rupee component
Crafty.c('Rupee', {init: function() {this.requires('Actor, SpriteAnimation, Collision, Tween').attr({rotation: 0, overx: 12, overy: 6}); } });

Crafty.c('RupeeG', {
    init: function() {
        this.requires('Rupee, rupeeG1').attr({value: 1})
        .animate("shine", 0, 0, 2).animate("shine", 24, -1)
        .attr({w: 16, h: 28})
        .collision([8, 0], [16, 8], [16, 20], [8, 28], [0, 20], [0, 8]);
        }
    });
Crafty.c('RupeeB', {
    init: function() {
        this.requires('Rupee, rupeeB1').attr({value: 5})
        .animate("shine", 3, 0, 5).animate("shine", 24, -1)
        .attr({w: 16, h: 28})
        .collision([8, 0], [16, 8], [16, 20], [8, 28], [0, 20], [0, 8]);
        }
    }); 
Crafty.c('RupeeR', {
    init: function() {
        this.requires('Rupee, rupeeR1').attr({value: 10})
        .animate("shine", 6, 0, 8).animate("shine", 24, -1)
        .attr({w: 16, h: 28})
        .collision([8, 0], [16, 8], [16, 20], [8, 28], [0, 20], [0, 8]);
        }
    });