import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export const Img = ({ src, alt = '', fallback, loading, eager = false, onError, className = '', ...p }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setErrored(false);
  }, [src]);

  const handleError = (e) => {
    if (!errored) {
      setErrored(true);
      if (fallback) {
        setImgSrc(fallback);
      } else if (src && (src.includes('sree-laxmi-balaji') || src.includes('balaji-township'))) {
        setImgSrc('/images/sree-laxmi-balaji-masterplan.jpg');
      } else if (src && src.includes('sri-balaji')) {
        setImgSrc('/images/sri-balaji-county-masterplan.jpg');
      } else {
        setImgSrc('/images/rrr-sree-sreenivasa-map.jpg');
      }
      onError?.(e);
    }
  };

  const isEager = eager || loading === 'eager';

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      loading={isEager ? 'eager' : 'lazy'} 
      fetchPriority={isEager ? 'high' : 'auto'}
      decoding={isEager ? 'sync' : 'async'}
      referrerPolicy="no-referrer" 
      onError={handleError}
      className={className}
      {...p} 
    />
  );
};

/* Headline: clean, high-contrast typography with natural word spacing. Lines starting with "~" are set in italic copper. */
export function Heading({ lines, as: Tag = 'h2', className = '', delay = 0 }) {
  if (!lines || !Array.isArray(lines)) return null;
  return (
    <Tag className={`display ${className}`}>
      {lines.map((line, li) => {
        const em = typeof line === 'string' && line.startsWith('~');
        const text = em ? line.slice(1) : line;
        return (
          <span className={`line ${em ? 'em' : ''}`} key={li} style={{ display: 'block', margin: '2px 0' }}>
            {text}
          </span>
        );
      })}
    </Tag>
  );
}

export function Fade({ children, delay = 0, className = '', y = 28, as = 'div', ...rest }) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }} {...rest}>
      {children}
    </M>
  );
}

/* Count up when scrolled into view. value: "1500+", "165-650", "46" */
export function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [out, setOut] = useState(value.replace(/\d+/g, '0'));
  useEffect(() => {
    if (!inView) return;
    const parts = value.split(/(\d+)/);
    const ctl = animate(0, 1, {
      duration: 2.2, ease: [0.16, 1, 0.3, 1],
      onUpdate: (p) => setOut(parts.map((s) => (/^\d+$/.test(s) ? Math.round(+s * p).toString().padStart(s.length > 1 && s[0] === '0' ? s.length : 0, '0') : s)).join('')),
    });
    return () => ctl.stop();
  }, [inView, value]);
  return <span ref={ref}>{out}</span>;
}

/* 3D tilt with a light sheen that follows the pointer */
export function Tilt({ children, className = '', max = 10 }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 160, damping: 16 }), sy = useSpring(ry, { stiffness: 160, damping: 16 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2); rx.set(-(py - 0.5) * max * 2);
    ref.current.style.setProperty('--mx', px * 100 + '%'); ref.current.style.setProperty('--my', py * 100 + '%');
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <div className="tilt-wrap">
      <motion.div ref={ref} className={`tilt ${className}`} style={{ rotateX: sx, rotateY: sy }} onPointerMove={move} onPointerLeave={leave}>
        {children}
        <i className="sheen" />
      </motion.div>
    </div>
  );
}

/* Image that drifts slower than the page */
export function Parallax({ src, alt, className = '', range = 60 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  return (
    <div ref={ref} className={`parallax ${className}`}>
      <motion.div style={{ y, scale: 1.2 }}><Img src={src} alt={alt} /></motion.div>
    </div>
  );
}

export function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="progress" style={{ scaleX: x }} />;
}

export function Glow() {
  const x = useMotionValue(-200), y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 20 }), sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const f = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('pointermove', f, { passive: true });
    return () => window.removeEventListener('pointermove', f);
  }, []);
  return <motion.div className="glow" style={{ x: sx, y: sy }} aria-hidden="true" />;
}

export function Marquee({ items, speed = 40 }) {
  const row = items.concat(items);
  return (
    <div className="marquee" aria-hidden="false">
      <div className="marquee-track" style={{ animationDuration: speed + 's' }}>
        {row.map((t, i) => (<span key={i}>{t}<i /></span>))}
      </div>
    </div>
  );
}

/* Automatic Continuous Moving Photo Showcase
   Moves automatically without manual scroll, no scroll-related text hints, pauses on hover, click to enlarge */
export function ImageMarquee({ images, onOpen, className = '' }) {
  // Duplicate images for a seamless infinite continuous loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className={`auto-moving-strip-wrapper ${className}`}>
      <div className="auto-moving-track">
        {duplicatedImages.map((img, i) => (
          <div 
            key={i} 
            className="im-card" 
            onClick={() => onOpen?.(img)}
            title={img.title || 'Click to view photo in HD'}
          >
            <div className="im-img-box">
              <Img src={img.src} alt={img.title || 'GEM Group Development'} />
              <span className="im-zoom-badge"><Eye size={13} /> View HD</span>
            </div>
            <div className="im-caption">
              {img.cat && <span className="im-cat">{img.cat}</span>}
              <b className="im-title">{img.title}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { 
      window.removeEventListener('keydown', k); 
      document.body.style.overflow = ''; 
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lb-frame" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close image">
          <X size={20} />
        </button>
        <Img src={item.src} alt={item.title || 'GEM Group Project Photograph'} />
        {item.title && (
          <div className="lb-cap">
            <b>{item.title}</b>
            {item.cat && <small>{item.cat}</small>}
          </div>
        )}
      </div>
    </div>
  );
}

/* Inner-page banner with 100% vibrant, full-color real estate photography and an architectural content card */
export function PageHero({ tag, lines, text, red, bgImage }) {
  return (
    <section className={`page-hero${red ? ' red' : ''}${bgImage ? ' with-bg-image' : ''}`}>
      {bgImage && (
        <motion.div 
          className="page-hero-bg"
          initial={{ scale: 1.06, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Img src={bgImage} alt={tag || 'GEM Group Development'} loading="eager" />
        </motion.div>
      )}
      <div className="wrap page-hero-wrap">
        <motion.div 
          className="page-hero-card"
          initial={{ opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {tag && (
            <div className="page-hero-tag">
              <span className="pht-dot" />
              <span>{tag}</span>
            </div>
          )}
          <Heading as="h1" lines={lines} className="page-title" />
          {text && <p className="page-hero-lead">{text}</p>}
        </motion.div>
      </div>
    </section>
  );
}

/* Carousel: the centre image is highlighted, the side images are smaller and dimmed */
export function Spotlight({ items, ratio = '4/3', onOpen, auto = 3500, className = '' }) {
  const [i, setI] = useState(0), [x, setX] = useState(0), [hold, setHold] = useState(false);
  const vp = useRef(null), tr = useRef(null), n = items.length;
  useEffect(() => {
    const f = () => {
      const s = tr.current?.children[i], v = vp.current;
      if (s && v) setX(v.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2));
    };
    f(); window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, [i, n]);
  useEffect(() => {
    if (hold || !auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), auto);
    return () => clearInterval(t);
  }, [hold, n, auto]);
  const go = (d) => setI((v) => (v + d + n) % n);
  return (
    <div className={`sp ${className}`} style={{ '--ratio': ratio }} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="sp-vp" ref={vp}>
        <motion.div className="sp-track" ref={tr} animate={{ x }} transition={{ type: 'spring', stiffness: 90, damping: 20 }}>
          {items.map((it, k) => (
            <figure key={k} className={`sp-slide ${k === i ? 'on' : ''}`} onClick={() => (k === i ? onOpen?.(it, k) : setI(k))}>
              <Img src={it.src} alt={it.title || `Project photo ${k + 1}`} />
              {it.title && <figcaption><small>{it.cat}</small><b>{it.title}</b></figcaption>}
            </figure>
          ))}
        </motion.div>
      </div>
      <button className="sp-arrow prev" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft /></button>
      <button className="sp-arrow next" onClick={() => go(1)} aria-label="Next image"><ChevronRight /></button>
      <div className="sp-dots">{items.map((_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Show image ${k + 1}`} />)}</div>
    </div>
  );
}
