import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BrandLogo from '../icons/BrandLogo';

import heroBouquet from '@/assets/images/products/hero_bouquet.png';
import pinkRosesBouquet from '@/assets/images/products/pink_roses_bouquet.png';
import hairclipBouquet from '@/assets/images/products/hairclip_bouquet.png';

const slides = [
  {
    id: 1,
    title: "CRIMSON\nROYALE",
    subtitle: "VELVET BLOOMS & TIMELESS PASSION",
    img1: pinkRosesBouquet,
    img2: heroBouquet,
    img3: pinkRosesBouquet,
    color: "#ff3c00"
  },
  {
    id: 2,
    title: "BLUSHING\nELEGANCE",
    subtitle: "SOFT PETALS & GENTLE GRACE",
    img1: heroBouquet,
    img2: pinkRosesBouquet,
    img3: heroBouquet,
    color: "#ff6bb3"
  },
  {
    id: 3,
    title: "HAIRCLIP\nBLOOMS",
    subtitle: "PUREST ESSENCE & ETERNAL LOVE",
    img1: hairclipBouquet,
    img2: heroBouquet,
    img3: hairclipBouquet,
    color: "#e0e0e0"
  }
];

export const RoseHeroDemo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateParallax = () => {
      // Smooth interpolation for fluid motion
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);

      // Rotate the 3D Canvas
      canvas.style.transform = `rotateX(${55 + currentY / 2}deg) rotateZ(${-25 + currentX / 2}deg)`;

      // Apply depth shift to layers
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = currentX * (index + 1) * 0.2;
        const moveY = currentY * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (window.innerWidth / 2 - e.pageX) / 25;
      targetY = (window.innerHeight / 2 - e.pageY) / 25;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = (window.innerWidth / 2 - e.touches[0].pageX) / 25;
        targetY = (window.innerHeight / 2 - e.touches[0].pageY) / 25;
      }
    };

    // Entrance Animation setup
    canvas.style.opacity = '0';
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)';
    
    const timeout = setTimeout(() => {
      canvas.style.transition = 'opacity 2.5s cubic-bezier(0.16, 1, 0.3, 1), transform 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
      
      // We set target to 0,0 for neutral entry state
      targetX = 0;
      targetY = 0;

      // Start rAF loop after entrance animation initiates
      updateParallax();
      
    }, 300);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const currentSlide = slides[activeIndex];

  return (
    <>
      <style>{`
        :root {
          --rose-bg: #0a0505;
          --rose-silver: #e0d0d0;
          --rose-accent: ${currentSlide.color};
          --grain-opacity: 0.15;
        }

        .rose-hero-body {
          background-color: var(--rose-bg);
          color: var(--rose-silver);
          font-family: 'Syncopate', sans-serif;
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .rose-hero-grain {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 100;
          opacity: var(--grain-opacity);
        }

        .rose-viewport {
          perspective: 2000px;
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }

        .rose-canvas-3d {
          position: relative;
          width: 800px; height: 500px;
          max-width: 90vw;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .rose-layer {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(224, 224, 224, 0.15);
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease, background-image 0.8s ease-in-out, filter 0.8s ease;
          border-radius: 12px;
        }

        .rose-layer-1 { filter: grayscale(0.2) contrast(1.1) brightness(0.8); }
        .rose-layer-2 { filter: grayscale(1) contrast(1.1) brightness(0.7); opacity: 0.6; mix-blend-mode: screen; }
        .rose-layer-3 { filter: grayscale(1) contrast(1.3) brightness(0.8); opacity: 0.4; mix-blend-mode: overlay; }

        .rose-contours {
          position: absolute;
          width: 200%; height: 200%;
          top: -50%; left: -50%;
          background-image: repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.05) 41px, transparent 42px);
          transform: translateZ(120px);
          pointer-events: none;
        }

        .rose-interface-grid {
          position: absolute;
          inset: 0;
          padding: 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 10;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .rose-interface-grid {
             padding: 2rem;
          }
        }

        .rose-hero-title {
          grid-column: 1 / -1;
          align-self: center;
          font-size: clamp(2.5rem, 8vw, 8rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          mix-blend-mode: difference;
          white-space: pre-line;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .rose-hero-title.animating {
          opacity: 0;
          transform: translateY(20px);
        }

        .rose-cta-button {
          pointer-events: auto;
          background: var(--rose-silver);
          color: var(--rose-bg);
          padding: 1rem 2rem;
          text-decoration: none;
          font-weight: 700;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          border: none;
        }

        .rose-cta-button:hover { 
          background: var(--rose-accent); 
          color: white;
          transform: translateY(-5px); 
        }

        .rose-scroll-hint {
          position: absolute;
          bottom: 2rem; left: 50%;
          width: 1px; height: 60px;
          background: linear-gradient(to bottom, var(--rose-silver), transparent);
          animation: rose-flow 2s infinite ease-in-out;
        }

        .rose-nav {
          display: flex;
          gap: 1rem;
          pointer-events: auto;
        }

        .rose-nav-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          border-radius: 50%;
        }

        .rose-nav-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--rose-accent);
          color: var(--rose-accent);
        }

        .rose-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
        }

        @keyframes rose-flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>

      <div className="rose-hero-body">
        {/* SVG Filter for Grain */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="rose-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        <div className="rose-hero-grain" style={{ filter: 'url(#rose-grain)' }}></div>

        <div className="rose-interface-grid">
          <div className="rose-logo">
            <BrandLogo size="default" showText={false} />
            <span style={{ color: 'var(--color-primary-900)' }}>SUGAR_BOWS</span>
          </div>
          
          <div style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--rose-accent)', fontSize: '0.75rem', alignSelf: 'start', transition: 'color 0.8s ease' }}>
            <div>INDEX: 0{activeIndex + 1} / 0{slides.length}</div>
            <div>STATUS: BLOOMING</div>
          </div>

          <h1 className={`rose-hero-title ${isAnimating ? 'animating' : ''}`}>
            {currentSlide.title}
          </h1>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
              <p style={{ color: 'var(--rose-accent)', transition: 'color 0.8s ease' }}>[ COLLECTION {new Date().getFullYear()} ]</p>
              <p className={`rose-subtitle ${isAnimating ? 'animating' : ''}`} style={{ transition: 'opacity 0.5s ease', opacity: isAnimating ? 0 : 1 }}>
                {currentSlide.subtitle}
              </p>
            </div>

            <div className="rose-nav">
              <button className="rose-nav-btn" onClick={handlePrev} aria-label="Previous Slide">
                <ChevronLeft />
              </button>
              <button className="rose-nav-btn" onClick={handleNext} aria-label="Next Slide">
                <ChevronRight />
              </button>
            </div>

            <button className="rose-cta-button">
              EXPLORE DEPTH
            </button>
          </div>
        </div>

        <div className="rose-viewport">
          <div className="rose-canvas-3d" ref={canvasRef}>
            <div 
              className="rose-layer rose-layer-1" 
              style={{ backgroundImage: `url('${currentSlide.img1}')` }}
              ref={(el) => { if (el) layersRef.current[0] = el; }}
            ></div>
            <div 
              className="rose-layer rose-layer-2" 
              style={{ backgroundImage: `url('${currentSlide.img2}')` }}
              ref={(el) => { if (el) layersRef.current[1] = el; }}
            ></div>
            <div 
              className="rose-layer rose-layer-3" 
              style={{ backgroundImage: `url('${currentSlide.img3}')` }}
              ref={(el) => { if (el) layersRef.current[2] = el; }}
            ></div>
            <div className="rose-contours"></div>
          </div>
        </div>

        <div className="rose-scroll-hint"></div>
      </div>
    </>
  );
};
