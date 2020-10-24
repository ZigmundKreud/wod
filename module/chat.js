export class WodChat {
    static message(actor, flavor, content, sound = null) {
        let msgData = {
            user: game.user._id,
            flavor: flavor,
            content: content
        };
        if(sound) msgData.sound = sound;
        if(actor) msgData.speaker = ChatMessage.getSpeaker({actor: actor});
        ChatMessage.create(msgData);
    }

    static scoreUpdateNotification(actor, key, namespace, fromValue, toValue, isTemp = false){
        if(!game.settings.get("wod", "disableScoreUpdateNotifications")){
            const label = game.i18n.localize(`WOD.${namespace}.${key}`);
            if(isTemp) WodChat.message(actor, `<h2>${game.i18n.localize("WOD.notifications.tempScoreUpdate")}</h2>`, `<strong>${label}</strong>: <span class="score-value">${fromValue}</span> <i class="fas fa-caret-right"></i> <span class="score-value">${toValue}</span>`, CONFIG.sounds.notification);
            else WodChat.message(actor, `<h2>${game.i18n.localize("WOD.notifications.scoreUpdate")}</h2>`, `<strong>${label}</strong>: <span class="score-value">${fromValue}</span> <i class="fas fa-caret-right"></i> <span class="score-value">${toValue}</span>`, CONFIG.sounds.notification);
        }
    }

    static metamorphosisNotification(actor, key){
        if(!game.settings.get("wod", "disableScoreUpdateNotifications")){
            const label = game.i18n.localize(`WOD.forms.${key}`);
            WodChat.message(actor, `<h2>${game.i18n.localize("WOD.notifications.metamorphosis")}`, `<strong>${label}</strong></h2>`, CONFIG.sounds.combat);
        }
    }
}