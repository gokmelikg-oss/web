'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { products, type ProductCategory } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

const filters: (ProductCategory | 'all')[] = ['all', 'collector', 'boiler', 'package', 'smart'];

export function ProductsGrid() {
  /* Hareket azaltma tercihi: ölçek animasyonu yapılmaz. */
  const reduce = useReducedMotion();
  const t = useTranslations('products.filters');
  const [active, setActive] = useState<ProductCategory | 'all'>('all');

  const list = active === 'all' ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              active === f
                ? 'bg-graphite-950 text-white'
                : 'bg-mist-100 text-graphite-950 hover:bg-mist-200'
            }`}
          >
            {t(f)}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((product) => (
            <motion.div
              key={product.slug}
              layout
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
