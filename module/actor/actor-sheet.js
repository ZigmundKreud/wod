/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */

import {WodRoll} from "../roll.js";

export class WodActorSheet extends ActorSheet {

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

        html.find('.attributes.score').contextmenu(this._onToggleActiveState.bind(this));

        // Add Inventory Item
        html.find('.rank').click(this._onUpdateRank.bind(this));

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

    async _onUpdateRank(event) {
        event.preventDefault();
        const header = $(event.currentTarget);
        const value = header.data("value");
        const parent = $(event.currentTarget).parents(".score");
        const ns = parent.data("namespace");
        const key = parent.data("key");
        const field = `data.${ns}.${key}.value`;
        let data = {};
        data[field] = value;
        await this.actor.update(data);
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
        if (type == "attributes") {
            const label = game.i18n.localize("WOD.ui.rollAttribute") + " - " + targetLabel;
            this._rollAttributeDialog(label, id, 0, 10, 6);
        } else if (type == "abilities") {
            const label = game.i18n.localize("WOD.ui.rollAbility") + " - " + targetLabel;
            this._rollAbilityDialog(label, id, 0, 10, 6);
        }
    }

    /* -------------------------------------------- */

    async _rollAttributeDialog(label, id, bonus, explodes, difficulty) {

        const rollOptionTpl = 'systems/wod/templates/dialogs/roll-attribute-dialog.hbs';

        const rollData = {
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
                        const r = new WodRoll(pool, diff, expl);
                        r.roll();
                        r.toMessage(label, this.actor);
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
            label: label,
            attribute : (activeAttribute) ? `data.attributes.${activeAttribute.key}` : "data.attributes.str",
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
                        const r = new WodRoll(pool, diff, expl);
                        const attrLabel = game.i18n.localize(eval("this.actor.data." + attrKey + ".label"));
                        const abilityLabel = game.i18n.localize(eval("this.actor.data." + abilityKey + ".label"));
                        const prefix = game.i18n.localize("WOD.ui.rollAbility");
                        const fullLabel = `${prefix} - ${attrLabel}/${abilityLabel}`;
                        r.roll();
                        r.toMessage(fullLabel, this.actor);
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
        return this.actor.update({"data.attributes" : attributes});
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
