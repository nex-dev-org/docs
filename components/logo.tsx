import { site } from '@/lib/site';

/**
 * NEX.dev wordmark. The source PNG is white on transparent; in light mode
 * it is inverted to black with CSS so one asset serves both themes.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo/nex-wordmark.png"
      alt={site.name}
      width={720}
      height={196}
      className={`h-9 w-auto invert dark:invert-0 ${className}`}
    />
  );
}
