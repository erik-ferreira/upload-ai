import { useCompletion } from "ai/react"

import { AppContextProvider, useApp } from "./contexts/AppContext"

import { Header } from "./components/Header"
import { Content } from "./components/Content"
import { Sidebar } from "./components/Sidebar"

export function App() {
  const { videoId, temperature, template } = useApp()

  const { handleSubmit, completion, isLoading } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
      template,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })

  return (
    <AppContextProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 p-6 flex gap-6">
          <Content completion={completion} />

          <Sidebar
            onSubmitFormPrompt={handleSubmit}
            isLoadingCompletion={isLoading}
          />
        </main>
      </div>
    </AppContextProvider>
  )
}
