'use client';

import { useCallback, useEffect, useState } from 'react';
import wedding from '../wedding-details.json';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
type Photo = (typeof wedding.photos)[number];

const weddingMoment = new Date(wedding.countdownTarget);

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, weddingMoment.getTime() - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

function Countdown() {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      setTime(getTimeLeft());
      setReady(true);
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <div className="countdown" aria-label="Countdown to the wedding muhurta">
      {units.map((unit) => (
        <div className="countdown-unit" key={unit.label}>
          <span className="countdown-number">{ready ? String(unit.value).padStart(2, '0') : '--'}</span>
          <span className="countdown-label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

function Ornament({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`ornament ${className}`}>✧ ❧ ✧</span>;
}

function EnvelopeGate({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1250);
  };

  return (
    <div className={`envelope-gate${opening ? ' envelope-gate--opening' : ''}`}>
      <div className="gate-halo" aria-hidden="true" />
      <div className="gate-heading">
        <span className="gate-eyebrow">A LITTLE MOMENT, FROM OUR HEARTS</span>
        <h1>For our favourite people</h1>
        <p>We have something beautiful to share with you.</p>
      </div>
      <button className="envelope-scene" onClick={handleOpen} aria-label="Open the wedding invitation">
        <span className="envelope-shadow" />
        <span className="envelope-back" />
        <span className="envelope-letter">
          <span className="letter-small">TOGETHER WITH OUR FAMILIES</span>
          <span className="letter-monogram">K <i>&</i> H</span>
          <span className="letter-rule">✦</span>
          <span className="letter-names">Kajal &amp; Harshal</span>
          <span className="letter-date">5 DECEMBER 2026</span>
        </span>
        <span className="envelope-front" />
        <span className="envelope-flap" />
        <span className="envelope-seal">K<i>&</i>H</span>
      </button>
      <button className="open-invitation" onClick={handleOpen} disabled={opening}>
        {opening ? 'OPENING YOUR INVITATION' : 'OPEN THE INVITATION'} <span>↗</span>
      </button>
      <p className="gate-footer">Kajal <i>&</i> Harshal · 05.12.2026</p>
    </div>
  );
}

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [shareMessage, setShareMessage] = useState('');
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpened ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpened]);

  useEffect(() => {
    if (!isOpened) return;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let frame = 0;
    const updateParallax = () => {
      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const speed = Number(node.dataset.parallax || '0.08');
        const offset = (window.innerHeight * 0.5 - rect.top) * speed;
        node.style.setProperty('--parallax-shift', `${offset.toFixed(1)}px`);
      });
      frame = 0;
    };
    const requestUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isOpened]);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
      if (event.key === 'ArrowRight') setSelectedPhoto((current) => current === null ? null : (current + 1) % wedding.photos.length);
      if (event.key === 'ArrowLeft') setSelectedPhoto((current) => current === null ? null : (current - 1 + wedding.photos.length) % wedding.photos.length);
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  const shareInvitation = async () => {
    const shareData = {
      title: `${wedding.bride} & ${wedding.groom} — Wedding Invitation`,
      text: `Join us as we celebrate our wedding on ${wedding.displayDate} at ${wedding.venueName}, ${wedding.venueArea}.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage('Thank you for sharing our invitation.');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setShareMessage('Invitation link copied.');
      } else {
        setShareMessage('Copy the website link from your browser to share it.');
      }
    } catch {
      setShareMessage('You can share the website link directly with your guests.');
    }
    window.setTimeout(() => setShareMessage(''), 3500);
  };

  const movePhoto = useCallback((direction: number) => {
    setSelectedPhoto((current) => current === null ? null : (current + direction + wedding.photos.length) % wedding.photos.length);
  }, []);

  return (
    <main>
      {!isOpened && <EnvelopeGate onOpen={() => setIsOpened(true)} />}

      <nav className="site-nav" aria-label="Main navigation">
        <a className="nav-mark" href="#top">K <i>&</i> H</a>
        <div className="nav-links">
          <a href="#story">OUR STORY</a>
          <a href="#celebration">THE DAY</a>
          <a href="#gallery">GALLERY</a>
          <a href="#venue">VENUE</a>
        </div>
        <a className="nav-date" href="#celebration">05 · 12 · 26</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <p className="eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</p>
          <Ornament />
          <p className="hero-kicker">A CELEBRATION OF LOVE &amp; TOGETHERNESS</p>
          <h1>{wedding.bride}<br /><i>&</i> {wedding.groom}</h1>
          <p className="hero-subtitle">Two hearts, one beautiful beginning.</p>
          <div className="hero-date-rule"><span />✦<span /></div>
          <p className="hero-date">05 <b>·</b> DECEMBER <b>·</b> 2026</p>
          <p className="hero-place">HADAPSAR · PUNE</p>
          <a className="hero-scroll" href="#invitation">DISCOVER OUR INVITATION <span>↓</span></a>
        </div>
        <div className="hero-photo-wrap reveal" data-parallax="0.045">
          <div className="hero-photo-frame">
            <img src={wedding.photos[0].src} alt={wedding.photos[0].alt} className="hero-photo" />
            <div className="hero-photo-caption"><span>THE BEGINNING OF FOREVER</span><span>✧</span></div>
          </div>
          <span className="hero-photo-flower" aria-hidden="true">✿</span>
          <span className="hero-side-note">A LOVE STORY · 2026</span>
        </div>
        <div className="hero-bottom-note">A DAY MADE MORE BEAUTIFUL WITH YOU</div>
      </section>

      <section className="invitation-section paper-section" id="invitation">
        <div className="section-inner narrow reveal">
          <p className="eyebrow">✧ &nbsp; THE INVITATION &nbsp; ✧</p>
          <p className="section-kicker">A note from our families</p>
          <h2>With joyful hearts,<br /><em>we invite you.</em></h2>
          <Ornament />
          <p className="body-copy">Together with the blessings of our families, we invite you to join us as Kajal and Harshal begin their journey of togetherness.</p>
          <p className="body-copy">Your presence and blessings will make this celebration all the more special.</p>
          <div className="signature-block">
            <span className="signature-names">Kajal <i>&</i> Harshal</span>
            <span className="signature-caption">A BEGINNING OF FOREVER</span>
          </div>
        </div>
      </section>

      <section className="photo-story-section">
        <div className="photo-story-image" data-parallax="0.08">
          <img src={wedding.photos[5].src} alt={wedding.photos[5].alt} />
          <div className="photo-story-overlay" />
        </div>
        <div className="photo-story-copy reveal">
          <p className="eyebrow light">A LITTLE ABOUT US</p>
          <h2>Every picture<br /><em>holds a moment.</em></h2>
          <p>And every moment becomes a memory. Here are a few pieces of ours that we would love to share with you.</p>
          <a className="light-link" href="#gallery">SEE OUR PHOTOGRAPHS <span>↓</span></a>
        </div>
      </section>

      <section className="countdown-section">
        <div className="countdown-backdrop" data-parallax="0.035"><img src={wedding.photos[9].src} alt="" aria-hidden="true" /></div>
        <div className="countdown-shade" />
        <div className="section-inner reveal">
          <p className="eyebrow light">✧ &nbsp; THE MOMENT APPROACHES &nbsp; ✧</p>
          <h2>Until our <em>wedding day</em></h2>
          <p className="countdown-note">Every moment brings us closer to forever.</p>
          <Countdown />
          <div className="countdown-foot">5 DECEMBER 2026 <span>·</span> 6:17 PM <span>·</span> HADAPSAR, PUNE</div>
        </div>
      </section>

      <section className="celebration-section paper-section" id="celebration">
        <div className="section-inner">
          <div className="reveal">
            <p className="eyebrow">✧ &nbsp; THE CELEBRATION &nbsp; ✧</p>
            <p className="section-kicker">Saturday · 5 December 2026</p>
            <h2>One day, many moments,<br /><em>a lifetime of memories.</em></h2>
            <p className="body-copy celebration-copy">We would be honoured to have you with us throughout the day as our families come together to celebrate.</p>
          </div>
          <div className="event-grid">
            {wedding.events.map((event, index) => (
              <article className="event-card reveal" key={event.name}>
                <div className="event-card-top"><span>0{index + 1}</span><span>✧</span></div>
                <p className="event-overline">{event.eyebrow}</p>
                <h3>{event.name}</h3>
                <p className="event-time">{event.time}</p>
                <p className="event-description">{event.description}</p>
                <span className="event-bottom-rule" />
              </article>
            ))}
          </div>
          <p className="schedule-note">All timings are shown as shared by our families.</p>
        </div>
      </section>

      <section className="venue-section" id="venue">
        <div className="venue-photo" data-parallax="0.06">
          <img src={wedding.photos[3].src} alt={wedding.photos[3].alt} />
          <div className="venue-photo-caption">A PLACE TO GATHER · A DAY TO REMEMBER</div>
        </div>
        <div className="venue-copy reveal">
          <p className="eyebrow light">✧ &nbsp; WHERE WE CELEBRATE &nbsp; ✧</p>
          <p className="section-kicker light-kicker">The wedding venue</p>
          <h2>We saved a place<br /><em>for you.</em></h2>
          <Ornament />
          <h3>{wedding.venueName}</h3>
          <p className="venue-address">{wedding.venueArea}</p>
          <a className="map-button" href={wedding.mapsUrl} target="_blank" rel="noreferrer">OPEN GOOGLE MAPS <span>↗</span></a>
          <p className="venue-map-note">Tap for directions to the wedding venue.</p>
        </div>
      </section>

      <section className="gallery-section paper-section" id="gallery">
        <div className="section-inner">
          <div className="gallery-heading reveal">
            <p className="eyebrow">✧ &nbsp; A FEW FAVOURITE MOMENTS &nbsp; ✧</p>
            <p className="section-kicker">Captured along the way</p>
            <h2>Our little collection<br /><em>of memories.</em></h2>
            <p className="body-copy">A few frames from our journey so far. Tap any photograph to view it up close.</p>
          </div>
          <div className="photo-grid">
            {wedding.photos.map((photo, index) => (
              <button className={`gallery-photo gallery-photo-${index + 1} reveal`} key={photo.src} onClick={() => setSelectedPhoto(index)} aria-label={`View photograph ${index + 1}: ${photo.caption}`}>
                <img src={photo.src} alt={photo.alt} loading={index < 3 ? 'eager' : 'lazy'} />
                <span className="gallery-photo-shade" />
                <span className="gallery-photo-caption"><small>{photo.category}</small><strong>{photo.caption}</strong></span>
                <span className="gallery-zoom">＋</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="families-section paper-section">
        <div className="section-inner narrow reveal">
          <p className="eyebrow">✧ &nbsp; ROOTED IN LOVE &nbsp; ✧</p>
          <p className="section-kicker">With the blessings of our elders</p>
          <h2>Two families,<br /><em>one beautiful beginning.</em></h2>
          <Ornament />
          <p className="body-copy">We are grateful for the love, blessings and good wishes that surround us. We look forward to celebrating this special day with you.</p>
          <div className="family-seal"><span>THE</span><strong>K <i>&</i> H</strong><span>FAMILY CELEBRATION</span></div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-inner reveal">
          <p className="eyebrow light">A CELEBRATION IS MADE COMPLETE BY THOSE WHO SHARE IT</p>
          <Ornament />
          <h2>Your presence will make<br /><em>our day unforgettable.</em></h2>
          <p className="footer-copy">With love, gratitude and warm regards,</p>
          <p className="footer-names">Kajal <i>&</i> Harshal</p>
          <p className="footer-date">05 DECEMBER 2026 · 6:17 PM · HADAPSAR, PUNE</p>
          <div className="footer-actions">
            <button className="share-button" onClick={shareInvitation}>SHARE THIS INVITATION <span>↗</span></button>
            <a className="calendar-button" href="/kajal-harshal-wedding.ics" download>ADD TO CALENDAR <span>↓</span></a>
          </div>
          <p className="share-feedback" aria-live="polite">{shareMessage}</p>
          <div className="footer-bottom"><span>K <i>&</i> H</span><span>WE LOOK FORWARD TO CELEBRATING WITH YOU</span><a href="#top">BACK TO TOP ↑</a></div>
        </div>
      </footer>

      {wedding.musicSrc && (
        <div className="music-control">
          <audio id="wedding-audio" src={wedding.musicSrc} loop />
          <button onClick={() => {
            const audio = document.getElementById('wedding-audio') as HTMLAudioElement | null;
            if (!audio) return;
            if (musicPlaying) audio.pause(); else void audio.play();
            setMusicPlaying(!musicPlaying);
          }} aria-label={musicPlaying ? 'Pause wedding music' : 'Play wedding music'}>
            <span>{musicPlaying ? 'Ⅱ' : '▶'}</span> {musicPlaying ? 'PAUSE MUSIC' : 'PLAY MUSIC'}
          </button>
        </div>
      )}

      {selectedPhoto !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photograph viewer" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close photograph viewer">×</button>
          <button className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); movePhoto(-1); }} aria-label="Previous photograph">‹</button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <img src={wedding.photos[selectedPhoto].src} alt={wedding.photos[selectedPhoto].alt} />
            <div className="lightbox-caption"><span>{wedding.photos[selectedPhoto].category}</span><strong>{wedding.photos[selectedPhoto].caption}</strong><small>{selectedPhoto + 1} / {wedding.photos.length}</small></div>
          </div>
          <button className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); movePhoto(1); }} aria-label="Next photograph">›</button>
        </div>
      )}
    </main>
  );
}
