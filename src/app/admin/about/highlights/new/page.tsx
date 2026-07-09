import HighlightForm from '../../HighlightForm';
import { createHighlight } from '../../actions';

export default function NewHighlightPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">New Highlight</h1>
      <HighlightForm action={createHighlight} redirectTo="/admin/about" />
    </div>
  );
}
