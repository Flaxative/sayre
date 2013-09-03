<?php
        $i = count(file('index.php'));
        $i += count(file('parse.php'));
        $i += count(file('levels/south1.txt'));
        $i += count(file('levels/Game.txt'));
        $i += count(file('levels/cave2.txt'));
        $i += count(file('levels/cave1.txt'));
        $i += count(file('levels/west1.txt'));
        $i += count(file('levels/west2.txt'));
        $i += count(file('levels/ocean.txt'));
        $i += count(file('levels/nw1.txt'));
        $i += count(file('includes/crafty-extensions.js'));
        $i += count(file('includes/general.js'));
        $i += count(file('includes/components.js'));
        $i += count(file('includes/scenes.js'));
        $i += count(file('includes/loading.js'));
        $i += count(file('includes/defeat.js'));
        $i += count(file('includes/style.css'));
        $i += count(file('includes/reset.css'));
        $i += count(file('includes/components/enemies.js'));
        $i += count(file('includes/components/enemies-old.js'));
        $i += count(file('includes/components/inventory.js'));
        $i += count(file('includes/components/terrain.js'));
        $i += count(file('includes/components/drops.js'));
        $i += count(file('includes/components/weapons.js'));
        echo $i;
    ?>