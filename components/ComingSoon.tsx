'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ---------- wave canvas ---------- */
function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0, t = 0, raf = 0;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < 24; i++) {
        const p = i / 24;
        const y = H * (.45 + p * .5);
        const a1 = H * .032 * (1 - p * .55);
        const a2 = H * .016 * (1 - p * .4);
        const f1 = .004 + p * .002;
        const f2 = .008 + p * .003;
        const ph1 = t + i * .4;
        const ph2 = t * 1.25 + i * .27;
        const mix = Math.pow(p, 1.4);
        ctx.strokeStyle = `rgba(${Math.round(100+(247-100)*mix)},${Math.round(120+(162-120)*mix)},${Math.round(220+(32-220)*mix)},${.015+p*.04})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 4) {
          const wy = y + a1 * Math.sin(x * f1 + ph1) + a2 * Math.sin(x * f2 + ph2);
          x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy);
        }
        ctx.stroke();
      }
      t += .0045;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:1 }} />;
}

/* ---------- socials ---------- */
const socials = [
  { label:'Instagram', href:'https://www.instagram.com/sunsetfestival.bg/', d:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label:'Facebook', href:'https://www.facebook.com/sunsetfestival.bg', d:'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label:'TikTok', href:'https://www.tiktok.com/@sunsetfestival.bg', d:'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  { label:'Spotify', href:'https://open.spotify.com/user/31vikha3riz24v4b3a3hbs4f2sau?si=f6fd05712d754eec', d:'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z' },
  { label:'YouTube', href:'https://www.youtube.com/@sunsetfestivalbg', d:'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
];

/* ---------- ticker ---------- */
function Ticker() {
  const wave = (
    <svg width="20" height="12" viewBox="0 0 24 16" fill="var(--gold)" style={{ opacity:.6, flexShrink:0 }}>
      <rect x="0" y="5" width="3" height="6" rx="1"/><rect x="5" y="1" width="3" height="14" rx="1"/>
      <rect x="10" y="3" width="3" height="10" rx="1"/><rect x="15" y="0" width="3" height="16" rx="1"/>
      <rect x="20" y="4" width="3" height="8" rx="1"/>
    </svg>
  );
  const items = ['Sunset Port Festival','Something Big Is Coming','Black Sea Coast','Stay Tuned','sunsetfestival.bg','Boutique Open-Air Festival'];
  const sep = <span style={{ color:'var(--gold)', margin:'0 14px', fontSize:'.55rem', opacity:.8 }}>•</span>;
  const row = (
    <span style={{ display:'inline-flex', alignItems:'center', gap:0, padding:'0 10px', whiteSpace:'nowrap' }}>
      {wave}
      {items.flatMap((item, i) => [
        <span key={i} style={{ fontSize:'.58rem', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(232,229,222,.5)' }}>{item}</span>,
        i < items.length - 1 ? <span key={`s${i}`}>{sep}</span> : null,
      ])}
      {wave}
    </span>
  );
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'13px 0', background:'rgba(4,6,14,.95)', borderTop:'1px solid rgba(247,162,32,.1)', overflow:'hidden', whiteSpace:'nowrap', zIndex:3 }}>
      <div style={{ display:'inline-flex', alignItems:'center', animation:'tickerScroll 40s linear infinite' }}>
        {row}{row}{row}{row}
      </div>
    </div>
  );
}

/* ---------- card border overlay ---------- */
function CardBorder({ bright = false }: { bright?: boolean }) {
  const c = bright ? 'rgba(247,162,32,.55)' : 'rgba(247,162,32,.4)';
  const d = bright ? 'rgba(247,162,32,.18)' : 'rgba(247,162,32,.1)';
  return (
    <svg viewBox="0 0 210 330" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
      {/* Corner L brackets */}
      <path d={`M10,32 L10,10 L32,10`} fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d={`M178,10 L200,10 L200,32`} fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d={`M10,298 L10,320 L32,320`} fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d={`M178,320 L200,320 L200,298`} fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Corner dots */}
      <circle cx="10" cy="10" r="2" fill={c}/>
      <circle cx="200" cy="10" r="2" fill={c}/>
      <circle cx="10" cy="320" r="2" fill={c}/>
      <circle cx="200" cy="320" r="2" fill={c}/>
      {/* Inner dashed frame */}
      <rect x="18" y="18" width="174" height="294" fill="none" stroke={d} strokeWidth="0.5" strokeDasharray="5 7"/>
      {/* Top center diamond */}
      <path d="M105,4 L109,10 L105,16 L101,10 Z" fill={c}/>
      {/* Bottom center diamond */}
      <path d="M105,314 L109,320 L105,326 L101,320 Z" fill={c}/>
      {/* Side mid arrows */}
      <path d="M4,163 L10,168 L4,173" fill="none" stroke={d} strokeWidth="1" strokeLinecap="round"/>
      <path d="M206,163 L200,168 L206,173" fill="none" stroke={d} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

/* ---------- card art ---------- */
function LineupArt() {
  return (
    <svg viewBox="0 0 150 190" style={{ width:'100%', height:'100%' }}>
      {/* Sound waves left */}
      <path d="M36,58 Q26,88 36,118" fill="none" stroke="rgba(247,162,32,.22)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24,46 Q10,88 24,130" fill="none" stroke="rgba(247,162,32,.1)" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Sound waves right */}
      <path d="M114,58 Q124,88 114,118" fill="none" stroke="rgba(247,162,32,.22)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M126,46 Q140,88 126,130" fill="none" stroke="rgba(247,162,32,.1)" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Mic capsule */}
      <rect x="57" y="30" width="36" height="58" rx="18" fill="rgba(247,162,32,.09)" stroke="rgba(247,162,32,.48)" strokeWidth="1.5"/>
      {/* Mesh grid */}
      <line x1="57" y1="50" x2="93" y2="50" stroke="rgba(247,162,32,.18)" strokeWidth="0.8"/>
      <line x1="57" y1="60" x2="93" y2="60" stroke="rgba(247,162,32,.18)" strokeWidth="0.8"/>
      <line x1="57" y1="70" x2="93" y2="70" stroke="rgba(247,162,32,.18)" strokeWidth="0.8"/>
      <line x1="57" y1="80" x2="93" y2="80" stroke="rgba(247,162,32,.18)" strokeWidth="0.8"/>
      <line x1="66" y1="30" x2="66" y2="88" stroke="rgba(247,162,32,.12)" strokeWidth="0.8"/>
      <line x1="75" y1="30" x2="75" y2="88" stroke="rgba(247,162,32,.12)" strokeWidth="0.8"/>
      <line x1="84" y1="30" x2="84" y2="88" stroke="rgba(247,162,32,.12)" strokeWidth="0.8"/>
      {/* Handle */}
      <rect x="71" y="88" width="8" height="28" rx="2" fill="rgba(247,162,32,.14)" stroke="rgba(247,162,32,.32)" strokeWidth="1"/>
      {/* Stand base */}
      <line x1="55" y1="128" x2="95" y2="128" stroke="rgba(247,162,32,.35)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="63" y1="116" x2="75" y2="128" stroke="rgba(247,162,32,.25)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="87" y1="116" x2="75" y2="128" stroke="rgba(247,162,32,.25)" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Glow base */}
      <ellipse cx="75" cy="132" rx="32" ry="4" fill="rgba(247,162,32,.08)"/>
      {/* Stars */}
      <circle cx="16" cy="36" r="1.8" fill="rgba(247,162,32,.65)"/>
      <circle cx="130" cy="44" r="1.4" fill="rgba(247,162,32,.5)"/>
      <circle cx="20" cy="148" r="1.1" fill="rgba(247,162,32,.4)"/>
      <circle cx="128" cy="140" r="1.5" fill="rgba(247,162,32,.5)"/>
      <circle cx="8" cy="88" r="1.2" fill="rgba(247,162,32,.35)"/>
      <circle cx="142" cy="95" r="1.4" fill="rgba(247,162,32,.45)"/>
      <circle cx="75" cy="14" r="2.2" fill="rgba(247,162,32,.35)"/>
      <circle cx="46" cy="22" r="1" fill="rgba(247,162,32,.3)"/>
      <circle cx="108" cy="18" r="1.2" fill="rgba(247,162,32,.3)"/>
    </svg>
  );
}

function TicketsArt() {
  return (
    <svg viewBox="0 0 150 190" style={{ width:'100%', height:'100%' }}>
      {/* Ticket body */}
      <rect x="18" y="58" width="114" height="68" rx="5" fill="rgba(247,162,32,.08)" stroke="rgba(247,162,32,.3)" strokeWidth="1.2"/>
      {/* Perforation divider */}
      <line x1="60" y1="58" x2="60" y2="126" stroke="rgba(247,162,32,.22)" strokeWidth="1" strokeDasharray="3 4"/>
      {/* Side notches */}
      <circle cx="18" cy="92" r="6.5" fill="#080b18"/>
      <circle cx="132" cy="92" r="6.5" fill="#080b18"/>
      {/* Star in stub */}
      <path d="M39,80 L41.2,87 L48,87 L42.8,91 L44.8,98 L39,94 L33.2,98 L35.2,91 L30,87 L36.8,87 Z" fill="rgba(247,162,32,.48)"/>
      {/* Text lines in body */}
      <line x1="70" y1="74" x2="120" y2="74" stroke="rgba(247,162,32,.35)" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="70" y1="84" x2="114" y2="84" stroke="rgba(247,162,32,.22)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="70" y1="93" x2="117" y2="93" stroke="rgba(247,162,32,.2)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="70" y1="102" x2="110" y2="102" stroke="rgba(247,162,32,.16)" strokeWidth="1" strokeLinecap="round"/>
      {/* Glow base */}
      <ellipse cx="75" cy="130" rx="42" ry="4" fill="rgba(247,162,32,.07)"/>
      {/* Frequency wave */}
      <path d="M22,150 Q36,143 50,150 Q64,157 78,150 Q92,143 106,150 Q120,157 134,150" fill="none" stroke="rgba(247,162,32,.18)" strokeWidth="1.2"/>
      {/* Stars */}
      <circle cx="16" cy="36" r="1.8" fill="rgba(247,162,32,.65)"/>
      <circle cx="130" cy="44" r="1.4" fill="rgba(247,162,32,.5)"/>
      <circle cx="20" cy="148" r="1.1" fill="rgba(247,162,32,.4)"/>
      <circle cx="128" cy="142" r="1.5" fill="rgba(247,162,32,.5)"/>
      <circle cx="75" cy="16" r="2.2" fill="rgba(247,162,32,.35)"/>
      <circle cx="46" cy="26" r="1" fill="rgba(247,162,32,.3)"/>
      <circle cx="108" cy="20" r="1.2" fill="rgba(247,162,32,.3)"/>
    </svg>
  );
}

function DatesArt() {
  return (
    <svg viewBox="0 0 150 190" style={{ width:'100%', height:'100%' }}>
      {/* Calendar body */}
      <rect x="20" y="44" width="110" height="92" rx="5" fill="rgba(247,162,32,.07)" stroke="rgba(247,162,32,.32)" strokeWidth="1.2"/>
      {/* Header bar */}
      <rect x="20" y="44" width="110" height="22" rx="5" fill="rgba(247,162,32,.18)"/>
      <rect x="20" y="55" width="110" height="11" fill="rgba(247,162,32,.18)"/>
      {/* Month label line */}
      <line x1="52" y1="55" x2="98" y2="55" stroke="rgba(247,162,32,.6)" strokeWidth="1.4" strokeLinecap="round"/>
      {/* Ring pegs */}
      <circle cx="48" cy="44" r="4.5" fill="#080b18" stroke="rgba(247,162,32,.38)" strokeWidth="1"/>
      <circle cx="102" cy="44" r="4.5" fill="#080b18" stroke="rgba(247,162,32,.38)" strokeWidth="1"/>
      {/* Horizontal dividers */}
      <line x1="20" y1="82" x2="130" y2="82" stroke="rgba(247,162,32,.14)" strokeWidth="0.8"/>
      <line x1="20" y1="100" x2="130" y2="100" stroke="rgba(247,162,32,.14)" strokeWidth="0.8"/>
      <line x1="20" y1="118" x2="130" y2="118" stroke="rgba(247,162,32,.14)" strokeWidth="0.8"/>
      {/* Vertical dividers */}
      <line x1="36" y1="66" x2="36" y2="136" stroke="rgba(247,162,32,.1)" strokeWidth="0.8"/>
      <line x1="52" y1="66" x2="52" y2="136" stroke="rgba(247,162,32,.1)" strokeWidth="0.8"/>
      <line x1="68" y1="66" x2="68" y2="136" stroke="rgba(247,162,32,.1)" strokeWidth="0.8"/>
      <line x1="84" y1="66" x2="84" y2="136" stroke="rgba(247,162,32,.1)" strokeWidth="0.8"/>
      <line x1="100" y1="66" x2="100" y2="136" stroke="rgba(247,162,32,.1)" strokeWidth="0.8"/>
      <line x1="116" y1="66" x2="116" y2="136" stroke="rgba(247,162,32,.1)" strokeWidth="0.8"/>
      {/* Day dots — row 1 */}
      <circle cx="28" cy="74" r="2.2" fill="rgba(247,162,32,.2)"/>
      <circle cx="44" cy="74" r="2.2" fill="rgba(247,162,32,.2)"/>
      <circle cx="60" cy="74" r="2.2" fill="rgba(247,162,32,.2)"/>
      <circle cx="76" cy="74" r="2.2" fill="rgba(247,162,32,.2)"/>
      <circle cx="92" cy="74" r="2.2" fill="rgba(247,162,32,.2)"/>
      <circle cx="108" cy="74" r="2.2" fill="rgba(247,162,32,.2)"/>
      <circle cx="124" cy="74" r="2.2" fill="rgba(247,162,32,.2)"/>
      {/* Day dots — row 2 */}
      <circle cx="28" cy="91" r="2.2" fill="rgba(247,162,32,.16)"/>
      <circle cx="44" cy="91" r="2.2" fill="rgba(247,162,32,.16)"/>
      <circle cx="60" cy="91" r="2.2" fill="rgba(247,162,32,.16)"/>
      <circle cx="76" cy="91" r="2.2" fill="rgba(247,162,32,.16)"/>
      <circle cx="92" cy="91" r="2.2" fill="rgba(247,162,32,.16)"/>
      {/* Highlighted dates (22 & 23 Aug) */}
      <circle cx="108" cy="91" r="6" fill="rgba(247,162,32,.55)" stroke="rgba(247,162,32,.85)" strokeWidth="1.2"/>
      <circle cx="124" cy="91" r="6" fill="rgba(247,162,32,.38)" stroke="rgba(247,162,32,.65)" strokeWidth="1.2"/>
      {/* Day dots — row 3 */}
      <circle cx="28" cy="109" r="2.2" fill="rgba(247,162,32,.12)"/>
      <circle cx="44" cy="109" r="2.2" fill="rgba(247,162,32,.12)"/>
      <circle cx="60" cy="109" r="2.2" fill="rgba(247,162,32,.12)"/>
      {/* Glow base */}
      <ellipse cx="75" cy="140" rx="40" ry="4" fill="rgba(247,162,32,.07)"/>
      {/* Stars */}
      <circle cx="16" cy="28" r="1.8" fill="rgba(247,162,32,.6)"/>
      <circle cx="130" cy="36" r="1.4" fill="rgba(247,162,32,.5)"/>
      <circle cx="18" cy="162" r="1.1" fill="rgba(247,162,32,.38)"/>
      <circle cx="132" cy="156" r="1.4" fill="rgba(247,162,32,.42)"/>
      <circle cx="36" cy="18" r="1" fill="rgba(247,162,32,.32)"/>
      <circle cx="114" cy="16" r="1.6" fill="rgba(247,162,32,.32)"/>
      <circle cx="8" cy="95" r="1" fill="rgba(247,162,32,.28)"/>
    </svg>
  );
}

/* ---------- tarot card ---------- */
const cardDefs = [
  { numeral: 'I',   label: 'Tickets', Art: TicketsArt, headline: 'First to get tickets.', sub: 'Sign up & be the first to secure your spot at the festival.' },
  { numeral: 'II',  label: 'Lineup',  Art: LineupArt,  headline: 'First to know the lineup.', sub: 'Sign up & be the first to know who\'s taking the stage.' },
  { numeral: 'III', label: 'Dates',   Art: DatesArt,   headline: 'First to know the dates.', sub: 'Sign up & be the first to mark your calendar.' },
];

function TarotCard({ numeral, label, Art, index, isFlipped, onFlip, headline, sub }: {
  numeral: string; label: string; Art: () => React.ReactNode;
  index: number; isFlipped: boolean; onFlip: (label: string) => void;
  headline: string; sub: string;
}) {
  const [email,    setEmail]    = useState('');
  const [focused,  setFocused]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);
  const [error,    setError]    = useState('');

  const submit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return; }
      setDone(true);
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const cardStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden' as React.CSSProperties['WebkitBackfaceVisibility'],
    background: 'linear-gradient(155deg, #0e1228 0%, #080b18 55%, #0b0f1e 100%)',
    borderRadius: 10,
    border: '1px solid rgba(247,162,32,.18)',
    boxShadow: '0 12px 60px rgba(0,0,0,.7), 0 0 80px rgba(247,162,32,.04)',
    overflow: 'hidden',
  };

  return (
    <motion.div
      initial={{ opacity:0, y:48, rotateX:8 }}
      animate={{ opacity:1, y:0, rotateX:0 }}
      whileHover={!isFlipped ? { scale:1.06, y:-12 } : {}}
      transition={{ duration:.9, delay: .4 + index * .18, ease:[.16,1,.3,1] }}
      style={{ perspective:1400, width:210, height:330, flexShrink:0, zIndex: isFlipped ? 10 : 1 }}
      className="tarot-card-wrapper"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration:.75, ease:[.16,1,.3,1] }}
        style={{ width:'100%', height:'100%', position:'relative', transformStyle:'preserve-3d' }}
      >

        {/* ── FRONT ── */}
        <div style={{ ...cardStyle, cursor:'none' }} onClick={() => onFlip(label)}>
          <CardBorder />

          {/* Subtle noise overlay */}
          <div style={{ position:'absolute', inset:0, opacity:.025,
            backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize:'120px 120px', pointerEvents:'none' }} />

          {/* Roman numeral */}
          <div style={{ position:'absolute', top:26, left:0, right:0, textAlign:'center',
            fontSize:'.48rem', fontWeight:700, letterSpacing:'.32em', color:'rgba(247,162,32,.4)', textTransform:'uppercase' }}>
            {numeral}
          </div>

          {/* Art */}
          <div style={{ position:'absolute', top:48, left:24, right:24, bottom:88,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:'72%', height:'72%' }}>
              <Art />
            </div>
          </div>

          {/* Bottom label */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0 }}>
            {/* Gold divider */}
            <div style={{ margin:'0 22px 12px', height:1, background:'linear-gradient(to right, transparent, rgba(247,162,32,.45), transparent)' }} />
            <div style={{ textAlign:'center', paddingBottom:18 }}>
              {/* Tap to reveal */}
              <motion.p
                animate={{ opacity:[.35,.7,.35] }}
                transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut', delay: index * .4 }}
                style={{ fontSize:'.64rem', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(247,162,32,.7)', marginBottom:8 }}>
                Tap to reveal
              </motion.p>
              {/* Label */}
              <div style={{
                fontSize:'.95rem', fontWeight:900, letterSpacing:'.22em',
                textTransform:'uppercase',
                background:'linear-gradient(135deg, var(--gold) 0%, #ffd980 50%, var(--w) 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                filter:'drop-shadow(0 0 8px rgba(247,162,32,.25))',
              }}>
                {label}
              </div>
              {/* Three dots */}
              <div style={{ display:'flex', justifyContent:'center', gap:5, marginTop:7 }}>
                {[0,1,2].map(i => (
                  <motion.div key={i}
                    animate={{ opacity:[.3,.8,.3] }}
                    transition={{ duration:2.4, repeat:Infinity, ease:'easeInOut', delay: index * .5 + i * .25 }}
                    style={{ width:3, height:3, borderRadius:'50%', background:'rgba(247,162,32,.55)' }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div onClick={() => onFlip(label)} style={{ ...cardStyle, transform:'rotateY(180deg)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          padding:'24px 18px', gap:0, border:'1px solid rgba(247,162,32,.28)',
          boxShadow:'0 12px 60px rgba(0,0,0,.7), 0 0 100px rgba(247,162,32,.07)', cursor:'none' }}>
          <CardBorder bright />

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                onClick={e => e.stopPropagation()}
                style={{ position:'relative', zIndex:1, width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:16, textAlign:'center' }}>

                {/* Copy */}
                <div>
                  <p style={{ fontSize:'.62rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--gold)', lineHeight:1.4 }}>
                    {headline}
                  </p>
                  <p style={{ fontSize:'.42rem', fontWeight:300, letterSpacing:'.08em', textTransform:'uppercase',
                    color:'var(--dim2)', marginTop:8, lineHeight:1.8 }}>
                    {sub}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={submit} style={{ width:'100%', display:'flex', flexDirection:'column', gap:8 }}>
                  <div style={{
                    background:'rgba(4,6,14,.8)',
                    border:`1px solid ${focused ? 'rgba(247,162,32,.5)' : 'rgba(232,229,222,.1)'}`,
                    borderRadius:50,
                    transition:'border-color .25s, box-shadow .25s',
                    boxShadow: focused ? '0 0 0 3px rgba(247,162,32,.07)' : 'none',
                    display:'flex', alignItems:'center', paddingLeft:12, overflow:'hidden',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={focused ? 'rgba(247,162,32,.5)' : 'rgba(232,229,222,.2)'} strokeWidth="1.5" style={{ flexShrink:0, transition:'stroke .25s' }}>
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(''); }}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="your@email.com"
                      style={{
                        flex:1, minWidth:0, background:'transparent', border:'none', outline:'none',
                        color:'var(--w)', fontSize:'.58rem', fontWeight:300,
                        fontFamily:'DelaGothicOne, sans-serif', letterSpacing:'.04em',
                        padding:'11px 10px', overflow:'hidden', textOverflow:'ellipsis',
                      }}
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        style={{ fontSize:'.42rem', color:'#f87171', letterSpacing:'.08em', textTransform:'uppercase' }}>
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button type="submit" disabled={loading} style={{
                    width:'100%', padding:'11px',
                    background: loading ? 'rgba(247,162,32,.4)' : 'var(--gold)',
                    border:'none', borderRadius:50,
                    color:'var(--navy)', fontSize:'.58rem', fontWeight:700,
                    letterSpacing:'.14em', textTransform:'uppercase',
                    cursor: loading ? 'default' : 'none',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                    transition:'background .2s',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background='var(--gold2)'; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background='var(--gold)'; }}>
                    {loading ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation:'spin .8s linear infinite' }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                    ) : <>Notify Me <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg></>}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="success"
                initial={{ opacity:0, scale:.94 }} animate={{ opacity:1, scale:1 }}
                transition={{ duration:.5, ease:[.16,1,.3,1] }}
                onClick={e => e.stopPropagation()}
                style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:14, textAlign:'center' }}>
                <motion.div
                  initial={{ scale:0 }} animate={{ scale:1 }}
                  transition={{ delay:.12, duration:.5, ease:[.16,1,.3,1] }}
                  style={{
                    width:48, height:48, borderRadius:'50%',
                    background:'rgba(247,162,32,.12)', border:'1px solid rgba(247,162,32,.45)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </motion.div>
                <div>
                  <p style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--w)' }}>
                    You&apos;re in.
                  </p>
                  <p style={{ fontSize:'.44rem', fontWeight:300, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--dim)', marginTop:8, lineHeight:1.8 }}>
                    We&apos;ll tell you first<br/>when the {label.toLowerCase()}<br/>is revealed.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- main ---------- */
export default function ComingSoon() {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [mobileTop,    setMobileTop]    = useState(0);
  const [isMobile,     setIsMobile]     = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlippedCards(prev => new Set([...prev, 'Tickets']));
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleFlip = (label: string) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  const handleMobileTab = (i: number) => {
    setMobileTop(i);
  };

  const fade = {
    hidden: { opacity:0, y:28 },
    show: (d: number) => ({ opacity:1, y:0, transition:{ duration:.9, delay:d, ease:[.16,1,.3,1] as [number,number,number,number] } }),
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', position:'relative', isolation:'isolate', overflow:'hidden' }}>

      {/* ── Background ── */}
      <div style={{
        position:'absolute', inset:'-5%', width:'110%', height:'110%',
        backgroundImage:"url('/hero-banner.jpg')",
        backgroundSize:'cover', backgroundPosition:'center 38%',
        opacity:.42, animation:'heroZoom 30s ease-in-out alternate infinite',
      }} />
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to bottom, rgba(8,11,24,.72) 0%, rgba(8,11,24,.32) 28%, rgba(8,11,24,.58) 65%, rgba(8,11,24,.92) 100%)',
      }} />
      <WaveCanvas />

      {/* ── Logo ── */}
      <motion.header initial={{ y:-60, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ duration:.7, ease:[.16,1,.3,1] }}
        style={{ position:'relative', zIndex:10, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px clamp(20px,4vw,60px) 0' }}>
        <a href="#" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Image src="/logo-icon.png" alt="Sunset Port Festival" width={200} height={200}
            style={{ height:200, width:'auto', marginTop:4 }} priority />
        </a>
      </motion.header>

      {/* ── Main ── */}
      <main style={{
        position:'relative', zIndex:2,
        flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        textAlign:'center', padding:'12px 24px 120px',
        gap:'clamp(12px,2vh,24px)',
      }}>

        <motion.p custom={.15} variants={fade} initial="hidden" animate="show"
          style={{ fontSize:'.62rem', fontWeight:600, letterSpacing:'.32em', textTransform:'uppercase', color:'var(--gold)' }}>
          Live The Moment
        </motion.p>

        <motion.div custom={.3} variants={fade} initial="hidden" animate="show">
          <div className="cs-title" style={{
            fontWeight:900, textTransform:'uppercase',
            lineHeight:1, letterSpacing:'-.02em',
            textShadow:'0 0 80px rgba(247,162,32,.15)',
            textAlign:'center',
          }}>
            <span style={{ color:'var(--w)' }}>Coming </span>
            <span style={{ color:'var(--gold)' }}>Soon</span>
          </div>
        </motion.div>

        {/* Banner slot */}
        <div id="banner-slot" style={{ width:'100%', maxWidth:680, minHeight:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
          {/* Drop banner here */}
        </div>

        {/* ── Tarot cards ── */}
        {isMobile ? (
          /* ── Mobile: stacked deck ── */
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:24 }}>
            {/* Stack */}
            <div style={{ position:'relative', width:230, height:372 }}>
              {cardDefs.map((c, i) => {
                const pos = (i - mobileTop + 3) % 3;
                const stackStyles: React.CSSProperties = pos === 0
                  ? { position:'absolute', left:'50%', top:0,
                      transform:'translateX(-50%)',
                      zIndex:3, opacity:1, pointerEvents:'auto',
                      transition:'all .55s cubic-bezier(.16,1,.3,1)' }
                  : pos === 1
                  ? { position:'absolute', left:'50%', top:18,
                      transform:'translateX(calc(-50% - 22px)) rotate(-8deg)',
                      zIndex:2, opacity:0.72, pointerEvents:'none',
                      transition:'all .55s cubic-bezier(.16,1,.3,1)' }
                  : { position:'absolute', left:'50%', top:32,
                      transform:'translateX(calc(-50% + 22px)) rotate(8deg)',
                      zIndex:1, opacity:0.5, pointerEvents:'none',
                      transition:'all .55s cubic-bezier(.16,1,.3,1)' };
                return (
                  <div key={c.label} style={stackStyles}>
                    <TarotCard numeral={c.numeral} label={c.label} Art={c.Art} index={i}
                      isFlipped={flippedCards.has(c.label)} onFlip={handleFlip}
                      headline={c.headline} sub={c.sub} />
                  </div>
                );
              })}
            </div>

            {/* Tab switcher */}
            <div style={{ display:'flex', gap:8 }}>
              {cardDefs.map((c, i) => (
                <button key={c.label} onClick={() => handleMobileTab(i)} style={{
                  padding:'7px 16px',
                  background: mobileTop === i ? 'var(--gold)' : 'transparent',
                  border:`1px solid ${mobileTop === i ? 'var(--gold)' : 'rgba(247,162,32,.3)'}`,
                  borderRadius:50,
                  color: mobileTop === i ? 'var(--navy)' : 'rgba(247,162,32,.6)',
                  fontSize:'.45rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase',
                  transition:'all .25s', cursor:'none',
                }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Desktop: flex row ── */
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:20, width:'100%' }}
               className="tarot-row">
            {cardDefs.map((c, i) => (
              <TarotCard key={c.label} numeral={c.numeral} label={c.label} Art={c.Art} index={i}
                isFlipped={flippedCards.has(c.label)} onFlip={handleFlip}
                headline={c.headline} sub={c.sub} />
            ))}
          </div>
        )}

        {/* Socials */}
        <motion.div custom={.9} variants={fade} initial="hidden" animate="show"
          style={{ display:'flex', gap:22, marginTop:4 }}>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
              style={{ color:'rgba(232,229,222,.25)', transition:'color .2s, transform .2s' }}
              onMouseEnter={e => { e.currentTarget.style.color='var(--gold)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(232,229,222,.25)'; e.currentTarget.style.transform='none'; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={s.d}/></svg>
            </a>
          ))}
        </motion.div>
      </main>

<Ticker />

      {/* ── Footer ── */}
      <footer style={{ position:'relative', zIndex:10, borderTop:'1px solid var(--bdr)', padding:'16px clamp(20px,4vw,60px)',
        display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8,
        background:'rgba(4,6,14,.65)', backdropFilter:'blur(12px)' }}>
        <p style={{ fontSize:'.52rem', fontWeight:300, letterSpacing:'.06em', textTransform:'uppercase', color:'rgba(232,229,222,.2)' }}>
          Sunset Port Festival® · 2026 · All Rights Reserved
        </p>
      </footer>

      <style>{`
        .cs-title { font-size: 2.6rem; white-space: nowrap; }
        @media (max-width: 900px)  { .cs-title { font-size: clamp(2rem,8vw,3rem); white-space: normal; } }
        @keyframes heroZoom { from{transform:scale(1) translate(0,0)} to{transform:scale(1.07) translate(-1%,-.5%)} }
        @keyframes pulse    { 0%,100%{opacity:.2} 50%{opacity:1} }
        @keyframes lineDown { 0%{transform:scaleY(0);transform-origin:top;opacity:0} 50%{transform:scaleY(1);transform-origin:top;opacity:1} 100%{transform:scaleY(0);transform-origin:bottom;opacity:0} }
        @keyframes tickerScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes wiggle   {
          0%,100% { transform:rotate(0deg) scale(1.06) translateY(-12px); }
          20%     { transform:rotate(-2.5deg) scale(1.06) translateY(-12px); }
          40%     { transform:rotate(2.5deg)  scale(1.07) translateY(-13px); }
          60%     { transform:rotate(-1.5deg) scale(1.06) translateY(-12px); }
          80%     { transform:rotate(1deg)    scale(1.06) translateY(-12px); }
        }
        .tarot-card-wrapper:hover { animation: wiggle 0.55s ease forwards; }
        .tarot-card-wrapper:hover > * { box-shadow: 0 24px 80px rgba(0,0,0,.6), 0 0 60px rgba(247,162,32,.14) !important; }
        @media (max-width:720px) {
          .tarot-card-wrapper:hover { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
