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
        .attr({h: 30, w: 10, damage: 5, z: 2, length: 30}).collision()
        .animate("swing", 0, 0, 2) // initializes the swing animation (currently not implemented)
        .onHit('Bush', function(data) {
            if(potent) {potent = false;
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
        .attr({h: 60, w: 6, damage: 3, z: 2, length: 60}).collision()
        ;
        },
    });