// Import Modules
import {WodActor} from "./actor/actor.js";
import {WodActorSheet} from "./actor/actor-sheet.js";
import {WodItem} from "./item/item.js";
import {WodItemSheet} from "./item/item-sheet.js";

import {registerSystemSettings} from "./settings.js";
import {preloadHandlebarsTemplates} from "./templates.js";
import {registerHandlebarsHelpers} from "./helpers.js";
import {WOD} from "./config.js";

Hooks.once('init', async function () {

    game.wod = {
        config: WOD
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
    // Register actor sheets
    Actors.registerSheet("wod", WodActorSheet, {
        types: [
            "werewolf",
            "vampire",
            "vampire_da",
            "ghoul",
            "mage",
            "hunter",
            "human"
        ],
        makeDefault: true,
        label: "WOD.sheet.character"
    });
    Actors.registerSheet("wod", WodActorSheet, {
        types: ["spirit"],
        makeDefault: true,
        label: "WOD.sheet.spirit"
    });


    Items.registerSheet("wod", WodItemSheet, {makeDefault: true});

    // Register System Settings
    registerSystemSettings();

    // Preload Handlebars Templates
    preloadHandlebarsTemplates();

    // Register Handlebars Helpers
    registerHandlebarsHelpers();
});


/**
 * Ready hook loads tables, and override's foundry's entity link functions to provide extension to pseudo entities
 */

Hooks.once("ready", async () => {

// console.debug("Importing data");
//     DataLoader.loadData("archetypes");
//     DataLoader.loadData("auspices");
//     DataLoader.loadData("backgrounds");
//     DataLoader.loadData("breeds");
//     DataLoader.loadData("deformities");
//     DataLoader.loadData("derangements");
//     DataLoader.loadData("fetishes");
//     DataLoader.loadData("gifts");
//     DataLoader.loadData("merits-flaws");
//     DataLoader.loadData("rites");
//     DataLoader.loadData("talens");
//     DataLoader.loadData("tribes");

    console.info("System Initialized.");
});
