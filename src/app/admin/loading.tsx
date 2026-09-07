import Skeleton from './Skeleton';

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-8 w-56 mb-6" />
      <div className="grid sm:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <Skeleton className="w-15 h-15 rounded-xl mb-4" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
