import React from 'react'
import { TablaProps } from './Itabla'

function Tabla<T>({ datos, columnas,fontStyleSize }: TablaProps<T>) {
  return (
    <table style={{ fontSize: `${fontStyleSize}px` }} className="table-large min-w-full font-light">
      <thead className="border-b dark:border-neutral-500">
        <tr>
          {columnas !== undefined &&
            columnas.length > 0 &&
            columnas.map((columna) => (
              <th className="px-6 py-4" key={columna}>
                {columna}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {datos != undefined &&
          datos.length > 0 &&
          datos.map((fila, index) => (
            <tr key={index}>
              {columnas.map((columna) => (
                <td
                  className="whitespace-nowrap px-6 py-4 font-medium"
                  key={columna}
                >
                  {fila[columna]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default Tabla
