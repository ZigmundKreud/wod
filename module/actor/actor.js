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
        console.log(actorData)
        // Make separate methods for each Actor type (character, npc, etc.) to keep things organized.
        if (actorData.type === 'character') this._prepareCharacterData(actorData);
    }

    _loadCharacterTemplate(actorData) {
        const template = game.wod.config.characterTemplates[actorData.data.characterTemplate];
        actorData.data.attributes = template.attributes;
        actorData.data.details = template.details;
        actorData.data.resources = template.resources;
        const groups = ["talents", "skills", "knowledges"];
        for (let group of groups) {
            if (actorData.data.abilities[group].scores.length == 0) {
                actorData.data.abilities[group].scores = game.wod.config.characterTemplates[actorData.data.characterTemplate].abilities[group].map(t => {
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
        actorData.data.initialized = true;
    }

    _prepareCharacterData(actorData) {
        // if (!actorData.data.initialized && actorData.data.characterTemplate) {
        //     this._loadCharacterTemplate(actorData);
        // }
        let attributes = actorData.data.attributes;
        let abilities = actorData.data.abilities;
        let healthStatuses = Object.values(actorData.data.health.status);
        actorData.data.health.value = actorData.data.health.max - healthStatuses.filter(s => s.checked).length;

        let physical = attributes.physical;
        let social = attributes.social;
        let mental = attributes.mental;

        let talents = abilities.talents;
        let skills = abilities.skills;
        let knowledges = abilities.knowledges;

        let physicalTotal = physical.scores.map(a => a.value).reduce((acc, current) => acc + current, -3);
        let socialTotal = social.scores.map(a => a.value).reduce((acc, current) => acc + current, -3);
        let mentalTotal = mental.scores.map(a => a.value).reduce((acc, current) => acc + current, -3);

        let talentsTotal = talents.scores.map(a => a.value).reduce((acc, current) => acc + current, 0);
        let skillsTotal = skills.scores.map(a => a.value).reduce((acc, current) => acc + current, 0);
        let knowledgesTotal = knowledges.scores.map(a => a.value).reduce((acc, current) => acc + current, 0);

        actorData.data.attributes.physical.total = physicalTotal;
        actorData.data.attributes.social.total = socialTotal;
        actorData.data.attributes.mental.total = mentalTotal;

        actorData.data.abilities.talents.total = talentsTotal;
        actorData.data.abilities.skills.total = skillsTotal;
        actorData.data.abilities.knowledges.total = knowledgesTotal;
    }
}