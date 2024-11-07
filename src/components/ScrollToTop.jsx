// Realizado por Leandro Valera

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Desplazar la ventana al inicio cuando la ruta cambia
    window.scrollTo(0, 0);
  }, [pathname]);  // Cada vez que cambie la ruta (pathname), el scroll se resetea

  return null;
}

export default ScrollToTop;