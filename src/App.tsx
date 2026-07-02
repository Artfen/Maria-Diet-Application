import { Route, Routes, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HoyPage from './pages/HoyPage'
import RecetasPage from './pages/RecetasPage'
import ComprobarPage from './pages/ComprobarPage'
import ListaCompraPage from './pages/ListaCompraPage'
import GuiaPage from './pages/GuiaPage'
import ChatPage from './pages/ChatPage'

function App() {
  const { pathname } = useLocation()
  const isChat = pathname === '/chat'

  return (
    <>
      <main
        key={pathname}
        className={
          isChat
            ? 'animate-fade-up flex flex-1 flex-col overflow-hidden pb-24'
            : 'animate-fade-up flex-1 overflow-y-auto pb-24'
        }
      >
        <Routes>
          <Route path="/" element={<HoyPage />} />
          <Route path="/recetas" element={<RecetasPage />} />
          <Route path="/comprobar" element={<ComprobarPage />} />
          <Route path="/lista" element={<ListaCompraPage />} />
          <Route path="/guia" element={<GuiaPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </main>
      <BottomNav />
    </>
  )
}

export default App
