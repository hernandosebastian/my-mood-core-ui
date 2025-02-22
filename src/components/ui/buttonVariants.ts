import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "block-selection inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent-primary text-background-primary shadow hover:bg-accent-primary/90 hover:text-background-primary/90",
        destructive:
          "bg-red-500 text-background-primary shadow-sm hover:bg-red-500/90",
        outline:
          "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900",
        secondary:
          "bg-accent-secondary text-background-primary shadow-sm hover:bg-accent-secondary/80 hover:text-background-primary/80",
        ghost: "",
        link: "text-slate-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
