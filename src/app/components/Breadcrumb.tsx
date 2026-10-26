import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md"
    >
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
          {index > 0 && <span aria-hidden="true" className="text-white/40">&gt;</span>}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
