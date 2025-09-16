import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const healthcareButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white shadow-card hover:shadow-elevated transform hover:scale-[1.02]",
        caring: "bg-healing-mint text-deep-teal border border-healing-mint hover:bg-healing-mint-soft shadow-card hover:shadow-glow transform hover:scale-[1.02]",
        emergency: "bg-error-rose text-white shadow-card hover:shadow-elevated transform hover:scale-[1.02] animate-pulse",
        doctor: "bg-sky-blue text-deep-blue border border-sky-blue-soft hover:bg-sky-blue-soft shadow-card hover:shadow-elevated",
        outline: "border border-healing-mint text-deep-teal bg-transparent hover:bg-healing-mint-soft",
        ghost: "text-deep-teal hover:bg-healing-mint-soft",
        link: "text-deep-teal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8",
        xl: "h-14 rounded-2xl px-12 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface HealthcareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof healthcareButtonVariants> {
  asChild?: boolean
}

const HealthcareButton = React.forwardRef<HTMLButtonElement, HealthcareButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(healthcareButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
HealthcareButton.displayName = "HealthcareButton"

export { HealthcareButton, healthcareButtonVariants }