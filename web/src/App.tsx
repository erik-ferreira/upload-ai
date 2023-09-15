import { AppContextProvider } from "./contexts/AppContext"

import { Header } from "./components/Header"
import { Content } from "./components/Content"
import { Sidebar } from "./components/Sidebar"

export function App() {
  return (
    <AppContextProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 p-6 flex gap-6">
          <Content />

          <Sidebar />
        </main>
      </div>
    </AppContextProvider>
  )
}
