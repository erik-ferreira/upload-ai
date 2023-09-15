import { createContext, ReactNode, useContext, useState } from "react"

interface AppContextData {
  template: string | null
  setTemplate: (template: string | null) => void

  temperature: number
  setTemperature: (temperature: number) => void

  videoId: string | null
  setVideoId: (videoId: string | null) => void
}

export const AppContext = createContext({} as AppContextData)

interface AppContextProviderProps {
  children: ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [temperature, setTemperature] = useState(0.5)
  const [template, setTemplate] = useState<string | null>(null)

  return (
    <AppContext.Provider
      value={{
        template,
        setTemplate,

        temperature,
        setTemperature,

        videoId,
        setVideoId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)

  return context
}
