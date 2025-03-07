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
        Eliminar
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background-primary border-border-primary">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-primary">
            ¿Estás seguro?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-text-secondary">
            Esta acción no se puede deshacer. Tu registro será eliminado
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="cancel-delete-track-button">
            Cancelar
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
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
