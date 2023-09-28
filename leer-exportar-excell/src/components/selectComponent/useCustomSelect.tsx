import React, { useState, ChangeEvent, useEffect } from 'react'
import { IoptionSelect } from './IoptionsSelect'

export function useCustomSelect(
  optionDefault: string,
  opcionsInit: IoptionSelect[]
) {
  const [options, setOptions] = useState(opcionsInit)
  const [selectedValue, setSelectedValue] = useState(optionDefault)
  const [defaultOption,setDefaultOption] = useState(optionDefault)

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value=e.target.value;
    setSelectedValue(value)
  }
  
  const updateOptions = (nuevasOpciones: IoptionSelect[]) => {
    setOptions(nuevasOpciones)
  }

  useEffect(()=>{
    setDefaultOption(optionDefault)
  },[optionDefault])

  return {
    options,
    selectedValue,
    defaultOption,
    setDefaultOption,
    setSelectedValue,
    handleSelectChange,
    updateOptions
  }
}

export default useCustomSelect
