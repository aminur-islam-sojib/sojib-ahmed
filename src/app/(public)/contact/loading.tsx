// src/app/(public)/contact/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="space-y-8 py-5">
      {/* header */}
      <Skeleton className="h-10 w-32" />

      {/* map area skeleton */}
      <div className="my-5 mt-7">
        <div className="relative w-full h-50 md:h-100 rounded-xl overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
      </div>

      {/* form skeleton */}
      <section className="my-5">
        <Skeleton className="h-8 w-40 mb-4" />
        <form className="w-full flex flex-col gap-3 md:gap-5 mt-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <Skeleton className="h-12 w-full md:w-1/2" />
            <Skeleton className="h-12 w-full md:w-1/2" />
          </div>
          <Skeleton className="h-28 w-full rounded-xl" />
          {/* button placeholder */}
          <Skeleton className="h-12 w-32 mt-4" />
        </form>
      </section>
    </div>
  );
}
