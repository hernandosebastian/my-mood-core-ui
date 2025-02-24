import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/button";

interface ITrackSubmitButtonProps {
  isLoading: boolean;
  id: string;
  className?: string;
  "data-testid": string;
}

export function TrackSubmitButton({
  isLoading,
  id,
  className = "w-full",
  "data-testid": dataTestId,
}: Readonly<ITrackSubmitButtonProps>): JSX.Element {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className}
      id={id}
      data-testid={dataTestId}
    >
      {isLoading ? (
        <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      Done
    </Button>
  );
}
