Crafty.scene('Game', function() {
    current_scene = this;
    scene_name = "Game";
    tileAll('Grass');
    initOccupy();
    placePlayer();
    exit(4,-1, 'north1');
    exit(-1,5, 'west1');
    exit(-1,6, 'west1');
    exit(-1,7, 'west1');
    exit(6, 13, 'south1');
    
    this.occupied[5][5] = true; // occupy player's initial position
 
    tile('Grass', 0, 0); tile('Grass', 1, 0); tile('Grass', 2, 0); tile('Grass', 3, 0); tile('Grass', 4, 0); tile('Grass', 5, 0); tile('Grass', 6, 0); tile('Grass', 7, 0); tile('Grass', 8, 0); tile('Grass', 9, 0); tile('Grass', 10, 0); tile('Grass', 11, 0); tile('Grass', 12, 0); tile('Grass', 0, 1); tile('Grass', 1, 1); tile('Grass', 2, 1); tile('Grass', 3, 1); tile('Grass', 4, 1); prop('Bush', 4, 1); tile('Grass', 5, 1); tile('Grass', 6, 1); tile('Grass', 7, 1); tile('Grass', 8, 1); prop('Bush', 8, 1); tile('Grass', 9, 1); tile('Grass', 10, 1); tile('Grass', 11, 1); tile('Grass', 12, 1); tile('Grass', 0, 2); tile('Grass', 1, 2); tile('Grass', 2, 2); tile('Grass', 3, 2); tile('Grass', 4, 2); tile('Grass', 5, 2); tile('Grass', 6, 2); prop('Bush', 6, 2); tile('Grass', 7, 2); tile('Grass', 8, 2); prop('Bush', 8, 2); tile('Grass', 9, 2); tile('Grass', 10, 2); prop('Bush', 10, 2); tile('Grass', 11, 2); tile('Grass', 12, 2); tile('Grass', 0, 3); tile('Grass', 1, 3); tile('Grass', 2, 3); tile('Grass', 3, 3); tile('Grass', 4, 3); tile('Grass', 5, 3); tile('Grass', 6, 3); prop('Bush', 6, 3); tile('Grass', 7, 3); tile('Grass', 8, 3); tile('Grass', 9, 3); tile('Grass', 10, 3); prop('Bush', 10, 3); tile('Grass', 11, 3); tile('Grass', 12, 3); tile('Grass', 0, 4); tile('Grass', 1, 4); tile('Grass', 2, 4); tile('Grass', 3, 4); tile('Grass', 4, 4); tile('Grass', 5, 4); tile('Grass', 6, 4); tile('Grass', 7, 4); prop('Bush', 7, 4); tile('Grass', 8, 4); prop('Bush', 8, 4); tile('Grass', 9, 4); prop('Bush', 9, 4); tile('Grass', 10, 4); prop('Bush', 10, 4); tile('Grass', 11, 4); tile('Grass', 12, 4); tile('Grass', 0, 5); tile('Grass', 1, 5); tile('Grass', 2, 5); tile('Grass', 3, 5); tile('Grass', 4, 5); tile('Grass', 5, 5); tile('Grass', 6, 5); tile('Grass', 7, 5); prop('Bush', 7, 5); tile('Grass', 8, 5); tile('Grass', 9, 5); tile('Grass', 10, 5); tile('Grass', 11, 5); tile('Grass', 12, 5); tile('Grass', 0, 6); tile('Grass', 1, 6); tile('Grass', 2, 6); tile('Grass', 3, 6); tile('Grass', 4, 6); tile('Grass', 5, 6); tile('Grass', 6, 6); tile('Grass', 7, 6); prop('Bush', 7, 6); tile('Grass', 8, 6); tile('Grass', 9, 6); prop('Bush', 9, 6); tile('Grass', 10, 6); prop('Bush', 10, 6); tile('Grass', 11, 6); prop('Bush', 11, 6); tile('Grass', 12, 6); tile('Grass', 0, 7); tile('Grass', 1, 7); tile('Grass', 2, 7); tile('Grass', 3, 7); tile('Grass', 4, 7); tile('Grass', 5, 7); tile('Grass', 6, 7); tile('Grass', 7, 7); prop('Bush', 7, 7); tile('Grass', 8, 7); tile('Grass', 9, 7); tile('Grass', 10, 7); tile('Grass', 11, 7); tile('Grass', 12, 7); tile('Grass', 0, 8); tile('Grass', 1, 8); tile('Grass', 2, 8); tile('Grass', 3, 8); tile('Grass', 4, 8); tile('Grass', 5, 8); tile('Grass', 6, 8); tile('Grass', 7, 8); prop('Bush', 7, 8); tile('Grass', 8, 8); prop('Bush', 8, 8); tile('Grass', 9, 8); prop('Bush', 9, 8); tile('Grass', 10, 8); prop('Bush', 10, 8); tile('Grass', 11, 8); tile('Grass', 12, 8); tile('Grass', 0, 9); tile('Grass', 1, 9); prop('Bush', 1, 9); tile('Grass', 2, 9); prop('Bush', 2, 9); tile('Grass', 3, 9); prop('Bush', 3, 9); tile('Grass', 4, 9); tile('Grass', 5, 9); tile('Grass', 6, 9); tile('Grass', 7, 9); prop('Bush', 7, 9); tile('Grass', 8, 9); tile('Grass', 9, 9); tile('Grass', 10, 9); tile('Grass', 11, 9); tile('Grass', 12, 9); tile('Grass', 0, 10); tile('Grass', 1, 10); prop('Bush', 1, 10); prop('Rock', 2, 10); tile('Grass', 3, 10); prop('Bush', 3, 10); tile('Grass', 4, 10); tile('Grass', 5, 10); tile('Grass', 6, 10); tile('Grass', 7, 10); prop('Bush', 7, 10); tile('Grass', 8, 10); tile('Grass', 9, 10); prop('Bush', 9, 10); tile('Grass', 10, 10); prop('Bush', 10, 10); tile('Grass', 11, 10); prop('Bush', 11, 10); tile('Grass', 12, 10); tile('Grass', 0, 11); tile('Grass', 1, 11); prop('Bush', 1, 11); tile('Grass', 2, 11); prop('Bush', 2, 11); tile('Grass', 3, 11); prop('Bush', 3, 11); tile('Grass', 4, 11); tile('Grass', 5, 11); tile('Grass', 6, 11); tile('Grass', 7, 11); prop('Bush', 7, 11); tile('Grass', 8, 11); tile('Grass', 9, 11); tile('Grass', 10, 11); tile('Grass', 11, 11); tile('Grass', 12, 11); tile('Grass', 0, 12); tile('Grass', 1, 12); tile('Grass', 2, 12); tile('Grass', 3, 12); tile('Grass', 4, 12); tile('Grass', 5, 12); tile('Grass', 6, 12); tile('Grass', 7, 12); tile('Grass', 8, 12); tile('Grass', 9, 12); tile('Grass', 10, 12); tile('Grass', 11, 12); tile('Grass', 12, 12);
        
    setNPCname('Old Man');
    makeNPC({
        name: NPCname, 
        x:2, y:4, 
        interaction:"dialogue("+NPCnice+"_dialogue, '"+NPCname+"', true)"
        });
    
    setNPCname('Shy Kid');
    makeNPC({
        name: NPCname, 
        x:11, y:11, 
        interaction:"dialogue("+NPCnice+"_dialogue, '"+NPCname+"')", 
        facing: 'left', 
        callback: shy_kid_callback,
        callbackDestroy: true,
        value: 5,
        contents: "Bombs",
        type: "secondary"
        });  
    
    setNPCname('Healer');
    makeNPC({
        name: NPCname, 
        x:3, y:4, 
        interaction:"dialogue("+NPCnice+"_dialogue, '"+NPCname+"')",
        callback:"current_hp = max_hp; updateHP(1500);"
        });  
 
  // BURNINATOR
  NPCname = "Old Man 2";
  this.npc2 = Crafty.e('NPC').at(2, 1).color('#63f9ff').attr({name: NPCname, interact: "torchBushes()"});
  this.occupied[this.npc2.at().x][this.npc2.at().y] = true;
  
    edgePop('Tree');
  
});



Crafty.scene('north1', function() {
    current_scene = this;
    tileAll('Grass');  
    initOccupy();
    placePlayer();
    exit(4,13,'Game');
    exit(-1,8,'nw1');
    exit(13,2,'ne1');
    
    Crafty.e('RockP').at(6, 6).attr({slide: "left", minX: 200, minY: 239, maxX: 241, maxY: 241, interact: "reveal()"});
    
    // OLD MAN
    NPCname = "Woodsman";
    this.npc = Crafty.e('NPC').at(2, 4).attr({name: NPCname, interact: "dialogue(woodsman_dialogue, '"+NPCname+"')"});
    this.occupied[this.npc.at().x][this.npc.at().y] = true;
 
    edgePop('Tree');
    tile('TreeWalkable', 12, 2);
     
});

Crafty.scene('nw1', function() {
    current_scene = this;
    initOccupy();
    placePlayer();
    exit(13,8,'north1');
    exit(6,13,'west1');
    
    // generate level
    prop('Rock', 0, 0); prop('Rock', 1, 0); prop('Rock', 2, 0); prop('Rock', 3, 0); prop('Rock', 4, 0); prop('Rock', 5, 0); prop('Rock', 6, 0); prop('Rock', 7, 0); prop('Rock', 8, 0); prop('Rock', 9, 0); prop('Rock', 10, 0); prop('Rock', 11, 0); tile('Grass', 12, 0); prop('Rock', 0, 1); tile('Grass', 1, 1); tile('Grass', 2, 1); tile('Grass', 3, 1); tile('Grass', 4, 1); tile('Grass', 5, 1); tile('Grass', 6, 1); tile('Grass', 7, 1); tile('Grass', 8, 1); tile('Grass', 9, 1); tile('Grass', 10, 1); tile('Grass', 11, 1); tile('Grass', 12, 1); prop('Rock', 0, 2); tile('Grass', 1, 2); prop('Rock', 2, 2); tile('Grass', 3, 2); tile('Grass', 4, 2); tile('Grass', 5, 2); prop('Rock', 6, 2); tile('Grass', 7, 2); tile('Grass', 8, 2); tile('Grass', 9, 2); prop('Rock', 10, 2); tile('Grass', 11, 2); tile('Grass', 12, 2); prop('Rock', 0, 3); tile('Grass', 1, 3); tile('Grass', 2, 3); tile('Grass', 3, 3); tile('Grass', 4, 3); tile('Grass', 5, 3); tile('Grass', 6, 3); tile('Grass', 7, 3); tile('Grass', 8, 3); tile('Grass', 9, 3); tile('Grass', 10, 3); tile('Grass', 11, 3); tile('Grass', 12, 3); prop('Rock', 0, 4); tile('Grass', 1, 4); tile('Grass', 2, 4); tile('Grass', 3, 4); tile('Grass', 4, 4); tile('Grass', 5, 4); tile('Grass', 6, 4); tile('Grass', 7, 4); tile('Grass', 8, 4); tile('Grass', 9, 4); tile('Grass', 10, 4); tile('Grass', 11, 4); tile('Grass', 12, 4); prop('Rock', 0, 5); tile('Grass', 1, 5); tile('Grass', 2, 5); tile('Grass', 3, 5); tile('Grass', 4, 5); tile('Grass', 5, 5); tile('Grass', 6, 5); tile('Grass', 7, 5); tile('Grass', 8, 5); tile('Grass', 9, 5); tile('Grass', 10, 5); tile('Grass', 11, 5); tile('Grass', 12, 5); prop('Rock', 0, 6); tile('Grass', 1, 6); prop('Rock', 2, 6); tile('Grass', 3, 6); tile('Grass', 4, 6); tile('Grass', 5, 6); prop('Rock', 6, 6); tile('Grass', 7, 6); tile('Grass', 8, 6); tile('Grass', 9, 6); prop('Rock', 10, 6); tile('Grass', 11, 6); tile('Grass', 12, 6); prop('Rock', 0, 7); tile('Grass', 1, 7); tile('Grass', 2, 7); tile('Grass', 3, 7); tile('Grass', 4, 7); tile('Grass', 5, 7); tile('Grass', 6, 7); tile('Grass', 7, 7); tile('Grass', 8, 7); tile('Grass', 9, 7); tile('Grass', 10, 7); tile('Grass', 11, 7); tile('Grass', 12, 7); prop('Rock', 0, 8); tile('Grass', 1, 8); tile('Grass', 2, 8); tile('Grass', 3, 8); tile('Grass', 4, 8); tile('Grass', 5, 8); tile('Grass', 6, 8); tile('Grass', 7, 8); tile('Grass', 8, 8); tile('Grass', 9, 8); tile('Grass', 10, 8); tile('Grass', 11, 8); tile('Grass', 12, 8); prop('Rock', 0, 9); tile('Grass', 1, 9); tile('Grass', 2, 9); tile('Grass', 3, 9); tile('Grass', 4, 9); tile('Grass', 5, 9); tile('Grass', 6, 9); tile('Grass', 7, 9); tile('Grass', 8, 9); tile('Grass', 9, 9); tile('Grass', 10, 9); tile('Grass', 11, 9); tile('Grass', 12, 9); prop('Rock', 0, 10); tile('Grass', 1, 10); prop('Rock', 2, 10); tile('Grass', 3, 10); tile('Grass', 4, 10); tile('Grass', 5, 10); prop('Rock', 6, 10); tile('Grass', 7, 10); tile('Grass', 8, 10); tile('Grass', 9, 10); prop('Rock', 10, 10); tile('Grass', 11, 10); tile('Grass', 12, 10); prop('Rock', 0, 11); tile('Grass', 1, 11); tile('Grass', 2, 11); tile('Grass', 3, 11); tile('Grass', 4, 11); tile('Grass', 5, 11); tile('Grass', 6, 11); tile('Grass', 7, 11); tile('Grass', 8, 11); tile('Grass', 9, 11); tile('Grass', 10, 11); tile('Grass', 11, 11); tile('Grass', 12, 11); tile('Grass', 0, 12); tile('Grass', 1, 12); tile('Grass', 2, 12); tile('Grass', 3, 12); tile('Grass', 4, 12); tile('Grass', 5, 12); tile('Grass', 6, 12); tile('Grass', 7, 12); tile('Grass', 8, 12); tile('Grass', 9, 12); tile('Grass', 10, 12); tile('Grass', 11, 12); tile('Grass', 12, 12);
    
    // Testing "minion" monsters who fall into holes and die.
    // propA('Hole', 1, 3, 11, 5);
    // monster('KingSlime', 3, 6);
    
    monster('Slime', 1, 1);
    monster('Slime', 8, 6);
    monster('Slime', 3, 10);
    
    NPCname = "Groundskeeper";
    this.npc = Crafty.e('NPC').at(8, 8).attr({name: NPCname, interact: "dialogue(groundskeeper_dialogue, '"+NPCname+"', true)"});
    current_scene.occupied[this.npc.at().x][current_scene.npc.at().y] = true;
    
    edgePop('Tree');
 
});

Crafty.scene('ne1', function() {
    current_scene = this;
    tileAll('Grass');
    initOccupy();
    placePlayer();
    exit(-1,2, 'north1'); 
 
    Crafty.e("2D, DOM, Text, Solid, poi").attr({ x: 200, y: 200, w: 162, h:15, interact: "dialogue(nope)" }).text("It's a secret to everybody.");

    edgePop('Tree');
    tile('TreeWalkable', 0, 2);
    
        
    // secret test chests
    prop('Chest', 1, 1).attr({contents: "Wedding Dress", type: "armor"});
    prop('Chest', 2, 1).attr({contents: "Shield", type: "secondary"});
    prop('Chest', 2, 3).attr({contents: "Bombs", value: 5, type: "secondary"});
    prop('Chest', 3, 1).attr({contents: "Rupees", value: 50, type: "rupee"});
    prop('Chest', 4, 1).attr({contents: "Rupees", value: 20, type: "rupee"});
    prop('Chest', 5, 1).attr({contents: "Longspear", type: "weapon"});
    prop('Chest', 6, 1).attr({contents: "Heart Container", type: "misc"});
    prop('HeartContainer', 7, 1);
 
});


Crafty.scene('west1', function() {
    current_scene = this;
    initOccupy();
    placePlayer();
    exit(6,-1,'nw1');
    exit(13,5, 'Game');
    exit(13,6, 'Game');
    exit(13,7, 'Game');
    exit(-1,6, 'west2');
    
    tile('Grass', 0, 0); tile('Grass', 1, 0); tile('Grass', 2, 0); tile('Grass', 3, 0); tile('Grass', 4, 0); tile('Grass', 5, 0); tile('Grass', 6, 0); tile('Grass', 7, 0); tile('Grass', 8, 0); tile('Grass', 9, 0); tile('Grass', 10, 0); tile('Grass', 11, 0); tile('Grass', 12, 0); tile('Grass', 0, 1); tile('Grass', 1, 1); tile('Grass', 2, 1); tile('Grass', 3, 1); tile('Grass', 4, 1); tile('Grass', 5, 1); tile('Grass', 6, 1); tile('Grass', 7, 1); tile('Grass', 8, 1); tile('Grass', 9, 1); tile('Grass', 10, 1); tile('Grass', 11, 1); tile('Grass', 12, 1); tile('Grass', 0, 2); tile('Grass', 1, 2); tile('Grass', 2, 2); tile('Grass', 3, 2); tile('Grass', 4, 2); tile('Grass', 5, 2); tile('Grass', 6, 2); tile('Grass', 7, 2); tile('Grass', 8, 2); tile('Grass', 9, 2); tile('Grass', 10, 2); tile('Grass', 11, 2); tile('Grass', 12, 2); tile('Grass', 0, 3); tile('Grass', 1, 3); tile('Grass', 2, 3); tile('Grass', 3, 3); prop('Rock', 4, 3); tile('Grass', 5, 3); tile('Grass', 6, 3); tile('Grass', 7, 3); tile('Sand', 8, 3); tile('Grass', 9, 3); tile('Grass', 10, 3); tile('Grass', 11, 3); tile('Grass', 12, 3); tile('Grass', 0, 4); tile('Grass', 1, 4); tile('Grass', 2, 4); prop('Rock', 3, 4); tile('Sand', 4, 4); prop('Rock', 5, 4); tile('Grass', 6, 4); prop('Rock', 7, 4); tile('Sand', 8, 4); prop('Rock', 9, 4); tile('Grass', 10, 4); tile('Grass', 11, 4); tile('Grass', 12, 4); tile('Grass', 0, 5); tile('Grass', 1, 5); prop('Rock', 2, 5); tile('Sand', 3, 5); tile('Sand', 4, 5); tile('Sand', 5, 5); prop('Rock', 6, 5); tile('Sand', 7, 5); tile('Sand', 8, 5); tile('Sand', 9, 5); prop('Rock', 10, 5); tile('Grass', 11, 5); tile('Grass', 12, 5); tile('Grass', 0, 6); tile('Grass', 1, 6); prop('Rock', 2, 6); tile('Sand', 3, 6); tile('Sand', 4, 6); tile('Sand', 5, 6); tile('Sand', 6, 6); tile('Sand', 7, 6); tile('Sand', 8, 6); tile('Sand', 9, 6); prop('Rock', 10, 6); tile('Grass', 11, 6); tile('Grass', 12, 6); tile('Grass', 0, 7); tile('Grass', 1, 7); tile('Grass', 2, 7); prop('Rock', 3, 7); tile('Sand', 4, 7); tile('Sand', 5, 7); tile('Sand', 6, 7); tile('Sand', 7, 7); tile('Sand', 8, 7); prop('Rock', 9, 7); tile('Grass', 10, 7); tile('Grass', 11, 7); tile('Grass', 12, 7); tile('Grass', 0, 8); tile('Grass', 1, 8); tile('Grass', 2, 8); tile('Grass', 3, 8); prop('Rock', 4, 8); tile('Sand', 5, 8); tile('Sand', 6, 8); tile('Sand', 7, 8); prop('Rock', 8, 8); tile('Grass', 9, 8); tile('Grass', 10, 8); tile('Grass', 11, 8); tile('Grass', 12, 8); tile('Grass', 0, 9); tile('Grass', 1, 9); tile('Grass', 2, 9); tile('Grass', 3, 9); tile('Grass', 4, 9); prop('Rock', 5, 9); tile('Sand', 6, 9); prop('Rock', 7, 9); tile('Grass', 8, 9); tile('Grass', 9, 9); tile('Grass', 10, 9); tile('Grass', 11, 9); tile('Grass', 12, 9); tile('Grass', 0, 10); tile('Grass', 1, 10); tile('Grass', 2, 10); tile('Grass', 3, 10); tile('Grass', 4, 10); tile('Grass', 5, 10); prop('Rock', 6, 10); tile('Grass', 7, 10); tile('Grass', 8, 10); tile('Grass', 9, 10); tile('Grass', 10, 10); tile('Grass', 11, 10); tile('Grass', 12, 10); tile('Grass', 0, 11); tile('Grass', 1, 11); tile('Grass', 2, 11); tile('Grass', 3, 11); tile('Grass', 4, 11); tile('Grass', 5, 11); tile('Grass', 6, 11); tile('Grass', 7, 11); tile('Grass', 8, 11); tile('Grass', 9, 11); tile('Grass', 10, 11); tile('Grass', 11, 11); tile('Grass', 12, 11); tile('Grass', 0, 12); tile('Grass', 1, 12); tile('Grass', 2, 12); tile('Grass', 3, 12); tile('Grass', 4, 12); tile('Grass', 5, 12); tile('Grass', 6, 12); tile('Grass', 7, 12); tile('Grass', 8, 12); tile('Grass', 9, 12); tile('Grass', 10, 12); tile('Grass', 11, 12); tile('Grass', 12, 12);
    
    Crafty.e('RockP').at(8, 3).attr({slide: "left", minX: 280, minY: 119, maxX: 321, maxY: 161, interact: 'hidden_passage1()'});
 
    edgePop('Tree');
 
});

Crafty.scene('west2', function() {
    current_scene = this;
    initOccupy();
    placePlayer();
    exit(13,6,'west1');
    exit(3, 13, 'ocean');
    exit(4, 13, 'ocean');
    
    // MAP
    tile('Grass', 0, 0); prop('Tree', 0, 0); tile('GrassR', 1, 0); tile('Sand', 2, 0); tile('Sand', 3, 0); tile('Sand', 4, 0); tile('Sand', 5, 0); tile('Sand', 6, 0); tile('Sand', 7, 0); tile('Sand', 8, 0); tile('Sand', 9, 0); tile('Sand', 10, 0); tile('Sand', 11, 0); tile('Sand', 12, 0); tile('GrassB', 0, 1); tile('GrassBR', 1, 1); tile('Sand', 2, 1); tile('Sand', 3, 1); tile('Sand', 4, 1); tile('Sand', 5, 1); tile('Sand', 6, 1); tile('Sand', 7, 1); tile('Sand', 8, 1); tile('Sand', 9, 1); tile('Sand', 10, 1); tile('Sand', 11, 1); tile('Sand', 12, 1); tile('Sand', 0, 2); tile('Sand', 1, 2); tile('Sand', 2, 2); tile('Sand', 3, 2); tile('Sand', 4, 2); tile('Sand', 5, 2); tile('Sand', 6, 2); tile('Sand', 7, 2); prop('WaterTL', 8, 2); prop('WaterTR', 9, 2); tile('Sand', 10, 2); tile('Sand', 11, 2); tile('Sand', 12, 2); tile('Sand', 0, 3); tile('Sand', 1, 3); tile('Sand', 2, 3); tile('Sand', 3, 3); tile('Sand', 4, 3); tile('Sand', 5, 3); tile('Sand', 6, 3); tile('Sand', 7, 3); prop('WaterL', 8, 3); tile('SandBLw', 9, 3); prop('WaterTR', 10, 3); tile('Sand', 11, 3); tile('Sand', 12, 3); tile('Sand', 0, 4); tile('Sand', 1, 4); tile('Sand', 2, 4); tile('Sand', 3, 4); tile('Sand', 4, 4); tile('Sand', 5, 4); tile('Sand', 6, 4); tile('Sand', 7, 4); prop('WaterL', 8, 4); prop('WaterM', 9, 4); prop('WaterR', 10, 4); tile('Sand', 11, 4); tile('Sand', 12, 4); tile('Sand', 0, 5); tile('Sand', 1, 5); tile('Sand', 2, 5); tile('Sand', 3, 5); tile('Sand', 4, 5); tile('Sand', 5, 5); tile('Sand', 6, 5); tile('Sand', 7, 5); prop('WaterBL', 8, 5); prop('WaterB', 9, 5); prop('WaterBR', 10, 5); tile('GrassTL', 11, 5); tile('GrassT', 12, 5); prop('Tree', 12, 5); tile('Sand', 0, 6); tile('Sand', 1, 6); tile('Sand', 2, 6); tile('Sand', 3, 6); tile('Sand', 4, 6); tile('Sand', 5, 6); tile('Sand', 6, 6); tile('Sand', 7, 6); tile('Sand', 8, 6); tile('Sand', 9, 6); tile('GrassTL', 10, 6); tile('SandBRg', 11, 6); tile('Grass', 12, 6); tile('Sand', 0, 7); tile('Sand', 1, 7); tile('Sand', 2, 7); tile('Sand', 3, 7); tile('Sand', 4, 7); tile('Sand', 5, 7); tile('Sand', 6, 7); tile('Sand', 7, 7); tile('Sand', 8, 7); tile('Sand', 9, 7); tile('GrassL', 10, 7); tile('Grass', 11, 7); tile('Grass', 12, 7); prop('Tree', 12, 7); tile('Sand', 0, 8); tile('Sand', 1, 8); tile('Sand', 2, 8); tile('Sand', 3, 8); tile('Sand', 4, 8); tile('Sand', 5, 8); tile('Sand', 6, 8); tile('Sand', 7, 8); tile('Sand', 8, 8); tile('Sand', 9, 8); tile('GrassL', 10, 8); tile('Grass', 11, 8); tile('Grass', 12, 8); prop('Tree', 12, 8); prop('WaterT', 0, 9); prop('WaterT', 1, 9); prop('WaterT', 2, 9); prop('WaterTR', 3, 9); prop('WaterTL', 4, 9); prop('WaterT', 5, 9); prop('WaterT', 6, 9); prop('WaterT', 7, 9); prop('WaterTR', 8, 9); tile('Sand', 9, 9); tile('GrassBL', 10, 9); tile('SandTRg', 11, 9); tile('Grass', 12, 9); prop('Tree', 12, 9); prop('WaterM', 0, 10); prop('WaterM', 1, 10); prop('WaterM', 2, 10); prop('WaterR', 3, 10); prop('WaterL', 4, 10); prop('WaterM', 5, 10); prop('WaterM', 6, 10); prop('WaterM', 7, 10); tile('SandBLw', 8, 10); prop('WaterTR', 9, 10); tile('Sand', 10, 10); tile('GrassBL', 11, 10); tile('GrassB', 12, 10); prop('Tree', 12, 10); prop('WaterM', 0, 11); prop('WaterM', 1, 11); prop('WaterM', 2, 11); prop('WaterR', 3, 11); prop('WaterL', 4, 11); prop('WaterM', 5, 11); prop('WaterM', 6, 11); prop('WaterM', 7, 11); tile('SandTLw', 8, 11); prop('WaterBR', 9, 11); tile('Sand', 10, 11); tile('Sand', 11, 11); tile('Sand', 12, 11); prop('WaterM', 0, 12); prop('WaterM', 1, 12); prop('WaterM', 2, 12); prop('WaterR', 3, 12); prop('WaterL', 4, 12); prop('WaterM', 5, 12); prop('WaterM', 6, 12); prop('WaterM', 7, 12); prop('WaterR', 8, 12); tile('Sand', 9, 12); tile('Sand', 10, 12); tile('Sand', 11, 12); tile('Sand', 12, 12);

    edgePop('Cactus');

    monster('Slime', 4, 4);
 
});

Crafty.scene('ocean', function() {
                         
    current_scene = this;
    initOccupy();
    exit(3,-1,'west2');
    exit(4,-1, 'west2');
    placePlayer();
    
    // MAP
    prop('WaterM', 0, 0); prop('WaterM', 1, 0); prop('WaterM', 2, 0); prop('WaterR', 3, 0); prop('WaterL', 4, 0); prop('WaterM', 5, 0); prop('WaterM', 6, 0); prop('WaterM', 7, 0); prop('WaterM', 8, 0); prop('WaterM', 9, 0); prop('WaterM', 10, 0); prop('WaterM', 11, 0); prop('WaterM', 12, 0); prop('WaterM', 0, 1); prop('WaterM', 1, 1); prop('WaterM', 2, 1); prop('WaterR', 3, 1); prop('WaterL', 4, 1); prop('WaterM', 5, 1); prop('WaterM', 6, 1); prop('WaterM', 7, 1); prop('WaterM', 8, 1); prop('WaterM', 9, 1); prop('WaterM', 10, 1); prop('WaterM', 11, 1); prop('WaterM', 12, 1); prop('WaterM', 0, 2); prop('WaterM', 1, 2); prop('WaterM', 2, 2); prop('WaterR', 3, 2); prop('WaterL', 4, 2); prop('WaterM', 5, 2); prop('WaterM', 6, 2); prop('WaterM', 7, 2); prop('WaterM', 8, 2); prop('WaterM', 9, 2); prop('WaterM', 10, 2); prop('WaterM', 11, 2); prop('WaterM', 12, 2); prop('WaterM', 0, 3); prop('WaterM', 1, 3); prop('WaterM', 2, 3); prop('WaterR', 3, 3); prop('WaterL', 4, 3); prop('WaterM', 5, 3); prop('WaterM', 6, 3); prop('WaterM', 7, 3); prop('WaterM', 8, 3); prop('WaterM', 9, 3); prop('WaterM', 10, 3); prop('WaterM', 11, 3); prop('WaterM', 12, 3); prop('WaterM', 0, 4); prop('WaterM', 1, 4); prop('WaterM', 2, 4); prop('WaterR', 3, 4); prop('WaterL', 4, 4); prop('WaterM', 5, 4); prop('WaterM', 6, 4); prop('WaterM', 7, 4); prop('WaterM', 8, 4); prop('WaterM', 9, 4); prop('WaterM', 10, 4); prop('WaterM', 11, 4); prop('WaterM', 12, 4); prop('WaterM', 0, 5); prop('WaterM', 1, 5); prop('WaterM', 2, 5); prop('WaterR', 3, 5); prop('WaterBL', 4, 5); prop('WaterB', 5, 5); prop('WaterB', 6, 5); prop('WaterB', 7, 5); tile('SandTRw', 8, 5); prop('WaterM', 9, 5); prop('WaterM', 10, 5); prop('WaterM', 11, 5); prop('WaterM', 12, 5); prop('WaterM', 0, 6); prop('WaterM', 1, 6); prop('WaterM', 2, 6); prop('WaterR', 3, 6); tile('Sand', 4, 6); tile('Sand', 5, 6); tile('Sand', 6, 6); tile('Sand', 7, 6); prop('WaterL', 8, 6); prop('WaterM', 9, 6); prop('WaterM', 10, 6); prop('WaterM', 11, 6); prop('WaterM', 12, 6); prop('WaterM', 0, 7); prop('WaterM', 1, 7); prop('WaterM', 2, 7); prop('WaterR', 3, 7); tile('Sand', 4, 7); tile('Sand', 5, 7); tile('Sand', 6, 7); tile('Sand', 7, 7); prop('WaterL', 8, 7); prop('WaterM', 9, 7); prop('WaterM', 10, 7); prop('WaterM', 11, 7); prop('WaterM', 12, 7); prop('WaterM', 0, 8); prop('WaterM', 1, 8); prop('WaterM', 2, 8); tile('SandBLw', 3, 8); prop('WaterT', 4, 8); prop('WaterT', 5, 8); prop('WaterT', 6, 8); prop('WaterT', 7, 8); tile('SandBRw', 8, 8); prop('WaterM', 9, 8); prop('WaterM', 10, 8); prop('WaterM', 11, 8); prop('WaterM', 12, 8); prop('WaterM', 0, 9); prop('WaterM', 1, 9); prop('WaterM', 2, 9); prop('WaterM', 3, 9); prop('WaterM', 4, 9); prop('WaterM', 5, 9); prop('WaterM', 6, 9); prop('WaterM', 7, 9); prop('WaterM', 8, 9); prop('WaterM', 9, 9); prop('WaterM', 10, 9); prop('WaterM', 11, 9); prop('WaterM', 12, 9); prop('WaterM', 0, 10); prop('WaterM', 1, 10); prop('WaterM', 2, 10); prop('WaterM', 3, 10); prop('WaterM', 4, 10); prop('WaterM', 5, 10); prop('WaterM', 6, 10); prop('WaterM', 7, 10); prop('WaterM', 8, 10); prop('WaterM', 9, 10); prop('WaterM', 10, 10); prop('WaterM', 11, 10); prop('WaterM', 12, 10); prop('WaterM', 0, 11); prop('WaterM', 1, 11); prop('WaterM', 2, 11); prop('WaterM', 3, 11); prop('WaterM', 4, 11); prop('WaterM', 5, 11); prop('WaterM', 6, 11); prop('WaterM', 7, 11); prop('WaterM', 8, 11); prop('WaterM', 9, 11); prop('WaterM', 10, 11); prop('WaterM', 11, 11); prop('WaterM', 12, 11); prop('WaterM', 0, 12); prop('WaterM', 1, 12); prop('WaterM', 2, 12); prop('WaterM', 3, 12); prop('WaterM', 4, 12); prop('WaterM', 5, 12); prop('WaterM', 6, 12); prop('WaterM', 7, 12); prop('WaterM', 8, 12); prop('WaterM', 9, 12); prop('WaterM', 10, 12); prop('WaterM', 11, 12); prop('WaterM', 12, 12);
    NPCname = "Fisherman";
    this.npc = Crafty.e('NPC').at(7, 7).attr({name: NPCname, interact: "dialogue(fisherman_dialogue, '"+NPCname+"', true)"});
    current_scene.occupied[this.npc.at().x][current_scene.npc.at().y] = true; 
 
});

Crafty.scene('cave1', function() {
    current_scene = this;
    initOccupy();
    placePlayer();
    if(falling) {dropPlayer(244, 240);}
    exit(6, -1, 'cave2');
    closeDoors(true);
    
    prop('WallTL', 0, 0); prop('WallT', 1, 0); prop('WallT', 2, 0); prop('WallT', 3, 0); prop('WallT', 4, 0); prop('WallT', 5, 0); tile('Cobble_Dark', 6, 0); prop('DoorT', 6, 0); prop('WallT', 7, 0); prop('WallT', 8, 0); prop('WallT', 9, 0); prop('WallT', 10, 0); prop('WallT', 11, 0); prop('WallTR', 12, 0); tile('Cobble_Dark', 0, 1); tile('Remains5', 0, 1); prop('WallL', 0, 1); tile('Cobble_Dark', 1, 1); tile('Remains1', 1, 1); tile('Cobble_Dark', 2, 1); tile('Remains6', 2, 1); tile('Cobble_Dark', 3, 1); tile('Cobble_Dark', 4, 1); tile('Remains2', 4, 1); tile('Cobble_Dark', 5, 1); tile('Cobble_Dark', 6, 1); tile('Cobble_Dark', 7, 1); tile('Cobble_Dark', 8, 1); tile('Cobble_Dark', 9, 1); tile('Cobble_Dark', 10, 1); tile('Remains5', 10, 1); tile('Cobble_Dark', 11, 1); tile('Remains5', 11, 1); tile('Cobble_Dark', 12, 1); prop('WallR', 12, 1); tile('Cobble_Dark', 0, 2); tile('Remains4', 0, 2); prop('WallL', 0, 2); tile('Cobble_Dark', 1, 2); tile('Remains5', 1, 2); tile('Cobble_Dark', 2, 2); tile('Cobble_Dark', 3, 2); tile('Remains3', 3, 2); tile('Cobble_Dark', 4, 2); tile('Cobble_Dark', 5, 2); tile('Cobble_Dark', 6, 2); tile('Cobble_Dark', 7, 2); tile('Cobble_Dark', 8, 2); tile('Cobble_Dark', 9, 2); tile('Cobble_Dark', 10, 2); tile('Remains4', 10, 2); tile('Cobble_Dark', 11, 2); tile('Remains2', 11, 2); tile('Cobble_Dark', 12, 2); prop('WallR', 12, 2); tile('Cobble_Dark', 0, 3); tile('Remains4', 0, 3); prop('WallL', 0, 3); tile('Cobble_Dark', 1, 3); tile('Cobble_Dark', 2, 3); tile('Cobble_Dark', 3, 3); tile('Cobble_Dark', 4, 3); tile('Cobble_Dark', 5, 3); tile('Cobble_Dark', 6, 3); tile('Cobble_Dark', 7, 3); tile('Cobble_Dark', 8, 3); tile('Remains6', 8, 3); tile('Cobble_Dark', 9, 3); tile('Cobble_Dark', 10, 3); tile('Cobble_Dark', 11, 3); tile('Remains1', 11, 3); tile('Cobble_Dark', 12, 3); prop('WallR', 12, 3); tile('Cobble_Dark', 0, 4); prop('WallL', 0, 4); tile('Cobble_Dark', 1, 4); tile('Cobble_Dark', 2, 4); tile('Cobble_Dark', 3, 4); tile('Cobble_Dark', 4, 4); tile('Cobble_Dark', 5, 4); tile('Cobble_Dark', 6, 4); tile('Cobble_Dark', 7, 4); tile('Cobble_Dark', 8, 4); tile('Cobble_Dark', 9, 4); tile('Cobble_Dark', 10, 4); tile('Cobble_Dark', 11, 4); tile('Cobble_Dark', 12, 4); prop('WallR', 12, 4); tile('Cobble_Dark', 0, 5); prop('WallL', 0, 5); tile('Cobble_Dark', 1, 5); tile('Cobble_Dark', 2, 5); tile('Cobble_Dark', 3, 5); tile('Cobble_Dark', 4, 5); tile('Cobble_Dark', 5, 5); tile('Cobble_Dark', 6, 5); tile('Cobble_Dark', 7, 5); tile('Cobble_Dark', 8, 5); tile('Cobble_Dark', 9, 5); tile('Cobble_Dark', 10, 5); tile('Cobble_Dark', 11, 5); tile('Cobble_Dark', 12, 5); prop('WallR', 12, 5); tile('Cobble_Dark', 0, 6); prop('WallL', 0, 6); tile('Cobble_Dark', 1, 6); tile('Cobble_Dark', 2, 6); tile('Remains2', 2, 6); tile('Cobble_Dark', 3, 6); tile('Cobble_Dark', 4, 6); tile('Cobble_Dark', 5, 6); tile('Cobble_Dark', 6, 6); tile('Cobble_Dark', 7, 6); tile('Cobble_Dark', 8, 6); tile('Cobble_Dark', 9, 6); tile('Cobble_Dark', 10, 6); tile('Cobble_Dark', 11, 6); tile('Cobble_Dark', 12, 6); prop('WallR', 12, 6); tile('Cobble_Dark', 0, 7); prop('WallL', 0, 7); tile('Cobble_Dark', 1, 7); tile('Cobble_Dark', 2, 7); tile('Cobble_Dark', 3, 7); tile('Cobble_Dark', 4, 7); tile('Cobble_Dark', 5, 7); tile('Cobble_Dark', 6, 7); tile('Cobble_Dark', 7, 7); tile('Cobble_Dark', 8, 7); tile('Cobble_Dark', 9, 7); tile('Cobble_Dark', 10, 7); tile('Cobble_Dark', 11, 7); tile('Cobble_Dark', 12, 7); prop('WallR', 12, 7); tile('Cobble_Dark', 0, 8); prop('WallL', 0, 8); tile('Cobble_Dark', 1, 8); tile('Cobble_Dark', 2, 8); tile('Cobble_Dark', 3, 8); tile('Cobble_Dark', 4, 8); tile('Cobble_Dark', 5, 8); tile('Cobble_Dark', 6, 8); tile('Cobble_Dark', 7, 8); tile('Cobble_Dark', 8, 8); tile('Cobble_Dark', 9, 8); tile('Cobble_Dark', 10, 8); tile('Remains1', 10, 8); tile('Cobble_Dark', 11, 8); tile('Remains2', 11, 8); tile('Cobble_Dark', 12, 8); prop('WallR', 12, 8); tile('Cobble_Dark', 0, 9); prop('WallL', 0, 9); tile('Cobble_Dark', 1, 9); tile('Cobble_Dark', 2, 9); tile('Cobble_Dark', 3, 9); tile('Cobble_Dark', 4, 9); tile('Cobble_Dark', 5, 9); tile('Cobble_Dark', 6, 9); tile('Cobble_Dark', 7, 9); tile('Cobble_Dark', 8, 9); tile('Cobble_Dark', 9, 9); tile('Cobble_Dark', 10, 9); tile('Cobble_Dark', 11, 9); tile('Cobble_Dark', 12, 9); prop('WallR', 12, 9); tile('Cobble_Dark', 0, 10); prop('WallL', 0, 10); tile('Cobble_Dark', 1, 10); tile('Remains5', 1, 10); tile('Cobble_Dark', 2, 10); tile('Cobble_Dark', 3, 10); tile('Cobble_Dark', 4, 10); tile('Cobble_Dark', 5, 10); tile('Cobble_Dark', 6, 10); tile('Cobble_Dark', 7, 10); tile('Cobble_Dark', 8, 10); tile('Cobble_Dark', 9, 10); tile('Cobble_Dark', 10, 10); tile('Cobble_Dark', 11, 10); tile('Remains3', 11, 10); tile('Cobble_Dark', 12, 10); prop('WallR', 12, 10); tile('Cobble_Dark', 0, 11); tile('Remains4', 0, 11); prop('WallL', 0, 11); tile('Cobble_Dark', 1, 11); tile('Remains3', 1, 11); tile('Cobble_Dark', 2, 11); tile('Cobble_Dark', 3, 11); tile('Cobble_Dark', 4, 11); tile('Cobble_Dark', 5, 11); tile('Remains6', 5, 11); tile('Cobble_Dark', 6, 11); tile('Cobble_Dark', 7, 11); tile('Cobble_Dark', 8, 11); tile('Cobble_Dark', 9, 11); tile('Cobble_Dark', 10, 11); tile('Remains6', 10, 11); tile('Cobble_Dark', 11, 11); tile('Remains5', 11, 11); tile('Cobble_Dark', 12, 11); prop('WallR', 12, 11); prop('WallBL', 0, 12); prop('WallB', 1, 12); prop('WallB', 2, 12); prop('WallB', 3, 12); prop('WallB', 4, 12); prop('WallB', 5, 12); prop('WallB', 6, 12); prop('WallB', 7, 12); prop('WallB', 8, 12); prop('WallB', 9, 12); prop('WallB', 10, 12); prop('WallB', 11, 12); prop('WallBR', 12, 12);

    monster('KingSlime', 2, 2);
    monster('KingSlime', 9, 9);

 
});

Crafty.scene('cave2', function() {
    current_scene = this;
    initOccupy();
    placePlayer();
    exit(6, 13, 'cave1');
    closeDoors();
    
    prop('WallTL', 0, 0); prop('WallT', 1, 0); prop('WallT', 2, 0); prop('WallT', 3, 0); prop('WallT', 4, 0); prop('WallT', 5, 0); tile('Cobble_Dark', 6, 0); prop('DoorT', 6, 0); prop('WallT', 7, 0); prop('WallT', 8, 0); prop('WallT', 9, 0); prop('WallT', 10, 0); prop('WallT', 11, 0); prop('WallTR', 12, 0); prop('Hole', 0, 1); prop('WallL', 0, 1); prop('Hole', 1, 1); prop('Hole', 2, 1); prop('Hole', 3, 1); prop('Hole', 4, 1); prop('Hole', 5, 1); tile('Cobble_Dark', 6, 1); prop('Hole', 7, 1); prop('Hole', 8, 1); prop('Hole', 9, 1); prop('Hole', 10, 1); prop('Hole', 11, 1); prop('Hole', 12, 1); prop('WallR', 12, 1); prop('Hole', 0, 2); prop('WallL', 0, 2); prop('Hole', 1, 2); prop('Hole', 2, 2); prop('Hole', 3, 2); prop('Hole', 4, 2); prop('Hole', 5, 2); tile('Cobble_Dark', 6, 2); prop('Hole', 7, 2); prop('Hole', 8, 2); prop('Hole', 9, 2); prop('Hole', 10, 2); prop('Hole', 11, 2); prop('Hole', 12, 2); prop('WallR', 12, 2); prop('Hole', 0, 3); prop('WallL', 0, 3); prop('Hole', 1, 3); prop('Hole', 2, 3); prop('Hole', 3, 3); prop('Hole', 4, 3); prop('Hole', 5, 3); tile('Cobble_Dark', 6, 3); prop('Hole', 7, 3); prop('Hole', 8, 3); prop('Hole', 9, 3); prop('Hole', 10, 3); prop('Hole', 11, 3); prop('Hole', 12, 3); prop('WallR', 12, 3); prop('Hole', 0, 4); prop('WallL', 0, 4); prop('Hole', 1, 4); prop('Hole', 2, 4); prop('Hole', 3, 4); prop('Hole', 4, 4); prop('Hole', 5, 4); tile('Cobble_Dark', 6, 4); prop('Hole', 7, 4); prop('Hole', 8, 4); prop('Hole', 9, 4); prop('Hole', 10, 4); prop('Hole', 11, 4); prop('Hole', 12, 4); prop('WallR', 12, 4); prop('Hole', 0, 5); prop('WallL', 0, 5); prop('Hole', 1, 5); prop('Hole', 2, 5); prop('Hole', 3, 5); prop('Hole', 4, 5); prop('Hole', 5, 5); tile('Cobble_Dark', 6, 5); prop('Hole', 7, 5); prop('Hole', 8, 5); prop('Hole', 9, 5); prop('Hole', 10, 5); prop('Hole', 11, 5); prop('Hole', 12, 5); prop('WallR', 12, 5); prop('Hole', 0, 6); prop('WallL', 0, 6); prop('Hole', 1, 6); prop('Hole', 2, 6); prop('Hole', 3, 6); prop('Hole', 4, 6); prop('Hole', 5, 6); tile('Cobble_Dark', 6, 6); prop('Hole', 7, 6); prop('Hole', 8, 6); prop('Hole', 9, 6); prop('Hole', 10, 6); prop('Hole', 11, 6); prop('Hole', 12, 6); prop('WallR', 12, 6); prop('Hole', 0, 7); prop('WallL', 0, 7); prop('Hole', 1, 7); prop('Hole', 2, 7); prop('Hole', 3, 7); prop('Hole', 4, 7); prop('Hole', 5, 7); tile('Cobble_Dark', 6, 7); prop('Hole', 7, 7); prop('Hole', 8, 7); prop('Hole', 9, 7); prop('Hole', 10, 7); prop('Hole', 11, 7); prop('Hole', 12, 7); prop('WallR', 12, 7); prop('Hole', 0, 8); prop('WallL', 0, 8); prop('Hole', 1, 8); prop('Hole', 2, 8); prop('Hole', 3, 8); prop('Hole', 4, 8); prop('Hole', 5, 8); tile('Cobble_Dark', 6, 8); prop('Hole', 7, 8); prop('Hole', 8, 8); prop('Hole', 9, 8); prop('Hole', 10, 8); prop('Hole', 11, 8); prop('Hole', 12, 8); prop('WallR', 12, 8); prop('Hole', 0, 9); prop('WallL', 0, 9); prop('Hole', 1, 9); prop('Hole', 2, 9); prop('Hole', 3, 9); prop('Hole', 4, 9); prop('Hole', 5, 9); tile('Cobble_Dark', 6, 9); prop('Hole', 7, 9); prop('Hole', 8, 9); prop('Hole', 9, 9); prop('Hole', 10, 9); prop('Hole', 11, 9); prop('Hole', 12, 9); prop('WallR', 12, 9); prop('Hole', 0, 10); prop('WallL', 0, 10); prop('Hole', 1, 10); prop('Hole', 2, 10); prop('Hole', 3, 10); prop('Hole', 4, 10); prop('Hole', 5, 10); tile('Cobble_Dark', 6, 10); prop('Hole', 7, 10); prop('Hole', 8, 10); prop('Hole', 9, 10); prop('Hole', 10, 10); prop('Hole', 11, 10); prop('Hole', 12, 10); prop('WallR', 12, 10); prop('Hole', 0, 11); prop('WallL', 0, 11); prop('Hole', 1, 11); prop('Hole', 2, 11); prop('Hole', 3, 11); prop('Hole', 4, 11); prop('Hole', 5, 11); tile('Cobble_Dark', 6, 11); prop('Hole', 7, 11); prop('Hole', 8, 11); prop('Hole', 9, 11); prop('Hole', 10, 11); prop('Hole', 11, 11); prop('Hole', 12, 11); prop('WallR', 12, 11); prop('WallBL', 0, 12); prop('WallB', 1, 12); prop('WallB', 2, 12); prop('WallB', 3, 12); prop('WallB', 4, 12); prop('WallB', 5, 12); tile('Cobble_Dark', 6, 12); prop('DoorB', 6, 12); prop('WallB', 7, 12); prop('WallB', 8, 12); prop('WallB', 9, 12); prop('WallB', 10, 12); prop('WallB', 11, 12); prop('WallBR', 12, 12);
    
    //monster('Slime', 6, 6)

 
});


Crafty.scene('south1', function() {
    current_scene = this;
    scene_name = "south1";
    initOccupy();
    placePlayer();
    exit(6, -1, 'Game');

    tile('Grass', 0, 0); tile('Grass', 1, 0); tile('Grass', 2, 0); tile('Grass', 3, 0); tile('Grass', 4, 0); tile('Grass', 5, 0); tile('Grass', 6, 0); tile('Grass', 7, 0); tile('Grass', 8, 0); tile('Grass', 9, 0); tile('Grass', 10, 0); tile('Grass', 11, 0); tile('Grass', 12, 0); tile('Grass', 0, 1); tile('Grass', 1, 1); tile('Grass', 2, 1); tile('Grass', 3, 1); tile('Grass', 4, 1); tile('Grass', 5, 1); tile('Grass', 6, 1); tile('Grass', 7, 1); tile('Grass', 8, 1); tile('Grass', 9, 1); tile('Grass', 10, 1); tile('Grass', 11, 1); tile('Grass', 12, 1); tile('Grass', 0, 2); tile('Grass', 1, 2); prop('Rock', 2, 2); tile('Grass', 3, 2); tile('Grass', 4, 2); tile('Grass', 5, 2); prop('Rock', 6, 2); tile('Grass', 7, 2); tile('Grass', 8, 2); tile('Grass', 9, 2); prop('Rock', 10, 2); tile('Grass', 11, 2); tile('Grass', 12, 2); tile('Grass', 0, 3); tile('Grass', 1, 3); tile('Grass', 2, 3); tile('Grass', 3, 3); tile('Grass', 4, 3); tile('Grass', 5, 3); tile('Grass', 6, 3); tile('Grass', 7, 3); tile('Grass', 8, 3); tile('Grass', 9, 3); tile('Grass', 10, 3); tile('Grass', 11, 3); tile('Grass', 12, 3); tile('Grass', 0, 4); tile('Grass', 1, 4); tile('Grass', 2, 4); tile('Grass', 3, 4); prop('Rock', 4, 4); tile('Grass', 5, 4); tile('Grass', 6, 4); tile('Grass', 7, 4); prop('Rock', 8, 4); tile('Grass', 9, 4); tile('Grass', 10, 4); tile('Grass', 11, 4); tile('Grass', 12, 4); tile('Grass', 0, 5); tile('Grass', 1, 5); tile('Grass', 2, 5); tile('Grass', 3, 5); tile('Grass', 4, 5); tile('Grass', 5, 5); tile('Grass', 6, 5); tile('Grass', 7, 5); tile('Grass', 8, 5); tile('Grass', 9, 5); tile('Grass', 10, 5); tile('Grass', 11, 5); tile('Grass', 12, 5); tile('Grass', 0, 6); tile('Grass', 1, 6); prop('Rock', 2, 6); tile('Grass', 3, 6); tile('Grass', 4, 6); tile('Grass', 5, 6); prop('Rock', 6, 6); tile('Grass', 7, 6); tile('Grass', 8, 6); tile('Grass', 9, 6); prop('Rock', 10, 6); tile('Grass', 11, 6); tile('Grass', 12, 6); tile('Grass', 0, 7); tile('Grass', 1, 7); tile('Grass', 2, 7); tile('Grass', 3, 7); tile('Grass', 4, 7); tile('Grass', 5, 7); tile('Grass', 6, 7); tile('Grass', 7, 7); tile('Grass', 8, 7); tile('Grass', 9, 7); tile('Grass', 10, 7); tile('Grass', 11, 7); tile('Grass', 12, 7); tile('Grass', 0, 8); tile('Grass', 1, 8); tile('Grass', 2, 8); tile('Grass', 3, 8); prop('Rock', 4, 8); tile('Grass', 5, 8); tile('Grass', 6, 8); tile('Grass', 7, 8); prop('Rock', 8, 8); tile('Grass', 9, 8); tile('Grass', 10, 8); tile('Grass', 11, 8); tile('Grass', 12, 8); tile('Grass', 0, 9); tile('Grass', 1, 9); tile('Grass', 2, 9); tile('Grass', 3, 9); tile('Grass', 4, 9); tile('Grass', 5, 9); tile('Grass', 6, 9); tile('Grass', 7, 9); tile('Grass', 8, 9); tile('Grass', 9, 9); tile('Grass', 10, 9); tile('Grass', 11, 9); tile('Grass', 12, 9); tile('Grass', 0, 10); tile('Grass', 1, 10); prop('Rock', 2, 10); tile('Grass', 3, 10); tile('Grass', 4, 10); tile('Grass', 5, 10); prop('Rock', 6, 10); tile('Grass', 7, 10); tile('Grass', 8, 10); tile('Grass', 9, 10); prop('Rock', 10, 10); tile('Grass', 11, 10); tile('Grass', 12, 10); tile('Grass', 0, 11); tile('Grass', 1, 11); tile('Grass', 2, 11); tile('Grass', 3, 11); tile('Grass', 4, 11); tile('Grass', 5, 11); tile('Grass', 6, 11); tile('Grass', 7, 11); tile('Grass', 8, 11); tile('Grass', 9, 11); tile('Grass', 10, 11); tile('Grass', 11, 11); tile('Grass', 12, 11); tile('Grass', 0, 12); tile('Grass', 1, 12); tile('Grass', 2, 12); tile('Grass', 3, 12); tile('Grass', 4, 12); tile('Grass', 5, 12); tile('Grass', 6, 12); tile('Grass', 7, 12); tile('Grass', 8, 12); tile('Grass', 9, 12); tile('Grass', 10, 12); tile('Grass', 11, 12); tile('Grass', 12, 12);

    edgePop('Tree');
    
    monster('Octorok', 3, 3);
    monster('Octorok', 3, 9);
    monster('OctorokGold', 9, 3);
    monster('OctorokBlue', 9, 9);
 
});