import { cn } from "../../lib/utils"

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
    TODO: "border-transparent bg-slate-200 text-slate-800",
    IN_PROGRESS: "border-transparent bg-blue-100 text-blue-800",
    DONE: "border-transparent bg-green-100 text-green-800",
    ADMIN: "border-transparent bg-purple-100 text-purple-800",
    MEMBER: "border-transparent bg-gray-100 text-gray-800"
  }

  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />
  )
}

export { Badge }
