import { Card } from "@/components/ui/card";

export const CardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="animate-pulse">
        <div className="aspect-[3/4] bg-muted rounded-t-lg" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="flex justify-between items-center">
            <div className="h-5 bg-muted rounded w-1/3" />
            <div className="h-5 bg-muted rounded w-1/4" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-card animate-pulse">
          <div className="h-12 w-12 bg-muted rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-1/4" />
          </div>
          <div className="h-5 bg-muted rounded w-20" />
          <div className="h-5 bg-muted rounded w-16" />
        </div>
      ))}
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-6 animate-pulse">
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-2/3" />
          </div>
        </Card>
      ))}
    </div>
  );
};
