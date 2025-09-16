import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const healthcareCardVariants = cva(
  "rounded-2xl border bg-gradient-card text-card-foreground shadow-card transition-all hover:shadow-elevated",
  {
    variants: {
      variant: {
        default: "border-healing-mint/30",
        caring: "border-healing-mint bg-healing-mint-soft/50",
        urgent: "border-warm-coral bg-warm-coral-soft/50",
        info: "border-sky-blue bg-sky-blue-soft/50",
        success: "border-success-green/30 bg-success-green/10",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface HealthcareCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof healthcareCardVariants> {}

const HealthcareCard = React.forwardRef<HTMLDivElement, HealthcareCardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(healthcareCardVariants({ variant, size, className }))}
      {...props}
    />
  )
)
HealthcareCard.displayName = "HealthcareCard"

const HealthcareCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
))
HealthcareCardHeader.displayName = "HealthcareCardHeader"

const HealthcareCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight text-lg", className)}
    {...props}
  />
))
HealthcareCardTitle.displayName = "HealthcareCardTitle"

const HealthcareCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
HealthcareCardDescription.displayName = "HealthcareCardDescription"

const HealthcareCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
HealthcareCardContent.displayName = "HealthcareCardContent"

const HealthcareCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
HealthcareCardFooter.displayName = "HealthcareCardFooter"

export {
  HealthcareCard,
  HealthcareCardHeader,
  HealthcareCardFooter,
  HealthcareCardTitle,
  HealthcareCardDescription,
  HealthcareCardContent,
}