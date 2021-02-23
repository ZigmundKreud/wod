/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */

export class WodBaseSheet extends ActorSheet {

    constructor(...args) {
        super(...args);
        this._shiftKeyDown = false;
        this._altKeyDown = false;
    }

    /** @override */
    // static get defaultOptions() {
    //     return mergeObject(super.defaultOptions, {
    //         classes: ["wod", "sheet", "actor"],
    //         template: "systems/wod/templates/actor/actor-sheet.hbs",
    //         width: 850,
    //         height: 600,
    //         tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main"}]
    //     });
    // }

    /* -------------------------------------------- */

    /** @override */
    // activateListeners(html) {
    //     super.activateListeners(html);
    // }

    /** @override */
    // setPosition(options = {}) {
    //     const position = super.setPosition(options);
    //     const sheetBody = this.element.find(".sheet-body");
    //     const bodyHeight = position.height - 192;
    //     sheetBody.css("height", bodyHeight);
    //     return position;
    // }

    /* -------------------------------------------- */

    /** @override */
    // getData(options){
    //     const data = super.getData(options);
    //     console.log(data);
    //     return data;
    // }
}
