import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ClientsListPage from './pages/clients/ClientsListPage'
import ClientDetailsPage from './pages/clients/ClientDetailsPage'
import ClientCreatePage from './pages/clients/ClientCreatePage'
import ClientEditPage from './pages/clients/ClientEditPage'
import ClientDeletePage from './pages/clients/ClientDeletePage'
import './App.css'

/**
 * Définition des routes — alignées sur le module Clients MVC.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/clients" replace />} />
        <Route path="clients" element={<ClientsListPage />} />
        <Route path="clients/new" element={<ClientCreatePage />} />
        <Route path="clients/:cine/edit" element={<ClientEditPage />} />
        <Route path="clients/:cine/delete" element={<ClientDeletePage />} />
        <Route path="clients/:cine" element={<ClientDetailsPage />} />
      </Route>
    </Routes>
  )
}

export default App
