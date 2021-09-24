/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class WodItemSheet extends ItemSheet {


    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["wod", "sheet", "item"],
            template : "systems/wod/templates/item/item-sheet.hbs",
            width: 520,
            height: 480,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    // /** @override */
    // get template() {
    //     const path = "systems/wod/templates/item";
    //     // Return a single sheet for all item types.
    //     return `${path}/item-sheet.hbs`;
    //     // Alternatively, you could use the following return statement to do a
    //     // unique item sheet by type, like `weapon-sheet.html`.
    //
    //     // return `${path}/${this.item.data.type}-sheet.html`;
    // }
    //
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
    activateListeners(html) {
        super.activateListeners(html);
        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;
        // Roll handlers, click handlers, etc. would go here.
    }

    /* -------------------------------------------- */

    /**
     * Get the Array of item properties which are used in the small sidebar of the description tab
     * @return {Array}
     * @private
     */
    _getItemProperties(item) {
        const props = [];
        if ( item.type === "item" ) {
            const entries = Object.entries(item.data.data.properties)
            props.push(...entries.filter(e => e[1] === true).map(e => {
                return game.wod.config.itemProperties[e[0]]
            }));
        }
        return props.filter(p => !!p);
    }

    /* -------------------------------------------- */

    /** @override */
    getData(options) {
        const data = super.getData(options);
        data.actor = (this.item.actor) ? this.item.actor.data : null;
        data.labels = this.item.labels;
        data.config = game.wod.config;
        data.itemType = data.item.type.titleCase();
        data.itemProperties = this._getItemProperties(data.item);
        console.log(data);
        return data;
    }


}
