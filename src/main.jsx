import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import { CategoriesProvider } from './context/CategoriesContext.jsx';
import { UsersProvider } from './context/UsersContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';
import App from './App.jsx'
import "../src/styles/index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <UsersProvider>
              <App />
            </UsersProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
