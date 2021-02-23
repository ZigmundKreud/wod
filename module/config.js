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

export const WOD = {
    "werewolf": {
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
                    "key": "primalurge",
                    "label": "WOD.abilities.primalurge",
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
                },
                {
                    "key": "enigmas",
                    "label": "WOD.abilities.enigmas"
                },
                {
                    "key": "rituals",
                    "label": "WOD.abilities.rituals"
                },
                {
                    "key": "technology",
                    "label": "WOD.abilities.technology"
                }
            ]
        }
    },
    "vampire": {
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
                    "key": "primalurge",
                    "label": "WOD.abilities.primalurge",
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
                },
                {
                    "key": "enigmas",
                    "label": "WOD.abilities.enigmas"
                },
                {
                    "key": "rituals",
                    "label": "WOD.abilities.rituals"
                },
                {
                    "key": "technology",
                    "label": "WOD.abilities.technology"
                }
            ]
        }
    },
    "vampire_da": {
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
                },
                {
                    "key": "legerdemain",
                    "label": "WOD.abilities.legerdemain"
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
                },
                {
                    "key": "commerce",
                    "label": "WOD.abilities.commerce"
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
                },
                {
                    "key": "hearth-wisdom",
                    "label": "WOD.abilities.hearth-wisdom",
                },
                {
                    "key": "seneschal",
                    "label": "WOD.abilities.seneschal",
                },
                {
                    "key": "theology",
                    "label": "WOD.abilities.theology",
                }
            ]
        }
    },
    "mage": {
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
                    "key": "martialarts",
                    "label": "WOD.abilities.martialarts"
                },
                {
                    "key": "meditation",
                    "label": "WOD.abilities.meditation"
                },
                {
                    "key": "research",
                    "label": "WOD.abilities.research"
                },
                {
                    "key": "technology",
                    "label": "WOD.abilities.technology"
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
                },
                {
                    "key": "cosmology",
                    "label": "WOD.abilities.cosmology"
                },
                {
                    "key": "enigmas",
                    "label": "WOD.abilities.enigmas"
                },
                {
                    "key": "esoterica",
                    "label": "WOD.abilities.esoterica"
                }
            ]
        }
    },
    "human": {
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
        }
    },
    "hunter": {
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
        }
    },
    "ghoul": {
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
        }
    },
    "spirit": {
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
        }
    },
};