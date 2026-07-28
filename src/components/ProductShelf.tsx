'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

/*
 * "Kitap rafı" ürün vitrini — simsekweb2'nin Bookshelf bileşeninden
 * uyarlandı (hover'da açılan sırt/sayfa etkileşimi), web'in kendi renk
 * ve tipografi diliyle giydirildi.
 */

interface ShelfItem {
  name: string;
  note?: string;
  isNew?: boolean;
  image?: string | null;
}

export function ProductShelf({
  items,
  accent,
  fallbackIcon,
  groupLabel,
  detailSoonLabel,
  newLabel,
}: {
  items: ShelfItem[];
  accent: string;
  fallbackIcon: ReactNode;
  groupLabel: string;
  detailSoonLabel: string;
  newLabel: string;
}) {
  const shelfRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (!isTouch) return;
    const onDocClick = (e: MouseEvent) => {
      if (!shelfRef.current?.contains(e.target as Node)) setOpenIndex(null);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div ref={shelfRef} className="shelf" role="list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <article
            key={`${item.name}-${i}`}
            role="listitem"
            tabIndex={0}
            className={`shelf-book${isOpen ? ' is-open' : ''}`}
            aria-label={item.name}
            style={{ '--shelf-accent': accent } as React.CSSProperties}
            onClick={(e) => {
              const isTouch = window.matchMedia('(hover: none)').matches;
              if (!isTouch) return;
              e.stopPropagation();
              setOpenIndex((cur) => (cur === i ? null : i));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenIndex((cur) => (cur === i ? null : i));
              }
              if (e.key === 'Escape') setOpenIndex(null);
            }}
          >
            <div className="shelf-spine" aria-hidden="true">
              <span className="shelf-spine-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="shelf-spine-title">{item.name}</span>
              <span className="shelf-spine-mark" />
            </div>

            <div className="shelf-page">
              <div className="shelf-page-media">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`${item.name} — Şimşek Solar${item.note ? ` (${item.note})` : ''}`}
                    fill
                    sizes="(max-width: 833px) 100vw, 38vw"
                    className="object-contain p-6"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center">{fallbackIcon}</span>
                )}
              </div>
              <div className="shelf-page-body">
                <p className="overline-mini" style={{ color: accent }}>
                  {groupLabel}
                </p>
                <h4 className="mt-2 font-display text-lg font-bold text-white sm:text-xl">{item.name}</h4>
                {item.note && <p className="mt-2 text-sm leading-relaxed text-white/70">{item.note}</p>}
                {item.isNew && (
                  <span
                    className="mt-3 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-graphite-900"
                    style={{ background: accent }}
                  >
                    <Sparkles size={10} />
                    {newLabel}
                  </span>
                )}
                <p className="mt-auto pt-4 text-xs font-medium text-white/45">{detailSoonLabel}</p>
              </div>
            </div>
          </article>
        );
      })}

      <style jsx>{`
        .shelf {
          display: flex;
          gap: 8px;
          height: 460px;
          align-items: stretch;
        }
        .shelf-book {
          position: relative;
          flex: 1 1 0;
          min-width: 58px;
          overflow: hidden;
          border-radius: 14px 14px 4px 4px;
          background: linear-gradient(180deg, #1a244c 0%, #0d1329 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          outline-offset: 2px;
          transition: flex-grow 0.55s cubic-bezier(0.32, 0.72, 0.28, 1);
        }
        .shelf-book:hover,
        .shelf-book:focus-visible,
        .shelf-book.is-open {
          flex-grow: 7;
        }
        .shelf-spine {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
          transition: opacity 0.3s ease 0.1s;
        }
        .shelf-book:hover .shelf-spine,
        .shelf-book:focus-visible .shelf-spine,
        .shelf-book.is-open .shelf-spine {
          opacity: 0;
          transition-delay: 0s;
        }
        .shelf-spine-index {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
        }
        .shelf-spine-title {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(0.8rem, 1.3vw, 1.05rem);
          letter-spacing: 0.06em;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 100%;
        }
        .shelf-spine-mark {
          width: 20px;
          height: 4px;
          border-radius: 2px;
          background: var(--shelf-accent);
        }
        .shelf-page {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 4fr 8fr;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .shelf-book:hover .shelf-page,
        .shelf-book:focus-visible .shelf-page,
        .shelf-book.is-open .shelf-page {
          opacity: 1;
          transition-delay: 0.2s;
          pointer-events: auto;
        }
        .shelf-page-media {
          position: relative;
          overflow: hidden;
          background: #141d3d;
        }
        .shelf-page-body {
          padding: clamp(16px, 2.2vw, 32px);
          min-width: 240px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .overline-mini {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        @media (max-width: 833px) {
          .shelf {
            flex-direction: column;
            height: auto;
          }
          .shelf-book {
            flex: 0 0 68px;
            min-height: 68px;
            height: 68px;
            transition: flex-basis 0.5s cubic-bezier(0.32, 0.72, 0.28, 1);
          }
          .shelf-book:hover {
            flex-grow: 1;
          }
          .shelf-book.is-open {
            flex: 0 0 420px;
            height: 420px;
          }
          .shelf-spine {
            flex-direction: row;
            padding: 0 18px;
            justify-content: flex-start;
            gap: 12px;
          }
          .shelf-spine-title {
            writing-mode: horizontal-tb;
            transform: none;
          }
          .shelf-book:hover .shelf-spine {
            opacity: 1;
          }
          .shelf-book.is-open .shelf-spine {
            opacity: 0;
          }
          .shelf-book:hover .shelf-page {
            opacity: 0;
            pointer-events: none;
          }
          .shelf-book.is-open .shelf-page {
            opacity: 1;
            pointer-events: auto;
            grid-template-columns: 1fr;
            grid-template-rows: 160px 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shelf-book,
          .shelf-spine,
          .shelf-page {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
