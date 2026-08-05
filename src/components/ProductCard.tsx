import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Sun, Droplets, Package as PackageIcon, Cpu, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { productImages, type Product } from '@/data/products';
import { BLUR_DATA } from '@/lib/blur';

const categoryIcon = {
  collector: Sun,
  boiler: Droplets,
  package: PackageIcon,
  smart: Cpu,
};

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations('products');
  const Icon = categoryIcon[product.category];
  const image = productImages[product.slug];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-mist-900/8 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`relative flex h-48 items-center justify-center overflow-hidden ${image ? 'bg-mist-100' : `bg-gradient-to-br ${product.gradient}`}`}>
        {image ? (
          <Image
            src={image}
            alt={`${t(`items.${product.slug}.name`)} — Şimşek Solar`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={BLUR_DATA}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-blueprint opacity-30" aria-hidden />
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, transparent 60%)' }} />
            <Icon size={56} strokeWidth={1.25} className="relative text-white/90" />
          </>
        )}
        <span className={`absolute end-4 top-4 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${image ? 'bg-white/90 text-graphite-900' : 'bg-black/25 text-white'}`}>
          {t(`categoryLabels.${product.category}`)}
        </span>
        {image && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/40 via-transparent to-transparent" aria-hidden />
        )}
        <span className={`absolute bottom-3 start-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${image ? 'text-white' : 'text-white/75'}`}>
          {product.model}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-volt-700">{product.model}</p>
        <h3 className="mt-1.5 font-display text-lg font-bold text-graphite-950">
          {t(`items.${product.slug}.name`)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-mist-700">{t(`items.${product.slug}.tagline`)}</p>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-graphite-950 transition-colors group-hover:text-volt-600">
          {t('viewDetails')}
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
