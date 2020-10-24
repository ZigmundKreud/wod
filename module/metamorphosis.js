export class WodMetamorphosis {

    static homid(actorData){
        actorData.attributes.str.temp = null;
        actorData.attributes.dex.temp = null;
        actorData.attributes.stam.temp = null;
        actorData.attributes.man.temp = null;
        actorData.attributes.app.temp = null;
        actorData.forms.homid.active = true;
        actorData.forms.glabro.active = false;
        actorData.forms.crinos.active = false;
        actorData.forms.hispo.active = false;
        actorData.forms.lupus.active = false;
        return actorData
    }
    static glabro(actorData){
        actorData.attributes.str.temp = actorData.attributes.str.value + 2;
        actorData.attributes.dex.temp = null;
        actorData.attributes.stam.temp = actorData.attributes.stam.value + 2;
        actorData.attributes.man.temp = actorData.attributes.man.value - 2;
        actorData.attributes.app.temp = actorData.attributes.app.value -1;
        actorData.forms.homid.active = false;
        actorData.forms.glabro.active = true;
        actorData.forms.crinos.active = false;
        actorData.forms.hispo.active = false;
        actorData.forms.lupus.active = false;
        return actorData
    }
    static crinos(actorData){
        actorData.attributes.str.temp = actorData.attributes.str.value + 4;
        actorData.attributes.dex.temp = actorData.attributes.dex.value + 1;
        actorData.attributes.stam.temp = actorData.attributes.stam.value + 3;
        actorData.attributes.man.temp = actorData.attributes.man.value - 3;
        actorData.attributes.app.temp = 0;
        actorData.forms.homid.active = false;
        actorData.forms.glabro.active = false;
        actorData.forms.crinos.active = true;
        actorData.forms.hispo.active = false;
        actorData.forms.lupus.active = false;
        return actorData
    }
    static hispo(actorData){
        actorData.attributes.str.temp = actorData.attributes.str.value + 3;
        actorData.attributes.dex.temp = actorData.attributes.dex.value + 2;
        actorData.attributes.stam.temp = actorData.attributes.stam.value + 3;
        actorData.attributes.man.temp = actorData.attributes.man.value - 3;
        actorData.attributes.app.temp = null;
        actorData.forms.homid.active = false;
        actorData.forms.glabro.active = false;
        actorData.forms.crinos.active = false;
        actorData.forms.hispo.active = true;
        actorData.forms.lupus.active = false;
        return actorData
    }
    static lupus(actorData){
        actorData.attributes.str.temp = actorData.attributes.str.value + 1;
        actorData.attributes.dex.temp = actorData.attributes.dex.value + 2;
        actorData.attributes.stam.temp = actorData.attributes.stam.value + 2;
        actorData.attributes.man.temp = actorData.attributes.man.value - 3;
        actorData.attributes.app.temp = null;
        actorData.forms.homid.active = false;
        actorData.forms.glabro.active = false;
        actorData.forms.crinos.active = false;
        actorData.forms.hispo.active = false;
        actorData.forms.lupus.active = true;
        return actorData
    }
}
