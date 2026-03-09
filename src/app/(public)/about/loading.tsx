// app/about/loading.tsx (or wherever your about page is)
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="relative pb-5">
        <Skeleton className="h-10 w-32 mb-2" />
        <div className="absolute bottom-0 left-0 w-12 h-1 bg-primary/20 rounded-full" />
      </div>

      {/* Intro Text Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[40%]" />
      </div>

      {/* AboutCards Skeleton */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-7 border border-[#383838] rounded-2xl bg-[#202022]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center p-5 border-2 border-[#383838] rounded-2xl"
          >
            <Skeleton className="h-10 w-12 mb-3" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* CanDoList Skeleton */}
      <div className="space-y-5">
        <Skeleton className="h-7 w-40" />
        <div className="grid md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-4 p-8 border border-[#383838] rounded-xl bg-[#1e1e1f]"
            >
              <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[80%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
