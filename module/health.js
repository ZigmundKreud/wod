export const WOUND_TYPE = {
    EMPTY: 0,
    BASHING: 1,
    LETHAL: 2,
    AGGRAVATED: 3
};

export class WodHealth {

    static updateRanks(ranks){
        ranks.forEach(r => this.updateRank(r))
    }

    static updateRank(rank){
        switch(rank.value){
            case WOUND_TYPE.EMPTY :
                rank.checked = false;
                rank.bashing = false;
                rank.lethal = false;
                rank.aggravated = false;
                break;
            case WOUND_TYPE.BASHING :
                rank.checked = true;
                rank.bashing = true;
                rank.lethal = false;
                rank.aggravated = false;
                break;
            case WOUND_TYPE.LETHAL :
                rank.checked = true;
                rank.bashing = false;
                rank.lethal = true;
                rank.aggravated = false;
                break;
            case WOUND_TYPE.AGGRAVATED :
                rank.checked = true;
                rank.bashing = false;
                rank.lethal = false;
                rank.aggravated = true;
                break;
        }
    }
}