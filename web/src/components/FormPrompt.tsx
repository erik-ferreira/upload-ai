import { Wand2 } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { ComponentProps, useEffect, useState } from "react"

import { useApp } from "@/contexts/AppContext"

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "./ui/select"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

import { api } from "@/lib/api"

interface Prompt {
  id: string
  title: string
  template: string
}

interface FormPromptProps extends ComponentProps<"form"> {}

export function FormPrompt({ className, ...rest }: FormPromptProps) {
  const { setTemplatePrompt, temperature, setTemperature } = useApp()
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    setTemplatePrompt(selectedPrompt.template)
  }

  useEffect(() => {
    api.get("/prompts").then((response) => {
      setPrompts(response.data)
    })
  }, [])

  return (
    <form className={twMerge("space-y-4", className)} {...rest}>
      <div className="space-y-2">
        <Label>Prompt</Label>

        <Select onValueChange={handlePromptSelected}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um prompt..." />
          </SelectTrigger>

          <SelectContent>
            {prompts?.map((prompt) => (
              <SelectItem key={prompt.id} value={prompt.id}>
                {prompt.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Modelo</Label>
        <Select disabled defaultValue="gpt3.5">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
          </SelectContent>
        </Select>

        <span className="block text-xs text-muted-foreground italic">
          Você poderá customizar essa opção em breve
        </span>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Temperatura</Label>

        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={(value) => setTemperature(value[0])}
        />

        <span className="block text-xs text-muted-foreground italic leading-relaxed">
          Valores mais altos tendem a deixar o resultado mais criativo e com
          possíveis erros.
        </span>
      </div>

      <Separator />

      <Button type="submit" className="w-full">
        Executar
        <Wand2 className="w-4 h-4 ml-2" />{" "}
      </Button>
    </form>
  )
}
