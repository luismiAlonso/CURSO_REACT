import { useCallback } from 'react';

function useScroll() {
  const scrollTo = useCallback((x: number, y: number) => {
    window.scrollTo(x, y);
  }, []);

  return {
    scrollToTop: () => scrollTo(0, 0),
    scrollToBottom: () => scrollTo(0, document.documentElement.scrollHeight),
    // Puedes añadir más funciones para desplazarte a diferentes partes
  };
}

export default useScroll;
