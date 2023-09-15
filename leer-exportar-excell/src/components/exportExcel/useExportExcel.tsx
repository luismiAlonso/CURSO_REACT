import { useState } from "react"
import { showSaveFilePicker } from "file-system-access"
import XLSX from "xlsx"

const useExportExcel = () => {
  const [status, setStatus] = useState(false)

  const exportToExcel = async (
    jsonData: string[],
    fileName: string
  ) => {
    try {
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(jsonData)
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

      const fileHandle = await showSaveFilePicker({
        _preferPolyfill: false,
        suggestedName: fileName,
        types: [
          {
            description: "Excel Files",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"]
            }
          }
        ],
        excludeAcceptAllOption: false // default
      })

      const excel = await XLSX.write(workbook, {
        bookType: "xlsx",
        bookSST: false,
        type: "array"
      })

      const blob = new Blob([excel], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });


      const writableStream = await fileHandle.createWritable()

      await writableStream.write(blob)
      await writableStream.close()

      setStatus(true)
    } catch (error) {
      console.error("Error exporting to Excel:", error)
      setStatus(false)
    }
  }

  return { status, exportToExcel }
}

export default useExportExcel
