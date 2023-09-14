import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

import { Textarea } from "./ui/textarea"

interface ContentProps extends ComponentProps<"div"> {}

export function Content({ className, ...rest }: ContentProps) {
  return (
    <div className={twMerge("flex flex-col flex-1 gap-4", className)} {...rest}>
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Inclua o prompt para a IA..."
        />

        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Resultado gerado pela IA..."
          readOnly
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Lembre-se: Você pode utilizar a variável{" "}
        <code className="text-violet-400">&#123;transcription&#125;</code> no
        seu prompt para adicionar o conteúdo da transcrição do vídeo
        selecionado.
      </p>
    </div>
  )
}
