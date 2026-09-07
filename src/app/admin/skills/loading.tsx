import Skeleton from '../Skeleton';
import ListSkeleton from '../ListSkeleton';

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-44 rounded-lg" />
      </div>
      <ListSkeleton />
    </div>
  );
}
