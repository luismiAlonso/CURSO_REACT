import React from 'react'
import useToggle from './useToggle'

interface ItoggleProps {
  valueProp: boolean
  onChange: (value: boolean) => void
  trueText: string // Agrega trueText como prop
  falseText: string // Agrega falseText como prop
}

function ToggleComponent({
  valueProp,
  onChange,
  trueText,
  falseText
}: ItoggleProps) {
  const { value, toggle, getText } = useToggle(valueProp, {
    trueText: trueText, // Utiliza el prop trueText
    falseText: falseText // Utiliza el prop falseText
  })

  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={() => {
            toggle()
            onChange(value)
          }}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {' '}
          {getText()}
        </span>
      </label>
    </div>
  )
}

export default ToggleComponent
