/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */

import {WodRoll} from "../roll.js";
import {WOUND_TYPE, WodHealth} from "../health.js";
import {WodChat} from "../chat.js";

export class WodActorSheet extends ActorSheet {

    constructor(...args) {
        super(...args);
        this._shiftKeyDown = false;
        this._altKeyDown = false;
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["wod", "sheet", "actor"],
            template: "systems/wod/templates/actor/actor-sheet.hbs",
            width: 850,
            height: 600,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main"}]
        });
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        $(document).keydown(event => {
            // console.log(event.which);
            if (event.which === 16) this._shiftKeyDown = true;
            if (event.which === 18) this._altKeyDown = true;
        });
        $(document).keyup(event => {
            if (event.which === 16) {
                this._shiftKeyDown = false;
                return this._onResetAllHighlights(event)
            }
            if (event.which === 18) this._altKeyDown = false;
        });

        html.find('.attributes.score').contextmenu(this._onToggleActiveState.bind(this));

        html.find('.health-rank-box').click(ev => {
            if (this._shiftKeyDown) return this._onResetHealthRank(ev);
            else return this._onIncreaseHealthRank(ev);
        });
        html.find('.health-rank-box').contextmenu(this._onDecreaseHealthRank.bind(this));

        // Add Inventory Item
        html.find('.rank').click(ev => {
            if (this._shiftKeyDown && this._altKeyDown) return this._onUpdateRank(ev, true, true)
            else if (this._shiftKeyDown) return this._onUpdateRank(ev, true, false)
            else if (this._altKeyDown) return this._onUpdateRank(ev, false, true)
            else return this._onUpdateRank(ev, false, false)
        });
        html.find('.rank').mouseenter(ev => {
            if (this._shiftKeyDown) return this._onHighlightRank(ev)
        });
        html.find('.rank').mouseover(ev => {
            if (this._shiftKeyDown) return this._onHighlightRank(ev)
        });
        html.find('.rank').mousemove(ev => {
            if (this._shiftKeyDown) return this._onHighlightRank(ev)
        });
        html.find('.rank').keydown(ev => {
            if (ev.which === 16) return this._onHighlightRank(ev)
        });
        html.find('.score').mouseleave(ev => {
            if (this._shiftKeyDown) return this._onResetHighlightScore(ev)
        });
        html.find('.score').mouseout(ev => {
            if (this._shiftKeyDown) return this._onResetHighlightScore(ev)
        });
        html.find('.curres').click(ev => {
            if (this._altKeyDown) return this._onUpdateCurrentResource(ev, true, false)
            return this._onUpdateCurrentResource(ev, false, false)
        });
        html.find('.curres').contextmenu(ev => {
            return this._onUpdateCurrentResource(ev, false, true)
        });

        // Add Inventory Item
        html.find('.item-create').click(this._onItemCreate.bind(this));

        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(li.data("itemId"));
            item.sheet.render(true);
        });

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(li.data("itemId"));
            li.slideUp(200, () => this.render(false));
        });

        // Rollable abilities.
        html.find('.rollable').click(this._onRoll.bind(this));
    }

    /* -------------------------------------------- */

    async _onUpdateRank(event, isTemp=false, isReset=false) {
        event.preventDefault();
        const header = $(event.currentTarget);
        const value = header.data("value");
        const type = header.data("type");
        const parent = (type === "score") ? $(event.currentTarget).parents(".score") : $(event.currentTarget).parents(".resource");
        const ns = parent.data("namespace");
        const key = parent.data("key");
        return this._setRankValue(ns, key, value, isTemp, isReset);

        // if(type === "resource"){
        //     const parent = $(event.currentTarget).parents(".resource");
        //     const ns = parent.data("namespace");
        //     const key = parent.data("key");
        //     const field = `data.${ns}.${key}.value`;
        //     console.log(ns, key, field);
        //     // let data = {};
        //     // data[field] = value;
        //     // return this.actor.update(data);
        // }
    }

    /* -------------------------------------------- */

    _setRankValue(ns, key, value, isTemp=false, isReset=false){
        let data = this.getData().actor.data;
        const fieldname = `data.${ns}.${key}`;
        const field = eval(fieldname);
        let fromValue = (isTemp) ? field.temp : field.value;
        if(isReset) {
            if(isTemp) {
                field.temp = null;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, 0, isTemp);
            }
            else {
                field.value = field.min;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, field.min, isTemp);
            }
        }else {
            if(isTemp) {
                field.temp = value;
                if(!fromValue) fromValue = 0;
            }
            else field.value = value;
            WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, value, isTemp);
        }
        let fieldData = {};
        fieldData[fieldname] = field;
        return this.actor.update(fieldData);
    }

    /* -------------------------------------------- */

    _setCurrentResourceValue(ns, key, value, isReset=false, isDecrease=false){
        let data = this.getData().actor.data;
        const fieldname = `data.${ns}.${key}`;
        const field = eval(fieldname);
        const fromValue = field.temp;
        if(isReset)         field.temp = field.value;
        else if(isDecrease) field.temp = (field.temp > 0) ? field.temp -1 : field.temp;
        else                field.temp = value;
        WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, field.temp);
        let fieldData = {};
        fieldData[fieldname] = field;
        return this.actor.update(fieldData);
    }

    /* -------------------------------------------- */

    _onUpdateCurrentResource(event, isReset=false, isDecrease=false){
        event.preventDefault();
        const header = $(event.currentTarget);
        const value = header.data("value");
        const parent = $(event.currentTarget).parents(".resource");
        const ns = parent.data("namespace");
        const key = parent.data("key");
        return this._setCurrentResourceValue(ns, key, value, isReset);
    }

    /* -------------------------------------------- */

    _onResetHighlightScore(event){
        event.preventDefault();
        const score = $(event.currentTarget);
        score.find(".rank").css( "color", "");
    }

    /* -------------------------------------------- */
    _onResetAllHighlights(event){
        event.preventDefault();
        const ranks = $(".rank");
        ranks.css( "color", "");
    }
    /* -------------------------------------------- */

    _onHighlightRank(event){
        event.preventDefault();
        const rank = $(event.currentTarget);
        rank.css( "color", "red");
        rank.prevAll().css( "color", "red");
    }

    /* -------------------------------------------- */

    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    _onRoll(event) {
        event.preventDefault();
        const elt = $(event.currentTarget);
        const type = elt.data("type");
        const id = elt.data("itemId");
        const target = eval("this.actor.data." + id);
        const targetLabel = eval("game.i18n.localize('" + target.label + "')");

        // Find any malus from ijuries to apply on roll if exists
        let injuries = Object.values(this.actor.data.data.health.status).filter(s => s.checked && s.malus > 0);
        if(injuries.length > 0) {
            injuries.sort(function (a, b) {
                return (a.malus < b.malus) ? 1 : -1
            });
        }
        const malus = (injuries[0]) ? -(injuries.shift().malus) : 0;

        if (type == "attributes") {
            const label = game.i18n.localize("WOD.ui.rollAttribute") + " - " + targetLabel;
            this._rollAttributeDialog(label, id, malus, 10, 6);
        } else if (type == "abilities") {
            const label = game.i18n.localize("WOD.ui.rollAbility") + " - " + targetLabel;
            this._rollAbilityDialog(label, id, malus, 10, 6);
        } else if (type == "resources") {
            const label = game.i18n.localize("WOD.ui.rollResource") + " - " + targetLabel;
            this._rollResourceDialog(label, id, malus, 10, 6);
        }
    }

    /* -------------------------------------------- */

    async _rollAttributeDialog(label, id, bonus, explodes, difficulty) {

        const rollOptionTpl = 'systems/wod/templates/dialogs/roll-attribute-dialog.hbs';

        const rollData = {
            actor: this.actor.data,
            label: label,
            attribute: id,
            explodes: explodes,
            bonus: bonus,
            difficulty: difficulty
        };

        const rollOptionContent = await renderTemplate(rollOptionTpl, rollData);

        let d = new Dialog({
            title: label,
            content: rollOptionContent,
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
                        const bonus = html.find("#bonus").val();
                        const diff = html.find('#difficulty').val();
                        const attr = eval("this.actor.data." + attrKey);
                        const attrValue = attr.value;
                        const pool = parseInt(attrValue, 10) + parseInt(bonus, 10)
                        const expl = game.settings.get("wod", "10reroll") ? html.find('#explodes').val() : null;
                        if(pool>0){
                            const r = new WodRoll(pool, bonus, diff, expl);
                            r.roll();
                            r.toMessage(label, this.actor);
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
        });
        d.render(true);
    }

    /* -------------------------------------------- */

    async _rollAbilityDialog(label, id, bonus, explodes, difficulty) {

        const rollOptionTpl = 'systems/wod/templates/dialogs/roll-ability-dialog.hbs';
        const activeAttribute = Object.values(this.actor.data.data.attributes).find(a => a.active);
        const rollData = {
            actor: this.actor.data,
            label: label,
            attribute: (activeAttribute) ? `data.attributes.${activeAttribute.key}` : "data.attributes.str",
            ability: id,
            explodes: explodes,
            bonus: bonus,
            difficulty: difficulty
        };

        const rollOptionContent = await renderTemplate(rollOptionTpl, rollData);

        let d = new Dialog({
            title: label,
            content: rollOptionContent,
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
                        const abilityKey = html.find("#ability").val();
                        const bonus = html.find("#bonus").val();
                        const diff = html.find('#difficulty').val();
                        const attr = eval("this.actor.data." + attrKey);
                        const attrValue = attr.value;
                        const ability = eval("this.actor.data." + abilityKey);
                        const abilityValue = ability.value;
                        const pool = parseInt(attrValue, 10) + parseInt(abilityValue, 10) + parseInt(bonus, 10)
                        const expl = game.settings.get("wod", "10reroll") ? html.find('#explodes').val() : null;
                        const attrLabel = game.i18n.localize(eval("this.actor.data." + attrKey + ".label"));
                        const abilityLabel = game.i18n.localize(eval("this.actor.data." + abilityKey + ".label"));
                        const prefix = game.i18n.localize("WOD.ui.rollAbility");
                        const fullLabel = `${prefix} - ${attrLabel}/${abilityLabel}`;

                        if(pool>0){
                            const r = new WodRoll(pool, bonus, diff, expl);
                            r.roll();
                            r.toMessage(fullLabel, this.actor);
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
        });
        d.render(true);
    }


    /* -------------------------------------------- */

    async _rollResourceDialog(label, id, bonus, explodes, difficulty) {

        const rollOptionTpl = 'systems/wod/templates/dialogs/roll-resource-dialog.hbs';
        const rollData = {
            actor: this.actor.data,
            label: label,
            resource: id,
            explodes: explodes,
            bonus: bonus,
            difficulty: difficulty
        };

        const rollOptionContent = await renderTemplate(rollOptionTpl, rollData);

        let d = new Dialog({
            title: label,
            content: rollOptionContent,
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
                        const res = eval("this.actor.data." + resKey);
                        const resValue = res.value;
                        const pool = parseInt(resValue, 10) + parseInt(bonus, 10)
                        const expl = game.settings.get("wod", "10reroll") ? html.find('#explodes').val() : null;
                        const resLabel = game.i18n.localize(eval("this.actor.data." + resKey + ".label"));
                        const prefix = game.i18n.localize("WOD.ui.rollResource");
                        const fullLabel = `${prefix} - ${resLabel}`;

                        if(pool>0){
                            const r = new WodRoll(pool, bonus, diff, expl);
                            r.roll();
                            r.toMessage(fullLabel, this.actor);
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
        });
        d.render(true);
    }

    /* -------------------------------------------- */

    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
    _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            data: data
        };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.data["type"];

        // Finally, create the item!
        return this.actor.createOwnedItem(itemData);
    }

    /* -------------------------------------------- */

    _onUpdateHealthRank(event, decrease = false, reset = false) {
        let data = this.getData();
        let health = data.actor.data.health;

        // Get health ranks
        const li = $(event.currentTarget).closest(".health-rank");
        const key = li.data("key");
        let ranks = Object.values(health.status);
        let rank = ranks.find(r => r.key === key);

        if (reset) {
            // If reset, reset all ranks above current
            let upper = ranks.filter(r => r.ordinal >= rank.ordinal)
            upper.forEach(r => r.value = WOUND_TYPE.EMPTY);
        }
        else if (decrease) {
            // If decrease, decrease all higher ranks whose values are greater
            rank.value = (rank.value <= WOUND_TYPE.EMPTY) ? WOUND_TYPE.EMPTY : rank.value - 1;
            let upper = ranks.filter(r => r.ordinal > rank.ordinal)
            upper.forEach(r => {
                if(r.value > rank.value) r.value = rank.value
            });
        }
        else {
            // If increase, increase all lower ranks whose values are lower
            rank.value = (rank.value >= WOUND_TYPE.AGGRAVATED) ? WOUND_TYPE.AGGRAVATED : rank.value + 1;
            let lesser = ranks.filter(r => r.ordinal < rank.ordinal)
            lesser.forEach(r => {
                if(r.value < rank.value) r.value = rank.value
            });
        }

        WodHealth.updateRanks(ranks);

        return this.actor.update({"data.health": health});
    }

    /* -------------------------------------------- */

    _onIncreaseHealthRank(event) {
        event.preventDefault();
        return this._onUpdateHealthRank(event, false, false)
    }

    /* -------------------------------------------- */

    _onDecreaseHealthRank(event) {
        event.preventDefault();
        return this._onUpdateHealthRank(event, true, false)
    }

    /* -------------------------------------------- */

    _onResetHealthRank(event) {
        event.preventDefault();
        return this._onUpdateHealthRank(event, false, true)
    }

    /* -------------------------------------------- */
    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    _onToggleActiveState(event) {
        event.preventDefault();
        let data = this.getData();
        let attributes = data.actor.data.attributes;
        // console.log(attributes);
        Object.values(attributes).filter(attr => attr.active === true).forEach(attr => attr.active = false);
        const li = $(event.currentTarget);
        const id = li.data("key");
        console.log(event.currentTarget);
        console.log(id);
        const active = eval(`attributes.${id}`);
        console.log(active);
        active.active = true;
        return this.actor.update({"data.attributes": attributes});
    }

    /* -------------------------------------------- */

    /** @override */
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }

}
