export class WodResource {

    constructor(value, temp, max=10) {
        this._value = value;
        this._temp = temp;
        this._max = max;
        this.ranks = [];
        for(let i=1; i<=this._max; i++){
            if(i <= value) this.ranks.push({active: true, temp: false, value: i});
            else this.ranks.push({active: false, temp: false, value: i});
        }
        this.temp = [];
        for(let i=1; i<=this._max; i++){
            if(i <= temp) this.temp.push({active: true, temp: false, value: i});
            else this.temp.push({active: false, temp: false, value: i});
        }
    }
}
