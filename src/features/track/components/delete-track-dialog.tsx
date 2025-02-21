import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { Icons } from "@/components/ui/Icons";

interface IDeleteTrackDialogProps {
  handleOnClick: () => void;
  isLoading: boolean;
}

export const DeleteTrackDialog = ({
  handleOnClick,
  isLoading,
}: IDeleteTrackDialogProps): JSX.Element => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`w-full ${buttonVariants({
          variant: "destructive",
        })}`}
        data-testid="open-delete-track-dialog-button"
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background-primary border-border-primary">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-primary">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-text-secondary">
            This action cannot be undone. Your track will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="cancel-delete-track-button">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleOnClick}
            data-testid="delete-track-button"
            disabled={isLoading}
            className={buttonVariants({ variant: "destructive" })}
          >
            {isLoading ? (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
