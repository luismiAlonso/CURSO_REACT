import React from 'react'
import useReadExcel from './useReadExcel'




function InputFileExcel() {


  return (
    <div>
      <input
        type={'file'}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        name="excel"
      />
    </div>
  )
}

export default InputFileExcel
