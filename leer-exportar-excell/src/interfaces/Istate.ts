import XLSX from "xlsx"

export interface State{
    nameDoc: string,
    woorksheets: XLSX.WorkSheet[] ,
    hoja: XLSX.WorkSheet | undefined 
    filas: ExcelRow[],
    propiedades:string[],
    status: boolean

}

export interface ExcelRow {
    // Define la estructura de cada fila
    campo1: string;
}

export interface WorksheetItem {
    data: object;
    name: string;
    index: number;
  }
  