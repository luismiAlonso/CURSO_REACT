// CreateHeaders.tsx
import React from 'react'
import useCreateHeaders from './useCreateHeaders' // Asegúrate de importar desde la ubicación correcta
import InputFillComponent from '../inputFill/InputFillComponent'

/*interface CreateHeadersProps {
  // Define aquí cualquier prop adicional que necesites

}*/

const CreateHeaders = () => {
  const {
    numHeaders,
    headers,
    handleNumHeadersChange,
    handleHeaderChange,
    saveHeaders
  } = useCreateHeaders()

  const handleInputTextChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
    handleNumHeadersChange(e)
  }

  const handleInputTextClick = ()=>{

  }

  return (
    <div>
      <label>
        Number of Headers:
        {/*<input
          type="number"
          value={numHeaders}
          onChange={handleNumHeadersChange}
          min={1}
        />*/}
        <InputFillComponent
            activeButton={false}
            activeSearchIcon={false}
            typeFill={"number"}
            onChange={handleInputTextChange}
            onClick={handleInputTextClick}
          />
      </label>

      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={saveHeaders}
      >
        Save Headers
      </button>
      <div>
        {headers.map((header: string, index: number) => (
          <input
            key={index}
            type="text"
            value={header}
            onChange={(e) => handleHeaderChange(e, index)}
          />
        ))}
      </div>
    </div>
  )
}

export default CreateHeaders
