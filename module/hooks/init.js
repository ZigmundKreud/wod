// Import Modules
import {WodActor} from "../actor/actor.js";
import {WodActorSheet} from "../actor/actor-sheet.js";
import {WodItem} from "../item/item.js";
import {WodItemSheet} from "../item/item-sheet.js";

Hooks.once('init', async function () {

    game.wod = {
        WodActor: WodActor,
        WodItem: WodItem
    };

    /**
     * Set an initiative formula for the system
     * @type {String}
     */
    CONFIG.Combat.initiative = {
        formula: "1d20",
        decimals: 2
    };

    // Define custom Entity classes
    CONFIG.Actor.entityClass = WodActor;
    CONFIG.Item.entityClass = WodItem;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("wod", WodActorSheet, {makeDefault: true});
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("wod", WodItemSheet, {makeDefault: true});


    // Preload Handlebars Templates
    preloadHandlebarsTemplates();

});