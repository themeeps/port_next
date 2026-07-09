import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import HighlightForm from '../../HighlightForm';
import { updateHighlight } from '../../actions';

export default async function EditHighlightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const highlight = await prisma.aboutHighlight.findUnique({ where: { id } });
  if (!highlight) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Highlight</h1>
      <HighlightForm
        action={updateHighlight.bind(null, id)}
        redirectTo="/admin/about"
        defaultValues={highlight}
      />
    </div>
  );
}
