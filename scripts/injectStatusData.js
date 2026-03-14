const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/lib/playerData.json');
let players = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const updates = {
    "rohit-paudel": {
        achievements: ["CWC LEAGUE 2 HERO 🏆", "T20 WC 2026 SQUAD 🏆"]
    },
    "dipendra-singh-airee": {
        achievements: ["FASTEST 50 WR 💥", "ASIAN GAMES 2023 🏆"]
    },
    "kushal-bhurtel": {
        achievements: ["DEBUT RECORD SETTER 🏆"]
    },
    "sompal-kami": {
        status: "injured",
        achievements: ["ASIAN GAMES RECORD 🏆"]
    },
    "sundeep-jora": {
        status: "suspended",
        achievements: ["YOUNGEST T20I 50 (PREV) 🏆"]
    },
    "karan-kc": {
        status: "retired",
        retirementYear: 2025,
        achievements: ["WCL DIV 2 HERO 🏆", "T20 WC 2024 SQUAD 🏆"]
    }
};

players = players.map(p => {
    // Default everyone to active and empty achievements if not set
    let pNew = { ...p, status: 'active', achievements: [] };
    if (updates[p.id]) {
        pNew = { ...pNew, ...updates[p.id] };
    }
    return pNew;
});

fs.writeFileSync(dataPath, JSON.stringify(players, null, 4));
console.log('Successfully injected status and achievement data into playerData.json');
