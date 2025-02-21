import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps): JSX.Element => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background-primary group-[.toaster]:text-text-primary group-[.toaster]:border-border-primary group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-text-secondary",
          actionButton:
            "group-[.toast]:bg-accent-primary group-[.toast]:text-text-primary",
          cancelButton:
            "group-[.toast]:bg-background-secondary group-[.toast]:text-text-secondary",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
