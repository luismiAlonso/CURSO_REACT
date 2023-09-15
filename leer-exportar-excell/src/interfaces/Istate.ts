import XLSX from "xlsx"

export interface State{
    nameDoc: string,
    woorksheets: XLSX.WorkSheet[] ,
    hoja: XLSX.WorkSheet | undefined 
    filas: string[],
    propiedades:string[],
    status: boolean
}


export interface WorksheetItem {
    data: object;
    name: string;
    index: number;
  }
  