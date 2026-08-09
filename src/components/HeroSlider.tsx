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

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [total, isPaused, next]);

  if (total === 0) {
    return (
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{BG.home.heroTitle}</h1>
          <p className="text-xl text-blue-200/80 mb-8 max-w-2xl mx-auto">{BG.home.heroSubtitle}</p>
          <Link href="/products" className="btn-accent text-lg inline-block">
            {BG.home.shopNow}
          </Link>
        </div>
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section
      className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden bg-primary-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-primary-dark/50" />
        </div>
      ))}

      <div className="relative z-20 h-full container mx-auto px-4 flex items-center">
        <div className="max-w-xl text-white">
          <span className="inline-block bg-accent/90 text-white text-xs sm:text-sm px-3 py-1 rounded-full mb-3 font-medium">
            {slide.brand} · {slide.model}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 leading-tight drop-shadow-lg">
            {slide.name}
          </h2>
          <p className="text-blue-100/90 text-sm sm:text-base mb-6 hidden sm:block">
            {BG.home.heroSubtitle}
          </p>
          <div className="flex gap-3">
            <Link href={`/products/${slide.id}`} className="btn-accent text-sm sm:text-base">
              {BG.products.details}
            </Link>
            <Link href="/products" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-sm sm:text-base">
              {BG.home.shopNow}
            </Link>
          </div>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Предишен слайд"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-dark/80 hover:bg-accent border border-white/20 text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Следващ слайд"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-dark/80 hover:bg-accent border border-white/20 text-white flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Слайд ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current ? 'w-8 bg-accent' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
