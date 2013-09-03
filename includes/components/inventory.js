// ~~~~~
// ~~~~~
/* INVENTORY FUNCTIONS */
// ~~~~~
// ~~~~~
    
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

// used to display descriptions of selected items in inventory
function summary() {$("#summary").html($('.active').attr('data-item')+': '+item_description[$('.active').attr('data-item')]);}

// opens inventory, creates an entity and triggers a function to populate it
function openInventory() {
    console.log('inventory open');
    pauseAll(); Crafty.unbind('KeyUp', (interact)); Crafty.unbind('KeyUp', (pause_key));
    $('#inventory').show(); displayArsenal();
    enableInventoryNav();
    }
    
// fills inventory with things in jQuery
function displayArsenal() {
    var h = 0; var j = 1; // initialize grid variables for inventory
    
    // WEAPONS
    if(weapons_carried[0]) {
        $('.inventory').append('<h3>Weapons</h3>');
        weapons_carried.forEach(function(weapon) {
            h++;
            $('.inventory').append('<fieldset class="equippable" data-itemType="weapon" data-x="'+h+'" data-y="'+j+'" data-item="'+weapon+'"><img src="assets/inventory/'+weapon+'-inv.png" /></fieldset>');
            });
        }
    // BTN 2
    if(secondaries_carried[0]) {    // don't show category if none exist
        $('.inventory').append('<h3>Btn 2</h3>');
        h = 0; j ++;
        secondaries_carried.forEach(function(btn2) {
            h++;
            $('.inventory').append('<fieldset class="equippable" data-itemType="secondary" data-x="'+h+'" data-y="'+j+'" data-item="'+btn2+'"><img src="assets/inventory/'+btn2+'-inv.png" /></fieldset>');
            });
        }
    
    // Armor
    if(outfits_carried[0]) {    // don't show category if none exist
        $('.inventory').append('<h3>Armor</h3>');
        h = 0; j ++;
        outfits_carried.forEach(function(armor) {
            h++;
            $('.inventory').append('<fieldset class="equippable" data-itemType="armor" data-x="'+h+'" data-y="'+j+'" data-item="'+armor+'"><img src="assets/inventory/'+armor+'-inv.png" /></fieldset>');
            });
        }
    
    // Accessories / Misc
    if(accessories_carried[0]) {    // don't show category if none exist
        $('.inventory').append('<h3>Accessories</h3>');
        h = 0; j ++;
        accessories_carried.forEach(function(misc) {
            h++;
            $('.inventory').append('<fieldset class="equippable" data-itemType="accessory" data-x="'+h+'" data-y="'+j+'" data-item="'+misc+'"><img src="assets/inventory/'+misc+'-inv.png" /></fieldset>');
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
    resumeAll(); Crafty.bind('KeyUp', (interact)); Crafty.bind('KeyUp', (pause_key));
    }