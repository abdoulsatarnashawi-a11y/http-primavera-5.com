'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BG } from '@/lib/i18n';

export interface SlideItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  image: string;
}

interface HeroSliderProps {
  slides: SlideItem[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setCurrent(((index % total) + total) % total);
      setProgressKey((k) => k + 1);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [total, isPaused, next, current]);

  if (total === 0) {
    return (
      <section className="relative bg-mesh text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{BG.home.heroTitle}</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{BG.home.heroSubtitle}</p>
          <Link href="/products" className="btn-accent text-lg inline-block">{BG.home.shopNow}</Link>
        </div>
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section
      className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
          }`}
        >
          <div className={`absolute inset-0 ${index === current ? 'animate-ken-burns' : ''}`}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
      ))}

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-glow/20 rounded-full blur-3xl z-10 pointer-events-none" />

      <div className="relative z-20 h-full container mx-auto px-4 flex items-center">
        <div
          key={current}
          className="max-w-2xl text-white animate-fade-in-up"
        >
          <span className="inline-flex items-center gap-2 bg-accent/90 backdrop-blur-sm text-white text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 font-bold shadow-glow-red">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {slide.brand} · {slide.model}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-2xl">
            {slide.name}
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-lg hidden sm:block leading-relaxed">
            {BG.home.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/products/${slide.id}`} className="btn-accent">
              {BG.products.details}
            </Link>
            <Link href="/products" className="btn-glass">
              {BG.home.shopNow} →
            </Link>
          </div>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Предишен слайд"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-white/10 hover:bg-accent backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-red group"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Следващ слайд"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-white/10 hover:bg-accent backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow-red group"
          >
            <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
            <div
              key={progressKey}
              className="h-full bg-gradient-to-r from-accent to-accent-light animate-slide-progress"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Слайд ${index + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  index === current
                    ? 'w-10 h-2.5 bg-gradient-to-r from-accent to-accent-light shadow-glow-red'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70 hover:scale-125'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
