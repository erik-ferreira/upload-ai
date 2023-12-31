import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

import { FormVideo } from "./FormVideo"

import { Separator } from "./ui/separator"

interface SidebarProps extends ComponentProps<"aside"> {}

export function Sidebar({ className, children, ...rest }: SidebarProps) {
  return (
    <aside className={twMerge("w-80 space-y-6", className)} {...rest}>
      <FormVideo />

      <Separator />

      {children}
    </aside>
  )
}
