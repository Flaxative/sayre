// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
    Crafty.background('#b3ccc5');
    Crafty.e('2D, DOM, Text, loading, innershadow')
        .text('<h3>Loading</h3><div id="bar"><div id="fill"></div></div><div id="loadtext"></div>');
 
    var toLoad = [];
    toLoad.push('media/opening.ogg', "media/opening.mp3", "media/LOZ_Get_Rupee.mp3", "media/rupee.mp3", "media/secret.mp3", 'assets/tree-1.png', 'assets/bush-1.png', 'assets/bush-dead.png', 'assets/grass-1.png', 'assets/rock.png', 'assets/character-narrow.png'/*, 'assets/character-hit.png'*/, 'assets/portraits/Old Man.png', 'assets/portraits/Fisherman.png', 'assets/portraits/Groundskeeper.png', 'includes/images/mochaGrunge.png', 'includes/images/lightGrunge.png', 'assets/RPGTiles-40.png', 'assets/cactus.png', 'assets/slimes-5.png', 'assets/longspear.png', 'assets/wooden-sword.png', 'assets/wooden-sword-2.png', 'assets/hole-1.png', 'assets/heart-container-1.png', 'assets/inventory/Wooden Sword-inv.png', 'assets/inventory/Longspear-inv.png', 'assets/fire.png', 'assets/fire-tile.png', 'assets/coins.png', 'assets/coin-single.png', 'assets/remains.png',
    
    'assets/inventory/Boomerang-inv.png', 'assets/inventory/Shield-inv.png', 
    'assets/inventory/Wedding Dress-inv.png', 'assets/inventory/Platemail-inv.png', 
    'assets/inventory/Blue Ring-inv.png'
    );
 
  // Load our sprite map image
  Crafty.load(toLoad, function(){
    // Once the image is loaded...
 

    // Define the individual sprites in the image
    // Each one (spr_tree, etc.) becomes a component
    // These components' names are prefixed with "spr_"
    //  to remind us that they simply cause the entity
    //  to be drawn with a certain sprite
        // graphics!
        Crafty.sprite(31, 54, "assets/fire.png", {
            fire: [0, 0]
            });
        Crafty.sprite(40, "assets/hole-1.png", {
            pit: [0, 0]
            });
        Crafty.sprite(40, "assets/tree-1.png", {
            tree: [0, 0]
            });
        Crafty.sprite(8, 14, "assets/coins.png", {
            rupeeG1: [0, 0], rupeeG2: [1, 0], rupeeG3: [2, 0],
            rupeeB1: [3, 0], rupeeB2: [4, 0], rupeeB3: [5, 0],
            rupeeR1: [6, 0], rupeeR2: [7, 0], rupeeR3: [8, 0],
            });
        Crafty.sprite(32, "assets/remains.png", {
            remains1: [0, 0], remains2: [1, 0], remains3: [2, 0],
            remains4: [0, 1], remains5: [1, 1], remains6: [2, 1],
            });
        Crafty.sprite(10, 30, "assets/wooden-sword-2.png", {
            wooden_sword: [1, 0]
            });
        Crafty.sprite(6, 60, "assets/longspear.png", {
            longspear: [0, 0]
            });
        Crafty.sprite(40, "assets/bush-1.png", {
            bush: [0, 0]
            });
        Crafty.sprite(40, "assets/bush-dead.png", {
            bush_dead: [0, 0]
            });
        Crafty.sprite(40, "assets/rock.png", {
            rock: [0, 0]
            });
        Crafty.sprite(40, "assets/cactus.png", {
            cactus: [0, 0]
            });
        Crafty.sprite(40, "assets/cobble.png", {
            cobble: [0, 0],
            cobble_dark: [1, 0]
            });
        Crafty.sprite(40, "assets/fire-tile.png", {
            fireT: [0, 0]
            });
        /*Crafty.sprite(21, 32, "assets/character-hit.png", {
            charhitdown: [0, 0],
            charhitleft: [0, 1],
            charhitright: [0, 2],
            charhitup: [0, 3]
            });*/
        Crafty.sprite(21, 32, "assets/character-narrow.png", {
            chardown: [0, 0],
            charleft: [0, 1],
            charright: [0, 2],
            charup: [0, 3]
            });
        Crafty.sprite(40, "assets/slimes-5.png", {
            slimedown: [0, 2],
            slimeleft: [0, 3],
            slimeright: [0, 1],
            slimeup: [0, 0]
            });
        Crafty.sprite(40, "assets/RPGTiles-40.png", {
            sand: [0, 0], grass: [0, 1],
            waterTL: [8,0],
            waterT: [12, 0],
            waterTR: [4, 0],
            waterR: [5, 0],
            waterBR: [1, 0],
            waterB: [3, 0],
            waterBL: [2, 0],
            waterL: [10, 0],
            waterM: [15, 0],
            sandTLw: [7, 0],
            sandTRw: [11, 0],
            sandBRw: [14, 0],
            sandBLw: [13, 0],
            sandTLg: [8, 1],
            sandTRg: [4, 1],
            sandBRg: [1, 1],
            sandBLg: [2, 1],
            grassTL: [7, 1],
            grassT: [3, 1],
            grassTR: [11, 1],
            grassR: [10, 1],
            grassBR: [14, 1],
            grassB: [12, 1],
            grassBL: [13,1],
            grassL: [5, 1],
            });
        Crafty.sprite(16, "assets/walls.png", {
            wallTL: [0, 0], wallTR: [2, 0],
            wallBL: [0, 3], wallBR: [2, 2],
            wallL: [0,1],
            wallR: [2, 1],
            wallB: [1, 2], wallT: [1, 2],
            doorT: [1, 0], doorR: [8, 1], doorL: [9, 1], doorB: [1, 0]
            });
            
            
        Crafty.audio.add({
              rupee: ['media/rupee.mp3', 'media/LOZ_Get_Rupee.wav'],
              secret: ['media/secret.mp3']
            });
            
        //$('#console span').text(''); // Clear the console.
        $('#loadtext').text("");
        $('.loading h3').text('Loaded!');
        $("#fill").css('width', "100%");
        
        Crafty.e('2D, DOM, Text, Mouse, start, innershadow')
            .attr({x: 185, y: 300, h: 50, w: 150})
            .text("<p>Start Game</p>")
            .bind('Click', function() {
                Crafty.background('#fbf5dd');
                Crafty.scene('Game'); // go to first screen
                enableActions();
                $("#console").click( function() {console.log(dir);});
                $('.sidebar').html(sidebar_base); setSlot('weapon'); updateHP(); updateCoins();
                //theme('opening'); tile_theme = 'opening'; // initialize music 
                })
            ;
 
    // Now that our sprites are ready to draw, start the game
    //Crafty.scene('Game');
  },
        function(e) {
            // BUG - DOESN'T COUNT AUDIO FILES -- WHY?
            //console.log(e);
            var src = e.src ||"";
          
            // update progress
            //tell("<i>loading "+src.substr(src.lastIndexOf('/') + 1).toLowerCase()+"</i> | Loaded: "+~~e.percent+"%<br />");
            $('#loadtext').text("loading: "+src.substr(src.lastIndexOf('/') + 1).toLowerCase());
            $('.loading h3').text('Loading ('+~~e.percent+'%)');
            $("#fill").css('width', ~~e.percent+"%");
       
      
        })
});