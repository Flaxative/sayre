// ~~~~~
/* GLOBAL VARS */
var current_scene; var tile_theme;
var facing = 'down'; var dir = {up: false, down: false, left: false, right: false};
var in_inventory = false; var dialog; var interlocutor = false; var talking = false; var NPCname;
var potent = true; var swinging = false; var falling = false; var current_hole; 
var pushedblock; var pushing = 0; var speed = 4;
var monsters_on_screen = 0;

var max_hp = 66; var current_hp = 66;

// ~~~~~
/* INVENTORY VARS */
var coins = 0; var bombs = 0; var keys = 0;
var weapon = 'Wooden Sword'; 
var weapons_carried = ['Wooden Sword', 'Longspear', 'Longspear', 'Longspear', 'Longspear', 'Longspear'];
var secondary = ''; 
var secondaries_carried = ['Boomerang', 'Shield', 'Boomerang', 'Boomerang'];
var armor = ''; 
var outfits_carried = ['Wedding Dress'];
var accessory = ''; 
var accessories_carried = ['Blue Ring', 'Blue Ring'];

var item_description = {
    "Wooden Sword": "This practice sword is useful for bushwhacking.", 
    "Longspear": "A long shaft tipped with cold iron, perfect for keeping distance.",
    "Boomerang": "Stun enemies or nab items at range!",
    "Shield": "Blocks attacks aimed at your front.",
    "Wedding Dress": "You don't like it, but it's the only outfit you've got.",
    "Blue Ring": "This magical band halves incoming damage."
    };

// ~~~~~
/* placeholder/temp - DIALOGUE VARS */
var oldman_dialogue = 'You are a brave young man, to go exploring this nine-tile world all on your own. Your grandmother would be so proud if she could see you today.';
var fisherman_dialogue = 'The fish aren\'t biting today. I wonder if it has anything to do with the weather.';
var groundskeeper_dialogue = 'It is a dreadful infestation.';
var shykid_dialogue = 'You found me!';
var nope = 'It is a very poorly kept secret.';

// ~~~~~
/* GENERAL FUNCTIONS */
// checks if file exists
function UrlExists(url) 
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
    }
    
// custom side console
function tell(x) {$('#console span').append(' '+x);}   

// disable or enable the space & tab keys
function disableActions() {
    Crafty.unbind('KeyUp', (interact)); Crafty.unbind('KeyDown', (inventory));
    }
function enableActions() {
    Crafty.bind('KeyUp', (interact)); Crafty.bind('KeyDown', (inventory));
    }
    
// pause player & monsters
function pauseAll() {
    Crafty('Monster').trigger("Pause");
    Crafty('player').trigger("Pause");
    Crafty('player').disableControl().stop();
    }
// unpause player & monsters
function resumeAll() {
    Crafty('Monster').trigger("Run");
    Crafty('player').trigger("Run").fourway(speed);
    }


var sidebar_base = "<div id='life'><div id='life-gray' class='line1'></div><div id='life-red' class='line1'></div>" +
            "<div id='life-gray' class='line2'></div><div id='life-red' class='line2'></div>" +
            "<img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /></div>" +
            "<fieldset id='weapon' class='margin-right'><legend>Space<legend></fieldset>" +
            "<fieldset id='secondary'><legend>Btn2<legend><span class='slot'></span></fieldset> " +
            "<fieldset id='armor' class='margin-right'><legend>Armor<legend><span class='slot'></span></fieldset>" +
            "<fieldset id='accessory'><legend>Misc<legend><span class='slot'></span></fieldset> " +
            "<div id='meta'>" +
            "<img src='assets/coin-single.png' class='coin' /><span id='coins'></span>" +
            "</div>" +
            "<div id='minimap'></div>";

// updates heart meter    
function updateHP() {
    if (max_hp<155) {$("#life-gray.line1").css('width', max_hp);}
    else {var m_hp2 = max_hp - 154; $("#life-gray.line1").css('width', 154); $("#life-gray.line2").css('width', m_hp2);}
    if (current_hp<155) {$("#life-red.line1").css('width', current_hp);}
    else {var c_hp2 = current_hp - 154; $("#life-red.line1").css('width', 154); $("#life-red.line2").css('width', c_hp2);}
    if (current_hp<=0) {
        disableActions();
        Crafty('player').disableControl().stop().tween({
            x: Crafty('player').x+18,
            y: Crafty('player').y+20,
            w: 0, h: 0
            }, 32).timeout(function() {Crafty.scene('defeat');}, 1000); 
        }
    }
// sets active weapon
function setSlot(slot) {
    $('.equipped-'+slot).remove();
    if(eval(slot)) {
        $("#"+slot).append("<img class='equipped-"+slot+"' src='assets/inventory/"+eval(slot)+"-inv.png' />");
        }
    }
// sets rupee count
function updateCoins() {
    $('#coins').text(coins);
    }
    
// ~~~~~
// ~~~~~
/* SCENE SETTING FUNCTIONS */
// ~~~~~
// ~~~~~

// ~~~~~
/* PLACE THE PLAYER CHARACTER */
var trackplayer = {x: 200, y: 200};                 // initial position
function getcoords() {                              // check position after transition
    if(trackplayer.x>480) {trackplayer.x = 0;} if(trackplayer.x<0) {trackplayer.x = 480;}
    if(trackplayer.y>480) {trackplayer.y = 0;} if(trackplayer.y<0) {trackplayer.y = 480;}
    }

function setFacing() {
    if(facing=='up') {this.player.addComponent('charup');} 
    if(facing=='down') {this.player.addComponent('chardown');} 
    if(facing=='left') {this.player.addComponent('charleft');} 
    if(facing=='right') {this.player.addComponent('charright');}
    this.player.attr({w: 36, h: 40}).collision([4,4], [32, 4], [32,36], [4,36]);
    }

function placePlayer(facing) {                       // actually make the PC
    if(typeof(facing)==='undefined') facing = '';
    var up, down, left, right;                      // initialize directions
    getcoords();                                    // check position
    this.player = Crafty.e('PlayerCharacter').attr({x: trackplayer.x, y: trackplayer.y}); // place PC at position
    // setFacing();  // get facing
    up = Crafty.keydown[Crafty.keys.UP_ARROW];      // get direction of current movement
    down = Crafty.keydown[Crafty.keys.DOWN_ARROW];
    left = Crafty.keydown[Crafty.keys.LEFT_ARROW];
    right = Crafty.keydown[Crafty.keys.RIGHT_ARROW];
    if(up) { dir.up = true;                             // set global direction for facing, attacks, shield, etc.
        this.player.animate("walk_up", 10, -1); }   // play proper movement animation for cross-transition motion
    if(right) { dir.right = true; this.player.animate("walk_right", 10, -1); }
    if(down) { dir.down = true; this.player.animate("walk_down", 10, -1); }
    if(left) { dir.left = true; this.player.animate("walk_left", 10, -1); }
    }

// sets a grid-based floor tile
function tileAll(terrain) {          
            for (var x = 0; x < Game.map_grid.width; x++) {
                for (var y = 0; y < Game.map_grid.height; y++) {
                    //tell(x+','+y);
                    Crafty.e(terrain).at(x, y);
                }
            }
        }
            
// sets a single floor tile
function tile(terrain, x, y) { Crafty.e(terrain).at(x, y); }

// sets an unending theme track
function theme(track) {
    Crafty.audio.add("theme", [
        "http://dotq.org/movement/media/"+track+".ogg",
        "http://dotq.org/movement/media/"+track+".mp3"
    ]);
    Crafty.audio.play("theme", -1); //play and repeat forever
    }

// initializes array to check if a grid space is occupied
function initOccupy(scene) {
    // there aren't any monsters yet.
    monsters_on_screen = 0;
    // A 2D array to keep track of all occupied tiles
    if(typeof(scene)==='undefined') scene = current_scene;
    scene.occupied = new Array(Game.map_grid.width);
    for (var i = 0; i < Game.map_grid.width; i++) {
        scene.occupied[i] = new Array(Game.map_grid.height);
        for (var y = 0; y < Game.map_grid.height; y++) {
            scene.occupied[i][y] = false;
            }
        }
    }

// sets exits, with their position and destination
function exit(x, y, destination, scene) {
    Crafty.e('Exit').at(x, y).attr({direction: destination});
    if(x>12) {x=12;} if(x<0) {x=0;}
    if(y>12) {y=12;} if(y<0) {y=0;}
    if(typeof(scene)==='undefined') scene = current_scene;
    scene.occupied[x][y] = true;
    }
    
// places monsters
function monster(rawr, x, y, scene) {
    monsters_on_screen++;
    tell('monster generated');
    Crafty.e(rawr).at(x, y);
    if(typeof(scene)==='undefined') scene = current_scene;
    scene.occupied[x][y] = true;
    }
    
// places props and obstacles
function prop(type, x, y, scene) {
    Crafty.e(type).at(x, y);
    if(typeof(scene)==='undefined') scene = current_scene;
    scene.occupied[x][y] = true;
    }
    
// fills a rectangle with a certain prop
function propA(thing, startx, starty, endx, endy, scene) {
    if(typeof(scene)==='undefined') scene = current_scene;
    //tell('Start Point: ' + startx + ', ' + starty + '; End Point: ' + endx + ', ' + endy);
    for (var x = startx; x <= endx; x++) {
        for (var y = starty; y <= endy; y++) {
            if(!scene.occupied[x][y]) {
                prop(thing, x, y, scene);
                }
        }
    }
    }
    
// builds a ring around the world
function edgePop (edgeprop, scene) {
    if(typeof(scene)==='undefined') scene = current_scene;
    for (var x = 0; x < Game.map_grid.width; x++) {
            for (var y = 0; y < Game.map_grid.height; y++) {
                var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
                if(scene.occupied[x][y]) {at_edge = false;} // avoid exits!
                if (at_edge) {
                    // Place a tree entity at the current tile
                    prop(edgeprop, x, y);
                }
            }
        }
    }
    
// fills a rectangle with a certain tile
function tileA(terrain, startx, starty, endx, endy) {
    for (var x = startx; x <= endx; x++) {
        for (var y = starty; y <= endy; y++) {
            Crafty.e(terrain).at(x, y);
        }
    }
    }

// ~~~~~
// ~~~~~
/* INTERACTION FUNCTIONS */
// ~~~~~
// ~~~~~

// binds space to interact
function interact(e) {
    if(e.keyCode == Crafty.keys['SPACE']) {
        if(interlocutor&&!talking) {
            eval(interlocutor.interact);
            }
        else if(talking) {
            talking = false;
            dialog.destroy(); 
            resumeAll();
            Crafty.bind('KeyDown', (inventory));
            }
        else if(!swinging&&weapon) {
            useWeapon(weapon);
            }
        }
    }
    
// binds tab to inventory
function inventory(e) {
    if(e.keyCode == Crafty.keys['TAB']) {
        if(!in_inventory) {
             in_inventory = true; openInventory();
            }
        else {
             in_inventory = false; destroyInventory();
            }
        } 
    }

// basic dialogue functionality
function dialogue(statement, speaker, portrait) {
    talking = true; trackplayer.x = Crafty('player').x; trackplayer.y = Crafty('player').y;
    var text;
    text = '<p>' + statement + '</p>';
    if(speaker) {   
        text = '<h3><b>' + speaker + '</b></h3>' + text;      
        if(portrait) {
            text = '<div class="portrait" style="background-image:url(\''+'http://dotq.org/movement/assets/portraits/'+speaker+'.png'+'\');"></div>'+text;
            }
        }
    pauseAll(); Crafty.unbind('KeyDown', (inventory));
    dialog = Crafty.e("2D, DOM, Text, dbox, light, innershadow").attr({ w: 479, h:178, x: 0, y: 300}).text(text);
    }

// test of non-dialogue interaction 
function torchBushes() {//console.log(Crafty('Bush'));
    Crafty('Bush').destroy();
    tell('The crazy dude burned all the bushes.');
    }



// ~~~~~
// ~~~~~
/* COMBAT FUNCTIONS */
// ~~~~~
// ~~~~~

function useWeapon(weapon) {
    swinging = true; potent = true;
    // pause the player
    Crafty('player').disableControl().stop(); 
    disableActions();
    
    console.log("You swing your mighty "+weapon+" "+facing+"!");
    Crafty.e(weapon).attr({x: 100, y: 100}).timeout(function() {
        Crafty('Weapon').destroy(); swinging = false; 
        Crafty('player').trigger("Run").fourway(speed);
        enableActions();
        }, 200);
    if(facing=='up') {
        Crafty('Weapon')
        .attr({rotation: 180, x: Crafty('player').x+Crafty('player').w/2+Crafty('Weapon').w/2-8, y: Crafty('player').y+15});
        }
    if(facing=='left') {
        Crafty('Weapon')
        .attr({rotation: 90, x: Crafty('player').x+15, y: Crafty('player').y+Crafty('player').h/2-Crafty('Weapon').w/2+8});
        }
    if(facing=='right') {
        Crafty('Weapon')
        .attr({rotation: 270, x: Crafty('player').x+Crafty('player').w-15, y: Crafty('player').y+Crafty('player').h/2+Crafty('Weapon').w/2+8});
        }
    if(facing=='down') {
        Crafty('Weapon')
        .attr({z: 1001, rotation: 0, x: Crafty('player').x+Crafty('player').w/2-Crafty('Weapon').w/2+8, y: Crafty('player').y+Crafty('player').h-15});
        //console.log('Player position: ' + Crafty('player').x + ', ' + Crafty('player').y + '; Sword position: ' + Crafty('weapon').x + ', ' + Crafty('weapon').y)
        }
    Crafty('player').attach(Crafty('Weapon'));
    Crafty('Weapon').attr({h:0}).tween({h:Crafty('Weapon').length}, 2);
    //Crafty('weapon').stop().animate("swing", 6.5, 1);
    }

// triggers when a monster hits 0 hp or falls in a hole
function killMonster(monster) {
    monsters_on_screen--; if(monsters_on_screen==0) { console.log("You killed them all!"); } // test for eradication of monsters
    if(monster.death&&monster.death!="random") {eval(monster.death);} //console.log(monster.death); // runs any death trigger for the killed monster
    if(monster.death=="random"&&swinging) {
        randomLoot(monster.x, monster.y); // add a "worth" attribute or something in order to tier random drops
        }
    monster.tween({opacity:0}, 3).timeout(function() {this.destroy();}, 100);
    }

// when monsters with "death:random" die, they trigger this loot generator
function randomLoot(x, y) { // add a "worth" argument in order to tier random drops
    var loot_result = Math.floor((Math.random()*9)+1);
    var loot_table = ['', 'RupeeG', 'RupeeG', 'RupeeG', 'RupeeG', 'RupeeB', 'Bomb'];
    //console.log('you got mail at '+x+', '+y+'!');
    if(!loot_table[loot_result]) {tell('no drops');}
    else {
        if(loot_table[loot_result]=='RupeeG') {Crafty.e('RupeeG').attr({x:x+12, y:y+6});}
        if(loot_table[loot_result]=='RupeeB') {Crafty.e('RupeeB').attr({x:x+12, y:y+6});}
        if(loot_table[loot_result]=='Bomb') {tell("The monster dropped a bomb.");}
        }
    }
    
// temp function; should be 'open doors' or similar; opens closed doors in dungeon room
function unlockDoors() {
    if(monsters_on_screen==0) {
        console.log('upon slaying the final monster, you hear a rumbling from the walls...');
        Crafty('Door').destroy();
        }
    }
    
function closeDoors() {
    if(trackplayer.x>440) {trackplayer.x = 440; Crafty('player').tween({x: 440}, 4);} if(trackplayer.x<40) {trackplayer.x = 40; Crafty('player').tween({x: 40}, 4);}
    if(trackplayer.y>440) {trackplayer.y = 440; Crafty('player').tween({y: 440}, 4);} if(trackplayer.y<40) {trackplayer.y = 40; Crafty('player').tween({y: 40}, 4);}
    }

// triggers the first invulnerability frame
function damagePlayer(x) {
    console.log("You've been hit!"); current_hp = Math.max(current_hp-x, 0); updateHP();
    Crafty('player').removeComponent('vulnerable').fourway(2); speed = 2;
    flicker1(10);
   }
   
// flicker out
function flicker1(x) {
    if(x&&current_hp>0) {
        if(!Crafty('player').paused) {x--; console.log(x);}
        Crafty('player').tween({alpha: 0.5}, 5)
        .timeout(function(){flicker2(x);}, 100);
        }
    else if (current_hp>0) {
        Crafty('player').addComponent('vulnerable').fourway(4); speed = 4;
        }
    }

// flicker in
function flicker2(x) {
    Crafty('player').tween({alpha: 1.0}, 5)
    .timeout(function(){flicker1(x);}, 100);
    }
    
// ~~~~~
// ~~~~~
/* INVENTORY FUNCTIONS */
// ~~~~~
// ~~~~~

function enableInventoryNav() {Crafty.bind('KeyDown', (inventoryNav));}
function disableInventoryNav() {Crafty.unbind('KeyDown', (inventoryNav));}

function inventoryNav(e) {
    if(e.keyCode == Crafty.keys['RIGHT_ARROW']) {
        if(!$('.active').length) { $('.inventory fieldset').first().addClass('active'); summary();} // initial selection
        else {
            var h = $('.active').attr('data-x'); var j = $('.active').attr('data-y');
            $('.active').removeClass('active');
            h++; 
            if(h>$('fieldset[data-y="'+j+'"]').last().attr("data-x")) {$('fieldset[data-y="'+j+'"]').first().addClass('active'); summary();}
            else {$('fieldset[data-x="'+h+'"][data-y="'+j+'"]').addClass('active'); summary();}
            }
        }
    if(e.keyCode == Crafty.keys['LEFT_ARROW']) {
        if(!$('.active').length) { $('.inventory fieldset').last().addClass('active'); summary();} // initial selection
        else {
            var h = $('.active').attr('data-x'); var j = $('.active').attr('data-y');
            $('.active').removeClass('active');
            h--; 
            if(h<1) {$('fieldset[data-y="'+j+'"]').last().addClass('active'); summary();}
            else {$('fieldset[data-x="'+h+'"][data-y="'+j+'"]').addClass('active'); summary();}
            }
        }
    if(e.keyCode == Crafty.keys['DOWN_ARROW']) {
        if(!$('.active').length) { $('.inventory fieldset').first().addClass('active'); summary();} // initial selection
        else {
            var h = $('.active').attr('data-x'); var j = $('.active').attr('data-y');
            $('.active').removeClass('active'); 
            j++;
            if(j>$('.inventory fieldset').last().attr("data-y")) {j = 1;}
            if(h>$('fieldset[data-y="'+j+'"]').last().attr("data-x")) {$('fieldset[data-y="'+j+'"]').last().addClass('active'); summary();}
            else {$('fieldset[data-x="'+h+'"][data-y="'+j+'"]').addClass('active'); summary();}
            }
        }
    if(e.keyCode == Crafty.keys['UP_ARROW']) {
        if(!$('.active').length) { $('.inventory fieldset').last().addClass('active'); summary();} // initial selection
        else {
            var h = $('.active').attr('data-x'); var j = $('.active').attr('data-y');
            $('.active').removeClass('active'); 
            j--;
            if(j<1) {j = $('.inventory fieldset').last().attr("data-y");}
            if(h>$('fieldset[data-y="'+j+'"]').last().attr("data-x")) {$('fieldset[data-y="'+j+'"]').last().addClass('active'); summary();}
            else {$('fieldset[data-x="'+h+'"][data-y="'+j+'"]').addClass('active'); summary();}
            }
        }
    if(e.keyCode == Crafty.keys['SPACE']) {
        if(!$('.active').length) { return; } // initial selection
        else {
            var itemType = $('.active').attr('data-itemType');
            var item = $('.active').attr('data-item');
            if(itemType == 'weapon') {weapon = item;}
            if(itemType == 'secondary') {secondary = item;}
            if(itemType == 'armor') {armor = item;}
            if(itemType == 'accessory') {accessory = item;}
            
            setSlot(itemType);
            }
        }
    
    }

// used to displace descriptions of selected items in inventory
function summary() {$("#summary").html($('.active').attr('data-item')+': '+item_description[$('.active').attr('data-item')]);}

// opens inventory, creates an entity and triggers a function to populate it
function openInventory() {
    console.log('inventory open');
    pauseAll(); Crafty.unbind('KeyUp', (interact));
    $('#inventory').show(); displayArsenal();
    enableInventoryNav();
    }
    
// fills inventory with things in jQuery
function displayArsenal() {
    var h = 0; var j = 1; // initialize grid variables for inventory
    
    // WEAPONS
    $('.inventory').append('<h3>Weapons</h3>');
    weapons_carried.forEach(function(weapon) {
        h++;
        $('.inventory').append('<fieldset class="equippable" data-itemType="weapon" data-x="'+h+'" data-y="'+j+'" data-item="'+weapon+'"><img src="/movement/assets/inventory/'+weapon+'-inv.png" /></fieldset>');
        });
        
    // BTN 2
    if(secondaries_carried[0]) {    // don't show category if none exist
        $('.inventory').append('<h3>Btn 2</h3>');
        h = 0; j = 2;
        secondaries_carried.forEach(function(btn2) {
            h++;
            $('.inventory').append('<fieldset class="equippable" data-itemType="secondary" data-x="'+h+'" data-y="'+j+'" data-item="'+btn2+'"><img src="/movement/assets/inventory/'+btn2+'-inv.png" /></fieldset>');
            });
        }
    
    // Armor
    if(outfits_carried[0]) {    // don't show category if none exist
        $('.inventory').append('<h3>Armor</h3>');
        h = 0; j = 3;
        outfits_carried.forEach(function(armor) {
            h++;
            $('.inventory').append('<fieldset class="equippable" data-itemType="armor" data-x="'+h+'" data-y="'+j+'" data-item="'+armor+'"><img src="/movement/assets/inventory/'+armor+'-inv.png" /></fieldset>');
            });
        }
    
    // Accessories / Misc
    if(accessories_carried[0]) {    // don't show category if none exist
        $('.inventory').append('<h3>Accessories</h3>');
        h = 0; j = 4;
        accessories_carried.forEach(function(misc) {
            h++;
            $('.inventory').append('<fieldset class="equippable" data-itemType="accessory" data-x="'+h+'" data-y="'+j+'" data-item="'+misc+'"><img src="/movement/assets/inventory/'+misc+'-inv.png" /></fieldset>');
            });
        }
        
    $('.inventory').append('<div id="summary"></div>');
    }
    
// close inventory, destroys all entities & elements
function destroyInventory() {
    disableInventoryNav();
    console.log('inventory gone');
    $('#inventory *').remove();
    $('#inventory').hide();
    resumeAll(); Crafty.bind('KeyUp', (interact));
    }
    
    
    
// ~~~~~
// ~~~~~
/* MAP MANIPULATION FUNCTIONS */
// ~~~~~
// ~~~~~

// Destroys walkable trees to reveal passageways
function reveal() {
    Crafty('TreeWalkable').destroy();
    Crafty.audio.play('secret');
    }

// Reveals pit in heart rocks
function hidden_passage1() {
    Crafty.audio.play('secret');
    Crafty.e('Hole1').attr({w: 20, h: 20, x: 170, y: 210, interact: 'go_to("cave1")'});
    Crafty('Hole1').tween({w: 40, h: 40, x: 160, y: 200}, 16);
    }
 
// triggers when player steps into a hole; triggers w/e that hole's specific falling function is
function fall() {
    current_hole.removeComponent('hole').addComponent('hole_entered'); // easier than unbinding anything!
    disableActions();                                                  // turn off all controls
    Crafty('player').disableControl()                                  // turn off player controls; stop animation; tween falling animation
        .sprite(0,0).stop()
        .tween({
            w: 1, h: 1, 
            rotation: -45, 
            x: current_hole.x+19, 
            y: current_hole.y+19
            }, 32)
            // above: set timer (32 frames = 1 sec) for falling animation; below: set timer (1000 ms = 1 sec) for control reset 
        .timeout(function(){eval(current_hole.interact);}, 1000);       // run hole function (e.g. fall endless or go_to)
    }

// enemies that fall into holes die permanently, but don't drop loot.
function fallFoe(foe, foe_hole) {
    foe.unbind('EnterFrame')
        .sprite(0,0).stop().tween({w: 1, h: 1, rotation: -45, x: foe_hole.x+19, y: foe_hole.y+19}, 32)
        .timeout(function(){killMonster(foe);}, 1000);
    }

// for those nasty holes in the ground that don't lead anywhere except to damage.
function fallEndless() {
    damagePlayer(22);                                                               // make the PC hurt a full heart
    if(current_hp<=0) {return;}
    else {
        Crafty('hole_entered').addComponent('hole').removeComponent('hole_entered');    // reset hole for falling
        Crafty('player').destroy();                                                     // destroy tiny, fallen PC
        placePlayer();                                                                  // create fresh PC
        facing = "down";                                                                // always facing down after fall
        enableActions();                                                                // re-enable inventory and action
        //dropPlayer(trackplayer.x, trackplayer.y); // falling animation to start square. off ATM.
        }
    }
    
// some holes lead into scenes
function go_to(destination) {
    falling = true;
    // console.log("you're going to "+destination);
    Crafty.scene(destination);
    }

// simulates player "falling" into place
function dropPlayer(xpos, ypos) {
    trackplayer.x = xpos; trackplayer.y = ypos;
    facing = "down";
    Crafty('player').attr({x:xpos, y:0}).disableControl().stop().tween({y: ypos}, 16).timeout(function() {
        Crafty('player').fourway(speed);
        enableActions();
        falling = false;
        }, 500);
    }