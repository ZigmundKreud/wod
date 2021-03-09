/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {

    // Define template paths to load
    const templatePaths = [
        "systems/wod/templates/actor/actor-sheet.hbs",
        "systems/wod/templates/actor/parts/actor-abilities.hbs",
        "systems/wod/templates/actor/parts/actor-advantages.hbs",
        "systems/wod/templates/actor/parts/actor-attributes.hbs",
        "systems/wod/templates/actor/parts/actor-combat.hbs",
        "systems/wod/templates/actor/parts/actor-details.hbs",
        "systems/wod/templates/actor/parts/actor-health.hbs",
        "systems/wod/templates/actor/parts/actor-main.hbs",
        "systems/wod/templates/actor/parts/actor-inventory.hbs",
        "systems/wod/templates/actor/parts/actor-toolbar.hbs",
        "systems/wod/templates/actor/parts/actor-traits.hbs",

        "systems/wod/templates/dialogs/roll-attribute-dialog.hbs",
        "systems/wod/templates/dialogs/roll-ability-dialog.hbs",
        "systems/wod/templates/dialogs/roll-damage-dialog.hbs",
        "systems/wod/templates/dialogs/roll-resource-dialog.hbs",
        "systems/wod/templates/chat/roll-result-card.hbs",

        "systems/wod/templates/actor/parts/score/score-value.hbs",
        "systems/wod/templates/actor/parts/score/score-rank.hbs",
        "systems/wod/templates/actor/parts/resource/resource-rank.hbs",
        "systems/wod/templates/actor/parts/resource/resource-value.hbs",

        // Items
        "systems/wod/templates/item/item-sheet.hbs",
        "systems/wod/templates/item/parts/attributes/item-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/effects-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/equipment-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/protection-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/spiritual-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/ranged-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/weapon-attributes.hbs",

        "systems/wod/templates/item/parts/attributes/auspice-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/background-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/breed-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/clan-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/tribe-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/gift-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/rite-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/discipline-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/merit-attributes.hbs",
        "systems/wod/templates/item/parts/attributes/flaw-attributes.hbs"
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};
