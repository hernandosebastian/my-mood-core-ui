import { toast } from "sonner";

interface IUseToast {
  showToast: (
    message: string,
    description: string,
    undoAction: () => void
  ) => void;
  success: (
    message: string,
    description: string,
    undoAction?: () => void
  ) => void;
  error: (
    message: string,
    description: string,
    undoAction?: () => void
  ) => void;
}

export function useToast(): IUseToast {
  const showToast = (
    message: string,
    description: string,
    undoAction: () => void
  ): void => {
    toast(message, {
      description,
      action: {
        label: "Undo",
        onClick: undoAction,
      },
    });
  };

  const success = (
    message: string,
    description: string,
    undoAction?: () => void
  ): void => {
    toast.success(message, {
      description,
      action: undoAction
        ? {
            label: "Undo",
            onClick: undoAction,
          }
        : undefined,
    });
  };

  const error = (
    message: string,
    description: string,
    undoAction?: () => void
  ): void => {
    toast.error(message, {
      description,
      action: undoAction
        ? {
            label: "Undo",
            onClick: undoAction,
          }
        : undefined,
    });
  };

  return { showToast, success, error };
}

