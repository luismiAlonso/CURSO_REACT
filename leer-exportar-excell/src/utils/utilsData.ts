export function obtenerExtensionDeArchivo(archivo: Blob | File) {

    if (archivo instanceof File) {
      const nombreArchivo = archivo.name;
      const partes = nombreArchivo.split('.');
  
      if (partes.length > 1) {
        return partes[partes.length - 1];
      }
    }
    return ""; // Retorna "" si no se pudo determinar la extensión
}
  