import Link from 'next/link';
import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity';
import SanityImage from './SanityImage';
import type { SanityImageValue } from '@/src/sanity/image';

type LinkMarkValue = {
  href?: string;
  openInNewTab?: boolean;
};

type PortableImageValue = SanityImageValue & {
  _key?: string;
};

type CalloutValue = {
  _key?: string;
  tone?: 'info' | 'faith' | 'warning' | string;
  title?: string;
  body?: string;
};

type CodeValue = {
  _key?: string;
  language?: string;
  code?: string;
};

const calloutToneClass: Record<string, string> = {
  info: 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200',
  faith: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-100',
};

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-10 font-serif text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-serif text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-serif text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 font-serif text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="my-5 leading-8 text-slate-600 dark:text-slate-300">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-yellow-500 bg-slate-50 px-5 py-4 font-serif text-xl italic text-slate-700 dark:border-yellow-400 dark:bg-slate-900/70 dark:text-slate-200">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const linkValue = value as LinkMarkValue | undefined;
      const href = linkValue?.href ?? '#';
      const isExternal = href.startsWith('http');
      const className =
        'font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-emerald-300 dark:hover:text-emerald-200 dark:focus-visible:ring-slate-500';

      if (!isExternal) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target={linkValue?.openInNewTab === false ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900 dark:text-slate-50">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-slate-700 dark:text-slate-200">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2 text-slate-600 dark:text-slate-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2 text-slate-600 dark:text-slate-300">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
    number: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      const image = value as PortableImageValue;
      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900">
          <SanityImage
            image={image}
            altFallback={image.caption || 'Church image'}
            sizes="(min-width: 1024px) 800px, 100vw"
            className="h-auto w-full rounded-xl object-cover"
          />
          {image.caption && (
            <figcaption className="px-2 pt-3 text-center text-sm text-slate-500 dark:text-slate-400">
              {image.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const callout = value as CalloutValue;
      const tone = callout.tone && calloutToneClass[callout.tone] ? callout.tone : 'info';
      return (
        <aside className={`my-8 rounded-2xl border px-5 py-4 ${calloutToneClass[tone]}`}>
          {callout.title && (
            <p className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-50">
              {callout.title}
            </p>
          )}
          {callout.body && <p className="text-sm leading-relaxed">{callout.body}</p>}
        </aside>
      );
    },
    code: ({ value }) => {
      const code = value as CodeValue;
      return (
        <pre className="my-8 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
          <code>{code.code || ''}</code>
        </pre>
      );
    },
  },
};

export default function RichText({ value, dark = false }: { value: PortableTextBlock[] | null | undefined; dark?: boolean }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  return (
    <div className={`${dark ? 'dark prose-invert' : ''} prose prose-slate max-w-none`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
