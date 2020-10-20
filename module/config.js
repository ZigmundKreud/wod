const LogLevel = {};
LogLevel.DEBUG = 3;
LogLevel.INFO = 2;
LogLevel.WARN = 1;
LogLevel.ERROR = 0;

const System = {};

System.label = "World of Darkness";
System.abbrev = "WOD";
System.name = "wod";
System.rootPath = "/systems/" + System.name;
System.dataPath = System.rootPath + "/data";
System.templatesPath = System.rootPath + "/templates";
System.logPrefix = System.abbrev;
System.logLevel = LogLevel.DEBUG;
System.debugMode = true;

const StringUtils = {};

StringUtils.normalize = function(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};
