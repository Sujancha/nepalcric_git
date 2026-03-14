const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/lib/playerData.json');
let players = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const statsUpdates = {
    "rohit-paudel": {
        stats: {
            odi: { runs: 1800, average: 28.4, strikeRate: 78.5 },
            t20i: { runs: 1200, average: 26.5, strikeRate: 118.5 }
        },
        records: [
            "Youngest male cricketer in history to score an international half-century — 16 years 146 days",
            "First Nepalese player to score 1000 ODI runs",
            "Youngest captain in international cricket history — 20 years 73 days"
        ],
        iccRanking: null
    },
    "dipendra-singh-airee": {
        stats: {
            odi: { runs: 1000, average: 21.0, strikeRate: 75.0, wickets: 45, bestBowling: "4/18" },
            t20i: { runs: 1650, average: 36.5, strikeRate: 148.9, wickets: 45, bestBowling: "4/18" }
        },
        records: [
            "Highest Strike Rate in a T20I innings (Minimum 10 balls) — 555.55 vs Mongolia",
            "Fastest T20I half-century in history — 9 balls vs Mongolia",
            "Third man in T20I history to hit six consecutive sixes in an over"
        ],
        iccRanking: "ICC T20I ALL-ROUNDER #4 (as of May 2024)"
    },
    "sandeep-lamichhane": {
        stats: {
            odi: { runs: 200, average: 10.0, strikeRate: 50.0, wickets: 112, bestBowling: "6/11" },
            t20i: { runs: 100, average: 8.0, strikeRate: 80.0, wickets: 98, bestBowling: "5/9" }
        },
        records: [
            "Fastest to 100 ODI wickets in history — 42 matches",
            "First Nepalese player to play in the IPL (Delhi Capitals)",
            "Most consecutive ODI matches taking a wicket (33 matches)"
        ],
        iccRanking: null
    },
    "kushal-bhurtel": {
        stats: {
            odi: { runs: 1200, average: 24.5, strikeRate: 80.0, wickets: 15, bestBowling: "4/20" },
            t20i: { runs: 1100, average: 30.0, strikeRate: 127.0, wickets: 12, bestBowling: "3/18" }
        },
        records: [
            "First player in T20I history to score three consecutive half-centuries on debut"
        ],
        iccRanking: null
    }
};

players = players.map(player => {
    if (statsUpdates[player.id]) {
        return { ...player, ...statsUpdates[player.id] };
    }
    // Convert existing legacy stats to T20I default as fallback
    if (player.stats && !player.stats.odi) {
        player.stats = {
            odi: { runs: player.stats.runs || 0, average: player.stats.average || 0, strikeRate: player.stats.strikeRate || 0, wickets: player.stats.wickets },
            t20i: { runs: player.stats.runs || 0, average: player.stats.average || 0, strikeRate: player.stats.strikeRate || 0, wickets: player.stats.wickets }
        };
    }
    return player;
});

fs.writeFileSync(dataPath, JSON.stringify(players, null, 4));
console.log('Successfully injected Stats data into playerData.json');
