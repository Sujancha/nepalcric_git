const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/lib/playerData.json');
let players = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const landmarkYears = {
    "rohit-paudel": ["२०२१", "२०२३"],
    "dipendra-singh-airee": ["September 27, 2023", "April 13, 2024"],
    "sandeep-lamichhane": ["2018", "2025"],
    "kushal-bhurtel": ["2021", "2023"]
};

players = players.map(player => {
    if (player.timeline && Array.isArray(player.timeline)) {
        player.timeline = player.timeline.map(event => {
            const isLandmark = landmarkYears[player.id]?.some(year => event.year.includes(year) || event.title.includes(year)) || event.highlight;
            if (isLandmark) {
                return { ...event, tier: 'landmark' };
            }
            return event;
        });
    }
    return player;
});

fs.writeFileSync(dataPath, JSON.stringify(players, null, 4));
console.log('Successfully injected timeline tiers into playerData.json');
