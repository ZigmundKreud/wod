export class WodResource {

    constructor(value, max=5) {
        this._value = value;
        this._max = max;
    }

    getScore(){
        let str="";
        for(let i=0; i < this._max; i++){
            if(i < this._value) str += `<a class="rank" title="${i+1}" data-type="resource" data-value="${i+1}"><i class="fas fa-circle"></i></a>`;
            else str += `<a class="rank" title="${i+1}" data-type="resource" data-value="${i+1}"><i class="far fa-circle"></i></a>`;
        }
        return str;
    }

    getCurrent(){
        let str="";
        for(let i=0; i < this._max; i++){
            if(i < this._value) str += `<a class="curres" title="${i+1}" data-type="resource" data-value="${i+1}"><i class="far fa-check-square"></i></a>`;
            else str += `<a class="curres" title="${i+1}" data-type="score" data-value="${i+1}"><i class="far fa-square"></i></a>`;
        }
        return str;
    }
}
