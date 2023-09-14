import { Wand2 } from "lucide-react"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

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

interface FormPromptProps extends ComponentProps<"form"> {}

export function FormPrompt({ className, ...rest }: FormPromptProps) {
  return (
    <form className={twMerge("space-y-4", className)} {...rest}>
      <div className="space-y-2">
        <Label>Prompt</Label>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um prompt..." />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="title">Título do YouTube</SelectItem>
            <SelectItem value="description">Descrição do YouTube</SelectItem>
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

        <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />

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
