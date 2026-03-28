// SECURITY: This route is rate-limited and origin-checked.
// Additionally set a hard monthly cap on the Gemini API key
// in Google Cloud Console to prevent runaway costs.

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const SYSTEM_PROMPT = `तपाईं NepalCric को AI सहायक हुनुहुन्छ। तपाईं केवल बालेन्द्र शाहको कथाबारे प्रश्नहरूको जवाफ दिनुहुन्छ।

तपाईंलाई यी कुराहरू थाहा छ:
— बालेन्द्र शाह १९९० मा नारदेवीमा जन्मिए
— उनका बुबा राम नारायण शाह आयुर्वेदिक डाक्टर थिए जसले कविता लेख्थे
— बालेनले नवौं कक्षामा "सडक बालक" लेखे
— उनले २०१७ मा मत हाल्न अस्वीकार गरी फेसबुकमा आफैलाई मत हाल्ने वाचा गरे
— उनले २०२२ मा ६१,७६७ मतले काठमाडौं मेयर जिते
— उनले २०२६ मा झापा-५ मा केपी ओलीलाई ४९,६१४ मतको अन्तरले हराए
— उनका बुबा डिसेम्बर २०२५ मा बिते
— उनी नेपालका प्रधानमन्त्री-मनोनीत छन्
— उनको मधेशी पहिचान र त्यसलाई लुकाउनु परेको पीडा

जवाफ दिँदा:
— सधैं नेपाली वा अंग्रेजीमा जवाफ दिनुस् (प्रश्न जुन भाषामा आयो त्यही भाषामा)
— ३-५ वाक्यमा मात्र जवाफ दिनुस्
— कथाको भावनात्मक स्वर कायम राख्नुस्
— यदि प्रश्न बालेनसँग सम्बन्धित छैन भने विनम्रतापूर्वक फर्काउनुस्`;

export async function POST(req: NextRequest) {
    // Origin check
    const referer = req.headers.get('referer') || ''
    if (!referer.includes('nepalcric') && !referer.includes('localhost')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || req.headers.get('x-real-ip')
        || 'unknown'
    const now = Date.now()
    const entry = rateLimitMap.get(ip)
    if (!entry || entry.resetAt < now) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    } else if (entry.count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
            { error: 'धेरै अनुरोधहरू। केही समयपछि पुन: प्रयास गर्नुहोस्।' },
            { status: 429 }
        )
    } else {
        entry.count++
    }

    try {
        const { question } = await req.json();

        if (!question?.trim()) {
            return NextResponse.json({ error: 'empty' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const chat = model.startChat({
            history: [
                { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
                { role: 'model', parts: [{ text: "Understood. I am ready to answer questions about Balen Shah's story." }] },
            ],
        });

        const result = await chat.sendMessage(question);
        const text = result.response.text();

        return NextResponse.json({ answer: text });

    } catch (error) {
        console.error('Gemini API error:', error);
        return NextResponse.json({ error: 'failed' }, { status: 500 });
    }
}
