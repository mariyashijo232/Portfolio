import SiteWrapper from '@/components/SiteWrapper';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  return <SiteWrapper page={{ view: 'project', slug }} />;
}
