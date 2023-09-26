import { useCallback } from 'react';

// Definición de la función debounce genérica
function debounce<T extends (...args: string[]) => void>(
  func: T,
  wait: number
) {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Custom hook para crear una función debounced
function useDebouncedFunction<T extends (...args: string[]) => void>(
  callback: T,
  delay: number
) {
  const debouncedCallback = useCallback(
    debounce(callback, delay),
    [callback, delay]
  );

  return debouncedCallback;
}

export default useDebouncedFunction;
