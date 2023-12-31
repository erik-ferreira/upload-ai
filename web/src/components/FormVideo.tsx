import {
  ChangeEvent,
  ComponentProps,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react"
import { fetchFile } from "@ffmpeg/util"
import { twMerge } from "tailwind-merge"
import { FileVideo, Upload } from "lucide-react"

import { useApp } from "@/contexts/AppContext"

import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"

import { api } from "@/lib/api"
import { getFFmpeg } from "@/lib/ffmpeg"

type Status = "waiting" | "converting" | "uploading" | "generating" | "success"

const statusMessages = {
  converting: "Convertendo...",
  generating: "Transcrevendo...",
  uploading: "Carregando...",
  success: "Sucesso!",
}

interface FormVideoProps extends ComponentProps<"form"> {}

export function FormVideo({ className, ...rest }: FormVideoProps) {
  const { setVideoId } = useApp()

  const [status, setStatus] = useState<Status>("waiting")
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

  async function convertVideoToAudio(video: File) {
    console.log("Convert started.")

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile("input.mp4", await fetchFile(video))

    ffmpeg.on("progress", (progress) => {
      console.log("Convert progress" + Math.round(progress.progress * 100))
    })

    // to save file in disk ffmpeg
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ])

    // to read file
    const data = await ffmpeg.readFile("output.mp3")
    const audioFileBlob = new Blob([data], { type: "audio/mpeg" })
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    })

    console.log("Convert finished.")

    return audioFile
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) {
      return
    }

    setStatus("converting")

    // convert vídeo in áudio - web assembly
    const audioFile = await convertVideoToAudio(videoFile)

    console.log(audioFile, prompt)

    const data = new FormData()
    data.append("file", audioFile)

    setStatus("uploading")

    const response = await api.post("/videos", data)
    const videoId = response.data.video.id

    setStatus("generating")

    await api.post(`/videos/${videoId}/transcription`, { prompt })

    setStatus("success")
    setVideoId(videoId)
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
          disabled={status !== "waiting"}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>

      <Button
        data-success={status === "success"}
        disabled={status !== "waiting"}
        type="submit"
        className="w-full data-[success=true]:bg-emerald-400"
      >
        {status === "waiting" ? (
          <>
            Carregar vídeo
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  )
}
