<head>
	<link type="text/css" rel="stylesheet" href="includes/reset.css" />
	<link type="text/css" rel="stylesheet" href="includes/style.css" />
    <link href='http://fonts.googleapis.com/css?family=Press+Start+2P' rel='stylesheet' type='text/css'>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
	<script type="text/javascript" src="includes/crafty.js"></script>
	<script type="text/javascript" src="includes/crafty-extensions.js"></script>
	<script type="text/javascript" src="includes/general.js"></script>
	<!-- <script type="text/javascript" src="includes/components/sprite-color.js"></script> unused ATM -->
	<script type="text/javascript" src="includes/components.js"></script>
	<script type="text/javascript" src="includes/components/terrain.js"></script>
	<script type="text/javascript" src="includes/components/inventory.js"></script>
	<script type="text/javascript" src="includes/components/drops.js"></script>
	<script type="text/javascript" src="includes/components/enemies-old.js"></script>
	<script type="text/javascript" src="includes/components/enemies.js"></script>
	<script type="text/javascript" src="includes/components/weapons.js"></script>
	<script type="text/javascript" src="includes/loading.js"></script>
	<script type="text/javascript" src="includes/scenes.js"></script>
	<script type="text/javascript" src="includes/defeat.js"></script>
</head>
<body>

<div id="console" style="float:right">
    <div class="inner">
    Colored blocks are NPCs.<br />
    Arrow keys to move.<br /> 
    Space to interact.<br />
    Tab for inventory.<br />
    <hr />
    <div></div> <!-- Dump space for tell(); -->
    </div>
</div>

<h1>Hello World 
    &bull; <a href="parse.php">level parser</a> 
    &bull; <?php include 'count.php'; ?> lines of code</h1>

<div id="full_game_wrapper">

    <div id="inventory" class="inventory dbox light innershadow"></div>

    <div id="cr-stage">

    <script type="text/javascript">
   
    Game = {
        map_grid: {
            width:  13,
            height: 13,
            tile: {
              width:  40,
              height: 40
                }
            },
        
        // The total width of the game screen. Since our grid takes up the entire screen
        //  this is just the width of a tile times the width of the grid
        width: function() {
            return this.map_grid.width * this.map_grid.tile.width;
            },
        
        // The total height of the game screen. Since our grid takes up the entire screen
        //  this is just the height of a tile times the height of the grid
        height: function() {
            return this.map_grid.height * this.map_grid.tile.height;
            },
        
        // Initializing function
        start: function() {
            // Init Crafty:
            Crafty.init(Game.width(), Game.height());
            Crafty.background('#38cc15');
            Crafty.canvas.init();
            
            
            Crafty.scene('Loading');            // Start with loading screen.
            }
    }
    
    window.addEventListener('load', Game.start); // Start the game when the window loads!!
        
    
    </script>
    
    </div><div style="" class="sidebar dbox innershadow"></div>
    
</div> <!-- #full_game_wrapper -->

</body>
</html>