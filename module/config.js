export const System = {};

System.label = "World of Darkness";
System.abbrev = "WOD";
System.name = "wod";
System.rootPath = "/systems/" + System.name;
System.dataPath = System.rootPath + "/data/json/fr";
System.templatesPath = System.rootPath + "/templates";
System.logPrefix = System.abbrev;
System.debugMode = true;

export const StringUtils = {};

StringUtils.normalize = function (str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export var WOD = {};
WOD.characterTemplates = {
    "default": {
        "label" : "WOD.characterTemplate.default",
        "attributes": {
            "physical": {
                "key": "physical",
                "label": "WOD.attributes.physical",
                "total": 0,
                "scores": [
                    {
                        "type": "physical",
                        "key": "str",
                        "label": "WOD.attributes.str",
                        "value": 1,
                        "min": 0,
                        "max": 9,
                        "temp": null,
                        "active": false,
                        "specialization": ""
                    },
                    {
                        "type": "physical",
                        "key": "dex",
                        "label": "WOD.attributes.dex",
                        "value": 1,
                        "min": 0,
                        "max": 9,
                        "temp": null,
                        "active": false,
                        "specialization": ""
                    },
                    {
                        "type": "physical",
                        "key": "stam",
                        "label": "WOD.attributes.stam",
                        "value": 1,
                        "min": 0,
                        "max": 9,
                        "temp": null,
                        "active": false,
                        "specialization": ""
                    }
                ]
            },
            "social": {
                "key": "social",
                "label": "WOD.attributes.social",
                "total": 0,
                "scores": [
                    {
                        "type": "social",
                        "key": "cha",
                        "label": "WOD.attributes.cha",
                        "value": 1,
                        "min": 0,
                        "max": 9,
                        "temp": null,
                        "active": false,
                        "specialization": ""
                    },
                    {
                        "type": "social",
                        "key": "man",
                        "label": "WOD.attributes.man",
                        "value": 1,
                        "min": 0,
                        "max": 9,
                        "temp": null,
                        "active": false,
                        "specialization": ""
                    },
                    {
                        "type": "social",
                        "key": "app",
                        "label": "WOD.attributes.app",
                        "value": 1,
                        "min": 0,
                        "max": 9,
                        "temp": null,
                        "active": false,
                        "specialization": ""
                    }
                ]
            },
            "mental": {
                "key": "mental",
                "label": "WOD.attributes.mental",
                "total": 0,
                "scores": [
                    {
                        "type": "mental",
                        "key": "per",
                        "label": "WOD.attributes.per",
                        "value": 1,
                        "min": 0,
                        "max": 9,
                        "temp": null,
                        "active": false,
                        "specialization": ""
                    },
                    {
                        "type": "mental",
                        "key": "int",
                        "label": "WOD.attributes.int",
                        "value": 1,
                        "min": 0,
                        "max": 9,
                        "temp": null,
                        "active": false,
                        "specialization": ""
                    },
                    {
                        "type": "mental",
                        "key": "wits",
                        "label": "WOD.attributes.wits",
                        "value": 1,
                        "min": 0,
                        "max": 9,
                        "temp": null,
                        "active": false,
                        "specialization": ""
                    }
                ]
            }
        },
        "abilities": {
            "talents": [
                {
                    "key": "alertness",
                    "label": "WOD.abilities.alertness"
                },
                {
                    "key": "art",
                    "label": "WOD.abilities.art",
                },
                {
                    "key": "athletics",
                    "label": "WOD.abilities.athletics",
                },
                {
                    "key": "awareness",
                    "label": "WOD.abilities.awareness",
                },
                {
                    "key": "brawl",
                    "label": "WOD.abilities.brawl",
                },
                {
                    "key": "empathy",
                    "label": "WOD.abilities.empathy",
                },
                {
                    "key": "expression",
                    "label": "WOD.abilities.expression",
                },
                {
                    "key": "intimidation",
                    "label": "WOD.abilities.intimidation",
                },
                {
                    "key": "leadership",
                    "label": "WOD.abilities.leadership",
                },
                {
                    "key": "streetwise",
                    "label": "WOD.abilities.streetwise",
                },
                {
                    "key": "subterfuge",
                    "label": "WOD.abilities.subterfuge",
                }
            ],
            "skills": [
                {
                    "key": "animalken",
                    "label": "WOD.abilities.animalken",
                },
                {
                    "key": "crafts",
                    "label": "WOD.abilities.crafts",
                },
                {
                    "key": "drive",
                    "label": "WOD.abilities.drive",
                },
                {
                    "key": "etiquette",
                    "label": "WOD.abilities.etiquette",
                },
                {
                    "key": "firearms",
                    "label": "WOD.abilities.firearms",
                },
                {
                    "key": "larceny",
                    "label": "WOD.abilities.larceny",
                },
                {
                    "key": "melee",
                    "label": "WOD.abilities.melee",
                },
                {
                    "key": "performance",
                    "label": "WOD.abilities.performance",
                },
                {
                    "key": "stealth",
                    "label": "WOD.abilities.stealth",
                },
                {
                    "key": "survival",
                    "label": "WOD.abilities.survival",
                },
                {
                    "key": "archery",
                    "label": "WOD.abilities.archery"
                }
            ],
            "knowledges": [
                {
                    "key": "academics",
                    "label": "WOD.abilities.academics",
                },
                {
                    "key": "computer",
                    "label": "WOD.abilities.computer",
                },
                {
                    "key": "finance",
                    "label": "WOD.abilities.finance",
                },
                {
                    "key": "investigation",
                    "label": "WOD.abilities.investigation",
                },
                {
                    "key": "law",
                    "label": "WOD.abilities.law",
                },
                {
                    "key": "medecine",
                    "label": "WOD.abilities.medecine",
                },
                {
                    "key": "occult",
                    "label": "WOD.abilities.occult",
                },
                {
                    "key": "politics",
                    "label": "WOD.abilities.politics",
                },
                {
                    "key": "science",
                    "label": "WOD.abilities.science",
                }
            ]
        },
        "resources": {
            "willpower": {
                "type": "resource",
                "key": "willpower",
                "label": "WOD.resources.willpower",
                "value": 0,
                "temp": 0,
                "min": 0,
                "max": 10
            }
        }
    }
};

WOD.characterAttributes = {
    "str": "WOD.attributes.str",
    "dex": "WOD.attributes.dex",
    "stam": "WOD.attributes.stam",
    "cha": "WOD.attributes.cha",
    "man": "WOD.attributes.man",
    "app": "WOD.attributes.app",
    "per": "WOD.attributes.per",
    "int": "WOD.attributes.int",
    "wits": "WOD.attributes.wits"
}

WOD.characterAbilities = {
    "alertness": "WOD.abilities.alertness",
    "art": "WOD.abilities.art",
    "athletics": "WOD.abilities.athletics",
    "awareness": "WOD.abilities.awareness",
    "brawl": "WOD.abilities.brawl",
    "empathy": "WOD.abilities.empathy",
    "expression": "WOD.abilities.expression",
    "intimidation": "WOD.abilities.intimidation",
    "leadership": "WOD.abilities.leadership",
    "legerdemain": "WOD.abilities.legerdemain",
    "primalurge": "WOD.abilities.primalurge",
    "streetwise": "WOD.abilities.streetwise",
    "subterfuge": "WOD.abilities.subterfuge",
    "animalken": "WOD.abilities.animalken",
    "archery": "WOD.abilities.archery",
    "commerce": "WOD.abilities.commerce",
    "crafts": "WOD.abilities.crafts",
    "drive": "WOD.abilities.drive",
    "etiquette": "WOD.abilities.etiquette",
    "firearms": "WOD.abilities.firearms",
    "martialarts": "WOD.abilities.martialarts",
    "meditation": "WOD.abilities.meditation",
    "larceny": "WOD.abilities.larceny",
    "melee": "WOD.abilities.melee",
    "research": "WOD.abilities.research",
    "performance": "WOD.abilities.performance",
    "stealth": "WOD.abilities.stealth",
    "survival": "WOD.abilities.survival",
    "academics": "WOD.abilities.academics",
    "computer": "WOD.abilities.computer",
    "cosmology": "WOD.abilities.cosmology",
    "enigmas": "WOD.abilities.enigmas",
    "hearth-wisdom": "WOD.abilities.hearth-wisdom",
    "finance": "WOD.abilities.finance",
    "esoterica": "WOD.abilities.esoterica",
    "investigation": "WOD.abilities.investigation",
    "law": "WOD.abilities.law",
    "medecine": "WOD.abilities.medecine",
    "occult": "WOD.abilities.occult",
    "politics": "WOD.abilities.politics",
    "rituals": "WOD.abilities.rituals",
    "science": "WOD.abilities.science",
    "seneschal": "WOD.abilities.seneschal",
    "technology": "WOD.abilities.technology",
    "theology": "WOD.abilities.theology"
}

WOD.itemCategories = {
    "armor": "WOD.category.armor",
    "melee": "WOD.category.melee",
    "thrown": "WOD.category.thrown",
    "maneuver": "WOD.category.maneuver",
    "ranged": "WOD.category.ranged",
    "fetish": "WOD.category.fetish",
    "talen": "WOD.category.talen",
    "jewel": "WOD.category.jewel",
    "currency": "WOD.category.currency",
    "other": "WOD.category.other"
}

WOD.itemProperties = {
    "equipable": "WOD.properties.equipable",
    "stackable": "WOD.properties.stackable",
    "ranged": "WOD.properties.ranged",
    "thrown": "WOD.properties.thrown",
    "brawl": "WOD.properties.brawl",
    "melee": "WOD.properties.melee",
    "firearm": "WOD.properties.firearm",
    "bow": "WOD.properties.bow",
    "equipment": "WOD.properties.equipment",
    "weapon": "WOD.properties.weapon",
    "protection": "WOD.properties.protection",
    "spiritual": "WOD.properties.spiritual",
    "effects": "WOD.properties.effects",
    "2h": "WOD.properties.2h",
    "silver": "WOD.properties.silver",
    "bashing": "WOD.properties.bashing",
    "lethal": "WOD.properties.lethal",
    "aggravated": "WOD.properties.aggravated",
    "consumable": "WOD.properties.consumable",
    "fullauto": "WOD.properties.fullauto",
    "3roundBurst": "WOD.properties.3roundBurst",
    "spray": "WOD.properties.spray"
}