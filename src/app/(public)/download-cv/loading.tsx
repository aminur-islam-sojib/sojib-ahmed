// src/app/(public)/download-cv/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function DownloadCVLoading() {
  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <Skeleton className="h-10 w-40" />

      {/* Description Section */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>

      {/* PDF Preview Container */}
      <div className="max-w-4xl mx-auto w-full">
        <div className="relative w-full border border-[#383838] rounded-2xl shadow-lg overflow-hidden bg-[#1a1a1a]">
          <Skeleton className="w-full h-96 sm:h-125 md:h-187.5 rounded-2xl" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto w-full mt-8">
        <Skeleton className="h-12 w-40 rounded-lg" />
        <Skeleton className="h-12 w-48 rounded-lg" />
      </div>

      {/* Additional Info */}
      <div className="max-w-4xl mx-auto w-full pt-4 text-center">
        <Skeleton className="h-3 w-80 mx-auto" />
      </div>
    </div>
  );
}
