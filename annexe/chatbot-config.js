// Configuration du chatbot
const chatbotConfig = {
    // Configuration de l'API (à remplir plus tard)
    api: {
        endpoint: "",
        key: "",
        model: "gpt-3.5-turbo"
    },

    // Base de connaissances géographiques
    knowledgeBase: {
        // Géographie physique
        relief: {
            keywords: ["montagne", "volcan", "vallée", "plaine", "plateau", "colline"],
            facts: [
                "Le Mont Everest grandit d'environ 4mm chaque année !",
                "Le plus grand volcan du système solaire est sur Mars : le Mont Olympus",
                "La vallée la plus profonde sur Terre est sous l'océan : la fosse des Mariannes",
                "Le Grand Canyon s'est formé sur plus de 70 millions d'années"
            ]
        },
        climat: {
            keywords: ["température", "saison", "pluie", "neige", "météo", "vent"],
            facts: [
                "Le lieu le plus chaud sur Terre est dans le désert de Lout en Iran",
                "En Antarctique, il peut faire jusqu'à -89.2°C !",
                "La ville la plus pluvieuse est Cherrapunji en Inde",
                "Dans certains endroits, il y a des déserts à côté de forêts tropicales"
            ]
        },
        eau: {
            keywords: ["océan", "mer", "lac", "rivière", "fleuve", "glacier"],
            facts: [
                "L'océan Pacifique couvre 1/3 de la surface de la Terre",
                "Le Nil est le plus long fleuve du monde : 6,650 km !",
                "Le lac Baïkal contient 20% de l'eau douce de la Terre",
                "La Grande Barrière de Corail est le plus grand être vivant du monde"
            ]
        },

        // Géographie humaine
        population: {
            keywords: ["ville", "habitant", "population", "démographie"],
            facts: [
                "Plus de 7.9 milliards de personnes vivent sur Terre",
                "Tokyo est la plus grande ville du monde avec 37 millions d'habitants",
                "La Chine et l'Inde ont chacune plus d'un milliard d'habitants",
                "Monaco est le pays le plus densément peuplé du monde"
            ]
        },
        cultures: {
            keywords: ["langue", "tradition", "fête", "coutume", "religion"],
            facts: [
                "Il existe plus de 7,000 langues parlées dans le monde",
                "La Chine célèbre le Nouvel An lunaire avec des dragons et lanternes",
                "En Inde, la fête des couleurs (Holi) célèbre l'arrivée du printemps",
                "Le Japon a des festivals pour admirer les cerisiers en fleurs"
            ]
        },

        // Environnement
        écologie: {
            keywords: ["pollution", "environnement", "protection", "nature"],
            facts: [
                "Les forêts tropicales produisent 20% de l'oxygène sur Terre",
                "La Grande Muraille Verte en Afrique aide à stopper le désert",
                "Les récifs coralliens abritent 25% de la vie marine",
                "L'Amazonie est surnommée le poumon de la Terre"
            ]
        },
        animaux: {
            keywords: ["faune", "animal", "espèce", "habitat"],
            facts: [
                "Les manchots empereurs peuvent plonger jusqu'à 500m de profondeur",
                "Les girafes ont une langue bleue qui peut mesurer 50cm",
                "Le guépard peut courir jusqu'à 110 km/h",
                "Les éléphants peuvent communiquer à plusieurs kilomètres de distance"
            ]
        },

        // Records et curiosités
        records: {
            keywords: ["record", "plus grand", "plus petit", "plus haut", "incroyable"],
            facts: [
                "Le Vatican est le plus petit pays du monde",
                "Le désert d'Atacama est le plus sec du monde",
                "La Mer Morte est le point le plus bas sur Terre",
                "Le Mont Thor au Canada a la plus grande falaise verticale"
            ]
        },
        curiosités: {
            keywords: ["savais-tu", "insolite", "étonnant", "bizarre"],
            facts: [
                "Il neige parfois dans le désert du Sahara",
                "Il existe une ville en Australie où les gens vivent sous terre",
                "Au Groenland, le soleil ne se couche pas pendant l'été",
                "Il y a une rivière aux 5 couleurs en Colombie"
            ]
        }
    },

    // Messages d'interaction
    messages: {
        welcome: [
            "Salut ! Je suis Géo, ton ami expert en géographie ! 🌍",
            "Coucou ! Prêt pour une aventure autour du monde ? 🗺️",
            "Hello ! Envie de découvrir notre magnifique planète ? 🌎"
        ],
        suggestions: [
            "Tu veux en savoir plus sur un autre sujet ? 😊",
            "Je peux aussi te parler d'autres choses passionnantes !",
            "Il y a tellement d'autres merveilles à découvrir !"
        ],
        notFound: [
            "Je n'ai pas bien compris. Tu peux me poser des questions sur :",
            "- La géographie physique (montagnes, océans, climat...)",
            "- Les populations et les cultures",
            "- L'environnement et les animaux",
            "- Les records et curiosités du monde"
        ]
    }
};

// Exporter la configuration
export default chatbotConfig;
