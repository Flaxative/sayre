// ~~~~~
/* GLOBAL VARS */
var current_scene; var scene_name; var tile_theme;
var facing = 'down'; var dir = {up: false, down: false, left: false, right: false};
var in_inventory = false; var dialog; var interlocutor = false; var talking = false; var itemGet = false; var NPCname;
var potent = true; var swinging = false; var falling = false; var current_hole; 
var pushedblock; var pushing = 0; var speed = 4;
var monsters_on_screen = 0; var unlock_by_killing = false;

var max_hp = 66; var current_hp = 66;

// ~~~~~
/* INVENTORY VARS */
var coins = 0; var bombs = 0; var keys = 0;
var weapon = 'Wooden Sword'; 
var weapons_carried = ['Wooden Sword'];
var secondary = ''; 
var secondaries_carried = ['Boomerang'];
var armor = ''; 
var outfits_carried = [];
var accessory = ''; 
var accessories_carried = ['Blue Ring', 'Blue Ring'];

var item_description = {
    "Wooden Sword": "This practice sword is useful for bushwhacking.", 
    "Longspear": "A long shaft tipped with cold iron, perfect for keeping distance.",
    "Boomerang": "Stun enemies or nab items at range!",
    "Shield": "Blocks attacks aimed at your front.",
    "Wedding Dress": "You don't like it, but it's the only outfit you've got.",
    "Blue Ring": "This magical band halves incoming damage.", 
    "Rupees": "Don't spend them all at once, okay?"
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
    Crafty('Monster Pausable').trigger("Pause");
    Crafty('Projectile').trigger("Pause");
    Crafty('player').trigger("Pause");
    Crafty('player').disableControl().stop();
    }
// unpause player & monsters
function resumeAll() {
    Crafty('Monster Pausable').trigger("Run");
    Crafty('Projectile').trigger("Run");
    Crafty('player').trigger("Run").fourway(speed);
    }


// ~~~~~
/* SIDEBAR & STAT FUNCTIONS */
var sidebar_base = "<div id='life'><div id='life-gray' class='line1'></div><div id='life-red' class='line1'></div>" +
            "<div id='life-gray' class='line2'></div><div id='life-red' class='line2'></div>" +
            "<img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /><img src='assets/heart-container-1.png' /></div>" +
            "<fieldset id='weapon' class='margin-right'><legend>Space<legend></fieldset>" +
            "<fieldset id='secondary'><legend>Btn2<legend><span class='slot'></span></fieldset> " +
            "<fieldset id='armor' class='margin-right'><legend>Armor<legend><span class='slot'></span></fieldset>" +
            "<fieldset id='accessory'><legend>Misc<legend><span class='slot'></span></fieldset> " +
            "<div id='meta'>" +
            "<img src='assets/coin-single.png' class='coin' /><span id='coins'>0</span>" +
            "</div>" +
            "<div id='minimap'></div>";

// updates heart meter    
function updateHP() {
    if (max_hp<155) {$("#life-gray.line1").css('width', max_hp);}
    else {var m_hp2 = max_hp - 154; $("#life-gray.line1").css('width', 154); $("#life-gray.line2").css('width', m_hp2);}
    if (current_hp<155) {$("#life-red.line1").css('width', current_hp);}
    else {var c_hp2 = current_hp - 154; $("#life-red.line1").css('width', 154); $("#life-red.line2").css('width', c_hp2);}
    if (current_hp<=0) {
        disableActions(); Crafty('Weapon').destroy();
        Crafty('player').disableControl().stop().tween({
            x: Crafty('player').x+18,
            y: Crafty('player').y+20,
            w: 0, h: 0
            }, 32).timeout(function() {Crafty.scene('defeat');}, 1000); 
        }
    }
// sets active item
function setSlot(slot) {
    $('.equipped-'+slot).remove();
    if(eval(slot)) {
        $("#"+slot).append("<img class='equipped-"+slot+"' src='assets/inventory/"+eval(slot)+"-inv.png' />");
        }
    }
// sets rupee count
function updateCoins() {
    var old_coins = $('#coins').text();     // get old value
    if (old_coins < coins) {                // increment coins +1
        old_coins++;
        $('#coins').text(old_coins);
        setTimeout("updateCoins()", 50);
        return;
        }
    if (old_coins > coins) {                // increment coins -1
        old_coins--;
        $('#coins').text(old_coins);
        setTimeout("updateCoins()", 50);
        return;
        }
    return false;
    }
    
// refills health by an amount
function refillHearts(x) {
    current_hp = Math.min(current_hp+x, max_hp);
    updateHP();
    }

// adds or subtracts coins
function getCoins(x) {
    coins += x;  coins = Math.max(0, coins);
    updateCoins();
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
            
// sets a single floor tile
function tile(terrain, x, y) { Crafty.e(terrain).at(x, y); }

// fill room with a tile
function tileAll(terrain) {          
            for (var x = 0; x < Game.map_grid.width; x++) {
                for (var y = 0; y < Game.map_grid.height; y++) {
                    //tell(x+','+y);
                    Crafty.e(terrain).at(x, y);
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

// sets an unending theme track
function theme(track) {
    Crafty.audio.add("theme", [
        "media/"+track+".ogg",
        "media/"+track+".mp3"
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
    if(typeof(scene)==='undefined') scene = current_scene;
    scene.occupied[x][y] = true;
    return Crafty.e(type).at(x, y);
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
            if(itemGet == true) {
                Crafty('player').sprite(0,3); itemGet = false;
                Crafty('Reward').destroy();
                }
            resumeAll();
            Crafty.bind('KeyDown', (inventory));
            }
        else if(!swinging&&weapon) {
            useWeapon(weapon);
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
            text = '<div class="portrait" style="background-image:url(\''+'assets/portraits/'+speaker+'.png'+'\');"></div>'+text;
            }
        }
    pauseAll(); Crafty.unbind('KeyDown', (inventory));
    dialog = Crafty.e("2D, DOM, Text, dialogue, dbox, light, innershadow").attr({ w: 480, h:179, x: 0, y: 300}).text(text);
    }

// test of non-dialogue interaction 
function torchBushes() {//console.log(Crafty('Bush'));
    Crafty('Bush').destroy();
    //tell('The crazy dude burned all the bushes.');
    dialogue('The crazy dude burned all the bushes.');
    }

// opens chests!
function openChest() {
    if(facing==interlocutor.direction) {
        var chest = interlocutor;       // get the chest's object
        interlocutor = false;           // clear interlocutor to prevent spammability
        chest.removeComponent('poi').addComponent('chest_open_'+chest.direction);    // prevent further opening || chest.direction is for extensibility
        if(chest.type == "weapon") {
            weapons_carried.push(chest.contents);
            chestNotice(chest.contents, "weapon");
            return;
            }
        if(chest.type == "secondary") {
            secondaries_carried.push(chest.contents);
            chestNotice(chest.contents, "secondary");
            return;
            }
        if(chest.type == "armor") {
            outfits_carried.push(chest.contents);
            chestNotice(chest.contents, "armor");
            return;
            }
        if(chest.type == "misc") {
            accessories_carried.push(chest.contents);
            chestNotice(chest.contents, "misc");
            return;
            }
        if(chest.type == "rupee") {
            getCoins(chest.value);
            chestNotice(chest.contents, "rupee", chest.value);
            return;
            }
        console.log(chest.contents);
        return;
        }
    return false;
    }

function chestNotice(contents, type, value) {
    Crafty.audio.play('chest');     // plays chest sound
    Crafty('player').sprite(0, 4).attr({w: 36, h: 40}).collision([4,4], [32, 4], [32,36], [4,36]);  // item get pose
    // create notificaion text
    var chestNotification = "You found ";
    if(value) {chestNotification += value+' ';} else {chestNotification += "the ";}
    chestNotification += contents+"! "+item_description[contents];
    if(type=="weapon"||type=="secondary"||type=="armor"||type=="misc") {
        chestNotification += " <br /><br />You can equip this item from your inventory by pressing TAB.";
        }
    itemGet = true;                     // allows the dialogue closing trigger to work best
    dialogue(chestNotification);        // creates notification
    Crafty.e('Reward').attr({x: Crafty('player').x-11, y: Crafty('player').y-58});  // displays reward shining above head
    $(".Reward").append('<img src="assets/inventory/'+contents+'-inv.png" />');
    }

// ~~~~~
// ~~~~~
/* COMBAT FUNCTIONS */
// ~~~~~
// ~~~~~

// triggers on space when not in a menu or dialogue. uses active weapon.
function useWeapon(weapon) {
    swinging = true; potent = true;             // enable attacks
    Crafty('player').disableControl().stop();   // pause the player
    disableActions();                           // stop interaction & inventory
    //console.log("You swing your mighty "+weapon+" "+facing+"!");
    
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
        }
    Crafty('player').attach(Crafty('Weapon'));  // weapon moves with you if you move, though ATM you shouldn't move
    Crafty('Weapon').attr({h:0}).tween({h:Crafty('Weapon').length}, 2); // extend the weapon quickly
    //Crafty('weapon').stop().animate("swing", 6.5, 1);
    }

// triggers when a monster hits 0 hp or falls in a hole
function killMonster(monster) {
    monsters_on_screen--;                                                   // one fewer monster!
    // if(monsters_on_screen==0) { console.log("You killed them all!"); }   // test for eradication of monsters
    if(monster.death&&monster.death!="random") {eval(monster.death)(monster.x, monster.y);}       // runs any death trigger for the killed monster
    if(monster.death=="random"&&swinging) {                                 // only drop random loot if YOU killed the monster // this is an imperfect check BTW
        randomLoot(monster.x, monster.y); // add a "worth" attribute or something in order to tier random drops
        }
    //primitive death animation using alpha tween
    monster.stop().unbind("EnterFrame").trigger("Pause")    // stop its movement
    .removeComponent("Painful").removeComponent("Monster")  // stop it from hurting PC, or dying multiple times
    .tween({alpha:0}, 16).timeout(function() {this.destroy();}, 500);
    if(monsters_on_screen<=0&&unlock_by_killing) {unlockDoors();}
    }

// when monsters with "death:random" die, they trigger this random loot generator
function randomLoot(x, y) { // add a "worth" argument in order to tier random drops
    var loot_result = Math.floor((Math.random()*9)+1);
    var loot_table = ['', 'RupeeG', 'RupeeG', 'RupeeG', 'RupeeG', 'RupeeB', 'Bomb', 'HeartFull', 'HeartHalf', 'HeartHalf'];
    if(!loot_table[loot_result]) {tell('no drops');} // bombs don't exist yet except on the table.
    else if(loot_table[loot_result]=='Bomb') {tell("The monster dropped a bomb.");}
    else {dropLoot(loot_table[loot_result], x, y);}
    }

// places a pick up at a given location
function dropLoot(loot, x, y) {
    var newdrop = Crafty.e(loot).attr({x:x, y:y});
    newdrop.attr({x:x+newdrop.overx, y:y+newdrop.overy});
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
        //dropPlayer(trackplayer.x, trackplayer.y);                                       // falling animation to start square. off ATM.
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
    
    
// ~~~~~
// ~~~~~
// DUNGEON DOOR MANIPULATION FUNCTIONS
// temp function; should be 'open doors' or similar; opens closed doors in dungeon room when it's cleared
function unlockDoors() {
    console.log('you hear a rumbling from the walls...');
    Crafty('Door').destroy();
    }
// makes sure that the player is inside the room, and not stuck in a solid dungeon door
function closeDoors(monsters) {
    if(monsters) {unlock_by_killing = true;} else {unlock_by_killing = false;} // sometimes you need to unlock doors by other means!
    if(trackplayer.x>440) {trackplayer.x = 440; Crafty('player').tween({x: 440}, 4);} 
    if(trackplayer.x<40) {trackplayer.x = 40; Crafty('player').tween({x: 40}, 4);}
    if(trackplayer.y>440) {trackplayer.y = 440; Crafty('player').tween({y: 440}, 4);} 
    if(trackplayer.y<40) {trackplayer.y = 40; Crafty('player').tween({y: 40}, 4);}
    }