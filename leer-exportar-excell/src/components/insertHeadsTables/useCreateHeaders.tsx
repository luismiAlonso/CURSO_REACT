// useCreateHeaders.ts
import { useState, ChangeEvent } from 'react';

const useCreateHeaders = () => {
  const [numHeaders, setNumHeaders] = useState(1);
  const [headers, setHeaders] = useState<string[]>(Array(numHeaders).fill(''));

  const handleNumHeadersChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNumHeaders = parseInt(e.target.value);
    setNumHeaders(newNumHeaders);
    setHeaders(new Array(newNumHeaders).fill(''));
  }

  const handleHeaderChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newHeaders = [...headers];
    newHeaders[index] = e.target.value;
    setHeaders(newHeaders);
  }

  const saveHeaders = () => {
    localStorage.setItem('headers', JSON.stringify(headers));
  }

  return {
    numHeaders,
    headers,
    handleNumHeadersChange,
    handleHeaderChange,
    saveHeaders,
  };
}

export default useCreateHeaders;

