import { Github } from "lucide-react"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

interface HeaderProps extends ComponentProps<"div"> {}

export function Header({ className, ...rest }: HeaderProps) {
  return (
    <div
      className={twMerge(
        "px-6 py-3 flex items-center justify-between border-b",
        className
      )}
      {...rest}
    >
      <h1 className="text-xl font-bold">upload.ai</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Desenvolvido com ❤️ no NLW da Rocketseat
        </span>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="outline">
          <Github className="w-4 h-4 mr-2" />
          Github
        </Button>
      </div>
    </div>
  )
}
