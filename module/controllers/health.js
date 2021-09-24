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

    static getMalus(actor){
        // Find any malus from injuries that applies to roll if exists
        let injuries = Object.values(actor.data.data.health.status).filter(s => s.checked && s.malus > 0);
        if(injuries.length > 0) {
            injuries.sort(function (a, b) {
                return (a.malus < b.malus) ? 1 : -1
            });
        }
        const malus = (injuries[0]) ? -(injuries.shift().malus) : 0;
        return malus;
    }
}