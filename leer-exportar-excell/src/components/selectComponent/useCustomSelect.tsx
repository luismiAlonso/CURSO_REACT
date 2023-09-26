import React, { useState, ChangeEvent } from 'react'
import { IoptionSelect } from './IoptionsSelect'

export function useCustomSelect(
  optionDefault: string,
  opcionsInit: IoptionSelect[]
) {
  const [options, setOptions] = useState(opcionsInit)
  const [selectedValue, setSelectedValue] = useState(optionDefault)

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value=e.target.value;
    setSelectedValue(value)
  }
  
  const updateOptions = (nuevasOpciones: IoptionSelect[]) => {
    setOptions(nuevasOpciones)
  }

  return {
    options,
    selectedValue,
    setSelectedValue,
    handleSelectChange,
    updateOptions
  }
}

export default useCustomSelect
