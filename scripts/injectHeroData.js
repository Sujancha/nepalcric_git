const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/lib/playerData.json');
let players = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const heroUpdates = {
    "rohit-paudel": {
        nepaliName: "रोहित कुमार पौडेल",
        microStats: ["76 ODIs", "2,000 RUNS", "CAPTAIN"],
        lore: "A 20-year-old handed a broken team and told to save Nepali cricket. He did."
    },
    "dipendra-singh-airee": {
        nepaliName: "दिपेन्द्र सिंह ऐरी",
        microStats: ["64 T20Is", "148.9 SR", "45 WICKETS"],
        lore: "He skipped 11th-grade exams to play cricket. Today, he holds records that mortals only dream of."
    },
    "sandeep-lamichhane": {
        nepaliName: "सन्दीप लामिछाने",
        microStats: ["51 T20Is", "98 WICKETS", "14.2 SR"],
        lore: "The teenage prodigy who tore down borders, conquered global leagues, and brought the world's eyes to Nepal."
    },
    "kushal-bhurtel": {
        nepaliName: "कुशल भुर्तेल",
        microStats: ["44 T20Is", "127.0 SR", "OPENER"],
        lore: "He doesn't build innings; he detonates them. The fearless spearhead of the Rhino onslaught."
    },
    "sompal-kami": {
        nepaliName: "सोमपाल कामी",
        microStats: ["47 ODIs", "63 WICKETS", "FAST BOWLER"],
        lore: "The Gulmi Express. A fast-bowling pioneer who laid the tracks for a generation of pace."
    },
    "karan-kc": {
        nepaliName: "करण केसी",
        microStats: ["46 ODIs", "73 WICKETS", "MATCH WINNER"],
        lore: "The architect of the Miracle in Namibia. When hope dies, Karan KC swings the bat."
    },
    "aasif-sheikh": {
        nepaliName: "आशिफ शेख",
        microStats: ["41 ODIs", "1,200 RUNS", "WICKETKEEPER"],
        lore: "Ice in his veins. The calm, elegant anchor amidst the T20 carnage."
    },
    "kushal-malla": {
        nepaliName: "कुशल मल्ल",
        microStats: ["29 T20Is", "150+ SR", "POWER HITTER"],
        lore: "A left-handed wrecking ball who shattered Rohit Sharma’s fastest T20I century record."
    },
    "gulshan-jha": {
        nepaliName: "गुलसन झा",
        microStats: ["24 ODIs", "21 WICKETS", "PACE ALLROUNDER"],
        lore: "Plucked from domestic obscurity at 15. Now, the terrifying future of Nepalese pace."
    },
    "lalit-rajbanshi": {
        nepaliName: "ललित राजवंशी",
        microStats: ["21 ODIs", "28 WICKETS", "LEFT-ARM ORTHODOX"],
        lore: "The silent assassin. His flight is a seduction; his turn is a death sentence."
    },
    "abinas-bohara": {
        nepaliName: "अविनाश बोहरा",
        microStats: ["36 T20Is", "38 WICKETS", "DEATH BOWLER"],
        lore: "The yorker machine. When the game is on the line, the captain tosses the ball to Abinash."
    },
    "pratish-gc": {
        nepaliName: "प्रतिश जी.सी.",
        microStats: ["6 T20Is", "PACE", "FUTURE STAR"],
        lore: "Raw speed from the hills. The aggressive spark plug of the new fast-bowling cartel."
    },
    "sundeep-jora": {
        nepaliName: "सन्दीप जोरा",
        microStats: ["14 T20Is", "131 SR", "MIDDLE ORDER"],
        lore: "The youngest male to score a T20I half-century. A sleeping giant in the middle order."
    },
    "anil-sah": {
        nepaliName: "अनिल कुमार साह",
        microStats: ["10 ODIs", "1 CENTURY", "TOP ORDER"],
        lore: "The prodigal son's return. Cast aside, only to return with a century and undeniable class."
    },
    "aarif-sheikh": {
        nepaliName: "आरिफ शेख",
        microStats: ["48 ODIs", "800 RUNS", "FINISHER"],
        lore: "The seasoned anchor. A master of navigating the middle overs and rescuing broken innings."
    }
};

players = players.map(player => {
    if (heroUpdates[player.id]) {
        return { ...player, ...heroUpdates[player.id] };
    }
    return player;
});

fs.writeFileSync(dataPath, JSON.stringify(players, null, 4));
console.log('Successfully injected Hero data into playerData.json');
