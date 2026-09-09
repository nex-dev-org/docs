import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Card as BaseCard, type CardProps } from 'fumadocs-ui/components/card';
import { icons } from 'lucide-react';
import { createElement, type ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { DiscordIcon } from '@/components/icons';

type IconName = keyof typeof icons | 'Discord';

/** Resolve an icon name (lucide, or "Discord") to an element. */
function resolveIcon(icon: IconName | ReactNode | undefined): ReactNode {
  if (typeof icon !== 'string') return icon;
  if (icon === 'Discord') return <DiscordIcon />;
  const Icon = icons[icon as keyof typeof icons];
  return Icon ? createElement(Icon) : undefined;
}

/**
 * `<Card>` that accepts `icon` as a plain string (lucide icon name),
 * so MDX authors never need to import icon components.
 */
function Card({
  icon,
  ...props
}: Omit<CardProps, 'icon'> & { icon?: IconName | ReactNode }) {
  return <BaseCard icon={resolveIcon(icon)} {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Card,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
