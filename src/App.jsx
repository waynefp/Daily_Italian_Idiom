import { useState, useCallback, useRef, useMemo } from 'react';
import { toPng } from 'html-to-image';
import { P } from './data/palette';
import { getTodayIdiom, getArchive } from './data/idiomData';
import IdiomIllustration from './components/IdiomIllustration';
import Chip from './components/Chip';
import SectionLabel from './components/SectionLabel';
import SummaryCard from './components/SummaryCard';
import './App.css';

export default function App() {
  const [favorited, setFavorited] = useState(false);
  const [downloadState, setDownloadState] = useState('idle');
  const renderRef = useRef(null);

  const T = useMemo(() => getTodayIdiom(), []);
  const ARCHIVE = useMemo(() => getArchive(), []);

  const handleDownload = useCallback(async () => {
    if (downloadState === 'working') return;
    setDownloadState('working');
    try {
      await document.fonts.ready;
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 150));
    try {
      const node = document.getElementById('summary-card');
      if (!node) throw new Error('no card');
      const dataUrl = await toPng(node, {
        width: 1080,
        height: 1350,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#F4ECD8',
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      const slug = T.idiom.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '');
      const today = new Date().toISOString().slice(0, 10);
      a.download = `${slug}_day-${T.dayNumber}_${today}.png`;
      a.click();
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 1800);
    } catch (err) {
      console.error('Download failed', err);
      setDownloadState('idle');
    }
  }, [downloadState]);

  return (
    <div style={{ background: P.bg, minHeight: '100vh', color: P.ink, fontFamily: P.sans }}>
      {/* Top bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 40px',
          borderBottom: `1px solid ${P.line}`,
          background: '#F7EFD9',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 30, height: 30, borderRadius: 8, background: P.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: P.serif, fontWeight: 700, fontSize: 17, fontStyle: 'italic',
            }}
          >
            I
          </div>
          <div>
            <div style={{ fontFamily: P.serif, fontSize: 17, fontWeight: 600, lineHeight: 1 }}>Modi di Dire</div>
            <div
              style={{
                fontFamily: P.mono, fontSize: 10, letterSpacing: 1.2,
                color: P.mute, textTransform: 'uppercase', marginTop: 3,
              }}
            >
              One Italian idiom, every day.
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: 26, fontSize: 13, color: P.mute }}>
          <span style={{ color: P.ink, fontWeight: 600 }}>Today</span>
          <span>Archive</span>
          <span>Favorites</span>
          <span>About</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Chip>Day {T.dayNumber} / 365</Chip>
          <div
            style={{
              width: 32, height: 32, borderRadius: '50%', background: '#D9C79F',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: P.serif, fontSize: 13, color: P.ink,
            }}
          >
            G
          </div>
        </div>
      </header>

      {/* Hero grid */}
      <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 40, padding: '36px 40px 0' }}>
        {/* Left: the idiom */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: P.mono, fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: P.mute }}>
              {T.date}
            </span>
            <span style={{ width: 4, height: 4, borderRadius: 4, background: P.mute, opacity: 0.5 }} />
            <span style={{ fontFamily: P.mono, fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: P.accent, fontWeight: 600 }}>
              Today's idiom
            </span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: P.serif, fontWeight: 500, fontSize: 84, lineHeight: 0.95,
              letterSpacing: -2, margin: '0 0 14px', color: P.ink, fontStyle: 'italic',
            }}
          >
            {(() => {
              const words = T.idiom.replace(/[!?.]$/, '').split(' ');
              const punct = T.idiom.match(/[!?.]$/)?.[0] || '';
              const last = words.pop();
              return <>{words.join(' ')}{words.length ? ' ' : ''}<span style={{ color: P.accent }}>{last}</span>{punct}</>;
            })()}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 30, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: P.mono, fontSize: 13, color: P.mute }}>{T.pronunciation}</span>
            <button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', border: `1px solid ${P.line}`,
                color: P.ink, borderRadius: 999, padding: '7px 14px',
                fontFamily: P.sans, fontSize: 12,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill={P.accent}>
                <path d="M2 3v6h2l3 3V0L4 3H2z" />
                <path d="M9 4c.8.6.8 3.4 0 4" stroke={P.accent} strokeWidth="1" fill="none" strokeLinecap="round" />
              </svg>
              Listen
            </button>
            <span style={{ fontFamily: P.mono, fontSize: 11, color: P.mute, letterSpacing: 0.6 }}>{T.syllables}</span>
          </div>

          {/* Meaning block */}
          <div className="meaning-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 28 }}>
            <div style={{ padding: '18px 20px', background: P.card, borderRadius: 14, border: `1px solid ${P.line}` }}>
              <div style={{ fontFamily: P.mono, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: P.mute, marginBottom: 8 }}>
                Literal
              </div>
              <div style={{ fontFamily: P.serif, fontSize: 19, lineHeight: 1.35, fontStyle: 'italic', color: P.ink }}>
                {T.literal}
              </div>
              <div style={{ fontFamily: P.sans, fontSize: 12, color: P.mute, marginTop: 8 }}>
                The word-for-word translation: {T.literal}
              </div>
            </div>
            <div style={{ padding: '18px 20px', background: P.accent, borderRadius: 14, color: '#FBF4E2' }}>
              <div style={{ fontFamily: P.mono, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.75, marginBottom: 8 }}>
                What it actually means
              </div>
              <div style={{ fontFamily: P.serif, fontSize: 19, lineHeight: 1.35 }}>
                {T.actual.split('.')[0]}.
              </div>
            </div>
          </div>

          {/* Meta chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
            <Chip tone="accent">{'\u25CF'} {T.difficulty}</Chip>
            <Chip>{'\u25D0'} {T.register}</Chip>
            <Chip>{'\u25CE'} {T.region}</Chip>
          </div>
        </div>

        {/* Right: illustration card */}
        <div
          style={{
            background: P.card, borderRadius: 20, border: `1px solid ${P.line}`,
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{ background: '#EFE5D3' }}>
            <IdiomIllustration height={320} />
          </div>
          <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${P.line}` }}>
            <div>
              <div style={{ fontFamily: P.mono, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: P.mute }}>
                Visualize it
              </div>
              <div style={{ fontFamily: P.serif, fontSize: 15, fontStyle: 'italic', marginTop: 4, color: P.ink }}>
                Visualize the literal meaning and let the image help you remember: <em>{T.idiom}</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Examples & situations */}
      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, padding: '40px 40px 0' }}>
        <div>
          <SectionLabel num="01">In conversation</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {T.examples.map((ex, i) => (
              <div
                key={i}
                style={{
                  background: P.card, border: `1px solid ${P.line}`, borderRadius: 14,
                  padding: '16px 20px', borderLeft: `3px solid ${P.accent}`,
                }}
              >
                <div style={{ fontFamily: P.serif, fontSize: 18, lineHeight: 1.4, color: P.ink, fontStyle: 'italic' }}>
                  {ex.it}
                </div>
                <div style={{ fontFamily: P.sans, fontSize: 13, color: P.mute, marginTop: 4 }}>{ex.en}</div>
                {ex.reply && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${P.line}` }}>
                    <div style={{ fontFamily: P.serif, fontSize: 18, lineHeight: 1.4, color: P.accent, fontStyle: 'italic', fontWeight: 500 }}>
                      {ex.reply.it}
                    </div>
                    <div style={{ fontFamily: P.sans, fontSize: 13, color: P.mute, marginTop: 4 }}>{ex.reply.en}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel num="02">When to use it</SectionLabel>
          <div
            style={{
              background: '#F7EFD9', border: `1px solid ${P.line}`,
              borderRadius: 14, padding: '8px 4px',
            }}
          >
            {T.situations.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', gap: 14, padding: '14px 18px',
                  borderBottom: i < T.situations.length - 1 ? `1px dashed ${P.line}` : 'none',
                }}
              >
                <div style={{ fontFamily: P.mono, fontSize: 11, color: P.accent, fontWeight: 600, flexShrink: 0, paddingTop: 2 }}>
                  0{i + 1}
                </div>
                <div style={{ fontFamily: P.serif, fontSize: 15, lineHeight: 1.45, color: P.ink }}>{s}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <SectionLabel num="03">Origin</SectionLabel>
            <div style={{ background: P.card, border: `1px solid ${P.line}`, borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ fontFamily: P.serif, fontSize: 15, lineHeight: 1.55, color: P.ink, fontStyle: 'italic' }}>
                {T.origin}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Archive strip */}
      <div style={{ padding: '48px 40px 32px' }}>
        <SectionLabel num="04">This week in the archive</SectionLabel>
        <div className="archive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 10 }}>
          {ARCHIVE.map((a, i) => {
            const isToday = a.today;
            const locked = a.locked;
            return (
              <div
                key={i}
                style={{
                  position: 'relative',
                  background: isToday ? P.accent : locked ? 'transparent' : P.card,
                  border: `1px ${locked ? 'dashed' : 'solid'} ${isToday ? P.accent : P.line}`,
                  borderRadius: 12, padding: '12px 12px 14px', minHeight: 86,
                  color: isToday ? '#FBF4E2' : P.ink,
                  opacity: locked ? 0.45 : 1,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: P.mono, fontSize: 11, opacity: 0.7 }}>APR {String(a.d).padStart(2, '0')}</div>
                  {a.fav && <span style={{ color: P.accent, fontSize: 12 }}>{'\u2605'}</span>}
                  {isToday && (
                    <span style={{ fontFamily: P.mono, fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase', opacity: 0.8 }}>
                      Today
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: P.serif, fontSize: 13, lineHeight: 1.25, marginTop: 8,
                    fontStyle: 'italic', fontWeight: 500,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}
                >
                  {a.idiom}
                </div>
                <div
                  style={{
                    fontFamily: P.sans, fontSize: 11, opacity: 0.75, marginTop: 2,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}
                >
                  {a.gloss}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action bar */}
      <div
        className="action-bar"
        style={{
          position: 'sticky', bottom: 20, margin: '0 40px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px 14px 22px',
          background: P.ink, color: '#FBF4E2',
          borderRadius: 999, boxShadow: '0 16px 40px rgba(0,0,0,0.22)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: P.mono, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.55 }}>
            Day {T.dayNumber}
          </span>
          <span style={{ fontFamily: P.serif, fontSize: 15, fontStyle: 'italic' }}>{T.idiom}</span>
        </div>
        <div className="action-bar-buttons" style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setFavorited((v) => !v)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,255,255,0.08)', border: 'none',
              color: 'inherit', borderRadius: 999, padding: '8px 14px',
              fontFamily: P.sans, fontSize: 12,
            }}
          >
            <span style={{ color: favorited ? P.accent : 'currentColor' }}>{favorited ? '\u2605' : '\u2606'}</span>
            {favorited ? 'Saved' : 'Save'}
          </button>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,255,255,0.08)', border: 'none',
              color: 'inherit', borderRadius: 999, padding: '8px 14px',
              fontFamily: P.sans, fontSize: 12,
            }}
          >
            {'\u21C4'} Share
          </button>
          <button
            onClick={handleDownload}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: P.accent, border: 'none',
              color: '#fff', borderRadius: 999, padding: '8px 16px',
              fontFamily: P.sans, fontSize: 12, fontWeight: 600,
            }}
          >
            {'\u2193'}{' '}
            {downloadState === 'working'
              ? 'Rendering\u2026'
              : downloadState === 'done'
                ? 'Downloaded'
                : 'Download PNG summary'}
          </button>
        </div>
      </div>

      {/* Off-screen render target for PNG export */}
      <div id="render-target" ref={renderRef}>
        <SummaryCard idiom={T} />
      </div>
    </div>
  );
}
