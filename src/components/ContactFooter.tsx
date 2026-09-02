import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { Copy, Check, ArrowUpRight, Mail } from 'lucide-react';

const HLS_STREAM_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

const SOCIAL_LINKS = [
  { name: 'Twitter', url: 'https://twitter.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Dribbble', url: 'https://dribbble.com' },
  { name: 'GitHub', url: 'https://github.com' },
];

export const ContactFooter: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Initialize flipped HLS Video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        startLevel: -1,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  // GSAP Infinite Continuous Marquee
  useEffect(() => {
    const marqueeTrack = marqueeRef.current;
    if (!marqueeTrack) return;

    const tween = gsap.to(marqueeTrack, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('hello@michaelsmith.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const marqueeText = Array(10).fill('BUILDING THE FUTURE • ').join('');

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-stroke/40"
    >
      {/* Background Flipped Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-40"
          aria-hidden="true"
        />
        {/* Heavier overlay (bg-black/60) */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        {/* Top gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#89AACC] animate-pulse" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
            Initiate Contact
          </span>
        </div>

        {/* Big Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-text-primary mb-6 max-w-3xl">
          Let&apos;s build the <span className="font-display italic">extraordinary</span>.
        </h2>

        <p className="text-sm md:text-base text-muted max-w-md mb-10 leading-relaxed">
          Open for principal engineering leadership, design advisory, and high-impact digital ventures.
        </p>

        {/* CTA Email Button with Gradient Hover Ring */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 sm:mb-20">
          <a
            id="footer-email-button"
            href="mailto:hello@michaelsmith.com"
            className="group relative inline-flex rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105 cursor-pointer shadow-2xl"
          >
            {/* Accent gradient ring */}
            <span className="absolute inset-0 rounded-full accent-gradient opacity-90 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
            <span className="relative z-10 inline-flex items-center gap-3 bg-bg hover:bg-surface rounded-full px-8 py-4 text-sm sm:text-base text-text-primary font-medium transition-colors">
              <Mail className="w-4 h-4 text-[#89AACC]" />
              <span>hello@michaelsmith.com</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>

          {/* Quick Copy Action */}
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-text-primary bg-surface/50 border border-stroke rounded-full px-4 py-3 transition-colors cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* GSAP Continuous Marquee Banner */}
      <div className="relative z-10 w-full overflow-hidden py-4 my-8 border-y border-stroke/40 bg-surface/30 backdrop-blur-sm select-none">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap will-change-transform text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-muted/60"
        >
          <span className="inline-block px-4">{marqueeText}</span>
          <span className="inline-block px-4">{marqueeText}</span>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Availability indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono text-text-primary/90">
            Available for Q3/Q4 2026 projects
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-muted hover:text-text-primary transition-colors tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Location & Copyright */}
        <div className="text-xs font-mono text-muted">
          <span>Chicago, IL &middot; &copy; 2026 Michael Smith</span>
        </div>
      </div>
    </footer>
  );
};
