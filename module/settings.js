export const registerSystemSettings = function() {

    game.settings.register("wod", "attributesMax5", {
        name: game.i18n.localize("WOD.settings.attributesMax5"),
        hint: game.i18n.localize("WOD.settings.attributesMax5_hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: lang => window.location.reload()
    });

    game.settings.register("wod", "abilitiesMax5", {
        name: game.i18n.localize("WOD.settings.abilitiesMax5"),
        hint: game.i18n.localize("WOD.settings.abilitiesMax5_hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: lang => window.location.reload()
    });

    game.settings.register("wod", "unfoldRollResult", {
        name: game.i18n.localize("WOD.settings.unfoldRollResult"),
        hint: game.i18n.localize("WOD.settings.unfoldRollResult_hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: lang => window.location.reload()
    });

    game.settings.register("wod", "10dicesMax", {
        name: game.i18n.localize("WOD.settings.10dicesMax"),
        hint: game.i18n.localize("WOD.settings.10dicesMax_hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: lang => window.location.reload()
    });

    game.settings.register("wod", "10reroll", {
        name: game.i18n.localize("WOD.settings.10reroll"),
        hint: game.i18n.localize("WOD.settings.10reroll_hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: lang => window.location.reload()
    });

    game.settings.register("wod", "disableScoreUpdateNotifications", {
        name: game.i18n.localize("WOD.settings.disableScoreUpdateNotifications"),
        hint: game.i18n.localize("WOD.settings.disableScoreUpdateNotifications_hint"),
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: lang => window.location.reload()
    });
};
