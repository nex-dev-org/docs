import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { getMDXComponents } from '@/components/mdx';
import { site } from '@/lib/site';

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // allows linking to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const isHome = page.url === '/';
  // Script pages get the script name in the title so tabs and search results
  // aren't just sixteen different "Overview | NEX.dev" entries.
  const folder = page.slugs.length > 1 ? page.slugs[0] : undefined;
  const title =
    folder && folder.startsWith('nexdev_')
      ? `${page.data.title} · ${folder}`
      : page.data.title;

  return {
    title: isHome ? { absolute: site.title } : title,
    description: page.data.description,
    openGraph: {
      title: isHome ? site.title : `${title} | ${site.name}`,
      description: page.data.description,
      url: page.url,
    },
  };
}
