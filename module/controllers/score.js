export class WodScore {

    constructor(key, value, temp, min=0, max=5, namespace) {
        this._value = value;
        this._temp = temp;
        this._min = min;
        this._max = (
            (max > 5 && namespace === "attributes" && game.settings.get("wod", "attributesMax5")) ||
            (max > 5 && namespace === "abilities"   && game.settings.get("wod", "abilitiesMax5" ))
        ) ? 5 : max;
        this._namespace = namespace;
        this.ranks = [];
        for(let i=this._min+1; i<=this._max; i++){
            if(this._temp != null){
                if(i <= this._temp) this.ranks.push({active: true, temp: true, value: i});
                else this.ranks.push({active: false, temp: true, value: i});
            }
            else {
                if(i <= value) this.ranks.push({active: true, temp: false, value: i});
                else this.ranks.push({active: false, temp: false, value: i});
            }
        }
    }

    // render(){
    //     const rollMessageTpl = 'systems/wod/templates/actor/parts/score/score-value.hbs';
    //     const tplData = {
    //         label : this._value,
    //         temp : this._temp,
    //         min : this._min,
    //         max : this._max,
    //         namespace : this._namespace,
    //         showResetBtn : this._showResetBtn,
    //         ranks : [
    //             {active : true, temp:true, value:1},
    //             {active : true, temp:true, value:2},
    //             {active : true, temp:true, value:3},
    //             {active : false, temp:true, value:4},
    //             {active : false, temp:true, value:5},
    //             {active : false, temp:true, value:6},
    //             {active : false, temp:false, value:7},
    //             {active : false, temp:false, value:8},
    //             {active : false, temp:false, value:9}
    //         ]
    //     };
    //     return renderTemplate(rollMessageTpl, tplData).then(str => {
    //         console.log(str);
    //         return str;
    //     });
    // }

    // ranks() {
    //     let ranks = [];
    //     for(let i=this._min; i<=this._max; i++){
    //         if(this._temp){
    //             if(i <= value) ranks.push({active: true, temp: true, value: i});
    //             else ranks.push({active: false, temp: true, value: i});
    //         }
    //         else {
    //             if(i <= value) ranks.push({active: true, temp: false, value: i});
    //             else ranks.push({active: false, temp: false, value: i});
    //         }
    //     }
    //     return ranks;
    // }

    // toString(){
        // let str="";
        // const tempClass = (this._temp === null) ? "" : "temp";
        // if(this._showResetBtn) str += `<a class="rank rank-0 ${tempClass}" title="0" data-type="score" data-value="0"><i class="fas fa-times"></i></a>&nbsp;`;
        // for(let i=0; i < this._max; i++){
        //     if(this._temp === null){
        //         if(i < this._value) str += `<a class="rank" title="${i+1}" data-type="score" data-value="${i+1}"><i class="fas fa-circle"></i></a>`;
        //         else str += `<a class="rank" title="${i+1}" data-type="score" data-value="${i+1}"><i class="far fa-circle"></i></a>`;
        //     }
        //     else{
        //         if(i < this._temp) {
        //             str += `<a class="rank ${tempClass}" title="${i+1}" data-type="score" data-value="${i+1}"><i class="fas fa-circle"></i></a>`;
        //         }
        //         else {
        //             str += `<a class="rank ${tempClass}" title="${i+1}" data-type="score" data-value="${i+1}"><i class="far fa-circle"></i></a>`;
        //         }
        //     }
        // }
        // return str;
    // }
}