import * as React from "react"

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { ...props },
  ref
) => (
  <div
    ref={ref}
    role="alert"
    className="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground"
    {...props}
  />
))

Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>((
  { ...props },
  ref
) => (
  <div
    ref={ref}
    className="text-sm [&_p]:leading-relaxed"
    {...props}
  />
))

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }