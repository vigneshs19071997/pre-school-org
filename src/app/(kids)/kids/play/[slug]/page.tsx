import { notFound } from 'next/navigation';
import { activityBySlug, activityLibrary } from '@/lib/kids-content';
import { QuizPlayer } from '@/components/kids/QuizPlayer';

export function generateStaticParams() {
  return activityLibrary.map((a) => ({ slug: a.slug }));
}

/**
 * Activities are prerendered so the whole round is local before the child
 * starts. A mid-game network stall loses a three-year-old completely.
 */
export default async function PlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = activityBySlug(slug);
  if (!activity) notFound();

  return <QuizPlayer activity={activity} />;
}
