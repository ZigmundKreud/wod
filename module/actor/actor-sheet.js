/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */

import {WodHealth, WOUND_TYPE} from "../controllers/health.js";
import {WodChat} from "../controllers/chat.js";
import {WodDialog} from "../controllers/dialogs.js";

export class WodActorSheet extends ActorSheet {

    /* --------------------------------------------
       METHOD OVERRIDES
       -------------------------------------------- */
    constructor(...args) {
        super(...args);
        this._shiftKeyDown = false;
        // this._altKeyDown = false;
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

    /** @override */
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        $(document).keydown(event => {
            if (event.which === 16) this._shiftKeyDown = true;
            // if (event.which === 18) this._altKeyDown = true;
        });
        $(document).keyup(event => {
            if (event.which === 16) {
                this._shiftKeyDown = false;
                return this._onResetAllHighlights(event)
            }
            // if (event.which === 18) this._altKeyDown = false;
        });

        html.find('.attributes.score').contextmenu(this._onToggleActiveState.bind(this));

        html.find('.health-rank-box').click(ev => {
            if (this._shiftKeyDown) return this._onResetHealthRank(ev);
            else return this._onIncreaseHealthRank(ev);
        });
        html.find('.health-rank-box').contextmenu(this._onDecreaseHealthRank.bind(this));

        html.find('.score-value>.rank').click(ev => {
            ev.stopPropagation();
            if (this._shiftKeyDown) return this._onUpdateRank(ev, true, false)
            else return this._onUpdateRank(ev, false, false)
        });
        html.find('.score-value>.rank').contextmenu(ev => {
            ev.stopPropagation();
            if (this._shiftKeyDown) return this._onUpdateRank(ev, true, true)
            else return false;
        });
        html.find('.score-value>.rank').mouseenter(ev => {
            if (this._shiftKeyDown) return this._onHighlightRank(ev)
        });
        html.find('.score-value>.rank').mouseover(ev => {
            if (this._shiftKeyDown) return this._onHighlightRank(ev)
        });
        html.find('.score-value>.rank').mousemove(ev => {
            if (this._shiftKeyDown) return this._onHighlightRank(ev)
        });
        html.find('.score-value>.rank').keydown(ev => {
            if (ev.which === 16) return this._onHighlightRank(ev)
        });
        html.find('.score').mouseleave(ev => {
            if (this._shiftKeyDown) return this._onResetHighlightScore(ev)
        });
        html.find('.score').mouseout(ev => {
            if (this._shiftKeyDown) return this._onResetHighlightScore(ev)
        });

        html.find('.resource-value>.rank').click(ev => {
            ev.stopPropagation();
            return this._onUpdateRank(ev, false, false)
        });
        html.find('.resource-curres>.curres').click(ev => {
            ev.stopPropagation();
            return this._onUpdateRank(ev, true, false)
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

    _onUpdateRank(event, isTemp = false, isReset = false) {
        event.preventDefault();
        const header = $(event.currentTarget);
        const value = header.data("value");
        const type = header.data("type");
        const parent = (type === "score") ? $(event.currentTarget).parents(".score") : $(event.currentTarget).parents(".resource");
        const ns = parent.data("namespace");
        const group = parent.data("group");
        const key = parent.data("key");
        if (ns === "attributes" || ns === "abilities") return this._setRankValue(ns, group, key, value, isTemp, isReset);
        else {
            return this._setResourceValue(ns, group, key, value, isTemp, isReset);
        }
    }

    /* -------------------------------------------- */

    _setRankValue(ns, group, key, value, isTemp = false, isReset = false) {
        let data = duplicate(this.actor.data);
        const field = data.data[ns][group].scores.find(s => s.key === key);
        let fromValue = (isTemp) ? field.temp : field.value;
        if (isReset) {
            if (isTemp) {
                field.temp = null;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, "-", isTemp);
            } else {
                field.value = field.min;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, field.min, isTemp);
            }
        } else {
            if (isTemp) {
                field.temp = value;
                if (!fromValue) fromValue = "-";
            } else field.value = value;
            WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, value, isTemp);
        }
        return this.actor.update(data);
    }


    /* -------------------------------------------- */

    _setResourceValue(ns, group, key, value, isTemp = false, isReset = false) {
        let data = duplicate(this.actor.data);
        const field = data.data[ns][group].scores.find(s => s.key === key);
        let fromValue = (isTemp) ? field.temp : field.value;
        if (isReset) {
            if (isTemp) {
                field.temp = null;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, "-", isTemp);
            } else {
                field.value = field.min;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, field.min, isTemp);
            }
        } else {
            if (isTemp) {
                field.temp = value;
                if (!fromValue) fromValue = "-";
            } else field.value = value;
            WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, value, isTemp);
        }
        return this.actor.update(data);
    }

    /* --------------------------------------------
       HIGHLIGHT METHODS
       -------------------------------------------- */

    _onResetHighlightScore(event) {
        event.preventDefault();
        const score = $(event.currentTarget);
        score.find(".rank").css("color", "");
    }

    _onResetAllHighlights(event) {
        event.preventDefault();
        const ranks = $(".rank");
        ranks.css("color", "");
    }

    _onHighlightRank(event) {
        event.preventDefault();
        const rank = $(event.currentTarget);
        rank.css("color", "red");
        rank.prevAll().css("color", "red");
    }

    /* -------------------------------------------- */

    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    _onRoll(event) {
        event.preventDefault();
        const data = this.getData();
        if ($(event.currentTarget).hasClass("item-control")) {
            const elt = $(event.currentTarget).parents(".item");
            const key = elt.data("key");
            const item = this.actor.items.get(key);
            return WodDialog.rollItemDialog(data, item);
        } else {
            const elt = $(event.currentTarget).parents(".score");
            const ns = elt.data("namespace");
            const group = elt.data("group");
            const key = elt.data("key");
            if (ns === "attributes") return WodDialog.rollAttributeDialog(data, ns, group, key, 6);
            else if (ns === "abilities") return WodDialog.rollAbilityDialog(data, ns, group, key, 6);
            else if (ns === "resources") return WodDialog.rollResourceDialog(data, ns, group, key, 6);
        }
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
        let health = data.actor.data.data.health;

        // Get health ranks
        const li = $(event.currentTarget).closest(".health-rank");
        const key = li.data("key");
        let ranks = Object.values(health.status);
        let rank = ranks.find(r => r.key === key);

        if (reset) {
            // If reset, reset all ranks above current
            let upper = ranks.filter(r => r.ordinal >= rank.ordinal)
            upper.forEach(r => r.value = WOUND_TYPE.EMPTY);
        } else if (decrease) {
            // If decrease, decrease all higher ranks whose values are greater
            rank.value = (rank.value <= WOUND_TYPE.EMPTY) ? WOUND_TYPE.EMPTY : rank.value - 1;
            let upper = ranks.filter(r => r.ordinal > rank.ordinal)
            upper.forEach(r => {
                if (r.value > rank.value) r.value = rank.value
            });
        } else {
            // If increase, increase all lower ranks whose values are lower
            rank.value = (rank.value >= WOUND_TYPE.AGGRAVATED) ? WOUND_TYPE.AGGRAVATED : rank.value + 1;
            let lesser = ranks.filter(r => r.ordinal < rank.ordinal)
            lesser.forEach(r => {
                if (r.value < rank.value) r.value = rank.value
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

    _onToggleActiveState(event) {
        event.preventDefault();
        const elt = $(event.currentTarget);
        const ns = elt.data("namespace");
        const group = elt.data("group");
        const key = elt.data("key");
        let data = duplicate(this.actor.data);
        const groups = ["physical", "social", "mental"];
        for (let group of groups) {
            data.data.attributes[group].scores.forEach(s => s.active = false);
        }
        const field = data.data[ns][group].scores.find(s => s.key === key);
        field.active = true;
        return this.actor.update(data);
    }

    /* -------------------------------------------- */

    /** @override */
    getData(options) {
        const data = super.getData(options);

        // The Actor's data
        const actorData = this.actor.data.toObject(false);

        data.physical = actorData.data.attributes.physical.scores;
        data.social = actorData.data.attributes.social.scores;
        data.mental = actorData.data.attributes.mental.scores;
        const attribs = actorData.data.attributes.physical.scores.concat(actorData.data.attributes.social.scores).concat(actorData.data.attributes.mental.scores);
        data.attributes = {};
        for (const attrib of attribs) {
            data.attributes[attrib.key] = attrib;
        }

        data.talents = actorData.data.abilities.talents.scores;
        data.skills = actorData.data.abilities.skills.scores;
        data.knowledges = actorData.data.abilities.knowledges.scores;

        const abilities = actorData.data.abilities.talents.scores.concat(actorData.data.abilities.skills.scores).concat(actorData.data.abilities.knowledges.scores);
        data.abilities = {};
        for (const ability of abilities) {
            data.abilities[ability.key] = ability;
        }

        data.resources = actorData.data.resources;

        data.inventory = {
            count: data.items.filter(item => item.type === "item" && item.data.properties?.equipment).length,
            categories: []
        };
        for (const category of Object.keys(game.wod.config.itemCategories)) {
            const items = Object.values(data.items).filter(item => item.type === "item" && item.data.subtype === category && item.data.properties?.equipment).sort((a, b) => (a.name > b.name) ? 1 : -1)
            if (items.length > 0) {
                data.inventory.categories.push({
                    id: category,
                    label: "WOD.category." + category,
                    items: items
                });
            }
        }

        data.combat = {
            count: data.items.filter(item => item.type === "item" && item.data.facets?.equipable?.worn).length,
            categories: []
        };
        for (const category of Object.keys(game.wod.config.itemCategories)) {
            const items = Object.values(data.items).filter(item => item.type === "item" && item.data.subtype === category && item.data.facets?.equipable?.worn).sort((a, b) => (a.name > b.name) ? 1 : -1)
            if (items.length > 0) {
                data.combat.categories.push({
                    id: category,
                    label: "WOD.category." + category,
                    items: items
                });
            }
        }

        data.maneuvers = {
            count: data.items.filter(i => i.type === "item" && i.data.subtype === "maneuver").length,
            id: "maneuvers",
            label: "WOD.category.maneuvers",
            items: Object.values(data.items).filter(item => item.type === "item" && item.data.subtype === "maneuver").sort((a, b) => (a.name > b.name) ? 1 : -1)
        };

        data.combat.categories.push({
            id: "maneuvers",
            label: "WOD.category.maneuvers",
            items: Object.values(data.items).filter(item => item.type === "item" && item.data.subtype === "maneuver").sort((a, b) => (a.name > b.name) ? 1 : -1)
        });

        console.log(actorData);
        console.log(data);
        return data;
    }
}
