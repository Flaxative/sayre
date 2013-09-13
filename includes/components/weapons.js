// Basic Weapon component
// initializes modules for all weapons, and enables monster collision
Crafty.c('Weapon', {
    init: function() {
        this.requires("Actor, Collision, SpriteAnimation, Tween")
        .onHit('Monster', function(data) {
            if(this.hit('Guard')) {potent = false;}                 // block attacks that pass through "guards"
            if(potent) {potent = false;                             // make sure we only hit once!
                                                                    // console.log(this.damage);
                                                                    // console.log(data[0].obj.hp);
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
        .animate("swing", 0, 0, 2) // initializes the swing animation (currently not implemented)
        .onHit('Bush', function(data) {
            if(potent) {
                Crafty.e('BushDead').attr({x:data[0].obj.x, y:data[0].obj.y}); // replace with cut bush      
                var loot_result = Math.floor((Math.random()*3)+1);
                var loot_table = Array(4); loot_table[1] = 'RupeeG';
                if(loot_table[loot_result]) {dropLoot(loot_table[loot_result], data[0].obj.x, data[0].obj.y);}
                // missing: somehow tell the game not to repopulate the bush. stop rupee farming.
                }
            data[0].obj.destroy();
            })
        ;
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

// longspear (placeholder, most likely)
Crafty.c('Boomerang', {
    init: function() {
        this.requires("Weapon, boomerang")
        .attr({h: 20, w: 20, damage: 100, z: 2, length: 20, useSpeed: 200}).collision()
        ;
        },
    });
    











// boomerang functions
function chuckBoomerang() {
    has_boomerang = false;
    swinging = true; potent = true;             // enable attacks
    Crafty('player').disableControl().stop();   // pause the player
    disableActions();                           // stop interaction & inventory & pause
    Crafty("player").addComponent("Shooter").attr({projectile: "BoomerangProjectile", pw: 20, ph: 20}).fireProjectile();
    }
function catchBoomerang() {
    has_boomerang = true;
    swinging = false; 
    Crafty('player').trigger("Run").fourway(speed);
    enableActions();
    }

// Boomerang projectile for Zelda
Crafty.c('BoomerangProjectile', {
    init: function() {
        this.requires('Projectile, projectile, boomerang')
        .animate("rotate", 0, 0, 7)
        .attr({z: 1003, w: 20, h: 20, speed: 6, strength: 3}).collision()
        .onHit("player", function() {
            // destroy the boomerang projectile and regain the ability to chuck it
            this.destroy(); catchBoomerang(); //tell('it returned!');
            })
        // if it hits a heart or rupee, get'em
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
        // if it hits a surface, map edge, or monster, it should bounce back to you
        .onHit("Guard", function(data) {this.boomerangReturn(data);})
        .onHit("Exit", function(data) {this.boomerangReturn(data);})
        .onHit("Monster", function(data) {
            if(potent) {potent = false;  
                tell("Stunned!"); // message... until we can actually stun!
                // deal damage || ultimately, should only do this to bats or other weak monsters
                // data[0].obj.hp -= this.strength; if(data[0].obj.hp<1) {killMonster(data[0].obj);}
                Crafty('BoomerangProjectile').boomerangReturn(data); // bounce back
                }
            });
            this.animate("rotate", 6, -1);
        },
    boomerangReturn: function(data) {
        // if boomerang overlaps guard/monster/etc. by too much to bounce back, simply return it
        if(data[0].overlap<-6) {this.destroy(); catchBoomerang(); return;} 
        // otherwise, get variables and begin bouncing
        var boomerang = Crafty('BoomerangProjectile');
        boomerang.cancelSlide(); //tell('yep');
        if(boomerang.shotDir=='left') {boomerang.dir=[1,0]; boomerang.shotDir='right';}
        else if(boomerang.shotDir=='right') {boomerang.dir=[-1,0]; boomerang.shotDir='left';}
        else if(boomerang.shotDir=='up') {boomerang.dir=[0,1]; boomerang.shotDir='down';}
        else if(boomerang.shotDir=='down') {boomerang.dir=[0,-1]; boomerang.shotDir='up';}
        }
    });