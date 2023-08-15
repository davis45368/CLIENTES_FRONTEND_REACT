import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Navegation } from "./components/Navegacion.jsx";
import { ClientesPage } from "./pages/ClientesPage.jsx";
import { ClienteFormPage } from "./pages/CLientesFormPage.jsx";
import { Toaster } from "react-hot-toast";


export function ClientesApp() {
    return(
        <BrowserRouter>
            <Navegation />
            <Routes>
                <Route path="/" element={<Navigate to='/clientes'/>} />
                <Route path="/clientes/" element={<ClientesPage />} />
                <Route path="/ciente/add/" element={<ClienteFormPage />} />
                <Route path="/cliente/:id" element={<ClienteFormPage />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    )
}