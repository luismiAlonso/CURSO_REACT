import React from 'react'
import { OptionSelect } from './OptionsSelect'

interface CustomSelectProps {
  optionsSelect: OptionSelect[]
  selectedValueRef: React.RefObject<HTMLSelectElement> // Agregamos la referencia como prop
  onSeleccion: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  optionsSelect,
  selectedValueRef,
  onSeleccion
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSeleccion(e)
  }

  return (
    <div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ref={selectedValueRef}
        onChange={handleSelectChange}
      >
        {optionsSelect.map((opcion) => (
          <option key={opcion.key} value={opcion.value}>
            {opcion.value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect
