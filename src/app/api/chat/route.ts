import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import playersData from '@/lib/playerData.json'

export async function POST(req: NextRequest) {
    try {
        const { playerId, message, history } = await req.json()

        if (!message || !playerId) {
            return NextResponse.json({ error: 'Missing message or playerId' }, { status: 400 })
        }

        const player = (playersData as any[]).find(p => p.id === playerId)
        if (!player) {
            return NextResponse.json({ error: 'Player not found' }, { status: 404 })
        }

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
        }

        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const systemPrompt = `You are NepalCric's AI cricket analyst — an expert on Nepali cricket with deep editorial knowledge. You are currently on the profile page of ${player.name}.

Here is everything known about this player:
${JSON.stringify(player, null, 2)}

RULES:
- Answer only from the context provided above
- Speak with confident, editorial voice — like a cricket journalist who has followed this player for years
- Keep answers concise but vivid — 2-4 sentences maximum unless the question demands more
- If asked something not in the data, say: "That chapter hasn't been written yet." — never invent facts
- Occasionally reference specific stats, quotes, or timeline moments from the data
- Never say "according to the data" or "based on the context" — speak as if you know this player personally
- Use cricket terminology naturally
- The site is NepalCric — Nepal's cinematic cricket storytelling platform`

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }]
                },
                {
                    role: 'model',
                    parts: [{ text: `Understood. I'm ready to speak about ${player.name} — Nepal's ${player.role}. Ask me anything.` }]
                },
                ...(history || []).map((msg: any) => ({
                    role: msg.role,
                    parts: [{ text: msg.content }]
                }))
            ]
        })

        const result = await chat.sendMessage(message)
        const response = await result.response
        const text = response.text()

        return NextResponse.json({ response: text })

    } catch (error: any) {
        console.error('Gemini API error:', error)
        return NextResponse.json({ error: 'AI service unavailable' }, { status: 500 })
    }
}
