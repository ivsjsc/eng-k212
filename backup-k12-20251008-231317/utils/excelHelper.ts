/**
 * Excel utility using ExcelJS library (secure alternative to XLSX)
 * Provides safe Excel file operations for the application
 */

import ExcelJS from 'exceljs';

export interface ExcelData {
  headers: string[];
  rows: (string | number)[][];
}

export interface ExcelExportOptions {
  filename?: string;
  sheetName?: string;
  title?: string;
}

/**
 * Create and download an Excel file with the provided data
 */
export async function exportToExcel(
  data: ExcelData, 
  options: ExcelExportOptions = {}
): Promise<void> {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(options.sheetName || 'Sheet1');

    // Add title if provided
    if (options.title) {
      worksheet.addRow([options.title]);
      worksheet.mergeCells(1, 1, 1, data.headers.length);
      worksheet.getRow(1).font = { bold: true, size: 16 };
      worksheet.addRow([]); // Empty row
    }

    // Add headers
    worksheet.addRow(data.headers);
    const headerRow = worksheet.getRow(options.title ? 3 : 1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    // Add data rows
    data.rows.forEach(row => {
      worksheet.addRow(row);
    });

    // Auto-fit columns
    worksheet.columns.forEach(column => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, cell => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = Math.min(maxLength + 2, 50); // Cap at 50 characters
    });

    // Generate buffer and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = options.filename || 'export.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(`Failed to export Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Read Excel file and return structured data
 */
export async function readExcelFile(file: File): Promise<ExcelData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const workbook = new ExcelJS.Workbook();
        const buffer = e.target?.result as ArrayBuffer;
        await workbook.xlsx.load(buffer);
        
        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
          throw new Error('No worksheets found in the Excel file');
        }

        const rows: (string | number)[][] = [];
        let headers: string[] = [];

        worksheet.eachRow((row, rowNumber) => {
          const rowData: (string | number)[] = [];
          row.eachCell((cell, colNumber) => {
            const value = cell.value;
            if (typeof value === 'object' && value !== null) {
              // Handle ExcelJS cell value objects
              rowData[colNumber - 1] = value.toString();
            } else {
              rowData[colNumber - 1] = value as string | number;
            }
          });
          
          if (rowNumber === 1) {
            headers = rowData.map(cell => String(cell));
          } else {
            rows.push(rowData);
          }
        });

        resolve({ headers, rows });
      } catch (error) {
        reject(new Error(`Failed to read Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Generate sample Excel template for data import
 */
export async function generateTemplate(headers: string[], filename = 'template.xlsx'): Promise<void> {
  const data: ExcelData = {
    headers,
    rows: [
      // Add sample data row
      headers.map(() => 'Sample Data')
    ]
  };

  await exportToExcel(data, {
    filename,
    sheetName: 'Template',
    title: 'Import Template - Replace sample data with your actual data'
  });
}
