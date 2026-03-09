// src/app/(public)/projects/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="space-y-8 py-5">
      {/* header */}
      <Skeleton className="h-10 w-32" />

      {/* grid of project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border flex flex-col border-[#383838] rounded-2xl p-px backdrop-blur-sm bg-[#1e1e1f]"
          >
            {/* image placeholder */}
            <div className="relative w-auto h-40 rounded-t-xl overflow-hidden bg-[#383838]/50">
              <Skeleton className="w-full h-full" />
            </div>

            {/* content area */}
            <div className="p-4 flex flex-col flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-full" />

              <div className="flex flex-wrap gap-1.5 mt-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-6 w-12 rounded-full" />
                ))}
              </div>

              <div className="flex gap-2 mt-auto pt-3 border-t border-[#383838]">
                {[...Array(2)].map((_, k) => (
                  <Skeleton key={k} className="h-7 w-20 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
