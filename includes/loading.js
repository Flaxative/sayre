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
    toLoad.push(
    
    // music
    'media/opening.ogg', "media/opening.mp3", // stolen from mantra
    
    // SFX
    "media/LOZ_Get_Rupee.mp3", "media/rupee.mp3", "media/secret.mp3","media/secret.wav", "media/chest.wav", // these are all stolen from Legend of Zelda games
    "media/gulp.wav", /* CC: http://www.freesound.org/people/Q.K./sounds/56271/ */ 'media/pickup.wav', /* CC: http://www.freesound.org/people/timgormly/sounds/170170/ */
    'media/bounce.wav', 'media/bounce-quiet.wav', /* CC: http://www.freesound.org/people/gezortenplotz/sounds/20132/ */ 'media/wood-hit.wav', /* CC: http://www.freesound.org/people/dheming/sounds/177780/ */
    'media/boomerang.wav',  /* CC: http://www.freesound.org/people/NoiseCollector/sounds/67376/ */
    'media/bush.wav',   /* CC: http://www.freesound.org/people/j1987/sounds/106113/ */   'media/sword.wav',   /* CC:  http://www.freesound.org/people/Langerium/sounds/84616/ */
    'media/ow.mp3', 'media/ow.wav',   /* CC:  http://www.freesound.org/people/alex_audio/sounds/188568/ */ 
    'media/grunt.wav',   /* CC:  http://www.freesound.org/people/JCH321/sounds/66206/ */ 'media/octorok-pain.wav', /* CC: http://www.freesound.org/people/Michel88/sounds/76972/ */
    'media/falling.wav',   /* CC:  http://www.freesound.org/people/UncleSigmund/sounds/30988/ */  
    'media/bomb-explosion.mp3',  'media/bomb-explosion.wav',   /* CC:  http://www.freesound.org/people/Zangrutz/sounds/155235/ */  
    
    // character sprites
    'assets/character-narrow.png'/*, 'assets/character-hit.png'*/, 
    'assets/old-man.png', 'assets/shy-kid.png', 'assets/healer.png',
    
    // weapons
    'assets/bounce.png', 'assets/longspear.png', 'assets/wooden-sword.png', 'assets/wooden-sword-2.png', 'assets/boomerang.png',
    
    // monster sprites
    'assets/slimes-5.png', 'assets/slimes-blue.png', 'assets/octorok-40.png', 'assets/octorok-blue.png', 'assets/octorok-gold.png',
    'assets/projectile-rock.png', 'assets/projectile-rock-big.png',
    
    // portraits
    'assets/portraits/Old Man.png', 'assets/portraits/Fisherman.png', 'assets/portraits/Groundskeeper.png', 
    
    // UI
    'includes/images/mochaGrunge.png', 'includes/images/lightGrunge.png', 
    'assets/heart-empty-1.png', 'assets/dialogue-next.gif', 'assets/coin-single.png', 'assets/bomb-single.png',
    
    // tiles
    'assets/RPGTiles-40.png', 'assets/fire-tile.png', 'assets/grass-1.png',  'assets/walls.png',  
    
    // props
    'assets/cactus.png', 'assets/hole-1.png', 'assets/fire.png', 'assets/remains.png',
    'assets/tree-1.png', 'assets/bush-1.png', 'assets/bush-dead.png', 'assets/rock.png',
    
    // drops
    'assets/refill-heart.png', 'assets/refill-half.png', 'assets/coins.png', 
    
    // treasure
    'assets/chest.png', 'assets/heart-container.png', 
    
    // box images for inventory slots
    'assets/inventory/Wooden Sword-inv.png', 'assets/inventory/Longspear-inv.png',
    'assets/inventory/Boomerang-inv.png', 'assets/inventory/Magic Boomerang-inv.png', 
    'assets/inventory/Shield-inv.png', 'assets/inventory/Bombs-inv.png',
    'assets/inventory/Wedding Dress-inv.png', 'assets/inventory/Platemail-inv.png', 
    'assets/inventory/Blue Ring-inv.png',
    'assets/inventory/Rupees-inv.png', 'assets/inventory/Heart Container-inv.png'
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
        Crafty.sprite(16, 14, "assets/refill-heart.png", {
            refill_heart: [0, 0]
            });
        Crafty.sprite(8, 14, "assets/refill-half.png", {
            refill_half: [0, 0]
            });
        Crafty.sprite(30, 28, "assets/heart-container.png", {
            heart_container: [0, 0]
            });
        Crafty.sprite(16, "assets/projectile-rock.png", {
            projectile_rock: [0, 0]
            });
        Crafty.sprite(24, "assets/projectile-rock-big.png", {
            projectile_rock_big: [0, 0]
            });
        Crafty.sprite(32, "assets/chest.png", {
            chest_closed_up: [0, 0],
            chest_open_up: [1, 0]
            });
        Crafty.sprite(19, 20, "assets/bomb-single.png", {
            bomb_drop: [0, 0]
            });
        Crafty.sprite(8, 14, "assets/coins.png", {
            rupeeG1: [0, 0], rupeeG2: [1, 0], rupeeG3: [2, 0],
            rupeeB1: [3, 0], rupeeB2: [4, 0], rupeeB3: [5, 0],
            rupeeY1: [6, 0], rupeeY2: [7, 0], rupeeY3: [8, 0],
            rupeeR1: [9, 0], rupeeR2: [10, 0], rupeeR3: [11, 0],
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
        Crafty.sprite(56, 56, "assets/boomerang.png", {
            boomerang: [0, 0],
            magic_boomerang: [0, 1]
            });
        Crafty.sprite(30, 37, "assets/bomb-sprite.png", {
            bomb_placed: [0, 0]
            });
        Crafty.sprite(90, 92, "assets/bomb-explosion.png", {
            bomb_explosion: [0, 0]
            });
        Crafty.sprite(40, "assets/bounce.png", {
            bounce: [0, 0]
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
            charup: [0, 3],
            charGet: [0, 4]
            });
        Crafty.sprite(29, 40, "assets/old-man.png", {
            old_man_down: [0, 0],
            old_man_up: [0, 1],
            old_man_right: [3, 0],
            old_man_left: [3, 1]
            });
        Crafty.sprite(29, 32, "assets/shy-kid.png", {
            shy_kid_down: [1, 0],
            shy_kid_up: [1, 3],
            shy_kid_right: [1, 2],
            shy_kid_left: [1, 1]
            });
        Crafty.sprite(24, 32, "assets/healer.png", {
            healer_down: [0, 0],
            healer_left: [1, 0],
            healer_right: [2, 0],
            healer_up: [3, 0]
            });
        Crafty.sprite(40, "assets/slimes-5.png", {
            slimedown: [0, 2],
            slimeleft: [0, 3],
            slimeright: [0, 1],
            slimeup: [0, 0]
            });
        Crafty.sprite(40, "assets/slimes-blue.png", {
            slimeBdown: [0, 2],
            slimeBleft: [0, 3],
            slimeBright: [0, 1],
            slimeBup: [0, 0]
            });
        Crafty.sprite(40, "assets/octorok-40.png", {
            octdown: [0, 0],
            octup: [0, 1],
            octleft: [0, 2],
            octright: [0, 3]
            });
        Crafty.sprite(40, "assets/octorok-blue.png", {
            octBdown: [0, 0],
            octBup: [0, 1],
            octBleft: [0, 2],
            octBright: [0, 3]
            });
        Crafty.sprite(40, "assets/octorok-gold.png", {
            octGdown: [0, 0],
            octGup: [0, 1],
            octGleft: [0, 2],
            octGright: [0, 3]
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
        Crafty.sprite(32, "assets/walls.png", {
            wallTL: [0, 4], wallTR: [1, 4],
            wallBL: [2, 4], wallBR: [3, 4],
            wallL: [7, 2],
            wallR: [8, 2],
            wallB: [9, 2], wallT: [1, 2],
            doorT: [1, 0], doorR: [3, 0], doorL: [4, 0], doorB: [5, 0],
            doorTopen: [4, 4], doorRopen: [6, 4], doorLopen: [7, 4], doorBopen: [5, 4]
            });
            
        // Sets sound effects
        Crafty.audio.add({
              rupee: ['media/rupee.mp3', 'media/LOZ_Get_Rupee.wav'],    // coin get
              secret: ['media/secret.mp3', 'media/secret.wav'],                             // find secret
              gulp: ['media/gulp.wav'],                                 // heart refill get
              pickup: ['media/pickup.wav'],                                 // item pickup (used for bombs atm)
              chest: ['media/chest.wav'],                               // open chest
              wood_hit: ['media/wood-hit.wav'],                             // something bounces off wood
              bounce: ['media/bounce.wav'],                             // something bounces off a guard
              bounce_quiet: ['media/bounce-quiet.wav'],                             // something bounces off a guard quietly
              boomerang: ['media/boomerang.wav'],                        // boomerang whrrrr
              sword_swing: ['media/sword.wav'],                               // sword swing
              bush_hit: ['media/bush.wav'],                                  // bush hit
              ow: ['media/ow.wav'],                                  // player 'ow'
              falling: ['media/falling.wav'],                                  // player falling
              bomb_explosion: [ 'media/bomb-explosion.wav', 'media/bomb-explosion.mp3'],                                  // monster grunt
              grunt: ['media/grunt.wav'],                                  // monster grunt
              octorok_pain: ['media/octorok-pain.wav']                                  // octorok grunt
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
                $('.sidebar').html(sidebar_base); setSlot('weapon'); updateHP(10); updateCoins();
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