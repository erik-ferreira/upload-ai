import {
  ChangeEvent,
  ComponentProps,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react"
import { twMerge } from "tailwind-merge"
import { FileVideo, Upload } from "lucide-react"

import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"

interface FormVideoProps extends ComponentProps<"form"> {}

export function FormVideo({ className, ...rest }: FormVideoProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  function convertVideoToAudio(video: File) {}

  function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) {
      return
    }

    // convert vídeo in áudio - web assembly
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form
      onSubmit={handleUploadVideo}
      className={twMerge("space-y-4", className)}
      {...rest}
    >
      <label
        htmlFor="video"
        className="relative flex flex-col gap-2 items-center justify-center border w-full rounded-md aspect-video cursor-pointer border-dashed text-sm text-muted-foreground hover:bg-primary/30"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0 rounded-md"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um vídeo
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt" className="">
          Prompt de transcrição
        </Label>
        <Textarea
          ref={promptInputRef}
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
