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
        // const data = actorData.data;
        // const flags = actorData.flags;

        // Make separate methods for each Actor type (character, npc, etc.) to keep things organized.
        if (actorData.type === 'werewolf') this._prepareWerewolfData(actorData);
        else if (actorData.type === 'vampire') this._prepareVampireData(actorData);
        else if (actorData.type === 'mage') this._prepareMageData(actorData);
        else if (actorData.type === 'human') this._prepareHumanData(actorData);
    }

    _prepareCharacterData(actorData) {
        // const data = actorData.data;
        console.log(actorData);
        let attributes = Object.values(actorData.data.attributes);
        let abilities = Object.values(actorData.data.abilities);

        let physical = attributes.filter(a => a.type === "physical")
        let social = attributes.filter(a => a.type === "social")
        let mental = attributes.filter(a => a.type === "mental")

        let talents = abilities.filter(a => a.type === "talent")
        let skills = abilities.filter(a => a.type === "skill")
        let knowledges = abilities.filter(a => a.type === "knowledge")

        let physicalTotal = physical.map(a => a.value).reduce((acc,current) => acc + current, -3)
        let socialTotal = social.map(a => a.value).reduce((acc,current) => acc + current, -3)
        let mentalTotal = mental.map(a => a.value).reduce((acc,current) => acc + current, -3)

        let talentsTotal = talents.map(a => a.value).reduce((acc,current) => acc + current, 0)
        let skillsTotal = skills.map(a => a.value).reduce((acc,current) => acc + current, 0)
        let knowledgesTotal = knowledges.map(a => a.value).reduce((acc,current) => acc + current, 0)

        actorData.data.attributes.physical.total = physicalTotal;
        actorData.data.attributes.social.total = socialTotal;
        actorData.data.attributes.mental.total = mentalTotal;

        actorData.data.abilities.talents.total = talentsTotal;
        actorData.data.abilities.skills.total = skillsTotal;
        actorData.data.abilities.knowledges.total = knowledgesTotal;

        console.log(physicalTotal, socialTotal, mentalTotal);
        console.log(talentsTotal, skillsTotal, knowledgesTotal);
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

    _prepareHumanData(actorData) {
        this._prepareCharacterData(actorData)
    }

}