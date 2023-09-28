import React, { useState } from 'react'

interface ItextInput {
  activeButton: boolean,
  activeSearchIcon: boolean,
  typeFill: "search" | "text" | "number"
  onChange: (value: string) => void
  onClick: (value: string) => void
}

function InputFillComponent({ activeButton,activeSearchIcon,typeFill,onChange, onClick }: ItextInput) {
  const [valueInput, setValueInput] = useState('')

  // Función de manejo de cambios del input
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValueInput(newValue) // Actualiza el estado con el nuevo valor
    onChange(newValue) // Llama a la función onChange proporcionada con el nuevo valor
  }

  const handleOnClick = () => {
    onClick(valueInput)
  }

  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {
            activeSearchIcon &&
            <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          }
        </div>
        <input
          type={typeFill}
          onChange={handleOnChange} // Asocia la función de manejo de cambios
          value={valueInput}
          id="default-search"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
        />
        {activeButton && (
          <button
            onClick={handleOnClick}
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        )}
      </div>
    </div>
  )
}

export default InputFillComponent
