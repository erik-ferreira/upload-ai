import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { FileVideo, Upload } from "lucide-react"

import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"

interface FormVideoProps extends ComponentProps<"form"> {}

export function FormVideo({ className, ...rest }: FormVideoProps) {
  return (
    <form className={twMerge("space-y-4", className)} {...rest}>
      <label
        htmlFor="video"
        className="flex flex-col gap-2 items-center justify-center border w-full rounded-md aspect-video cursor-pointer border-dashed text-sm text-muted-foreground hover:bg-primary/30"
      >
        <FileVideo className="w-4 h-4" />
        Selecione um vídeo
      </label>

      <input type="file" id="video" accept="video/mp4" className="sr-only" />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt" className="">
          Prompt de transcrição
        </Label>
        <Textarea
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>

      <Button type="submit" className="w-full">
        Carregar vídeo
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
