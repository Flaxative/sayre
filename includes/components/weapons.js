// Basic Weapon component
// initializes modules for all weapons, and enables monster collision
Crafty.c('Weapon', {
    init: function() {
        this.requires("Actor, Collision, SpriteAnimation, Tween")
        .onHit('Guard', function(data) {
            if(potent) { 
                potent = false;
                bounce(data[0].obj.x, data[0].obj.y, data[0].obj.hitNoise);
                }
            })
        .onHit('Monster', function(data) {
            if(this.hit('Guard')) {potent = false;}                 // block attacks that pass through "guards"
            if(potent&&data[0].obj.has('vulnerable')) {potent = false;                             // make sure we only hit once!
                                                                    // console.log(this.damage);
                                                                    // console.log(data[0].obj.hp);
                hurtMonster(data[0].obj);
                Crafty.audio.play(data[0].obj.hitNoise);
                data[0].obj.hp -= this.damage;                      // damage hit monsters
                if(data[0].obj.hp<1) {killMonster(data[0].obj);}    // kill monsters with 0 or fewer HPs
                }
            //this.unbind("EnterFrame");
            });
        }
    });

// wooden sword - a classic!
Crafty.c('Wooden Sword', {
    init: function() {
        this.requires("Weapon, wooden_sword")
        .attr({h: 30, w: 10, damage: 5, z: 2, length: 30, useSpeed: 200}).collision()
        //.reel("swing", 300, 0, 0, 2) // initializes the swing animation (currently not implemented)
        .onHit('Bush', function(data) {
            if(potent) {
                Crafty.e('BushDead').attr({x:data[0].obj.x, y:data[0].obj.y}); // replace with cut bush      
                var loot_result = Math.floor((Math.random()*3)+1);
                var loot_table = Array(4); loot_table[1] = 'RupeeG';
                if(loot_table[loot_result]) {dropLoot(loot_table[loot_result], data[0].obj.x, data[0].obj.y);}
                Crafty.audio.play('bush_hit');
                // missing: somehow tell the game not to repopulate the bush. stop rupee farming.
                }
            data[0].obj.destroy();
            })
        ;
        Crafty.audio.play('sword_swing');
        },
    });

// longspear (placeholder, most likely)
Crafty.c('Longspear', {
    init: function() {
        this.requires("Weapon, longspear")
        .attr({h: 60, w: 6, damage: 3, z: 2, length: 60, useSpeed: 200}).collision()
        ;
        },
    });

// boomerang
Crafty.c('Boomerang', {
    init: function() {
        this.requires("Weapon, boomerang")
        .attr({h: 20, w: 20, damage: 100, z: 2, length: 20, useSpeed: 200}).collision()
        ;
        },
    });
    
// invisible actor that makes sure you don't throw the boomerang too far
Crafty.c('RangeIncrement', {
    init: function() {
        this.requires('Actor, Collision').attr({w:40, h:40}).collision();
        }
    });







// boomerang functions
function chuckBoomerang() {
    has_boomerang = false; swinging = true; potent = true;
    Crafty('Player').disableControl().pauseAnimation();   // pause the player
    disableActions();                           // stop interaction & inventory & pause
    Crafty("Player").addComponent("Shooter").attr({projectile: "BoomerangProjectile", pw: 20, ph: 20}).fireProjectile();
    var RIx = 0; var RIy = 0; //"RI" is Range Increment
    if(Crafty('Player').facing=='left') {RIx = Crafty('Player').x-240; RIy = Crafty('Player').y;}
    else if(Crafty('Player').facing=='right') {RIx = Crafty('Player').x+240; RIy = Crafty('Player').y;}
    else if(Crafty('Player').facing=='up') {RIx = Crafty('Player').x; RIy = Crafty('Player').y-240;}
    else if(Crafty('Player').facing=='down') {RIx = Crafty('Player').x; RIy = Crafty('Player').y+240;}
    Crafty.e("RangeIncrement").attr({x: RIx, y: RIy});
    Crafty.audio.play('boomerang');
    }
function catchBoomerang() {
    has_boomerang = true; swinging = false; 
    Crafty('Player').trigger("Run").enableControl();
    enableActions();
    }

// component for displaying 'ding' & reflection @ location of impact
Crafty.c('Bounce', {
    init: function() {
        this.requires('Actor, SpriteAnimation, bounce').reel("bounce", 140, 0, 0, 2).attr({z: 1003, w: 40, h: 40});
        this.animate("bounce", 1).timeout(function() {this.destroy();}, 140);
        },
    });
    
function bounce(x, y, noise) {
    Crafty.e('Bounce').attr({x: x, y: y});
    Crafty.audio.play(noise);
    }

// Boomerang projectile for Zelda
Crafty.c('BoomerangProjectile', {
    init: function() {
        this.requires('Projectile, projectile, boomerang')
        .reel("rotate", 190, 0, 0, 8)
        .attr({z: 1003, w: 20, h: 20, speed: 6, strength: 3}).collision()
        .onHit("Player", function() {
            // destroy the boomerang projectile and regain the ability to chuck it
            this.unbind("timeout").destroy(); catchBoomerang(); //tell('it returned!');
            })
        // if it hits a heart or rupee, get'em
        .onHit("Heart", function(data) {
            Crafty.audio.play('gulp');
            refillHearts(data[0].obj.value);
            data[0].obj.destroy();
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
        // if it hits a surface, map edge, NPC, or monster, it should bounce back to you
        .onHit("RangeIncrement", function(data) {this.boomerangReturn(data); data[0].obj.destroy();})
        .onHit("Guard", function(data) {this.boomerangReturn(data, data[0].obj.hitNoise);})
        .onHit("NPC", function(data) {this.boomerangReturn(data, 'bounce_quiet');}) // deprecate when you can
        .onHit("NPC2", function(data) {this.boomerangReturn(data, 'bounce_quiet');})
        .onHit("Monster", function(data) {
            if(potent) {potent = false;  
                tell("Stunned!"); // message... until we can actually stun!
                // deal damage || ultimately, should only do this to bats or other weak monsters
                // data[0].obj.hp -= this.strength; if(data[0].obj.hp<1) {killMonster(data[0].obj);}
                Crafty('BoomerangProjectile').boomerangReturn(data, data[0].obj.hitNoise); // bounce back
                }
            });
            this.animate("rotate", -1);
        },
    boomerangReturn: function(data, ricochet) {
        // if boomerang overlaps guard/monster/etc. by too much to bounce back, simply return it
        if(data) {
            if(data[0].overlap<-6) {
                if(ricochet) {
                    if(Crafty('Player').facing=='left') {bounce(Crafty('Player').x-40, Crafty('Player').y, ricochet);}
                    else if(Crafty('Player').facing=='right') {bounce(Crafty('Player').x+30, Crafty('Player').y, ricochet);}
                    else if(Crafty('Player').facing=='up') {bounce(Crafty('Player').x, Crafty('Player').y-40, ricochet);}
                    else if(Crafty('Player').facing=='down') {bounce(Crafty('Player').x, Crafty('Player').y+30, ricochet);}
                    }
                this.destroy(); catchBoomerang(); 
                return;}
            } 
        // otherwise, get variables and begin bouncing
        var boomerang = Crafty('BoomerangProjectile');
        boomerang.cancelSlide(); //tell('yep'); 
        
        if(boomerang.shotDir=='left') {
            if(ricochet) {bounce(this.x-30, this.y-10, ricochet);}
            boomerang.dir=[1,0]; boomerang.shotDir='right';
            }
        else if(boomerang.shotDir=='right') {
            if(ricochet) {bounce(this.x+10, this.y-10, ricochet);} 
            boomerang.dir=[-1,0]; boomerang.shotDir='left';
            }
        else if(boomerang.shotDir=='up') {
            if(ricochet) {bounce(this.x-10, this.y-30, ricochet);} 
            boomerang.dir=[0,1]; boomerang.shotDir='down';
            }
        else if(boomerang.shotDir=='down') {
            if(ricochet) {bounce(this.x-10, this.y+10, ricochet);} 
            boomerang.dir=[0,-1]; boomerang.shotDir='up';
            }
        }
    });
    
    
// BOMBS!
Crafty.c('Bomb', {
    init: function() {
        tell("placed!");
        this.requires('Actor, SpriteAnimation, bomb_placed')
        .reel("commence_detonation", 1000, 0, 0, 16).reel("faster_detonation", 375, 0, 0, 16).attr({z: 1, w: 30, h: 37, overx: 5, overy: 1});
        this.animate("commence_detonation", 1).timeout(function() { // initial, slower animation - play once in 1 second
            this.animate("faster_detonation", 2).timeout(function() { // second, faster animation - play twice in 1 second
                Crafty.e('Bomb Explosion').attr({x: this.x-30, y: this.y-26});
                this.destroy(); // destroy the bomb
                }, 750);
            }, 1000);
        },
    });
    
Crafty.c('Bomb Explosion', {
    init: function() {
        this.requires('Actor, SpriteAnimation, Collision, bomb_explosion')
        .reel("explosion", 500, 0, 0, 10).attr({z: 1, w: 90, h: 92, overx: -25, overy: -25, damage: 10, strength: 22}).collision()
        .onHit('Bush', function(data) { // bombs should destroy plants
            Crafty.e('BushDead').attr({x:data[0].obj.x, y:data[0].obj.y}); // replace with cut bush      
            var loot_result = Math.floor((Math.random()*3)+1);
            var loot_table = Array(4); loot_table[1] = 'RupeeG';
            if(loot_table[loot_result]) {dropLoot(loot_table[loot_result], data[0].obj.x, data[0].obj.y);}
            Crafty.audio.play('bush_hit');
            // missing: somehow tell the game not to repopulate the bush. stop rupee farming.
            data[0].obj.destroy();
            })
        .onHit('Door', function(data) {data[0].obj.open();}) // bombs blow up doors. ultimately they will blow up bomb-specific things instead.
        .onHit('Monster', function(data) {
            if(data[0].obj.has('vulnerable')) {
                hurtMonster(data[0].obj);
                Crafty.audio.play(data[0].obj.hitNoise);
                data[0].obj.hp -= this.damage;                      // damage hit monsters
                if(data[0].obj.hp<1) {killMonster(data[0].obj);}    // kill monsters with 0 or fewer HPs
                }
            })
        .onHit("Player", function() { // bombs should hurt players
            if(Crafty('Player').has('vulnerable')) {
                tell('ouch!'); Crafty.audio.play('ow');
               damagePlayer(this.strength);
                }
            });
        Crafty.audio.play('bomb_explosion');
        this.animate("explosion", 1).timeout(function() { // play the explosion animation
                this.destroy(); // destroy the explosion
            }, 500);
        },
    });