import { twMerge } from "tailwind-merge"
import { ComponentProps, FormEventHandler } from "react"

import { FormVideo } from "./FormVideo"
import { FormPrompt } from "./FormPrompt"

import { Separator } from "./ui/separator"

interface SidebarProps extends ComponentProps<"aside"> {
  onSubmitFormPrompt: FormEventHandler<HTMLFormElement>
  isLoadingCompletion?: boolean
}

export function Sidebar({
  className,
  onSubmitFormPrompt,
  isLoadingCompletion,
  ...rest
}: SidebarProps) {
  return (
    <aside className={twMerge("w-80 space-y-6", className)} {...rest}>
      <FormVideo />

      <Separator />

      <FormPrompt
        isLoadingCompletion={isLoadingCompletion}
        onSubmit={onSubmitFormPrompt}
      />
    </aside>
  )
}
