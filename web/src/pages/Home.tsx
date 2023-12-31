import { useCompletion } from "ai/react"

import { useApp } from "@/contexts/AppContext"

import { Content } from "@/components/Content"
import { Sidebar } from "@/components/Sidebar"
import { FormPrompt } from "@/components/FormPrompt"
import { Textarea } from "@/components/ui/textarea"

export function Home() {
  const { videoId, temperature } = useApp()

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })

  return (
    <main className="flex-1 p-6 flex gap-6">
      <Content completion={completion}>
        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Inclua o prompt para a IA..."
          value={input}
          onChange={handleInputChange}
        />
      </Content>

      <Sidebar>
        <FormPrompt
          setInput={setInput}
          onSubmit={handleSubmit}
          isLoadingCompletion={isLoading}
        />
      </Sidebar>
    </main>
  )
}
