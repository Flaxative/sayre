<h1>Parsed Level Maps</h1>

<?
function loadMap($file, $basetile) {
    $filetext = file_get_contents('levels/'.$file);
    $locale = array();
    $codes = array(
        "w" => "prop('WaterM', ",
        "wR" => "prop('WaterR', ", "wL" => "prop('WaterL', ",
        "wB" => "prop('WaterB', ", "wT" => "prop('WaterT', ",
        "wBR" => "prop('WaterBR', ",
        "wTR" => "prop('WaterTR', ",
        "wBL" => "prop('WaterBL', ",
        "wTL" => "prop('WaterTL', ",
        "s" => "tile('Sand', ",
        "sBRw" => "tile('SandBRw', ", "sBLw" => "tile('SandBLw', ",
        "sTRw" => "tile('SandTRw', ", "sTLw" => "tile('SandTLw', ", 
        "sBRg" => "tile('SandBRg', ", "sBLg" => "tile('SandBLg', ",
        "sTRg" => "tile('SandTRg', ", "sTLg" => "tile('SandTLg', ",
        "g" => "tile('Grass', ",
        "gR" => "tile('GrassR', ", "gL" => "tile('GrassL', ",
        "gT" => "tile('GrassT', ", "gB" => "tile('GrassB', ",
        "gBR" => "tile('GrassBR', ",
        "gTR" => "tile('GrassTR', ",
        "gBL" => "tile('GrassBL', ",
        "gTL" => "tile('GrassTL', ",
        "T" => "prop('Tree', ",
        "R" => "prop('Rock', ",
        "B" => "prop('Bush', ",
        "H" => "prop('Hole', ",
        "w" => "prop('WaterM', ",
        'dc' => "tile('Cobble_Dark', ",
        "dwR" => "prop('WallR', ", "dwL" => "prop('WallL', ",
        "dwB" => "prop('WallB', ", "dwT" => "prop('WallT', ",
        "dwBR" => "prop('WallBR', ", "dwTR" => "prop('WallTR', ",
        "dwBL" => "prop('WallBL', ", "dwTL" => "prop('WallTL', ",
        "DR" => "prop('DoorR', ", "DL" => "prop('DoorL', ",
        "DB" => "prop('DoorB', ", "DT" => "prop('DoorT', ",
        'r1' => "tile('Remains1', ", 'r2' => "tile('Remains2', ", 'r3' => "tile('Remains3', ",
        'r4' => "tile('Remains4', ", 'r5' => "tile('Remains5', ", 'r6' => "tile('Remains6', ",
        );
        
        $rows = explode("\n", $filetext);
        foreach($rows as $k => $v) {
            $columns[$k] = explode("\t", $v);
            }
        
        for($x = 0; $x<13; $x++) {//echo '<br />';
            for($y = 0; $y<13; $y++) {
                if(!$columns[$x][$y]||$columns[$x][$y]=='*') {$columns[$x][$y] = $basetile;}
                    $stuff_to_generate = explode('.', $columns[$x][$y]);
                    foreach($stuff_to_generate as $v) {
                        echo $codes[$v]." ".$y.", ".$x."); ";
                        }
                    }
            }         
    }
    
    
echo '<h2>Game</h2>';
loadMap('Game.txt', 'g');
    
echo '<h2>west 1</h2>';
loadMap('west1.txt', 'g');
    
echo '<h2>west 2</h2>';
loadMap('west2.txt', 's');

echo '<h2>ocean</h2>';
loadMap('ocean.txt', 'w');
    
echo '<h2>nw 1</h2>';
loadMap('nw1.txt', 'g');
    
echo '<h2>cave 1</h2>';
loadMap('cave1.txt', 'dc');

echo '<h2>cave 2</h2>';
loadMap('cave2.txt', 'H');
    ?>