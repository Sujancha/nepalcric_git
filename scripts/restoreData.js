const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/lib/playerData.json');
let players = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const updates = {
    "sandeep-lamichhane": {
        "quote": "I have said from the first day that I am innocent. I am grateful to those who supported me... I will make every effort to take Nepali cricket to a new height.",
        "unreasonableWisdom": [
            "I have said from the first day that I am innocent. I am grateful to those who supported me... I will make every effort to take Nepali cricket to a new height.",
            "And the @USEmbassyNepal did it again what they did back in 2019, they denied my Visa for the T-20 World Cup happening in USA and West Indies. Unfortunate. I am sorry to all the well wishers of Nepal Cricket.",
            "You may choose anyone you like for your show segments, but ridiculing someone's life while sitting on a YouTube chair is shameful."
        ],
        "signatureArsenal": [
            { "title": "The Overspun Leg-Break", "description": "A viciously ripping delivery that bites into the pitch, dipping sharply to deceive the batter in flight before aggressively turning away from the right-hander." },
            { "title": "The Phantom Wrong'un (Googly)", "description": "Disguised with masterful deception, this delivery mimics his traditional leg-break out of the hand but spins sharply back into the right-hander, shattering stumps and leaving batsmen bewildered." },
            { "title": "The Middle-Over Chokehold", "description": "Relying on pinpoint control, variations like the flipper, and aggressive stump-to-stump lines to exploit slower surfaces, he suffocates the opposition's run rate and forces fatal errors." }
        ],
        "originStory": [
            "Sandeep Lamichhane's story begins with pure, unadulterated talent spotted in the nets of Chitwan by former national coach Pubudu Dassanayake when Lamichhane was just 14 years old. From a teenager taking a historic hat-trick at the 2016 Under-19 World Cup to becoming Nepal's global cricket ambassador, his leg-spin wizardry quickly caught the eye of heavyweights like Australian captain Michael Clarke. He shattered the glass ceiling in 2018 as the first Nepalese cricketer to secure an Indian Premier League contract, launching a lucrative, globetrotting franchise career that put his nation firmly on the international sporting map.",
            "The dizzying heights of international stardom were followed by an equally precipitous and very public fall. In September 2022, Lamichhane was accused of rape by a young woman, leading to his arrest, suspension from the national team, and an eventual eight-year prison sentence handed down by the Kathmandu District Court in early 2024. Stripped of his captaincy, he endured a brutal trial by media, saw his international mobility heavily restricted by US visa denials, and faced silent protests from rival teams, leaving his once-glittering career hanging by a thread.",
            "But the resilient spinner refused to stay down. In May 2024, the Patan High Court fully overturned his conviction, granting him a 'clean chit' due to insufficient evidence and paving the way for a dramatic return to the pitch. Lamichhane bounced back with a vengeance, dominating the 2025 Nepal Premier League as the joint-top wicket-taker, helping lead the Rajshahi Warriors to the BPL championship, and reclaiming his spot as the spin spearhead for the 2026 T20 World Cup."
        ],
        "timeline": [
            { "year": "January 30, 2016", "title": "The Arrival", "content": "He announced his arrival to the world by claiming a stunning hat-trick against Ireland in the ICC Under-19 World Cup." },
            { "year": "January 28, 2018", "title": "IPL Glass Ceiling", "content": "Lamichhane shattered the glass ceiling for Nepalese cricket by being bought by the Delhi Daredevils in the IPL auction." },
            { "year": "April 2023", "title": "World Record", "content": "He broke the global record to become the fastest bowler in history to reach 100 ODI wickets, achieving the staggering feat in just 42 matches." },
            { "year": "January 10, 2024", "title": "The Darkest Chapter", "content": "A Kathmandu court sentenced him to eight years in jail following a rape conviction, bringing his soaring career to a sudden, dark halt." },
            { "year": "May 15, 2024", "title": "Full Acquittal", "content": "The Patan High Court officially acquitted him of all rape charges, immediately lifting his suspension and legally clearing his path to return to international cricket." }
        ]
    },
    "dipendra-singh-airee": {
        "quote": "I don't play to set records. If you step onto the pitch and play for the team, the records will automatically follow.",
        "unreasonableWisdom": [
            "I don't play to set records. If you step onto the pitch and play for the team, the records will automatically follow.",
            "There was a phase where I seriously thought about quitting cricket completely. But when you know what is right for you, no exam or obstacle in the world can stop you.",
            "We have to play Test matches and ODI World Cups regularly. Our generation has to lay the foundation for Test cricket in Nepal."
        ],
        "signatureArsenal": [
            { "title": "Power Hitting: The Kinetic Finisher", "description": "Utilizing an exceptionally low center of gravity and devastating bottom-hand dominance, Airee generates terrifying bat speed. He isn't just a slogger; he is a high-IQ finisher who manipulates field settings with unorthodox ramps and square-of-the-wicket strikes to dismantle elite pace at the death." },
            { "title": "The Golden Arm: Pinpoint Off-Spin", "description": "Transitioning from a medium pacer to a specialist off-spinner, Airee's bowling is defined by suffocating accuracy rather than excessive turn. He operates as the ultimate tactical weapon in the middle overs, expertly choking the run flow and breaking crucial partnerships when the team needs it most." },
            { "title": "World-Class Fielding: The Rockstar in the Deep", "description": "Airee is a human highlight reel on the turf, holding the national record for catches (40) and run-outs (25) in T20Is. With an infectious energy and the agility of a gymnast, he routinely saves 15-20 runs a match, executing breathtaking diving catches and lethal, pinpoint throws that leave opponents stunned." }
        ],
        "originStory": [
            "Far from the polished academies of Kathmandu, Dipendra Singh Airee's story began with a tennis ball on the rugged village grounds of Gajar and Tilachaur in Mahendranagar. Raised in a humble, middle-class family that envisioned him in a soldier's uniform rather than cricket whites, Airee chose the pitch, famously skipping his 11th-grade exams to chase a dream that few in Nepal dared to dream. He transformed his raw, kinetic energy into an unstoppable force, announcing his arrival by single-handedly dismantling the defending champions, India, in the 2017 U-19 Asia Cup.",
            "His ascent to the senior national team was rapid, but the journey was not without its scars. In 2021, after standing up for his teammates during a central contract dispute, Airee was unceremoniously stripped of his vice-captaincy by the cricket board. Mentally shattered and on the verge of walking away from the game entirely, the 'Tiger' refused to be caged. He channeled his frustration into a demolition mode, letting his bat silence the critics and cementing his status as the undisputed anchor and leader of the Nepali squad.",
            "Today, Dipendra Singh Airee is not just Nepal's finest all-rounder; he is a global T20 mercenary. He has shattered records held by legends like Yuvraj Singh, commanded the crease in the world's most elite franchise leagues — from the GT20 in Canada to the ILT20 in the UAE, and the PSL in Pakistan — and climbed to the absolute pinnacle of the ICC T20I All-Rounder rankings. With raw power, razor-sharp off-spin, and gravity-defying fielding, he has evolved from a village dreamer into a world-class phenomenon who carries the weight of a nation on his shoulders."
        ],
        "timeline": [
            { "year": "2017", "title": "The U-19 Upset", "content": "Airee scores an anchoring 88 runs and takes a vicious 4/39 with the ball to orchestrate a historic victory over a star-studded Indian U-19 squad, putting the world on notice." },
            { "year": "2021", "title": "The Crucible", "content": "Stripped of his national vice-captaincy over a contract dispute, Airee contemplates quitting but instead uses the adversity to fuel his return as an unstoppable, match-winning force." },
            { "year": "September 27, 2023", "title": "The 9-Ball Miracle", "content": "He shatters Yuvraj Singh's 16-year-old world record by blasting the fastest half-century in T20I history off just 9 deliveries at the Asian Games." },
            { "year": "April 13, 2024", "title": "The Perfect Over", "content": "Earning his place in cricket immortality, Airee becomes only the third man in T20I history to smash six consecutive sixes in a single over against Qatar." },
            { "year": "February 17, 2026", "title": "The World Cup Redemption", "content": "Airee blasts a flawless, unbeaten 50 off 23 balls to guide Nepal to a thrilling seven-wicket victory over Scotland, securing the nation's first T20 World Cup win in 12 years." }
        ]
    },
    "kushal-bhurtel": {
        "quote": "It was a big match and we never got a bigger total to chase before but we had a belief that we can chase it down. We always used to say if we are to become the No.1 Associate team we have to chase down these totals.",
        "stats": { "runs": 1420, "strikeRate": 135.2, "average": 69.50 },
        "unreasonableWisdom": [
            "It was a big match and we never got a bigger total to chase before but we had a belief that we can chase it down. We always used to say if we are to become the No.1 Associate team we have to chase down these totals.",
            "The crowd has been always like the 12th man for us. When they come out to support in every match. It boosts not only confidence but also the whole team's morale.",
            "Yes, I know that was the first time that four batters hit 50+ scores in the same match. And that's a very good sign who are thinking to become the number one Associate team."
        ],
        "signatureArsenal": [
            { "title": "The Fearless Pull Shot", "description": "Anchored by a rock-solid base and lightning-fast hand speed, Bhurtel rocks back to brutally punish short-pitched deliveries, sending them rocketing into the stands like a laser." },
            { "title": "The Creative Lap Sweep", "description": "A masterclass in crease geometry and high-stakes innovation, he perfectly executes the reverse scoop, dropping to his knees to guide the ball past the keeper like a precision billiards shot sliding into the corner pocket." },
            { "title": "The Electric Boundary Fielding", "description": "Channeling the spatial awareness and rapid reflexes of his childhood days as a football goalkeeper, he launches himself across the inner ring and boundary ropes to maintain an elite catch-per-match ratio." }
        ],
        "originStory": [
            "Born in Butwal, Rupandehi, Kushal Bhurtel originally dreamt of diving across goal lines as a football goalkeeper before his father steered him toward the cricket pitch. That latent agility and rapid reflex coordination laid the foundation for a highly dynamic athlete. Sidelined after a frustrating stint as a medium-pacer in the 2016 U-19 World Cup, he embraced the grueling grind of the domestic circuit, undergoing a rigorous technical overhaul to forge himself into a top-order wrecking ball.",
            "When his moment finally arrived under coach Dav Whatmore in April 2021, Bhurtel didn't just knock on the international door — he kicked it down. He stunned the globe by smashing three consecutive half-centuries in his first three T20I matches, becoming the first player in the history of the sport to achieve the feat. Racking up 278 runs at a 69.50 average in his debut series, the 'Butwal Boss' cemented his name alongside international titans as an ICC Player of the Month nominee.",
            "Evolution is the hallmark of a true gladiator, and under head coach Monty Desai, Bhurtel transformed into a fearless, hybrid leader. Whether he is smoking a brilliant 99 in a record-breaking 171-run stand against Zimbabwe, hitting the first six of the match against India's elite pace attack in the Asia Cup, or taking career-best 4/12 bowling figures with his deceptive leg-spin, he has become the aggressive heartbeat of Nepal's modern cricket era."
        ],
        "timeline": [
            { "year": "January 2016", "title": "Global Entry", "content": "Making his global entry at the U-19 World Cup, an early struggle with pace bowling sparked a relentless technical reinvention that defined his future grit." },
            { "year": "April 17, 2021", "title": "Unleashed", "content": "Unleashed absolute carnage on his T20I debut against the Netherlands, igniting a world-record streak of three consecutive half-centuries to launch his international career." },
            { "year": "February 19, 2022", "title": "T20I Century", "content": "Asserted his top-order dominance by obliterating the Philippines to secure a majestic, unbeaten 104* — his maiden T20I century." },
            { "year": "June 18, 2023", "title": "World Record Stand", "content": "Forged a historic 171-run opening partnership by smashing a fearless 99 against hosts Zimbabwe in the Cricket World Cup Qualifiers." },
            { "year": "September 4, 2023", "title": "Asia Cup Giant-Killer", "content": "Took the fight to the giants of the sport on the Asia Cup stage, blasting a rapid 25-ball 38 and hitting the match's very first six against India's fearsome pace attack." }
        ]
    }
};

players = players.map(player => {
    if (updates[player.id]) {
        // Merge the updates deeply to preserve anything else, but overwrite explicitly
        return { ...player, ...updates[player.id] };
    }
    return player;
});

fs.writeFileSync(dataPath, JSON.stringify(players, null, 4));
console.log('Restoration complete.');
