import {WodRoll} from "./roll.js";
import {WodHealth} from "./health.js";

export class WodDialog {

    static rollAttributeDialog(data, ns, group, key, difficulty) {
        const actor = data.actor;
        const targetLabel = game.i18n.localize(data.attributes[key].label);
        const malus = WodHealth.getMalus(actor);
        const label = game.i18n.localize("WOD.ui.rollAttribute") + " - " + targetLabel;

        const rollOptionTpl = 'systems/wod/templates/dialogs/roll-attribute-dialog.hbs';
        const rollData = {
            attributes: data.attributes,
            label: label,
            attribute: key,
            bonus: malus,
            difficulty: difficulty
        };

        return renderTemplate(rollOptionTpl, rollData).then(html => {
            return new Dialog({
                title: label,
                content: html,
                buttons: {
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: () => {}
                    },
                    submit: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Submit",
                        callback: (html) => {
                            const attrKey = html.find("#attribute").val();
                            const attr = data.attributes[attrKey];
                            const attrTmpValue = attr.temp;
                            const attrValue = (attrTmpValue != null) ? attrTmpValue : attr.value;
                            const attrLabel = game.i18n.localize(attr.label);

                            const bonus = html.find("#bonus").val();
                            const diff = html.find('#difficulty').val();
                            const pool = attrValue + parseInt(bonus, 10)

                            // const expl = game.settings.get("wod", "10reroll") ? html.find('#explodes').val() : null;
                            if(pool>0){
                                const r = new WodRoll(pool, bonus, diff, null);
                                r.roll();
                                r.toMessage(attrLabel, actor);
                            }
                            else {
                                ui.notifications.error(game.i18n.localize("WOD.error.negativeDicePool"));
                                return false;
                            }
                        }
                    }
                },
                default: "submit",
                close: () => {}
            }).render(true);
        });
    }

    static rollAbilityDialog(data, ns, group, key, difficulty) {
        const targetLabel = game.i18n.localize(data.abilities[key].label);
        const label = game.i18n.localize("WOD.ui.rollAbility") + " - " + targetLabel;
        const actor = data.actor;

        const malus = WodHealth.getMalus(actor);
        const rollOptionTpl = 'systems/wod/templates/dialogs/roll-ability-dialog.hbs';
        const activeAttribute = Object.values(data.attributes).find(a => a.active);

        const rollData = {
            attributes: data.attributes,
            abilities: data.abilities,
            label: label,
            attribute: (activeAttribute) ? activeAttribute.key : "str",
            ability: key,
            bonus: malus,
            difficulty: difficulty
        };

        return renderTemplate(rollOptionTpl, rollData).then(html => {
            return new Dialog({
                title: label,
                content: html,
                buttons: {
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: () => {
                        }
                    },
                    submit: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Submit",
                        callback: (html) => {
                            const attrKey = html.find("#attribute").val();
                            const attr = data.attributes[attrKey];
                            const attrTmpValue = attr.temp;
                            const attrValue = (attrTmpValue != null) ? attrTmpValue : attr.value;

                            const abilityKey = html.find("#ability").val();
                            const ability = data.abilities[abilityKey];
                            const abilityTmpValue = ability.temp;
                            const abilityValue = (abilityTmpValue != null) ? abilityTmpValue : ability.value;

                            const bonus = html.find("#bonus").val();
                            const diff = html.find('#difficulty').val();
                            const pool = attrValue + abilityValue + parseInt(bonus, 10)

                            // const expl = game.settings.get("wod", "10reroll") ? html.find('#explodes').val() : null;
                            const attrLabel = game.i18n.localize(attr.label);
                            const abilityLabel = game.i18n.localize(ability.label);
                            const prefix = game.i18n.localize("WOD.ui.rollAbility");
                            const fullLabel = `${prefix} - ${attrLabel}/${abilityLabel}`;

                            if(pool>0){
                                const r = new WodRoll(pool, bonus, diff, null);
                                r.roll();
                                r.toMessage(fullLabel, actor);
                            }
                            else {
                                ui.notifications.error(game.i18n.localize("WOD.error.negativeDicePool"));
                                return false;
                            }

                        }
                    }
                },
                default: "submit",
                close: () => {
                }
            }).render(true);
        });
    }

    static rollResourceDialog(data, ns, group, key, difficulty) {
        const actor = data.actor;
        const target = data[ns][group].scores.find(s => s.key === key);
        const targetLabel = game.i18n.localize(target.label);
        const malus = WodHealth.getMalus(actor);
        const label = game.i18n.localize("WOD.ui.rollResource") + " - " + targetLabel;

        const resources = data.resources.primary.scores.concat(data.resources.secondary.scores).filter(r => r.rollable);
        const rollOptionTpl = 'systems/wod/templates/dialogs/roll-resource-dialog.hbs';
        const rollData = {
            resources: resources,
            label: label,
            resource: key,
            bonus: malus,
            difficulty: difficulty
        };

        return renderTemplate(rollOptionTpl, rollData).then(html => {
            return new Dialog({
                title: label,
                content: html,
                buttons: {
                    cancel: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancel",
                        callback: () => {
                        }
                    },
                    submit: {
                        icon: '<i class="fas fa-check"></i>',
                        label: "Submit",
                        callback: (html) => {
                            const resKey = html.find("#resource").val();
                            const bonus = html.find("#bonus").val();
                            const diff = html.find('#difficulty').val();
                            const res = resources.find(r => r.key === resKey);
                            const resValue = res.value;
                            const pool = resValue + parseInt(bonus, 10)
                            const resLabel = game.i18n.localize(res.label);
                            const prefix = game.i18n.localize("WOD.ui.rollResource");
                            const fullLabel = `${prefix} - ${resLabel}`;

                            if(pool>0){
                                const r = new WodRoll(pool, bonus, diff, null);
                                r.roll();
                                r.toMessage(fullLabel, actor);
                            }
                            else {
                                ui.notifications.error(game.i18n.localize("WOD.error.negativeDicePool"));
                                return false;
                            }

                        }
                    }
                },
                default: "submit",
                close: () => {
                }
            }).render(true);
        });
    }

    static rollItemDialog(data, item) {

        const itemData = item.data;
        const label = game.i18n.localize("WOD.ui.rollItem") + " - " + itemData.name;
        const actor = data.actor;

        if(itemData.data.properties?.weapon){
            const attackStat = itemData.data.facets.weapon.attackStat;
            const attackAbility = itemData.data.facets.weapon.attackAbility;
            const difficulty = itemData.data.facets.weapon.difficulty;
            const damageStat = itemData.data.facets.weapon.damageStat;
            const damageBonus = itemData.data.facets.weapon.damageBonus;
            const damageType = itemData.data.facets.weapon.damageType;
            const actions = itemData.data.facets.weapon.actions;
            const malus = WodHealth.getMalus(actor);
            const rollOptionTpl = 'systems/wod/templates/dialogs/roll-ability-dialog.hbs';

            const rollData = {
                attributes: data.attributes,
                abilities: data.abilities,
                label: label,
                attribute: (attackStat) ? attackStat : "str",
                ability: attackAbility,
                bonus: malus,
                difficulty: difficulty
            };

            return renderTemplate(rollOptionTpl, rollData).then(html => {
                return new Dialog({
                    title: label,
                    content: html,
                    buttons: {
                        cancel: {
                            icon: '<i class="fas fa-times"></i>',
                            label: "Cancel",
                            callback: () => {
                            }
                        },
                        submit: {
                            icon: '<i class="fas fa-check"></i>',
                            label: "Submit",
                            callback: (html) => {
                                const attrKey = html.find("#attribute").val();
                                const attr = data.attributes[attrKey];
                                const attrTmpValue = attr.temp;
                                const attrValue = (attrTmpValue != null) ? attrTmpValue : attr.value;

                                const abilityKey = html.find("#ability").val();
                                const ability = data.abilities[abilityKey];
                                const abilityTmpValue = ability.temp;
                                const abilityValue = (abilityTmpValue != null) ? abilityTmpValue : ability.value;

                                const bonus = html.find("#bonus").val();
                                const diff = html.find('#difficulty').val();
                                const pool = attrValue + abilityValue + parseInt(bonus, 10)

                                // const expl = game.settings.get("wod", "10reroll") ? html.find('#explodes').val() : null;
                                const attrLabel = game.i18n.localize(attr.label);
                                const abilityLabel = game.i18n.localize(ability.label);
                                const prefix = game.i18n.localize("WOD.ui.rollAbility");
                                const fullLabel = `${prefix} - ${attrLabel}/${abilityLabel}`;

                                if(pool>0){
                                    const r = new WodRoll(pool, bonus, diff, null);
                                    r.roll();
                                    r.toMessage(fullLabel, actor);
                                }
                                else {
                                    ui.notifications.error(game.i18n.localize("WOD.error.negativeDicePool"));
                                    return false;
                                }
                            }
                        }
                    },
                    default: "submit",
                    close: () => {
                    }
                }).render(true);
            });
        }

    }

}
