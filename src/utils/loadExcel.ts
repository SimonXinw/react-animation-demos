// src/utils/loadExcel.ts
import * as XLSX from "xlsx";

export async function fetchExcelData(fileUrl: string): Promise<any[]> {
  const res = await fetch(fileUrl);
  const blob = await res.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  return jsonData as any[];
}
