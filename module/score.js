export class WodScore {

    constructor(value, temp, min=0, max=5, namespace) {
        this._value = value;
        this._temp = temp;
        this._min = min;
        this._max = (
            (max > 5 && namespace === "attributes" && game.settings.get("wod", "attributesMax5")) ||
            (max > 5 && namespace === "abilities"   && game.settings.get("wod", "abilitiesMax5" ))
        ) ? 5 : max;
        this._namespace = namespace;
        this._showResetBtn = (namespace === "abilities");
    }

    toString(){
        let str="";
        const tempClass = (this._temp) ? "temp" : "";
        if(this._showResetBtn) str += `<a class="rank rank-0 ${tempClass}" title="0" data-type="score" data-value="0"><i class="fas fa-times"></i></a>&nbsp;`;
        for(let i=0; i < this._max; i++){
            if(this._temp && i < this._temp) str += `<a class="rank ${tempClass}" title="${i+1}" data-type="score" data-value="${i+1}"><i class="fas fa-circle"></i></a>`;
            else if(i < this._value) str += `<a class="rank" title="${i+1}" data-type="score" data-value="${i+1}"><i class="fas fa-circle"></i></a>`;
            else str += `<a class="rank" title="${i+1}" data-type="score" data-value="${i+1}"><i class="far fa-circle"></i></a>`;
        }
        return str;
    }
}