export const System = {};

System.label = "World of Darkness";
System.abbrev = "WOD";
System.name = "wod";
System.rootPath = "/systems/" + System.name;
System.dataPath = System.rootPath + "/data/werewolf/fr";
System.templatesPath = System.rootPath + "/templates";
System.logPrefix = System.abbrev;
System.debugMode = true;

export const StringUtils = {};

StringUtils.normalize = function(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};
