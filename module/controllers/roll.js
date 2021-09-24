const SUCCESS_DEGREE = {
    BOTCH: -1,
    FAILURE: 0,
    MARGINAL: 1,
    MODERATE: 2,
    COMPLETE: 3,
    EXCEPTIONAL: 4,
    PHENOMENAL: 5
};

export class WodRoll {

    constructor(pool, bonus, difficulty = 6, explodes = 10) {
        this._pool = (pool > 10 && game.settings.get("wod", "10dicesMax")) ? 10 : pool;
        this._bonus = bonus;
        this._difficulty = difficulty;
        this._explodes = explodes;
        this._isSuccess = false;
        this._isBotch = false;
        this._ones = 0;
        this._successes = 0;
        this._roll = game.settings.get("wod", "10reroll") ? new Roll("(@pool)d10x>=(@expl)cs>=(@diff)", {pool: pool, expl: explodes, diff: difficulty}) : new Roll("(@pool)d10cs>=(@diff)", {pool: pool, diff: difficulty});
    }

    roll() {
        this._roll.roll({async:false});
        this._successes = this._roll.terms[0].results.filter(r => r.success === true).length;
        this._ones = this._roll.terms[0].results.filter(r => r.result === 1).length;
        // this._roll.results[0] = this._roll.results[0] - this._ones;
        this.total = this.total - this._ones;
        this._isSuccess = this.total > 0;
        this._isBotch = this._successes == 0 && this._ones > 0;
    }

    get dice() {
        return this._roll.dice;
    }

    get formula() {
        return this._roll.formula;
    }

    set formula(value) {
        return this._roll._formula = value;
    }

    get result() {
        return this._roll.result;
    }

    get total() {
        return this._roll.total;
    }

    set total(value) {
        return this._roll._total = value;
    }
    get successDegree(){
        if(this._isBotch) return SUCCESS_DEGREE.BOTCH;
        else if(this.total >= 5) return SUCCESS_DEGREE.PHENOMENAL;
        else if(this.total == 4) return SUCCESS_DEGREE.EXCEPTIONAL;
        else if(this.total == 3) return SUCCESS_DEGREE.COMPLETE;
        else if(this.total == 2) return SUCCESS_DEGREE.MODERATE;
        else if(this.total == 1) return SUCCESS_DEGREE.MARGINAL;
        else if(this.total <= 0) return SUCCESS_DEGREE.FAILURE;
    }

    _buildMessageFlavor(label) {
        let msgFlavor = `<h2>${label}</h2>`;
        switch(this.successDegree){
            case SUCCESS_DEGREE.BOTCH       : msgFlavor += `<h3 class="roll-result fail botch"><i class="fas fa-skull-crossbones"></i>&nbsp;${game.i18n.localize("WOD.degree.botch")} !!</h3>`; break;
            case SUCCESS_DEGREE.FAILURE     : msgFlavor += `<h3 class="roll-result fail failure"><i class="fas fa-times"></i>&nbsp;${game.i18n.localize("WOD.degree.failure")}...</h3>`; break;
            case SUCCESS_DEGREE.PHENOMENAL  : msgFlavor += `<h3 class="roll-result success phenomenal"><i class="fas fa-check-double"></i>&nbsp;${game.i18n.localize("WOD.degree.phenomenal")} !!</h3>`; break;
            case SUCCESS_DEGREE.EXCEPTIONAL : msgFlavor += `<h3 class="roll-result success exceptional"><i class="fas fa-check-double"></i>&nbsp;${game.i18n.localize("WOD.degree.exceptional")} !!</h3>`; break;
            case SUCCESS_DEGREE.COMPLETE    : msgFlavor += `<h3 class="roll-result success complete"><i class="fas fa-check"></i>&nbsp;${game.i18n.localize("WOD.degree.complete")} !</h3>`; break;
            case SUCCESS_DEGREE.MODERATE    : msgFlavor += `<h3 class="roll-result success moderate"><i class="fas fa-check"></i>&nbsp;${game.i18n.localize("WOD.degree.moderate")} !</h3>`; break;
            case SUCCESS_DEGREE.MARGINAL    : msgFlavor += `<h3 class="roll-result success marginal"><i class="fas fa-check"></i>&nbsp;${game.i18n.localize("WOD.degree.marginal")} !</h3>`; break;
        }
        return msgFlavor;
    }

    async toMessage(label, actor, options = {}) {
        const rollResultCardTpl = 'systems/wod/templates/chat/roll-result-card.hbs';
        const rollData = {
            roll : this._roll,
            dices : this._roll.terms[0].results,
            pool : this._pool - this._bonus,
            difficulty : this._difficulty,
            bonus : this._bonus,
            successes : this._successes,
            ones : this._ones,
            isBotch : this._isBotch
        }
        const rollResultCardContent = await renderTemplate(rollResultCardTpl, rollData);
        const messageData = {
            user: game.user.id,
            flavor: this._buildMessageFlavor(label),
            content : rollResultCardContent,
            speaker: ChatMessage.getSpeaker({actor: actor})
        }
        this._roll.toMessage(messageData, options);
    }
}