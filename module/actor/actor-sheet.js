/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */

import {WOUND_TYPE, WodHealth} from "../controllers/health.js";
import {WodChat} from "../controllers/chat.js";
import {WodMetamorphosis} from "../controllers/metamorphosis.js";
import {WodBaseSheet} from "./base-sheet.js";
import {WodDialog} from "../controllers/dialogs.js";

export class WodActorSheet extends WodBaseSheet {

    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
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

        html.find('.metamorphosis').click(this._onToggleMetamorphosis.bind(this));

        html.find('.attributes.score').contextmenu(this._onToggleActiveState.bind(this));

        html.find('.health-rank-box').click(ev => {
            if (this._shiftKeyDown) return this._onResetHealthRank(ev);
            else return this._onIncreaseHealthRank(ev);
        });
        html.find('.health-rank-box').contextmenu(this._onDecreaseHealthRank.bind(this));

        html.find('.curres').click(ev => {
            ev.stopPropagation()
            // if (this._shiftKeyDown && this._altKeyDown) return this._onUpdateRank(ev, true, true)
            // else if (this._shiftKeyDown) return this._onUpdateRank(ev, true, false)
            // else if (this._altKeyDown) return this._onUpdateRank(ev, false, true)
            // else return this._onUpdateRank(ev, false, false)
            return this._onUpdateRank(ev, true, false)
        });

        html.find('.rank').click(ev => {
            // if (this._shiftKeyDown && this._altKeyDown) return this._onUpdateRank(ev, true, true)
            // else if (this._shiftKeyDown) return this._onUpdateRank(ev, true, false)
            // else if (this._altKeyDown) return this._onUpdateRank(ev, false, true)
            // else return this._onUpdateRank(ev, false, false)
            return this._onUpdateRank(ev, false, false)
        });
        // html.find('.rank').mouseenter(ev => {
        //     if (this._shiftKeyDown) return this._onHighlightRank(ev)
        // });
        // html.find('.rank').mouseover(ev => {
        //     if (this._shiftKeyDown) return this._onHighlightRank(ev)
        // });
        // html.find('.rank').mousemove(ev => {
        //     if (this._shiftKeyDown) return this._onHighlightRank(ev)
        // });
        // html.find('.rank').keydown(ev => {
        //     if (ev.which === 16) return this._onHighlightRank(ev)
        // });
        // html.find('.score').mouseleave(ev => {
        //     if (this._shiftKeyDown) return this._onResetHighlightScore(ev)
        // });
        // html.find('.score').mouseout(ev => {
        //     if (this._shiftKeyDown) return this._onResetHighlightScore(ev)
        // });
        // html.find('.curres').click(ev => {
        //     if (this._altKeyDown) return this._onUpdateCurrentResource(ev, true, false)
        //     return this._onUpdateCurrentResource(ev, false, false)
        // });
        // html.find('.curres').contextmenu(ev => {
        //     return this._onUpdateCurrentResource(ev, false, true)
        // });

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

        html.find('.tb-toggle-link').click(ev => {
            ev.preventDefault();
            $("#tb-menu").slideToggle('fast');
        });

        // Rollable abilities.
        html.find('.rollable').click(this._onRoll.bind(this));
    }

    /* -------------------------------------------- */

    _onUpdateRank(event, isTemp=false, isReset=false) {
        event.preventDefault();
        const header = $(event.currentTarget);
        const value = header.data("value");
        const type = header.data("type");
        const parent = (type === "score") ? $(event.currentTarget).parents(".score") : $(event.currentTarget).parents(".resource");
        const ns = parent.data("namespace");
        const group = parent.data("group");
        const key = parent.data("key");
        if(ns === "attributes" || ns === "abilities" ) return this._setRankValue(ns, group, key, value, isTemp, isReset);
        else{
            return this._setResourceValue(ns, group, key, value, isTemp, isReset);
        }
    }

    /* -------------------------------------------- */

    _setRankValue(ns, group, key, value, isTemp=false, isReset=false){
        let data = duplicate(this.actor.data);
        const field = data.data[ns][group].scores.find(s => s.key === key);
        let fromValue = (isTemp) ? field.temp : field.value;
        if(isReset) {
            if(isTemp) {
                field.temp = null;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, "-", isTemp);
            }
            else {
                field.value = field.min;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, field.min, isTemp);
            }
        }else {
            if(isTemp) {
                field.temp = value;
                if(!fromValue) fromValue = "-";
            }
            else field.value = value;
            WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, value, isTemp);
        }
        return this.actor.update(data);
    }


    /* -------------------------------------------- */

    _setResourceValue(ns, group, key, value, isTemp=false, isReset=false){
        let data = duplicate(this.actor.data);
        const field = data.data.resources[key];
        let fromValue = (isTemp) ? field.temp : field.value;
        console.log(field, isTemp);
        if(isReset) {
            if(isTemp) {
                field.temp = null;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, "-", isTemp);
            }
            else {
                field.value = field.min;
                WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, field.min, isTemp);
            }
        }else {
            if(isTemp) {
                field.temp = value;
                if(!fromValue) fromValue = "-";
            }
            else field.value = value;
            WodChat.scoreUpdateNotification(this.actor, key, ns, fromValue, value, isTemp);
        }
        return this.actor.update(data);
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
        const elt = $(event.currentTarget).parents(".score");
        const ns = elt.data("namespace");
        const group = elt.data("group");
        const key = elt.data("key");
        const data = this.getData();
        if (ns == "attributes")     return WodDialog.rollAttributeDialog(data, ns, group, key, 6);
        else if (ns == "abilities") return WodDialog.rollAbilityDialog  (data, ns, group, key, 6);
        else if (ns == "resources") return WodDialog.rollResourceDialog (data, ns, group, key, 6);
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
    _onToggleMetamorphosis(event){
        event.preventDefault();
        const btn = $(event.currentTarget);
        const id = btn.data("itemId");
        let actorData = this.getData().actor.data;
        if(id === "homid") actorData = WodMetamorphosis.homid(actorData);
        else if(id === "glabro") actorData = WodMetamorphosis.glabro(actorData);
        else if(id === "crinos") actorData = WodMetamorphosis.crinos(actorData);
        else if(id === "hispo")  actorData = WodMetamorphosis.hispo(actorData);
        else if(id === "lupus")  actorData = WodMetamorphosis.lupus(actorData);

        WodChat.metamorphosisNotification(this.actor, id);
        return this.actor.update({
            "data.attributes" : actorData.attributes,
            "data.forms" : actorData.forms
        });
    }

    /* -------------------------------------------- */
    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
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
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }

    /* -------------------------------------------- */

    /** @override */
    getData(options){
        const data = super.getData(options);
        console.log(data);
        data.physical = data.data.attributes.physical.scores;
        data.social = data.data.attributes.social.scores;
        data.mental = data.data.attributes.mental.scores;
        const attribs = data.data.attributes.physical.scores.concat(data.data.attributes.social.scores).concat(data.data.attributes.mental.scores);
        data.attributes = {};
        for(const attrib of attribs){
            data.attributes[attrib.key] = attrib;
        }

        data.talents = data.data.abilities.talents.scores;
        data.skills = data.data.abilities.skills.scores;
        data.knowledges = data.data.abilities.knowledges.scores;
        const abilities = data.data.abilities.talents.scores.concat(data.data.abilities.skills.scores).concat(data.data.abilities.knowledges.scores);
        data.abilities = {};
        for(const ability of abilities){
            data.abilities[ability.key] = ability;
        }
        data.resources = data.data.resources;
        data.breed = data.items.find(item => item.type === "breed");
        data.auspice = data.items.find(item => item.type === "auspice");
        data.tribe = data.items.find(item => item.type === "tribe");
        data.gifts = data.items.filter(item => item.type === "gifts");
        data.backgrounds = data.items.filter(item => item.type === "background");
        // console.log(data);
        return data;
    }
}
