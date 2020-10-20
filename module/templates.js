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
        "systems/wod/templates/actor/parts/actor-main.hbs",
        "systems/wod/templates/actor/parts/actor-inventory.hbs",
        "systems/wod/templates/actor/parts/actor-resources.hbs",
        "systems/wod/templates/actor/parts/score-rank.hbs"
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};
