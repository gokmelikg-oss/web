'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileDown, ArrowUpRight, CheckCircle2, Download } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getProduct, getProductDocuments } from '@/data/products';
import { DocRow } from '@/components/DocRow';

type TabKey = 'overview' | 'specs' | 'drawings' | 'documents';

export function ProductTabs({ slug }: { slug: string }) {
  const t = useTranslations('products');
  const product = getProduct(slug);
  const [tab, setTab] = useState<TabKey>('overview');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  if (!product) return null;

  const features = t.raw(`items.${slug}.features`) as string[];
  const allDocs = getProductDocuments(slug);
  const drawingDocs = allDocs.filter((d) => d.type === 'drawing');
  const documentDocs = allDocs.filter((d) => ['datasheet', 'manual'].includes(d.type));

  function toggle(id: string) {
    setSelected((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const tabs: TabKey[] = ['overview', 'specs', 'drawings', 'documents'];

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-mist-900/10">
        {tabs.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`relative shrink-0 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === key ? 'text-graphite-950' : 'text-mist-500 hover:text-graphite-700'
            }`}
          >
            {t(`tabs.${key}`)}
            {tab === key && (
              <motion.span layoutId="product-tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-volt-500" />
            )}
          </button>
        ))}
      </div>

      <div className="pt-8">
        {tab === 'overview' && (
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-balance leading-relaxed text-mist-700">{t(`items.${slug}.description`)}</p>
              <ul className="mt-8 space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-volt-600" />
                    <span className="text-mist-800">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-graphite-950 px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  {t('requestQuote')}
                  <ArrowUpRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => setTab('documents')}
                  className="inline-flex items-center gap-2 rounded-full border border-mist-900/15 px-7 py-3.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-mist-100"
                >
                  <FileDown size={16} />
                  {t('downloadSheet')}
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-mist-900/8 bg-mist-50 p-7">
              <h2 className="font-display text-lg font-bold text-graphite-950">{t('specsTitle')}</h2>
              <dl className="mt-5 divide-y divide-mist-900/8">
                {product.specs.slice(0, 5).map((spec) => (
                  <div key={spec.key} className="flex items-start justify-between gap-4 py-3 text-sm">
                    <dt className="text-mist-600">{t(`specsLabels.${spec.key}`)}</dt>
                    <dd className="text-end font-medium text-graphite-950">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {tab === 'specs' && (
          <div className="max-w-2xl rounded-2xl border border-mist-900/8 bg-mist-50 p-7">
            <h2 className="font-display text-lg font-bold text-graphite-950">{t('specsTitle')}</h2>
            <dl className="mt-5 divide-y divide-mist-900/8">
              {product.specs.map((spec) => (
                <div key={spec.key} className="flex items-start justify-between gap-4 py-3 text-sm">
                  <dt className="text-mist-600">{t(`specsLabels.${spec.key}`)}</dt>
                  <dd className="text-end font-medium text-graphite-950">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {tab === 'drawings' && (
          <DocSection title={t('drawingsTitle')} body={t('drawingsBody')} docs={drawingDocs} selected={selected} onToggle={toggle} downloadLabel={t('downloadAll')} />
        )}

        {tab === 'documents' && (
          <DocSection title={t('documentsTitle')} docs={documentDocs} selected={selected} onToggle={toggle} downloadLabel={t('downloadAll')} labelPrefix={product.model} />
        )}
      </div>
    </div>
  );
}

function DocSection({
  title,
  body,
  docs,
  selected,
  onToggle,
  downloadLabel,
  labelPrefix,
}: {
  title: string;
  body?: string;
  docs: { id: string; type: string; format: string }[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  downloadLabel: string;
  labelPrefix?: string;
}) {
  const t = useTranslations('resources');
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-graphite-950">{title}</h2>
          {body && <p className="mt-1.5 max-w-xl text-sm text-mist-700">{body}</p>}
        </div>
        <button
          type="button"
          disabled={selected.size === 0}
          className="inline-flex items-center gap-2 rounded-full bg-volt-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-opacity disabled:opacity-40"
        >
          <Download size={15} />
          {downloadLabel} {selected.size > 0 && `(${selected.size})`}
        </button>
      </div>
      <div className="mt-6 divide-y divide-mist-900/8 overflow-hidden rounded-2xl border border-mist-900/8 bg-white">
        {docs.map((d) => (
          <DocRow
            key={d.id}
            row={{ id: d.id, label: `${labelPrefix ?? ''} ${t(`filters.${d.type}`)} (${d.format})`.trim(), format: d.format }}
            checked={selected.has(d.id)}
            onToggle={() => onToggle(d.id)}
          />
        ))}
      </div>
    </div>
  );
}
