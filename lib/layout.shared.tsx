import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Globe, LifeBuoy } from 'lucide-react';
import { Logo } from '@/components/logo';
import { DiscordIcon } from '@/components/icons';
import { site } from '@/lib/site';

/**
 * Options shared by every layout: logo, navbar links, socials.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: '/',
    },
    links: [
      {
        icon: <LifeBuoy />,
        text: 'Support',
        url: '/general/support',
        active: 'url',
      },
      {
        type: 'icon',
        label: 'Website',
        icon: <Globe />,
        text: 'Website',
        url: site.links.website,
        external: true,
      },
      {
        type: 'icon',
        label: 'Discord',
        icon: <DiscordIcon />,
        text: 'Discord',
        url: site.links.discord,
        external: true,
      },
    ],
  };
}
