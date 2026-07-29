'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, ShieldCheck, ArrowUpRight, FileText } from 'lucide-react';
import { products, getProductDocuments, type ProductDocument } from '@/data/products';
import { DocRow } from '@/components/DocRow';

type DocType = ProductDocument['type'];

/* Ürün belgeleri üç başlıkta: teknik föy, teknik çizim (PDF), kurulum kılavuzu.
   Sertifikalar ve genel dökümanlar ayrı bölümlerde listelenir. */
const filterTypes: (DocType | 'all')[] = ['all', 'datasheet', 'drawing', 'manual'];

interface Row {
  id: string;
  label: string;
  type: DocType;
  format: string;
}

type RawCert = string | { label: string; scope?: string; file?: string };

interface AdminDoc {
  id: string;
  name: string;
  url: string;
}

export function ResourceCenter({ adminDocs = [] }: { adminDocs?: AdminDoc[] }) {
  const t = useTranslations('resources');
  const tProducts = useTranslations('products');
  const tCerts = useTranslations('certs');
  const [active, setActive] = useState<DocType | 'all'>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const generalDocs = t.raw('generalDocs') as { name: string; type: string }[];
  const certs = (tCerts.raw('items') as RawCert[]).map((c) =>
    typeof c === 'string' ? { label: c } : c
  );

  const productGroups = useMemo(
    () =>
      products.map((p) => ({
        product: p,
        rows: getProductDocuments(p.slug).map<Row>((d) => ({
          id: d.id,
          label: `${tProducts(`items.${p.slug}.name`)} — ${t(`filters.${d.type}`)}`,
          type: d.type,
          format: d.format,
        })),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function toggle(id: string) {
    setSelected((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filterRows = (rows: Row[]) => (active === 'all' ? rows : rows.filter((r) => r.type === active));

  return (
    <div className="space-y-16">
      {/* Ürün bazlı belgeler */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-graphite-950">{t('productDocsTitle')}</h2>
            <p className="mt-1.5 max-w-lg text-sm text-mist-700">{t('productDocsSubtitle')}</p>
          </div>
          <button
            type="button"
            disabled={selected.size === 0}
            className="inline-flex items-center gap-2 rounded-full bg-volt-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-opacity disabled:opacity-40"
          >
            <Download size={15} />
            {t('downloadSelected')} {selected.size > 0 && `(${selected.size})`}
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filterTypes.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active === f ? 'bg-graphite-950 text-white' : 'bg-mist-100 text-graphite-950 hover:bg-mist-200'
              }`}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          {productGroups.map(({ product, rows }) => {
            const filtered = filterRows(rows);
            if (filtered.length === 0) return null;
            return (
              <div key={product.slug} className="overflow-hidden rounded-2xl border border-mist-900/8 bg-white">
                <div className="flex items-center justify-between gap-4 bg-mist-50 px-5 py-3">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-graphite-600">
                    {product.model}
                  </p>
                  <p className="text-sm font-semibold text-graphite-950">
                    {tProducts(`items.${product.slug}.name`)}
                  </p>
                </div>
                <div className="divide-y divide-mist-900/8">
                  {filtered.map((row) => (
                    <DocRow
                      key={row.id}
                      row={row}
                      checked={selected.has(row.id)}
                      onToggle={() => toggle(row.id)}
                      compact
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sertifikalar — gerçek PDF'lere bağlı */}
      <div>
        <h2 className="font-display text-xl font-bold text-graphite-950">{t('certsTitle')}</h2>
        <p className="mt-1.5 max-w-lg text-sm text-mist-700">{t('certsSubtitle')}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert) => {
            const inner = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-volt-100 text-volt-700 transition-colors group-hover:bg-volt-500 group-hover:text-graphite-950">
                  <ShieldCheck size={18} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold uppercase leading-snug text-graphite-950">
                    {cert.label}
                  </span>
                  {cert.scope && (
                    <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.12em] text-mist-500">
                      {cert.scope}
                    </span>
                  )}
                </span>
                {cert.file && (
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-mist-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt-600"
                  />
                )}
              </>
            );
            const cls =
              'group flex h-full items-center gap-3.5 rounded-2xl border border-mist-900/10 bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-volt-500/50 hover:shadow-card';
            return cert.file ? (
              <a key={cert.label} href={cert.file} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <div key={cert.label} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      {/* Genel dökümanlar */}
      <div>
        <h2 className="font-display text-xl font-bold text-graphite-950">{t('generalDocsTitle')}</h2>
        <p className="mt-1.5 max-w-lg text-sm text-mist-700">{t('generalDocsSubtitle')}</p>
        <div className="mt-6 divide-y divide-mist-900/8 overflow-hidden rounded-2xl border border-mist-900/8 bg-white">
          {/* Panelden eklenen, gerçek bağlantılı dökümanlar önce */}
          {adminDocs
            .filter((d) => d.name && d.url)
            .map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 px-5 py-4 transition-colors hover:bg-mist-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-volt-100 text-volt-700">
                  <FileText size={16} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium text-graphite-950 group-hover:text-volt-700">
                  {doc.name}
                </span>
                <span className="shrink-0 rounded-full bg-mist-100 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mist-600">
                  Aç
                </span>
              </a>
            ))}
          {generalDocs.map((doc) => (
            <div key={doc.name} className="flex items-center gap-3.5 px-5 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist-100 text-mist-600">
                <FileText size={16} strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1 text-sm font-medium text-graphite-950">{doc.name}</span>
              <span className="shrink-0 rounded-full bg-mist-100 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mist-600">
                PDF
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
