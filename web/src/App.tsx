import { AppContextProvider } from "./contexts/AppContext"

import { Header } from "./components/Header"
import { Home } from "./pages/Home"

export function App() {
  return (
    <AppContextProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <Home />
      </div>
    </AppContextProvider>
  )
}
