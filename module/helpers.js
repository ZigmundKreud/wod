import {WodScore} from "./controllers/score.js";
import {WodResource} from "./controllers/resource.js";

export const registerHandlebarsHelpers = async function () {

    // Handlebars.registerHelper('getAllAttributes', function (actor) {
    //     const attributes = Object.values(actor.data.attributes);
    //     attributes.sort(function (a, b) {
    //         return (game.i18n.localize(a.label) > game.i18n.localize(b.label)) ? 1 : -1
    //     });
    //     return attributes;
    // });
    //
    // Handlebars.registerHelper('getAllAbilities', function (actor) {
    //     const abilities = Object.values(actor.data.abilities).filter(a => a.type === "talent" || a.type === "skill" || a.type === "knowledge");
    //     abilities.sort(function (a, b) {
    //         return (game.i18n.localize(a.label) > game.i18n.localize(b.label)) ? 1 : -1
    //     });
    //     return abilities;
    // });
    //
    // Handlebars.registerHelper('getAllResources', function (actor) {
    //     const resources = Object.values(actor.data.resources).filter(a => a.type === "resource");
    //     resources.sort(function (a, b) {
    //         return (game.i18n.localize(a.label) > game.i18n.localize(b.label)) ? 1 : -1
    //     });
    //     return resources;
    // });
    //
    // Handlebars.registerHelper('getAbilities', function (items, type) {
    //     let abilities = (items instanceof Object) ? Object.values(items).filter(item => item.type === type) : items.filter(item => item.type === type);
    //     abilities.sort(function (a, b) {
    //         return (game.i18n.localize(a.label) > game.i18n.localize(b.label)) ? 1 : -1
    //     });
    //     return abilities;
    // });

    Handlebars.registerHelper('filterByType', function (items, type) {
        return (items instanceof Object) ? Object.values(items).filter(item => item.type === type) : items.filter(item => item.type === type);
    });

    Handlebars.registerHelper('isOfType', function (item, type) {
        return item.type === type;
    });

    Handlebars.registerHelper('isNull', function (val) {
        return val == null;
    });

    Handlebars.registerHelper('isEmpty', function (list) {
        return list.length == 0;
    });

    Handlebars.registerHelper('isZeroOrNull', function (val) {
        return val == null || val == 0;
    });

    Handlebars.registerHelper('isNegative', function (val) {
        return val < 0;
    });

    Handlebars.registerHelper('isNegativeOrNull', function (val) {
        return val <= 0;
    });

    Handlebars.registerHelper('isPositive', function (val) {
        return val > 0;
    });

    Handlebars.registerHelper('isPositiveOrNull', function (val) {
        return val >= 0;
    });

    Handlebars.registerHelper('equals', function (val1, val2) {
        return val1 == val2;
    });

    Handlebars.registerHelper('and', function (val1, val2) {
        return val1 && val2;
    });

    Handlebars.registerHelper('or', function (val1, val2) {
        return val1 || val2;
    });

    Handlebars.registerHelper('isEnabled', function (configKey) {
        return game.settings.get("wod", configKey);
    });

    Handlebars.registerHelper('split', function (str) {
        return str.split(' ')[0];
    });

    // If you need to add Handlebars helpers, here are a few useful examples:
    Handlebars.registerHelper('concat', function () {
        let outStr = '';
        for (let arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });

    Handlebars.registerHelper('ranks', function (value, temp, min, max) {
        console.log(value, temp, min, max);
        let ranks = [];
        for(let i=min; i<=max; i++){
            if(temp){
                if(i <= value) ranks.push({active: true, temp: true, value: i});
                else ranks.push({active: false, temp: true, value: i});
            }
            else {
                if(i <= value) ranks.push({active: true, temp: false, value: i});
                else ranks.push({active: false, temp: false, value: i});
            }
        }
        return ranks;
    });

    Handlebars.registerHelper('score', function (key, value, temp, min, max, namespace) {
        return new WodScore(key, value, temp, min, max, namespace);
    });

    Handlebars.registerHelper('resource', function (value, temp, max) {
        return new WodResource(value, temp, max);
    });

    Handlebars.registerHelper('surroundWithCurlyBraces', function (text) {
        const result = '{' + text + '}';
        return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });

    Handlebars.registerHelper('i18n', function (str) {
        return game.i18n.localize(str);
    });
}
