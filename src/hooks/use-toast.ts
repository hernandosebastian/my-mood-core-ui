import { toast } from "sonner";

interface IUseToast {
  showToast: (
    message: string,
    description: string,
    undoAction: () => void
  ) => void;
  showSuccessToast: (
    message: string,
    description: string,
    undoAction?: () => void
  ) => void;
  showErrorToast: (
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

  const showSuccessToast = (
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

  const showErrorToast = (
    message: string,
    description: string,
    undoAction?: () => void
  ): void => {
    toast.error(message, {
      id: "errorToast",
      description,
      action: undoAction
        ? {
            label: "Undo",
            onClick: undoAction,
          }
        : undefined,
    });
  };

  return { showToast, showSuccessToast, showErrorToast };
}
