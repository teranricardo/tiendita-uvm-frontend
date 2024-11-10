// import { Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from "./pages/Home";
// import Contact from './pages/Contact';
// import Products from './pages/Products';
// import ProductDetails from './pages/ProductDetails';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import ProtectedRoute from './components/ProtectedRoute';
// import Error404 from './pages/Error404';
// import ScrollToTop from './components/ScrollToTop';
// import AdminPanel from './pages/AdminPanel';

// export default function App() {

//   function Default() {
//     return (
//       <></>
//     )
//   }
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Renderiza el encabezado de la aplicación */}
//       <Header />

//       <div className="flex-grow bg-grayLight">

//         {/* Definición de las rutas de la aplicación */}
//         <Routes>
//           {/* Ruta principal que carga la página de inicio */}
//           <Route index element={<Home />} />
//           {/* Ruta para la lista de productos */}
//           <Route path='productos' element={<Products />} />
//           {/* Ruta para los detalles de un producto específico */}
//           <Route path="productos/:productId" element={<ProductDetails />} />
//           {/* Ruta para la página de contacto */}
//           <Route path="contacto" element={<Contact />} />

//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute userComponent={Login} adminComponent={AdminPanel} requiredRole="admin" />
//             }
//           />



//           <Route
//             path="/admin/login"
//             element={
//               <ProtectedRoute userComponent={Login} adminComponent={Default} requiredRole="admin" />
//             }
//           />

//           {/* Ruta para el registro inicial de administrador */}
//           <Route path="/admin/register" element={
//             <ProtectedRoute userComponent={Register} adminComponent={Default} requiredRole="admin" />
//           } />

//           {/* Ruta para manejar errores 404 (página no encontrada) */}
//           <Route path="*" element={<Error404 />} />
//         </Routes>
//         {/* Renderiza el pie de página de la aplicación */}
//       </div>
//       <Footer />

//       <ScrollToTop />
//     </div>
//   )
// }



// App.jsx
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Error404 from './pages/Error404';
import NoPermissionsPage from './pages/admin/NoPermissionsPage';
import ScrollToTop from './components/ScrollToTop';
import ProductsSection from './pages/admin/ProductsSection';
import CategoriesSection from './pages/admin/CategoriesSection';
import UsersSection from './pages/admin/UsersSection';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow bg-grayLight">
        <Routes>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />

          {/* Rutas protegidas para el panel de administración */}
          <Route path="/admin" element={<ProtectedRoute userComponent={Login} adminComponent={AdminPanel} requiredRoles={["admin", "editor"]} />} />
          <Route path="/admin/products" element={<ProtectedRoute adminComponent={ProductsSection} userComponent={NoPermissionsPage} requiredRoles={["admin", "editor"]} />} />
          <Route path="/admin/categories" element={<ProtectedRoute adminComponent={CategoriesSection} userComponent={NoPermissionsPage} requiredRoles={["admin", "editor"]} />} />
          <Route path="/admin/users" element={<ProtectedRoute adminComponent={UsersSection} userComponent={NoPermissionsPage} requiredRoles={["admin"]} />} />

          {/* Ruta de login para admin */}
          <Route path="/admin/login" element={<ProtectedRoute userComponent={Login} adminComponent={NoPermissionsPage} requiredRoles={["admin", "editor"]} />} />

          {/* Ruta de registro inicial de administrador */}
          <Route path="/admin/register" element={<ProtectedRoute userComponent={Register} adminComponent={NoPermissionsPage} requiredRoles={["admin", "editor"]} />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
