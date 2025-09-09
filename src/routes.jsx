// src/routes.jsx  Importamos las funciones de React Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";


import { Layout } from "./pages/Layout";   //Navbar, Footer 
// Páginas de la app
import { Home } from "./pages/Home";
import { Demo } from "./pages/Demo";
import { Single } from "./pages/Single";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";

// Exporta el router que luego usaremos en main.jsx
export const router = createBrowserRouter(
  createRoutesFromElements(
    // Ruta raíz
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

     {/* Subrutas: cada una se mostrará dentro del <Outlet /> de Layout */}
      <Route path="/" element={<Home />} /> {/* Página principal (lista de contactos o bienvenida) */}

      <Route path="/demo" element={<Demo />} />
      <Route path="/single/:theid" element={<Single />} />
      <Route path="/contacts" element={<Contact />} />  
      
      <Route path="/add" element={<AddContact />} />   {/* Formulario para añadir o editar un contacto */}

    </Route>
  )
);
