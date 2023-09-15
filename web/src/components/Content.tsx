import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

import { useApp } from "@/contexts/AppContext"

import { Textarea } from "./ui/textarea"

interface ContentProps extends ComponentProps<"div"> {
  completion: string
}

export function Content({ className, completion, ...rest }: ContentProps) {
  const { template, setTemplate } = useApp()

  return (
    <div className={twMerge("flex flex-col flex-1 gap-4", className)} {...rest}>
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Inclua o prompt para a IA..."
          value={template || ""}
          onChange={(e) => setTemplate(e.target.value)}
        />

        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Resultado gerado pela IA..."
          readOnly
          value={completion}
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
