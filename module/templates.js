/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {

    // Define template paths to load
    const templatePaths = [
        "systems/wod/templates/actor/actor-sheet.hbs",
        "systems/wod/templates/actor/parts/actor-abilities.hbs",
        "systems/wod/templates/actor/parts/actor-advantages.hbs",
        "systems/wod/templates/actor/parts/actor-attributes.hbs",
        "systems/wod/templates/actor/parts/actor-details.hbs",
        "systems/wod/templates/actor/parts/actor-health.hbs",
        "systems/wod/templates/actor/parts/actor-main.hbs",
        "systems/wod/templates/actor/parts/actor-inventory.hbs",
        "systems/wod/templates/actor/parts/actor-traits.hbs",
        "systems/wod/templates/actor/parts/actor-resources.hbs",
        "systems/wod/templates/actor/parts/score-rank.hbs",
        "systems/wod/templates/dialogs/roll-attribute-dialog.hbs",
        "systems/wod/templates/dialogs/roll-ability-dialog.hbs",
        "systems/wod/templates/chat/roll-result-card.hbs"
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};
