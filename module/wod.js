// Import Modules
import {WodActor} from "./actor/actor.js";
import {WodActorSheet} from "./actor/actor-sheet.js";
import {WodItem} from "./item/item.js";
import {WodItemSheet} from "./item/item-sheet.js";

import {registerSystemSettings} from "./settings.js";
import {preloadHandlebarsTemplates} from "./templates.js";
import {registerHandlebarsHelpers} from "./helpers.js";

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
        formula: "1d10x10 + @attributes.dex.value + @attributes.wits.value + (@attributes.dex.value + @attributes.wits.value)/100",
        decimals: 2
    };

    // Define custom Entity classes
    CONFIG.Actor.entityClass = WodActor;
    CONFIG.Item.entityClass = WodItem;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);

    Actors.registerSheet("wod", WodActorSheet, {makeDefault: true});
    Items.registerSheet("wod", WodItemSheet, {makeDefault: true});

    // Register System Settings
    registerSystemSettings();

    // Preload Handlebars Templates
    preloadHandlebarsTemplates();

    // Register Handlebars Helpers
    registerHandlebarsHelpers();
});