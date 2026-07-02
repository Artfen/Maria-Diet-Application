import { Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HoyPage from './pages/HoyPage'
import RecetasPage from './pages/RecetasPage'
import ComprobarPage from './pages/ComprobarPage'
import ListaCompraPage from './pages/ListaCompraPage'
import GuiaPage from './pages/GuiaPage'

function App() {
  return (
    <>
      <main className="flex-1 overflow-y-auto pb-24">
        <Routes>
          <Route path="/" element={<HoyPage />} />
          <Route path="/recetas" element={<RecetasPage />} />
          <Route path="/comprobar" element={<ComprobarPage />} />
          <Route path="/lista" element={<ListaCompraPage />} />
          <Route path="/guia" element={<GuiaPage />} />
        </Routes>
      </main>
      <BottomNav />
    </>
  )
}

export default App
