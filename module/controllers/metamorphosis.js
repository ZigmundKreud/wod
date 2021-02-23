export class WodMetamorphosis {

    static stats(actorData){
        return {
            str : actorData.attributes.physical.scores.find(s => s.key === "str"),
            dex : actorData.attributes.physical.scores.find(s => s.key === "dex"),
            stam : actorData.attributes.physical.scores.find(s => s.key === "stam"),
            cha : actorData.attributes.social.scores.find(s => s.key === "cha"),
            man : actorData.attributes.social.scores.find(s => s.key === "man"),
            app : actorData.attributes.social.scores.find(s => s.key === "app"),
            per : actorData.attributes.mental.scores.find(s => s.key === "per"),
            int : actorData.attributes.mental.scores.find(s => s.key === "int"),
            wits : actorData.attributes.mental.scores.find(s => s.key === "wits")
        }
    }

    static homid(actorData){
        let stats = this.stats(actorData);
        for(let stat of Object.values(stats)) { stat.temp = null; }

        actorData.forms.homid.active = true;
        actorData.forms.glabro.active = false;
        actorData.forms.crinos.active = false;
        actorData.forms.hispo.active = false;
        actorData.forms.lupus.active = false;
        return actorData
    }
    static glabro(actorData){
        let stats = this.stats(actorData);
        for(let stat of Object.values(stats)) { stat.temp = null; }

        stats.str.temp = stats.str.value + 2;
        stats.stam.temp = stats.stam.value + 2;
        stats.man.temp = stats.man.value - 2;
        stats.app.temp = stats.app.value -1;

        actorData.forms.homid.active = false;
        actorData.forms.glabro.active = true;
        actorData.forms.crinos.active = false;
        actorData.forms.hispo.active = false;
        actorData.forms.lupus.active = false;
        return actorData
    }
    static crinos(actorData){
        let stats = this.stats(actorData);
        for(let stat of Object.values(stats)) { stat.temp = null; }

        stats.str.temp = stats.str.value + 4;
        stats.dex.temp = stats.dex.value + 1;
        stats.stam.temp = stats.stam.value + 3;
        stats.man.temp = stats.man.value - 3;
        stats.app.temp = 0;

        actorData.forms.homid.active = false;
        actorData.forms.glabro.active = false;
        actorData.forms.crinos.active = true;
        actorData.forms.hispo.active = false;
        actorData.forms.lupus.active = false;
        return actorData
    }
    static hispo(actorData){
        let stats = this.stats(actorData);
        for(let stat of Object.values(stats)) { stat.temp = null; }

        stats.str.temp = stats.str.value + 3;
        stats.dex.temp = stats.dex.value + 2;
        stats.stam.temp = stats.stam.value + 3;
        stats.man.temp = stats.man.value - 3;

        actorData.forms.homid.active = false;
        actorData.forms.glabro.active = false;
        actorData.forms.crinos.active = false;
        actorData.forms.hispo.active = true;
        actorData.forms.lupus.active = false;
        return actorData
    }
    static lupus(actorData){
        let stats = this.stats(actorData);
        for(let stat of Object.values(stats)) { stat.temp = null; }

        stats.str.temp = stats.str.value + 1;
        stats.dex.temp = stats.dex.value + 2;
        stats.stam.temp = stats.stam.value + 2;
        stats.man.temp = stats.man.value - 3;

        actorData.forms.homid.active = false;
        actorData.forms.glabro.active = false;
        actorData.forms.crinos.active = false;
        actorData.forms.hispo.active = false;
        actorData.forms.lupus.active = true;
        return actorData
    }
}
