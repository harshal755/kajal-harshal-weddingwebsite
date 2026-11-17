'use client';

import { useEffect, useState } from 'react';

const weddingDate = new Date('2026-12-05T00:00:00+05:30');
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Netaji+Subhash+Mangal+Karyalay%2C+Manjri+Road%2C+Subhash+Nagar%2C+Chaitanya+Colony%2C+Hadapsar%2C+Pune%2C+Maharashtra+411028';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft {
  const distance = Math.max(0, weddingDate.getTime() - Date.now());
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
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
    <div className="countdown" aria-label="Countdown to the wedding day">
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

export default function Home() {
  const [shareMessage, setShareMessage] = useState('');

  const scrollToInvitation = () => {
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const shareInvitation = async () => {
    const shareData = {
      title: 'Kajal & Harshal — Wedding Invitation',
      text: 'Join us as we celebrate our wedding on 5 December 2026 at Netaji Mangal Karyalay, Hadapsar, Pune.',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage('Invitation shared. Thank you!');
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

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-grain" />
        <div className="hero-frame">
          <div className="top-monogram">K <span>&</span> H</div>
          <div className="hero-copy">
            <p className="eyebrow light">WITH THE BLESSINGS OF GOD & OUR ELDERS</p>
            <Ornament />
            <p className="hero-kicker">A ROYAL CELEBRATION OF LOVE</p>
            <h1>Kajal <i>&</i><br />Harshal</h1>
            <p className="hero-subtitle">Two hearts. Two families. One forever.</p>
            <div className="hero-rule"><span />✦<span /></div>
            <p className="hero-date">05 <b>·</b> DECEMBER <b>·</b> 2026</p>
            <p className="hero-place">HADAPSAR · PUNE</p>
            <button className="unfold-button" onClick={scrollToInvitation}>UNFOLD THE INVITATION <span>↓</span></button>
          </div>
          <div className="hero-bottom">A BEAUTIFUL BEGINNING, A LIFETIME OF TOGETHERNESS</div>
          <span className="corner corner-tl" /><span className="corner corner-tr" />
          <span className="corner corner-bl" /><span className="corner corner-br" />
        </div>
        <div className="side-note">EST. IN LOVE <span>✦</span> 2026</div>
      </section>

      <section className="intro-section paper-section" id="invitation">
        <div className="section-inner narrow">
          <p className="eyebrow">✧ &nbsp; THE INVITATION &nbsp; ✧</p>
          <p className="section-kicker">A note from our families</p>
          <h2>With joyful hearts,<br /><em>we invite you.</em></h2>
          <Ornament />
          <p className="body-copy">Together with the blessings of God and our elders, we invite you to share in the celebration of love as Kajal and Harshal begin their journey of togetherness.</p>
          <p className="body-copy second-copy">Your presence and blessings will make our special day even more memorable.</p>
          <div className="signature-block">
            <span className="signature-names">Kajal <i>&</i> Harshal</span>
            <span className="signature-caption">A BEGINNING OF FOREVER</span>
          </div>
          <div className="invite-detail">
            <span className="invite-small">REQUEST THE HONOUR OF YOUR PRESENCE</span>
            <span className="invite-big">THE WEDDING DAY</span>
            <span className="invite-date">SATURDAY · 05 DECEMBER 2026</span>
            <span className="invite-place">Netaji Mangal Karyalay · Hadapsar, Pune</span>
            <a className="calendar-link" href="/kajal-harshal-wedding.ics" download>ADD TO CALENDAR <span>↓</span></a>
          </div>
        </div>
      </section>

      <section className="countdown-section">
        <div className="section-inner">
          <p className="eyebrow light">✧ &nbsp; THE MOMENT APPROACHES &nbsp; ✧</p>
          <h2>Until our <em>wedding day</em></h2>
          <p className="countdown-note">Every moment brings us closer to forever.</p>
          <Countdown />
          <div className="countdown-foot">5 DECEMBER 2026 <span>·</span> HADAPSAR, PUNE</div>
        </div>
      </section>

      <section className="celebration-section paper-section">
        <div className="section-inner">
          <p className="eyebrow">✧ &nbsp; THE CELEBRATION &nbsp; ✧</p>
          <p className="section-kicker">A day to remember</p>
          <h2>Join us as we celebrate<br /><em>the start of forever.</em></h2>
          <p className="body-copy celebration-copy">One beautiful day, surrounded by the people who mean the most. We would be honoured to have you with us.</p>
          <div className="event-card">
            <div className="event-number">01</div>
            <div className="event-date"><span>DEC</span><strong>05</strong><small>2026</small></div>
            <div className="event-content">
              <span className="event-overline">A PROMISE · A PRAYER · A FOREVER</span>
              <h3>Wedding Ceremony</h3>
              <p className="event-time">Saturday · Time to be shared</p>
              <p className="event-venue">Netaji Mangal Karyalay<br />Hadapsar, Pune</p>
              <a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer">FIND THE VENUE <span>↗</span></a>
            </div>
            <div className="event-flower" aria-hidden="true">✿</div>
          </div>
          <p className="schedule-note">Details of any additional celebrations will be shared with our guests.</p>
        </div>
      </section>

      <section className="venue-section">
        <div className="venue-art" aria-hidden="true"><div className="arch"><div className="arch-inner"><span>✧</span><b>K</b><i>&</i><b>H</b></div></div></div>
        <div className="venue-copy">
          <p className="eyebrow light">✧ &nbsp; WHERE WE BEGIN &nbsp; ✧</p>
          <p className="section-kicker light-kicker">The wedding venue</p>
          <h2>A place for<br /><em>beautiful memories.</em></h2>
          <div className="venue-divider">❧</div>
          <h3>Netaji Mangal Karyalay</h3>
          <p className="venue-address">Manjri Road, Subhash Nagar,<br />Chaitanya Colony, Hadapsar,<br />Pune, Maharashtra 411028</p>
          <a className="map-button" href={mapsUrl} target="_blank" rel="noreferrer">OPEN DIRECTIONS <span>↗</span></a>
          <p className="venue-map-note">Opens the venue location in Google Maps</p>
        </div>
      </section>

      <section className="families-section paper-section">
        <div className="section-inner narrow">
          <p className="eyebrow">✧ &nbsp; ROOTED IN LOVE &nbsp; ✧</p>
          <p className="section-kicker">With the blessings of our elders</p>
          <h2>Two families,<br /><em>one beautiful beginning.</em></h2>
          <Ornament />
          <p className="body-copy">As two hearts come together, two families begin a new chapter. We are grateful for the love, blessings and good wishes that surround us.</p>
          <div className="family-seal"><span>THE</span><strong>K <i>&</i> H</strong><span>FAMILY CELEBRATION</span></div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-inner">
          <p className="eyebrow light">A CELEBRATION IS MADE COMPLETE BY THOSE WHO SHARE IT</p>
          <Ornament />
          <h2>Your presence will make<br /><em>our day unforgettable.</em></h2>
          <p className="footer-copy">With love, gratitude and warm regards,</p>
          <p className="footer-names">Kajal <i>&</i> Harshal</p>
          <p className="footer-date">05 DECEMBER 2026 · HADAPSAR, PUNE</p>
          <button className="share-button" onClick={shareInvitation}>SHARE THIS INVITATION <span>↗</span></button>
          <p className="share-feedback" aria-live="polite">{shareMessage}</p>
          <div className="footer-bottom"><span>K <i>&</i> H</span><span>WE LOOK FORWARD TO CELEBRATING WITH YOU</span><a href="#top">BACK TO TOP ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
