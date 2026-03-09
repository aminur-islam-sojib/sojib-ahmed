import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Placeholder */}
      <div className="flex justify-between items-center pb-5 border-b border-[#383838]">
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Content Body Placeholder */}
      <div className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[40%]" />
        </div>

        {/* Generic Grid Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
