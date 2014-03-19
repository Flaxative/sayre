// ~~~~~
/* GLOBAL VARS */
var current_scene; var scene_name; var tile_theme;
var facing = 'down'; var dir = {up: false, down: false, left: false, right: false};
var in_inventory = false; var dialog; var interlocutor = false; var talking = false; var paused = false; var itemGet = false; var NPCname; var NPCnice;
var potent = true; var swinging = false; var falling = false; var current_hole; 
var pushedblock; var pushing = 0; var speed = 4;
var monsters_on_screen = 0; var unlock_by_killing = false;
var more_dialogue = false; var current_statement = 0;
var has_boomerang = true; var boomerang_returning = false;
var started = false;
var EverythingPaused = false;
var monster_starting_position;

var max_hp = 66; var current_hp = 66;

// ~~~~~
/* INVENTORY VARS */
var coins = 0; var bombs = 0; var keys = 0;
var weapon = 'Longspear'; 
var weapons_carried = ['Wooden Sword', 'Longspear'];
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
    "Rupees": "Don't spend them all at once, okay?",
    "Heart Container": "Your heart has increased!",
    "Bombs": "Place one of these bad boys and watch your enemies jump. Just... don't play with these at home."
    };

// ~~~~~
/* placeholder/temp - DIALOGUE VARS */
var old_man_dialogue = [
    'You are a brave young man, to go exploring this ten-tile world all on your own. Your grandmother would be so proud if she could see you today.', 
    'Let me tell you a thing or two about navigating. As you know already, hitting C will allow you to interact with NPCs and objects.', 
    'But did you know that C is also the key used to attack? When we\'re done talking, you can try it out.',
    'Moving along, S opens your inventory. In your inventory, navigate with the arrow keys. Use C to select an item.', 
    'The D key activates your secondary item.',
    'Finally, ESCAPE pauses the game and allows you to access the menu (assuming Flak has it set up).',
    'I hope that I\'ve been helpful! Enjoy your journey!'
    ];
var fisherman_dialogue = ['The fish aren\'t biting today. I wonder if it has anything to do with the weather.'];
var groundskeeper_dialogue = ['It is a dreadful infestation.'];
var shy_kid_dialogue = ['You found me!', 'As a one-time reward for finding me, I\'ll give you something I found in the bushes.'];
var shy_kid_callback = "chestNotice('Bombs', 'secondary', 5); shy_kid_dialogue = ['You found me again!']; shy_kid_callback = '';";
var healer_dialogue = ['Let me heal you :)'];
var nope = ['It is a very poorly kept secret.'];
var woodsman_dialogue = ['Hello! ... <br />That block over there sure looks heavy, dontcha think?'];

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
function tell(x) {$('#console .inner div').append(' '+x);}   

// disable or enable the action, inventory, and pause keys
function disableActions() {
    Crafty.unbind('KeyUp', (interact)); Crafty.unbind('KeyUp', (useSecondary));
    Crafty.unbind('KeyDown', (inventory)); Crafty.unbind('KeyUp', (pause_key));
    }
function enableActions() {
    Crafty.bind('KeyUp', (interact)); Crafty.bind('KeyUp', (useSecondary)); 
    Crafty.bind('KeyDown', (inventory)); Crafty.bind('KeyUp', (pause_key));
    }
    
// pause player & monsters
function pauseAll() {
    //tell("going away for a sec..."); //debug
    EverythingPaused = true;
    Crafty('Monster Pausable').trigger("Pause").each(function(){this.pauseAnimation();});
    Crafty('Projectile').trigger("Pause");
    Crafty('Player').trigger("Pause");
    Crafty('Player').disableControl().pauseAnimation();
    }
// unpause player & monsters
function resumeAll() {
    EverythingPaused = false;
    //tell("we're back"); //debug
    Crafty('Monster Pausable').trigger("Run").each(function(){this.resumeAnimation();});
    Crafty('Projectile').trigger("Run"); //tell(speed);
    Crafty('Player').trigger("Run").enableControl();
    }
    
// pause key
// binds escape to pause & end interaction
function pause_key(e) {
    if(e.keyCode == Crafty.keys['ESC']) {
        if(in_inventory) {
            in_inventory = false;
            destroyInventory();
            }
        else if(talking && !more_dialogue) {     // if at end of dialogue, close dialogue
            tell('this triggers sometimes');
            talking = false;
            dialog.destroy(); 
            if(itemGet == true) {
                Crafty('Player').sprite(0,3); itemGet = false;
                Crafty('Reward').destroy();
                Crafty.audio.unpause("theme");
                }
            resumeAll();
            Crafty.bind('KeyDown', (inventory));
            dialogueCallback();                 // check if we need to do anything after dialogue
            }
        else if(talking&&more_dialogue) {       // else if in middle of dialogue, continue dialogue
            eval(interlocutor.interact);
            }
        else if(paused) {                       // else if paused, unpause
            paused = false; resumeAll();
            tell('<p>unpause!</p>');
            Crafty.bind('KeyDown', (inventory));
            Crafty.bind('KeyUp', (interact));
            Crafty.bind('KeyUp', (useSecondary));
            }
        else {                                  // else pause
            paused = true; pauseAll();
            tell('<p>pause!</p>');
            Crafty.unbind('KeyDown', (inventory));
            Crafty.unbind('KeyUp', (interact));
            Crafty.unbind('KeyUp', (useSecondary));
            }
        }
    }
    


// ~~~~~
/* SIDEBAR & STAT FUNCTIONS */
var sidebar_base = "<div id='life'><div id='life-gray' class='line1'></div><div id='life-red' class='line1'></div>" +
            "<div id='life-gray' class='line2'></div><div id='life-red' class='line2'></div>" +
            "<img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /><img src='assets/heart-empty-1.png' /></div>" +
            "<fieldset id='secondary' class='margin-right'><legend>D Btn<legend><span class='slot'></span></fieldset>" +
            "<fieldset id='weapon'><legend>C Btn<legend><span class='slot'></span></fieldset> " +
            "<fieldset id='armor' class='margin-right'><legend>Armor<legend><span class='slot'></span></fieldset>" +
            "<fieldset id='accessory'><legend>Misc<legend><span class='slot'></span></fieldset> " +
            "<div id='meta'>" +
            "<div class='collectible'><img src='assets/coin-single.png' class='coin' /></div><span id='coins'>"+coins+"</span>" +
            "<br />" +
            "<div class='collectible'><img src='assets/bomb-single.png' class='bomb' /></div><span id='bombs'>"+bombs+"</span>" +
            "</div>" +
            "<div id='minimap'></div>";

// updates heart meter    
function updateHP(speed) {
    if(typeof(speed)==='undefined') {speed = 400;}
    if (max_hp<155) {
        $("#life-gray.line1").animate({'width': max_hp}, speed, "linear", function() {});;
        }
    else {var m_hp2 = max_hp - 154; 
        $("#life-gray.line1").animate({'width': 154}, speed, "linear", function() {}); 
        $("#life-gray.line2").animate({'width': m_hp2}, speed, "linear", function() {});
        }
    if (current_hp<155) {
        $("#life-red.line1").animate({'width': current_hp}, speed, "linear", function() {});
        }
    else {var c_hp2 = current_hp - 154; 
        $("#life-red.line1").animate({'width': 154}, speed, "linear", function() {});; 
        $("#life-red.line2").animate({'width': c_hp2}, speed, "linear", function() {});;
        }
    if (current_hp<=0) {
        disableActions(); Crafty('Weapon').destroy();
        Crafty('Player').disableControl().pauseAnimation().tween({
            x: Crafty('Player').x+18,
            y: Crafty('Player').y+20,
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
// sets bomb count
function updateBombs() {
    var old_bombs = $('#bombs').text();     // get old value
    if (old_bombs < bombs) {                // increment coins +1
        old_bombs++;
        $('#bombs').text(old_bombs);
        setTimeout("updateBombs()", 50);
        return;
        }
    if (old_bombs > bombs) {                // increment coins -1
        old_bombs--;
        $('#bombs').text(old_bombs);
        setTimeout("updateBombs()", 50);
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

// adds or subtracts coins
function getBombs(x) {
    bombs += x;  bombs = Math.max(0, bombs);
    updateBombs();
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
    if(facing=='up') {this.player.addComponent('charup').attr({facing: 'up'});} 
    if(facing=='down') {this.player.addComponent('chardown').attr({facing: 'down'});} 
    if(facing=='left') {this.player.addComponent('charleft').attr({facing: 'left'});} 
    if(facing=='right') {this.player.addComponent('charright').attr({facing: 'right'});}
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
        this.player.animate("walk_up", 10, -1)      // play proper movement animation for cross-transition motion
        .attr({facing: "up"}); }   
    if(right) { dir.right = true; this.player.animate("walk_right", 10, -1).attr({facing: "right"}); }
    if(down) { dir.down = true; this.player.animate("walk_down", 10, -1).attr({facing: "down"}); }
    if(left) { dir.left = true; this.player.animate("walk_left", 10, -1).attr({facing: "left"}); }
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
    
    emptyWorld();
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
 
// places an NPC
function setNPCname(name) {NPCname = name; NPCnice = NPCname.toLowerCase().replace(' ', '_');}
function makeNPC(options) {
    if(typeof(options.facing)==='undefined') {options.facing = 'down';}
    if(typeof(options.facing)==='undefined') {options.callback = false;}
    setNPCname(options.name);
    tell("Generating "+options.name+" at "+options.x+","+options.y+".");
    var newNPC = Crafty.e('NPC2').addComponent(options.name, NPCnice+'_'+options.facing)
        .at(options.x, options.y)
        .attr({
            spriteName: NPCnice, 
            name: options.NPCname, 
            interact: options.interaction, 
            callback: options.callback, 
            callbackDestroy:options.callbackDestroy});
    world[options.x][options.y] = newNPC.walkability;
    tell(newNPC.overx); tell(newNPC.overy);
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
    var newprop = Crafty.e(type).at(x, y);
    //console.log(newprop);
    if(typeof(newprop.walkability)!="undefined") {world[x][y] = newprop.walkability;}    
    return newprop;
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

// binds C to interact
function interact(e) {
    if(e.keyCode == Crafty.keys['C']) {
        if(interlocutor&&!talking) {            // if no dialogue, start dialogue
            if(interlocutor.has('NPC2')) {      // if interlocutor is a (new) NPC, turn it to face you
                var npc_facing; // set NPC facing opposite your own
                if(facing=='up') {npc_facing = 'down';} if(facing=='down') {npc_facing = 'up';}
                if(facing=='right') {npc_facing = 'left';} if(facing=='left') {npc_facing = 'right';}
                var npc_new_sprite = interlocutor.spriteName+'_'+npc_facing; // get name of new facing sprite
                interlocutor.addComponent(npc_new_sprite);
                }
            eval(interlocutor.interact);
            }
        else if(talking && !more_dialogue) {    // if end of dialogue, end dialogue
            // tell('this triggers sometimes'); // debug
            talking = false;
            dialog.destroy(); 
            if(itemGet == true) {
                Crafty('Player').sprite(0,3); facing = 'up'; interlocutor = false; itemGet = false;
                Crafty('Reward').destroy();
                Crafty.audio.unpause("theme");
                }
            resumeAll();
            Crafty.bind('KeyDown', (inventory));
            dialogueCallback();                 // check if we need to do anything after dialogue
            }
        else if(talking&&more_dialogue) {       // if more dialogue, continue dialogue
            eval(interlocutor.interact);
            }
        else if(!swinging&&weapon) {            // if nothing to interact with, use weapon!
            useWeapon(weapon);
            }
        }
    }

// binds D to secondary
function useSecondary(e) {
    if(e.keyCode == Crafty.keys['D']) {
        if(talking && !more_dialogue) {    // if end of dialogue, end dialogue
            // tell('this triggers sometimes'); // debug
            talking = false;
            dialog.destroy(); 
            if(itemGet == true) {
                Crafty('Player').sprite(0,3); itemGet = false;
                Crafty('Reward').destroy();
                Crafty.audio.unpause("theme");
                }
            resumeAll();
            Crafty.bind('KeyDown', (inventory));
            dialogueCallback();                 // check if we need to do anything after dialogue
            }
        else if(talking&&more_dialogue) {       // if more dialogue, continue dialogue
            eval(interlocutor.interact);
            }
        else if(!swinging&&weapon) {            // if nothing to interact with, use secondary!
            if(!secondary) {tell('nothing equipped'); return;} // if no secondary, fail elegantly
            //tell("use "+secondary); // debug
            else if(secondary=='Boomerang'&&has_boomerang) { // boomerang is special and has a lot of rules.
                // tell('have boomerang and will throw'); // debug
                chuckBoomerang();
                }
            else if(secondary=='Bombs') { // bomb is special and has a lot of rules.
                // tell('have boomerang and will throw'); // debug
                if(bombs<1) { //if you have no bombs, do nothing
                    //tell("You don't have any bombs to place!");
                    }
                else { // if you have bombs, use one of them
                    getBombs(-1); //tell("You used a bomb..."); 
                    Crafty.e("Bomb").attr({x: Crafty("Player").x+5, y: Crafty("Player").y+1});
                    }
                //chuckBoomerang();
                }
            else { // no special rules, so just use your secondary
                useWeapon(secondary);
                }
            }
        }
    }

// ==================================|
// basic dialogue functionality  :)  |
// ==================================|
function dialogue(statement, speaker, portrait) {
    if(talking) {dialog.destroy();}                         // clear previous pane if any
    var panes = statement.length; var text; var message;    // set up variables
    talking = true; trackplayer.x = Crafty('Player').x; trackplayer.y = Crafty('Player').y;
    if(panes>1) {                                       // if it's a multi-pane convo, do some counting
        if(!current_statement) {current_statement = 0;} // make sure we're on the 1st pane of a new dialogue
        message = statement[current_statement];         // get the message for the current pane 
        current_statement++;                            // increment panes for next dialogue() call
            // check if there's more after this
            if(current_statement < panes) {more_dialogue = true;} 
            else {more_dialogue = false; current_statement = 0;}
        }
    else {message = statement[0]; more_dialogue = false;}   // if it's a single-pane convo, just get it over with
    // set up the text for the dialogue box
    text = '<p>' + message + '</p>';
    if(more_dialogue) {text = text + '<img class="dialogue-next" src="assets/dialogue-next.gif" alt="there\'s more!" />';}
    if(speaker) {       // if there's a speaker, display his name
        text = '<h3><b>' + speaker + '</b></h3>' + text;      
        if(portrait) {  // if there's a portrait, show the portrait
            text = '<div class="portrait" style="background-image:url(\''+'assets/portraits/'+speaker+'.png'+'\');"></div>'+text;
            }
        }
    // display the dialogue box
    if(Crafty('Player').y>280) {var dialogue_y = -1;} else {var dialogue_y = 300;} // display the box over the half of the screen the player is not in
    dialog = Crafty.e("2D, DOM, Text, dialogue, dbox, light, innershadow").attr({ w: 480, h:179, x: 0, y: dialogue_y}).text(text);
    pauseAll(); Crafty.unbind('KeyDown', (inventory)); // pause the player
    }

// some dialogues do something after you're done with them
function dialogueCallback() {    
    // check for a callback - something to do once dialogue is complete
    if( !interlocutor.callback ) { tell('no callback'); return;}
    else {tell('callback triggered'); eval(interlocutor.callback);}
    if(interlocutor.callbackDestroy) {interlocutor.callback = '';}
    }

// test of non-dialogue interaction 
function torchBushes() {//console.log(Crafty('Bush'));
    Crafty('Bush').destroy();
    //tell('The crazy dude burned all the bushes.');
    dialogue(['The crazy dude burned all the bushes.']);
    }

// opens chests!
function openChest() {
    if(facing==interlocutor.direction) {
        var chest = interlocutor;       // get the chest's object
        interlocutor = false;           // clear interlocutor to prevent spammability
        chest.removeComponent('poi').addComponent('chest_open_'+chest.direction);    // prevent further opening || chest.direction is for extensibility
        if(chest.type == "weapon") {
            chestNotice(chest.contents, "weapon");
            return;
            }
        if(chest.type == "secondary") {
            chestNotice(chest.contents, "secondary", chest.value);
            return;
            }
        if(chest.type == "armor") {
            chestNotice(chest.contents, "armor");
            return;
            }
        if(chest.type == "misc") {
            chestNotice(chest.contents, "misc");
            return;
            }
        if(chest.type == "rupee") {
            chestNotice(chest.contents, "rupee", chest.value);
            return;
            }
        console.log(chest.contents);
        return;
        }
    return false;
    }

function chestNotice(contents, type, value) {
    // actually give the player the thing
    if(type == "weapon") {
        weapons_carried.push(contents);
        }
    else if(type == "secondary") {
        secondaries_carried.push(contents);
        if(contents == 'Bombs') {getBombs(value);} // if secondary is bombs, also get some bombs
        }
    else if(type == "armor") {
        outfits_carried.push(contents);
        }
    else if(type == "misc"&&contents!="Heart Container") {
        accessories_carried.push(contents);
        }
    else if(type == "rupee") {
        getCoins(value);
        }
    // do everything else
    Crafty.audio.pause("theme");
    Crafty.audio.play('chest');     // plays chest sound
    Crafty('Player').sprite(0, 4).attr({w: 36, h: 40}).collision([4,4], [32, 4], [32,36], [4,36]);  // item GET pose
    // create notification text
    var chestNotification = "You found ";
        // get the article
        if(value) {chestNotification += value+' ';} 
        else if(contents=='Heart Container') {chestNotification += 'a ';} 
        else {chestNotification += "the ";}
    chestNotification += contents+"! "+item_description[contents];
    if(type=="weapon"||type=="secondary"||type=="armor"||type=="misc") {
        chestNotification += " <br /><br />You can equip this item from your inventory by pressing S.";
        }
    var message = [chestNotification];
    itemGet = true;                     // allows the dialogue closing trigger to work best
    dialogue(message);        // creates notification
    if(contents=='Heart Container') {heartContainer();}
    Crafty.e('Reward').attr({x: Crafty('Player').x-11, y: Crafty('Player').y-58});  // displays reward shining above head
    $(".Reward").append('<img src="assets/inventory/'+contents+'-inv.png" />');
    }

// ~~~~~
// ~~~~~
/* COMBAT FUNCTIONS */
// ~~~~~
// ~~~~~

// triggers on interaction key (Z) when not in a menu or dialogue. uses active weapon.
function useWeapon(weapon) {
    swinging = true; potent = true;             // enable attacks
    Crafty('Player').disableControl().pauseAnimation();   // pause the player
    disableActions();                           // stop interaction & inventory & pause
    //console.log("You swing your mighty "+weapon+" "+facing+"!");
    
    Crafty.e(weapon).attr({x: 100, y: 100}).timeout(function() {
        Crafty('Weapon').destroy(); swinging = false; 
        Crafty('Player').trigger("Run").enableControl();
        enableActions();
        }, Crafty('Weapon').useSpeed);
    if(facing=='up') {
        Crafty('Weapon')
        .attr({rotation: 180, x: Crafty('Player').x+Crafty('Player').w/2+Crafty('Weapon').w/2-8, y: Crafty('Player').y+15});
        }
    if(facing=='left') {
        Crafty('Weapon')
        .attr({rotation: 90, x: Crafty('Player').x+15, y: Crafty('Player').y+Crafty('Player').h/2-Crafty('Weapon').w/2+8});
        }
    if(facing=='right') {
        Crafty('Weapon')
        .attr({rotation: 270, x: Crafty('Player').x+Crafty('Player').w-15, y: Crafty('Player').y+Crafty('Player').h/2+Crafty('Weapon').w/2+8});
        }
    if(facing=='down') {
        Crafty('Weapon')
        .attr({z: 1001, rotation: 0, x: Crafty('Player').x+Crafty('Player').w/2-Crafty('Weapon').w/2+8, y: Crafty('Player').y+Crafty('Player').h-15});
        }
    Crafty('Player').attach(Crafty('Weapon'));  // weapon moves with you if you move, though ATM you shouldn't move
    Crafty('Weapon').attr({h:0}).tween({h:Crafty('Weapon').length}, 2); // extend the weapon quickly
    //Crafty('weapon').pauseAnimation().animate("swing", 6.5, 1);
    }

// triggers when a monster hits 0 hp or falls in a hole
function killMonster(monster) {
    monsters_on_screen--;                                                   // one fewer monster!
    // if(monsters_on_screen==0) { console.log("You killed them all!"); }   // test for eradication of monsters
    if(monster.death&&monster.death!="random") {eval(monster.death)(monster.x, monster.y);}       // runs any death trigger for the killed monster
    if(monster.death=="random") {                                 // only drop random loot if YOU killed the monster // this is an imperfect check BTW
        randomLoot(monster.x, monster.y); // add a "worth" attribute or something in order to tier random drops
        }
    //primitive death animation using alpha tween
    // UNBINDING ENTERFRAME BREAKS MONSTER DEATH TWEEN
    // NOT UNBINDING IT BREAKS EVERYTHING ELSE ABOUT DEATH
    monster.pauseAnimation().trigger("Pause").unbind("Moved").unbind("Slide").unbind("EnterFrame", monster.moveFunc)   // stop its movement
    .removeComponent("Painful").removeComponent("Monster")  // stop it from hurting PC, or dying multiple times
    .attr({alpha:1.0}).tween({alpha:0.0}, 500).timeout(function() {this.destroy();tell("it's gone!");}, 500);
    if(monsters_on_screen<=0&&unlock_by_killing) {unlockDoors();}
    }

// when monsters with "death:random" die, they trigger this random loot generator
function randomLoot(x, y) { // add a "worth" argument in order to tier random drops
    var loot_result = Math.floor((Math.random()*9)+1);
    var loot_table = ['', 'RupeeG', 'RupeeG', 'RupeeG', 'RupeeG', 'RupeeB', 'BombDrop', 'HeartFull', 'HeartHalf', 'HeartHalf'];
    //var loot_table = ['BombDrop', 'BombDrop', 'BombDrop', 'BombDrop', 'BombDrop', 'BombDrop', 'BombDrop', 'BombDrop', 'BombDrop', 'BombDrop']; // debugging bombs
    if(!loot_table[loot_result]) {tell('no drops');}
    // don't drop bombs unless player has bombs
    else if(loot_table[loot_result]=='BombDrop'&&jQuery.inArray("Bombs", secondaries_carried)<0) {tell("You don't have bombs yet so lawl");}
    else {dropLoot(loot_table[loot_result], x, y);}
    }

// places a pick up at a given location
function dropLoot(loot, x, y) {
    var newdrop = Crafty.e(loot).attr({x:x, y:y});
    newdrop.attr({x:x+newdrop.overx, y:y+newdrop.overy});
    }

function heartContainer() {
    max_hp += 22;
    updateHP(10);
    current_hp = max_hp;
    updateHP(1500);
    }

// triggers the first invulnerability frame
function damagePlayer(x) {
    tell("You've been hit!"); 
    current_hp = Math.max(current_hp-x, 0); updateHP(10);
    Crafty('Player').removeComponent('vulnerable');//.fourway(2); speed = 2;
    flicker1(10);
   }
   
// flicker out
function flicker1(x) {
    if(x&&current_hp>0) {
        if(!Crafty('Player').paused) {x--; console.log(x);}
        Crafty('Player').tween({alpha: 0.5}, 5)
        .timeout(function(){flicker2(x);}, 100);
        }
    else if (current_hp>0) {
        Crafty('Player').addComponent('vulnerable');//.fourway(4); speed = 4;
        }
    }

// flicker in
function flicker2(x) {
    Crafty('Player').tween({alpha: 1.0}, 5)
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
    Crafty.audio.play('falling');
    Crafty('Player').disableControl()                                  // turn off player controls; stop animation; tween falling animation
        .sprite(0,0).pauseAnimation()
        .tween({
            w: 1, h: 1, 
            rotation: -45, 
            x: current_hole.x+19, 
            y: current_hole.y+19
            }, 1000)
            // above: set timer (32 frames = 1 sec) for falling animation; below: set timer (1000 ms = 1 sec) for control reset 
        .timeout(function(){eval(current_hole.interact);}, 1000);       // run hole function (e.g. fall endless or go_to)
    }

// enemies that fall into holes die permanently, but don't drop loot.
function fallFoe(foe, foe_hole) {
    foe.unbind('EnterFrame')
        .sprite(0,0).pauseAnimation().tween({w: 1, h: 1, rotation: -45, x: foe_hole.x+19, y: foe_hole.y+19}, 32)
        .timeout(function(){foe.death(''); killMonster(foe);}, 1000);
    }

// for those nasty holes in the ground that don't lead anywhere except to damage.
function fallEndless() {
    damagePlayer(22);                                                               // make the PC hurt a full heart
    if(current_hp<=0) {return;}
    else {
        Crafty('hole_entered').addComponent('hole').removeComponent('hole_entered');    // reset hole for falling
        Crafty('Player').destroy();                                                     // destroy tiny, fallen PC
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
    trackplayer.x = xpos; trackplayer.y = ypos; tell("ypos="+ypos);
    facing = "down";
    Crafty('Player').attr({x:xpos, y:0}).removeComponent("vulnerable").disableControl().pauseAnimation().tween({y: ypos}, 500).timeout(function() {
        Crafty('Player').enableControl().addComponent("vulnerable");
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
    Crafty('Door').each(function() {this.open();});
    }
// makes sure that the player is inside the room, and not stuck in a solid dungeon door
function closeDoors(monsters) {
    if(monsters) {unlock_by_killing = true;} else {unlock_by_killing = false;} // sometimes you need to unlock doors by other means!
    if(trackplayer.x>440) {trackplayer.x = 440; Crafty('Player').tween({x: 440}, 4);} 
    if(trackplayer.x<40) {trackplayer.x = 40; Crafty('Player').tween({x: 40}, 4);}
    if(trackplayer.y>440) {trackplayer.y = 440; Crafty('Player').tween({y: 440}, 4);} 
    if(trackplayer.y<40) {trackplayer.y = 40; Crafty('Player').tween({y: 40}, 4);}
    }