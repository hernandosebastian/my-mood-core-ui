import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
}): JSX.Element {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-900/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
