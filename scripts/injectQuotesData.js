const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/lib/playerData.json');
let players = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const playerQuotes = {
    "rohit-paudel": [
        {
            quote: "We did not come to this World Cup just to take part, we came to compete.",
            context: "— इङ्ल्याण्डसँग ४ रन को हारपछि",
            date: "२०२६ T20 विश्वकप",
            featured: true
        },
        {
            quote: "Sherpas and others like them are part of our history, and we play with that in mind. Just like in climbing, in cricket also we have to stay calm and composed.",
            context: "— हिमाल आरोही र क्रिकेटको दबाबबारे",
            date: "२०२४ अन्तर्वार्ता",
            featured: false
        },
        {
            quote: "Both the bowler and batter are under pressure. So if the batters can make mistakes by playing a false shot, the bowler can miss his length too.",
            context: "— डेथ ओभरको दबाबबारे",
            date: "पोस्ट-म्याच प्रेस",
            featured: false
        }
    ],
    "dipendra-singh-airee": [
        {
            quote: "I don't play to set records. If you step onto the pitch and play for the team, the records will automatically follow.",
            context: "— युवराज सिंहको विश्व रेकर्ड तोडेपछि",
            date: "सेप्टेम्बर २०२३, एसियन गेम्स",
            featured: true
        },
        {
            quote: "There was a phase where I seriously thought about quitting cricket completely. But when you know what is right for you, no exam or obstacle in the world can stop you.",
            context: "— २०२१ को कठिन समयबारे",
            date: "२०२२ पुनरागमन",
            featured: false
        },
        {
            quote: "We have to play Test matches and ODI World Cups regularly. Our generation has to lay the foundation for Test cricket in Nepal.",
            context: "— नेपाली क्रिकेटको भविष्यबारे",
            date: "२०२५ अन्तर्वार्ता",
            featured: false
        }
    ],
    "sandeep-lamichhane": [
        {
            quote: "If someone asks me to play for free for the rest of my life for Nepal cricket, no money, I don't need anything... my goal is to take this team to the World Cup, to play Test matches.",
            context: "— राष्ट्रिय कर्तव्य र फ्रेन्चाइज लिगबारे",
            date: "२०२३ अन्तर्वार्ता",
            featured: true
        },
        {
            quote: "I have said from the first day that I am innocent. I am grateful to those who supported me. I will make every effort to take Nepali cricket to a new height.",
            context: "— अदालतबाट सफाइ पाएपछि पहिलो भनाइ",
            date: "मे २०२४",
            featured: false
        },
        {
            quote: "And the @USEmbassyNepal did it again what they did back in 2019, they denied my Visa for the T-20 World Cup... Unfortunate.",
            context: "— भिसा अस्वीकृत भएपछि",
            date: "मे २०२४, सामाजिक सञ्जाल",
            featured: false
        }
    ],
    "kushal-bhurtel": [
        {
            quote: "It was a big match and we never got a bigger total to chase before but we had a belief that we can chase it down. We always used to say if we are to become the No.1 Associate team we have to chase down these totals.",
            context: "— यूएईविरुद्ध ३११ रन चेस गरेपछि",
            date: "मार्च २०२३, कीर्तिपुर",
            featured: true
        },
        {
            quote: "The crowd has been always like the 12th man for us. When they come out to support in every match. It boosts not only confidence but also the whole team's morale.",
            context: "— नेपाली समर्थकहरूबारे",
            date: "२०२३ पोस्ट-म्याच",
            featured: false
        },
        {
            quote: "Yes, I know that was the first time that four batters hit 50+ scores in the same match. And that's a very good sign who are thinking to become the number one Associate team.",
            context: "— टिमको ब्याटिङ प्रदर्शनबारे",
            date: "२०२३ प्रेस कन्फरेन्स",
            featured: false
        }
    ]
};

players = players.map(player => {
    if (playerQuotes[player.id]) {
        player.quotes = playerQuotes[player.id];
    } else if (player.unreasonableWisdom && player.unreasonableWisdom.length > 0) {
        // Fallback for other players
        player.quotes = player.unreasonableWisdom.map((q, i) => ({
            quote: q,
            context: "— अनरिज़नेबल विजडम",
            date: "क्यारियर डायरी",
            featured: i === 0
        }));
    }
    return player;
});

fs.writeFileSync(dataPath, JSON.stringify(players, null, 4));
console.log('Successfully injected Quotes data into playerData.json');
