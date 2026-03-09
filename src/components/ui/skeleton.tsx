// components/ui/skeleton.tsx
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#383838]/50", // Matching your border color but at lower opacity
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
