import { useState, useEffect } from 'react';

const usePaginator = (data: string[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0); // Cambiamos a 0 para usar índices base 0
  const [changePage, setChangePage] = useState(false);
  const [totalPages, setTotalPages] = useState(0); // Se actualizará más adelante
  const [dataPages, setDataPages] = useState<string[][]>([]); // Matriz de vectores por página

  const getPageData = () => {
    return dataPages[currentPage] || [];
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setChangePage(true);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setChangePage(false);
    }
  };

  const resetPaginator = (newData: string[]) => {
    const newTotalPages = Math.ceil(newData.length / itemsPerPage);
    setChangePage(false);
    setCurrentPage(0);
    setTotalPages(newTotalPages);
    // Trocear y cargar la matriz con los nuevos datos
    const newDataPages = chunkArray(newData, itemsPerPage);
    setDataPages(newDataPages);
  };

  const updateDataPages = (newData: string[]) => {
    // Actualizar la matriz de páginas cuando se recibe un nuevo vector de datos
    setTotalPages(Math.ceil(newData.length / itemsPerPage));
    // Trocear y cargar la matriz con los nuevos datos
    const newDataPages = chunkArray(newData, itemsPerPage);
    setDataPages(newDataPages);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    // Trocear y cargar la matriz con los datos iniciales
    const initialDataPages = chunkArray(data, itemsPerPage);
    setDataPages(initialDataPages);
  }, [data, itemsPerPage]);

  // Función para trocear un array en subarrays del tamaño especificado
  const chunkArray = (array: string[], size: number) => {
    const chunkedArray: string[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  return {
    itemsPerPage,
    currentPage,
    totalPages,
    changePage,
    getPageData,
    nextPage,
    prevPage,
    resetPaginator,
    updateDataPages// Agregamos la función para actualizar la matriz de páginas
  };
};

export default usePaginator;
