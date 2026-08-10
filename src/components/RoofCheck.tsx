'use client';

import { useState } from 'react';
import { Home, Compass, CloudSun, RotateCcw, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { RoofCheckUi } from '@/lib/roofCheckUi';

/* Soru puanları — dilden bağımsız (etiketlerle aynı sırada). */
const SCORES: number[][] = [
  [1.5, 1.5, 1, 1], // çatı tipi
  [2, 1.5, 1, 0.3], // yön
  [2, 1, 0.2], // gölge
];
const Q_ICONS = [Home, Compass, CloudSun];

function verdictKey(total: number): 'great' | 'good' | 'maybe' | 'survey' {
  if (total >= 4.5) return 'great';
  if (total >= 3.3) return 'good';
  if (total >= 2) return 'maybe';
  return 'survey';
}

export function RoofCheck({ labels }: { labels: RoofCheckUi }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const total = answers.length === 3 ? answers.reduce((a, b) => a + b, 0) : -1;
  const done = answers.length === 3;

  function choose(optIndex: number) {
    const score = SCORES[step][optIndex];
    const next = [...answers];
    next[step] = score;
    setAnswers(next);
    if (step < 2) setStep(step + 1);
  }

  function reset() {
    setStep(0);
    setAnswers([]);
  }

  const QIcon = Q_ICONS[step];
  const vk = done ? verdictKey(total) : 'good';
  const verdict = labels.verdicts[vk];
  const MAX_SCORE = 5.5; // Q1 1.5 + Q2 2 + Q3 2
  const score = done ? Math.max(0, Math.min(100, Math.round((total / MAX_SCORE) * 100))) : 0;
  const RING_C = 188.5; // 2πr, r=30

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-mist-900/10 bg-white p-6 shadow-card sm:p-9">
        {!done ? (
          <>
            {/* İlerleme */}
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-volt-100 text-volt-700">
                <QIcon size={22} strokeWidth={1.75} />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-mist-500">
                {labels.stepOf.replace('{a}', String(step + 1)).replace('{b}', '3')}
              </span>
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-mist-100">
              <div className="h-full rounded-full bg-volt-500 transition-all" style={{ width: `${((step + 1) / 3) * 100}%` }} />
            </div>

            <h3 className="mt-6 font-display text-xl font-bold text-graphite-950">{labels.questions[step].q}</h3>
            <div className="mt-5 grid gap-2.5">
              {labels.questions[step].options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(i)}
                  className="flex items-center justify-between rounded-2xl border border-mist-900/12 bg-mist-50 px-5 py-3.5 text-start text-sm font-semibold text-graphite-900 transition-all hover:-translate-y-0.5 hover:border-volt-500 hover:bg-white"
                >
                  {opt}
                  <ArrowUpRight size={16} className="text-mist-400 rtl:rotate-90" />
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-mist-600 transition-colors hover:text-graphite-950"
              >
                <ArrowLeft size={14} className="rtl:rotate-180" />
                {labels.restart}
              </button>
            )}
          </>
        ) : (
          <div className="text-center">
            {/* Güven skoru halkası — "göster, anlatma" */}
            <div className="mx-auto flex flex-col items-center">
              <div className="relative h-24 w-24">
                <svg viewBox="0 0 72 72" className="h-24 w-24 -rotate-90">
                  <circle cx="36" cy="36" r="30" fill="none" stroke="#eceef2" strokeWidth="6" />
                  <circle
                    cx="36" cy="36" r="30" fill="none"
                    stroke={vk === 'survey' ? '#c7ccd6' : '#f6bc32'}
                    strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={RING_C * (1 - score / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-tabular font-display text-2xl font-bold leading-none text-graphite-950">{score}</span>
                  <span className="mt-0.5 font-mono text-[9px] text-mist-400">/100</span>
                </div>
              </div>
              <span className="mt-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mist-500">{labels.scoreLabel}</span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-graphite-950">{verdict.title}</h3>
            <p className="mx-auto mt-3 max-w-md text-mist-700">{verdict.desc}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact#servis"
                className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                {labels.ctaSurvey}
                <ArrowUpRight size={15} />
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full border border-graphite-950/15 px-5 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
              >
                <RotateCcw size={14} />
                {labels.restart}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
