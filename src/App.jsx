import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Error404 from './pages/Error404';
import ScrollToTop from './components/ScrollToTop';

export default function App() {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Renderiza el encabezado de la aplicación */}
      <Header />

      <div className="flex-grow bg-grayLight">

        {/* Definición de las rutas de la aplicación */}
        <Routes>
          {/* Ruta principal que carga la página de inicio */}
          <Route index element={<Home />} />
          {/* Ruta para la lista de productos */}
          <Route path='productos' element={<Products />} />
          {/* Ruta para los detalles de un producto específico */}
          <Route path="productos/:productId" element={<ProductDetails />} />
          {/* Ruta para la página de contacto */}
          <Route path="contacto" element={<Contact />} />
          {/* Ruta para manejar errores 404 (página no encontrada) */}
          <Route path="*" element={<Error404 />} />
        </Routes>
        {/* Renderiza el pie de página de la aplicación */}
      </div>
      <Footer />

      <ScrollToTop />
    </div>
  )
}