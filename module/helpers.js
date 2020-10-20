export const registerHandlebarsHelpers = async function() {

    Handlebars.registerHelper('filterByType', function (items, type) {
        if(items instanceof Object){
            return Object.values(items).filter(item => item.type === type);
        }else {
            return items.filter(item => item.type === type);
        }
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
        var outStr = '';
        for (var arg in arguments) {
            if (typeof arguments[arg] != 'object') {
                outStr += arguments[arg];
            }
        }
        return outStr;
    });

    Handlebars.registerHelper('score', function(value, min, max) {
        let str="";
        if(min ==0) str += `<a class="rank rank-0" title="0" data-type="rank" data-value="0"><i class="fas fa-times"></i></a>&nbsp;`;
        for(let i=0; i < max; i++){
            if(i < value) str += `<a class="rank" title="${i+1}" data-type="rank" data-value="${i+1}"><i class="fas fa-circle"></i></a>`;
            else str += `<a class="rank" title="${i+1}" data-value="${i+1}"><i class="far fa-circle"></i></a>`;
        }
        return new Handlebars.SafeString(str);
    });

    Handlebars.registerHelper('surroundWithCurlyBraces', function(text) {
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
