export const registerSystemSettings = function() {

    game.settings.register("wod", "attributesTo9", {
        name: "Attributs à 9",
        hint: "Augmenter la jauge des attributs à 9",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: lang => window.location.reload()
    });

    game.settings.register("wod", "capabilitiesTo9", {
        name: "Capacités à 9",
        hint: "Augmenter la jauge des capacités à 9",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: lang => window.location.reload()
    });

    game.settings.register("wod", "10reroll", {
        name: "Les 10 rejouent",
        hint: "Les 10 rejouent et permettent d'augmenter le nombre de succès",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: lang => window.location.reload()
    });
};
