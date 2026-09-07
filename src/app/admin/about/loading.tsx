import Skeleton from '../Skeleton';
import ListSkeleton from '../ListSkeleton';

export default function Loading() {
  return (
    <div className="space-y-10">
      <div>
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-32 w-full max-w-2xl rounded-lg" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
        <ListSkeleton />
      </div>
    </div>
  );
}
