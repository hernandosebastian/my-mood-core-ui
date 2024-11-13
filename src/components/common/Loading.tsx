import { Loader2 } from "lucide-react";

export function Loading(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="p-4 rounded-lg flex flex-col gap-6 items-center justify-center">
        <Loader2 className="h-20 w-20 animate-spin text-gray-600" />
        <span className="text-gray-800 font-medium">Loading</span>
      </div>
    </div>
  );
}

