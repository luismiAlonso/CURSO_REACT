import React, { useState, ChangeEvent } from 'react'

interface OpcionesSelect {
  key: string
  value: string
}

export function useCustomSelect(
  optionDefault: string,
  opcionsInit: OpcionesSelect[]
) {
  const [options, setOptions] = useState(opcionsInit)
  const [selectedValue, setSelectedValue] = useState(optionDefault)

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value=e.target.value;
    setSelectedValue(value)
  }
  
  const updateOptions = (nuevasOpciones: OpcionesSelect[]) => {
    setOptions(nuevasOpciones)
  }

  return {
    options,
    selectedValue,
    handleSelectChange,
    updateOptions
  }
}

export default useCustomSelect
