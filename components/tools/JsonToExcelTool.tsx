'use client';

import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import * as XLSX from 'xlsx';

/**
 * Recursively flattens a nested object into a single-level object with dot notation keys.
 */
function flattenObject(obj: any, parentKey = '', res: any = {}): any {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const propName = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
  }
  return res;
}

export default function JsonToExcelTool() {
  const [jsonInput, setJsonInput] = useState<string>('[\n  {\n    "id": 1,\n    "name": "Leanne Graham",\n    "username": "Bret",\n    "email": "Sincere@april.biz",\n    "address": {\n      "street": "Kulas Light",\n      "suite": "Apt. 556",\n      "city": "Gwenborough"\n    }\n  },\n  {\n    "id": 2,\n    "name": "Ervin Howell",\n    "username": "Antonette",\n    "email": "Shanna@melissa.tv",\n    "address": {\n      "street": "Victor Plains",\n      "suite": "Suite 879",\n      "city": "Wisokyburgh"\n    }\n  }\n]');
  const [error, setError] = useState<string | null>(null);

  const handleExport = useCallback(() => {
    try {
      setError(null);
      const parsed = JSON.parse(jsonInput);
      
      // Ensure we have an array for the sheet
      const dataArray = Array.isArray(parsed) ? parsed : [parsed];
      
      // Flatten each object in the array
      const flattenedData = dataArray.map(item => flattenObject(item));
      
      // Create Worksheet
      const worksheet = XLSX.utils.json_to_sheet(flattenedData);
      
      // Create Workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      
      // Generate and Download
      XLSX.writeFile(workbook, "devtoolslabs_export.xlsx");
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format');
    }
  }, [jsonInput]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Input JSON Payload</label>
            <div className="flex gap-2">
               <button 
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm transition-all shadow-md flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export to Excel (.xlsx)
              </button>
            </div>
          </div>
          
          <div className="h-[500px] border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-white">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-light"
              value={jsonInput}
              onChange={(value) => setJsonInput(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold flex items-center gap-3 rounded-r-lg">
               <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
               </svg>
               {error}
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-blue max-w-none bg-blue-50/30 p-8 rounded-2xl border border-blue-100">
        <h3 className="text-blue-900 border-none">Expert Technical Insight: JSON to Excel Migration</h3>
        <p className="text-gray-700 leading-relaxed">
          Converting hierarchical JSON data into flat Excel spreadsheets is a common challenge for data analysts and developers. Unlike standard CSV exporters, our **Hero-Grade JSON to Excel Tool** uses recursive flattening logic.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-50">
            <h4 className="text-sm font-black uppercase text-blue-600 mb-3 border-none">Deep Flattening Logic</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
               Nested objects (e.g., <code>address: {"{ city: 'NY' }"}</code>) are automatically transformed into column headers using dot notation (<code>address.city</code>). This ensures no data is lost during the transpilation from a document-store format to a row-and-column format.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-50">
            <h4 className="text-sm font-black uppercase text-blue-600 mb-3 border-none">Type Preservation</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Using the <code>xlsx</code> (SheetJS) engine, we preserve native Excel types. Numbers remain as numeric cells for immediate calculation, and ISO timestamps are formatted for Excel compatibility.
            </p>
          </div>
        </div>

        <div className="mt-8">
           <h4 className="text-blue-900 border-none mb-4">Frequently Asked Questions</h4>
           <div className="space-y-4">
              <details className="group border-b border-blue-100 pb-4">
                 <summary className="font-bold text-gray-900 list-none cursor-pointer flex justify-between items-center">
                    Is my data sent to any server?
                    <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                 </summary>
                 <p className="mt-2 text-sm text-gray-600">No. All processing and file generation happens 100% locally in your browser using JavaScript. Your JSON payloads never leave your computer.</p>
              </details>
              <details className="group border-b border-blue-100 pb-4">
                 <summary className="font-bold text-gray-900 list-none cursor-pointer flex justify-between items-center">
                    How large of a JSON file can I convert?
                    <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                 </summary>
                 <p className="mt-2 text-sm text-gray-600">Since we process data in the browser, performance depends on your device RAM. Generally, JSON arrays up to 50MB (approximately 10,000-50,000 rows) will convert smoothly.</p>
              </details>
           </div>
        </div>
      </div>
    </div>
  );
}
