'use client';

import { useEffect, useState } from 'react';
import type { Scripture } from '@/src/sanity/queries';

const fallbackScriptures: Scripture[] = [
  {
    id: 'fallback-john-316',
    reference: 'John 3:16',
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    translation: 'KJV',
    order: 1,
    active: true,
  },
  {
    id: 'fallback-psalm-119-105',
    reference: 'Psalm 119:105',
    text: 'Thy word is a lamp unto my feet, and a light unto my path.',
    translation: 'KJV',
    order: 2,
    active: true,
  },
  {
    id: 'fallback-mark-1615',
    reference: 'Mark 16:15',
    text: 'Go ye into all the world, and preach the gospel to every creature.',
    translation: 'KJV',
    order: 3,
    active: true,
  },
];

export default function ScriptureTicker({ scriptures }: { scriptures?: Scripture[] }) {
  const verses = scriptures?.filter((scripture) => scripture.text.trim())?.length
    ? scriptures.filter((scripture) => scripture.text.trim())
    : fallbackScriptures;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (verses.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % verses.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [verses.length]);

  const scripture = verses[activeIndex % verses.length];

  return (
    <section aria-label="Scripture of the moment" className="relative mb-12 overflow-hidden border-y border-white/10 py-7">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-yellow-300">
          Scripture of the moment
        </p>
        <div key={scripture.id} className="animate-[scripture-fade-in_500ms_ease-out]">
          <p className="font-serif text-xl leading-relaxed text-white sm:text-2xl">&ldquo;{scripture.text}&rdquo;</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300/75">
            {scripture.reference} · {scripture.translation}
          </p>
        </div>
      </div>
    </section>
  );
}
