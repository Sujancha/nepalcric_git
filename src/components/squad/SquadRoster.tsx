'use client'

import playersData from '@/lib/playerData.json'
import Link from 'next/link'
import { useState } from 'react'

export default function SquadRoster() {
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    return (
        <section style={{
            background: '#07080F',
            padding: '80px 0 120px 0',
            position: 'relative'
        }}>
            {/* Ghost flag watermark */}
            <div style={{
                position: 'absolute',
                top: '40px',
                right: '-60px',
                width: '320px',
                height: '400px',
                opacity: 0.07,
                pointerEvents: 'none',
                zIndex: 0,
                fontSize: '320px',
                lineHeight: 1,
                color: '#C41E3A',
                userSelect: 'none'
            }}>
                ◈
            </div>

            {/* Section header */}
            <div style={{
                padding: '0 80px',
                marginBottom: '48px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A84C' }} />
                <span style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '12px',
                    color: '#C9A84C',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase'
                }}>
                    CAMPAIGN 2026
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />
                <span style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.15em'
                }}>
                    {playersData.length} WARRIORS
                </span>
            </div>

            {/* Player roster */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                position: 'relative',
                zIndex: 1
            }}>
                {playersData.map((player: any, index: number) => {
                    const isHovered = hoveredId === player.id
                    return (
                        <Link
                            key={player.id}
                            href={`/squad/${player.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div
                                onMouseEnter={() => setHoveredId(player.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '80px 1fr auto auto',
                                    alignItems: 'center',
                                    gap: '0 40px',
                                    padding: isHovered ? '28px 80px' : '20px 80px',
                                    background: isHovered
                                        ? 'linear-gradient(90deg, rgba(196,30,58,0.08) 0%, rgba(13,27,42,0.6) 40%, transparent 100%)'
                                        : 'transparent',
                                    borderLeft: isHovered
                                        ? '3px solid #C41E3A'
                                        : '3px solid transparent',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
                                    cursor: 'pointer'
                                }}
                            >
                                {/* Number */}
                                <div style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontSize: '13px',
                                    color: isHovered ? '#C9A84C' : 'rgba(255,255,255,0.2)',
                                    letterSpacing: '0.1em',
                                    transition: 'color 0.4s cubic-bezier(0.76, 0, 0.24, 1)'
                                }}>
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Player info */}
                                <div>
                                    <div style={{
                                        fontFamily: 'Barlow Condensed, sans-serif',
                                        fontSize: 'clamp(22px, 3vw, 36px)',
                                        fontWeight: 700,
                                        color: '#FFFFFF',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        lineHeight: 1.1,
                                        marginBottom: '4px'
                                    }}>
                                        {player.name}
                                    </div>
                                    <div style={{
                                        fontFamily: 'Mukta, sans-serif',
                                        fontSize: '13px',
                                        color: isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
                                        letterSpacing: '0',
                                        transition: 'color 0.4s cubic-bezier(0.76, 0, 0.24, 1)'
                                    }}>
                                        {player.role}
                                    </div>

                                    {/* Signature move — only visible on hover */}
                                    <div style={{
                                        fontFamily: 'Barlow Condensed, sans-serif',
                                        fontSize: '11px',
                                        color: '#C9A84C',
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        marginTop: '8px',
                                        opacity: isHovered ? 1 : 0,
                                        transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
                                        transition: 'all 0.4s cubic-bezier(0.76, 0, 0.24, 1)'
                                    }}>
                                        <span style={{ letterSpacing: '0' }}>⚔ {player.signatureMove}</span>
                                    </div>
                                </div>

                                {/* Key stat */}
                                <div style={{
                                    textAlign: 'right',
                                    opacity: isHovered ? 1 : 0.3,
                                    transition: 'opacity 0.4s cubic-bezier(0.76, 0, 0.24, 1)'
                                }}>
                                    <div style={{
                                        fontFamily: 'Barlow Condensed, sans-serif',
                                        fontSize: 'clamp(28px, 3.5vw, 48px)',
                                        fontWeight: 700,
                                        color: '#FFFFFF',
                                        letterSpacing: '0.02em',
                                        lineHeight: 1
                                    }}>
                                        {player.stats?.wickets ?? player.stats?.runs ?? player.stats?.strikeRate ?? '—'}
                                    </div>
                                    <div style={{
                                        fontFamily: 'Barlow Condensed, sans-serif',
                                        fontSize: '10px',
                                        color: 'rgba(255,255,255,0.35)',
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        marginTop: '2px'
                                    }}>
                                        {player.stats?.wickets !== undefined ? 'WICKETS' : player.stats?.runs !== undefined ? 'RUNS' : 'S/R'}
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontSize: '20px',
                                    color: '#C41E3A',
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                                    transition: 'all 0.4s cubic-bezier(0.76, 0, 0.24, 1)'
                                }}>
                                    →
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Closing line */}
            <div style={{
                textAlign: 'center',
                padding: '80px 0 0 0'
            }}>
                <p style={{
                    fontFamily: 'Mukta, sans-serif',
                    fontStyle: 'italic',
                    fontSize: 'clamp(14px, 1.6vw, 17px)',
                    color: 'rgba(255,255,255,0.18)',
                    letterSpacing: '0',
                    margin: 0
                }}>
                    यी योद्धाहरू मैदानमा मात्र होइन — इतिहासमा लेखिन्छन्।
                </p>
            </div>
        </section>
    )
}
