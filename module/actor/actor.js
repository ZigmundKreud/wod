/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class WodActor extends Actor {

    /**
     * Augment the basic actor data with additional dynamic data.
     */
    prepareData() {
        super.prepareData();
        const actorData = this.data;
        // Make separate methods for each Actor type (character, npc, etc.) to keep things organized.
        if (actorData.type === 'werewolf') this._prepareWerewolfData(actorData);
        else if (actorData.type === 'vampire') this._prepareVampireData(actorData);
        else if (actorData.type === 'vampire_da') this._prepareVampireData(actorData);
        else if (actorData.type === 'mage') this._prepareMageData(actorData);
        else if (actorData.type === 'ghoul') this._prepareGhoulData(actorData);
        else if (actorData.type === 'human') this._prepareHumanData(actorData);
        else if (actorData.type === 'hunter') this._prepareHunterData(actorData);
        else if (actorData.type === 'spirit') this._prepareSpiritData(actorData);
    }

    _prepareCharacterData(actorData) {
        const groups = ["talents", "skills", "knowledges"];
        for (let group of groups) {
            if (actorData.data.abilities[group].scores.length == 0) {
                actorData.data.abilities[group].scores = game.wod.config.features[actorData.type].abilities[group].map(t => {
                    t.value = 0;
                    t.min = 0;
                    t.max = 9;
                    t.temp = null;
                    t.active = false;
                    t.specialization = "";
                    return t
                }).sort(function (a, b) {
                    return (game.i18n.localize(a.label) > game.i18n.localize(b.label)) ? 1 : -1
                });
            }
        }
        let attributes = actorData.data.attributes;
        let abilities = actorData.data.abilities;
        let healthStatuses = Object.values(actorData.data.health.status);
        actorData.data.health.value = actorData.data.health.max - healthStatuses.filter(s => s.checked).length;

        let physical = attributes.physical
        let social = attributes.social
        let mental = attributes.mental

        let talents = abilities.talents
        let skills = abilities.skills
        let knowledges = abilities.knowledges

        let physicalTotal = physical.scores.map(a => a.value).reduce((acc, current) => acc + current, -3)
        let socialTotal = social.scores.map(a => a.value).reduce((acc, current) => acc + current, -3)
        let mentalTotal = mental.scores.map(a => a.value).reduce((acc, current) => acc + current, -3)

        let talentsTotal = talents.scores.map(a => a.value).reduce((acc, current) => acc + current, 0)
        let skillsTotal = skills.scores.map(a => a.value).reduce((acc, current) => acc + current, 0)
        let knowledgesTotal = knowledges.scores.map(a => a.value).reduce((acc, current) => acc + current, 0)

        actorData.data.attributes.physical.total = physicalTotal;
        actorData.data.attributes.social.total = socialTotal;
        actorData.data.attributes.mental.total = mentalTotal;

        actorData.data.abilities.talents.total = talentsTotal;
        actorData.data.abilities.skills.total = skillsTotal;
        actorData.data.abilities.knowledges.total = knowledgesTotal;
    }

    _prepareWerewolfData(actorData) {
        this._prepareCharacterData(actorData)
    }

    _prepareVampireData(actorData) {
        this._prepareCharacterData(actorData)
    }

    _prepareMageData(actorData) {
        this._prepareCharacterData(actorData)
    }

    _prepareGhoulData(actorData) {
        this._prepareCharacterData(actorData)
    }

    _prepareHumanData(actorData) {
        this._prepareCharacterData(actorData)
    }

    _prepareHunterData(actorData) {
        this._prepareCharacterData(actorData)
    }

    _prepareSpiritData(actorData) {
        // const data = actorData.data;
        // console.log(actorData);
        // let attributes = Object.values(actorData.data.attributes);
        // let abilities = Object.values(actorData.data.abilities);
        // let healthStatuses = Object.values(actorData.data.health.status);
        // actorData.data.health.value = actorData.data.health.max - healthStatuses.filter(s => s.checked).length;
        //
        // let physical = attributes.filter(a => a.type === "physical")
        // let social = attributes.filter(a => a.type === "social")
        // let mental = attributes.filter(a => a.type === "mental")
        //
        // let talents = abilities.filter(a => a.type === "talent")
        // let skills = abilities.filter(a => a.type === "skill")
        // let knowledges = abilities.filter(a => a.type === "knowledge")
        //
        // let physicalTotal = physical.map(a => a.value).reduce((acc,current) => acc + current, -3)
        // let socialTotal = social.map(a => a.value).reduce((acc,current) => acc + current, -3)
        // let mentalTotal = mental.map(a => a.value).reduce((acc,current) => acc + current, -3)
        //
        // let talentsTotal = talents.map(a => a.value).reduce((acc,current) => acc + current, 0)
        // let skillsTotal = skills.map(a => a.value).reduce((acc,current) => acc + current, 0)
        // let knowledgesTotal = knowledges.map(a => a.value).reduce((acc,current) => acc + current, 0)
        //
        // actorData.data.attributes.physical.total = physicalTotal;
        // actorData.data.attributes.social.total = socialTotal;
        // actorData.data.attributes.mental.total = mentalTotal;
        //
        // actorData.data.abilities.talents.total = talentsTotal;
        // actorData.data.abilities.skills.total = skillsTotal;
        // actorData.data.abilities.knowledges.total = knowledgesTotal;
    }
}