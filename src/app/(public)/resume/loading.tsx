// src/app/(public)/resume/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ResumeLoading() {
  return (
    <div className="space-y-10 py-5">
      {/* page header */}
      <Skeleton className="h-10 w-32" />

      {/* education timeline skeleton */}
      <div className="px-3 md:px-10">
        <div className="relative border-l border-gray-500 pl-6 space-y-8">
          <section className="absolute -left-6">
            <Skeleton className="w-12 h-12 rounded-full" />
          </section>
          <section>
            <Skeleton className="h-8 w-24 mb-2" />
          </section>

          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <span className="absolute mt-1 -left-8 w-4 h-4 rounded-full bg-[#383838]/50"></span>
              <div className="pl-3 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-52" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* experience timeline skeleton */}
      <div className="px-3 md:px-10 mt-10">
        <div className="relative border-l border-gray-500 pl-6 space-y-8">
          <section className="absolute -left-6">
            <Skeleton className="w-12 h-12 rounded-full" />
          </section>
          <section>
            <Skeleton className="h-8 w-24 mb-2" />
          </section>

          {[1].map((i) => (
            <div key={i} className="relative">
              <span className="absolute mt-1 -left-8 w-4 h-4 rounded-full bg-[#383838]/50"></span>
              <div className="pl-3 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-52" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* skills section skeleton */}
      <div className="px-3 md:px-10 mt-10">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-10 gap-x-16 gap-y-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
