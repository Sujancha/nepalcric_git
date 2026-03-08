'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
    role: 'user' | 'model'
    content: string
}

interface PlayerChatbotProps {
    playerId: string
    playerName: string
    playerRole: string
}

const SUGGESTED_QUESTIONS = [
    'What is the signature delivery?',
    'What was the defining career moment?',
    'What drives this player?',
    'What are the key stats?'
]

export default function PlayerChatbot({ playerId, playerName, playerRole }: PlayerChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return

        const userMessage: Message = { role: 'user', content: text }
        const newMessages = [...messages, userMessage]
        setMessages(newMessages)
        setInput('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerId,
                    message: text,
                    history: messages
                })
            })
            const data = await res.json()
            if (data.response) {
                setMessages([...newMessages, { role: 'model', content: data.response }])
            }
        } catch {
            setMessages([...newMessages, { role: 'model', content: 'Connection lost. Try again.' }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(13,27,42,0.95), rgba(7,8,15,0.98))',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '520px'
        }}>
            {/* Header */}
            <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#C9A84C',
                    boxShadow: '0 0 6px rgba(201,168,76,0.6)'
                }} />
                <span style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '11px',
                    color: '#C9A84C',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase'
                }}>
                    AI ANALYST · NEPALCRIC INTEL
                </span>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                scrollbarWidth: 'none'
            }}>
                {messages.length === 0 && (
                    <div>
                        <p style={{
                            fontFamily: 'Mukta, sans-serif',
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.35)',
                            letterSpacing: '0',
                            marginBottom: '16px',
                            lineHeight: 1.6
                        }}>
                            Ask anything about {playerName} — career, technique, key moments, stats.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {SUGGESTED_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(q)}
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '2px',
                                        padding: '8px 12px',
                                        color: 'rgba(255,255,255,0.6)',
                                        fontFamily: 'Barlow Condensed, sans-serif',
                                        fontSize: '12px',
                                        letterSpacing: '0.05em',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)'
                                    }}
                                    onMouseEnter={e => {
                                        (e.target as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.4)'
                                            ; (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.9)'
                                    }}
                                    onMouseLeave={e => {
                                        (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'
                                            ; (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)'
                                    }}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        gap: '4px'
                    }}>
                        <span style={{
                            fontFamily: 'Barlow Condensed, sans-serif',
                            fontSize: '10px',
                            color: msg.role === 'user' ? 'rgba(196,30,58,0.7)' : 'rgba(201,168,76,0.7)',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase'
                        }}>
                            {msg.role === 'user' ? 'YOU' : 'ANALYST'}
                        </span>
                        <div style={{
                            maxWidth: '90%',
                            padding: '10px 14px',
                            background: msg.role === 'user'
                                ? 'rgba(196,30,58,0.12)'
                                : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${msg.role === 'user' ? 'rgba(196,30,58,0.2)' : 'rgba(255,255,255,0.06)'}`,
                            borderRadius: '2px',
                            fontFamily: 'Mukta, sans-serif',
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.85)',
                            letterSpacing: '0',
                            lineHeight: 1.7
                        }}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            fontFamily: 'Barlow Condensed, sans-serif',
                            fontSize: '10px',
                            color: 'rgba(201,168,76,0.7)',
                            letterSpacing: '0.2em'
                        }}>ANALYST</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {[0, 1, 2].map(i => (
                                <div key={i} style={{
                                    width: '4px', height: '4px', borderRadius: '50%',
                                    background: '#C9A84C',
                                    animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`
                                }} />
                            ))}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: '8px'
            }}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                    placeholder="Ask about this player..."
                    disabled={isLoading}
                    style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '2px',
                        padding: '8px 12px',
                        color: '#FFFFFF',
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: '13px',
                        letterSpacing: '0.05em',
                        outline: 'none'
                    }}
                />
                <button
                    onClick={() => sendMessage(input)}
                    disabled={isLoading || !input.trim()}
                    style={{
                        background: input.trim() ? '#C41E3A' : 'rgba(255,255,255,0.06)',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '8px 16px',
                        color: '#FFFFFF',
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: '12px',
                        letterSpacing: '0.1em',
                        cursor: input.trim() ? 'pointer' : 'default',
                        transition: 'all 0.3s cubic-bezier(0.76, 0, 0.24, 1)'
                    }}
                >
                    →
                </button>
            </div>

            <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    )
}
