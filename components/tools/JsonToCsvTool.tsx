'use client';
import React, { useState, useEffect } from 'react';

export default function JsonToCsvTool() {
  const [jsonInput, setJsonInput] = useState('[\n  {\n    "id": 1,\n    "name": "Leanne Graham",\n    "email": "Sincere@april.biz"\n  },\n  {\n    "id": 2,\n    "name": "Ervin Howell",\n    "email": "Shanna@melissa.tv"\n  }\n]');
  const [csvOutput, setCsvOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!jsonInput.trim()) {
      setCsvOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const dataArray = Array.isArray(parsed) ? parsed : [parsed];
      
      if (dataArray.length === 0) {
        setCsvOutput('');
        return;
      }

      // 1. Gather all unique headers
      const headers = new Set<string>();
      dataArray.forEach(obj => {
        if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(key => headers.add(key));
        }
      });
      
      const headerArray = Array.from(headers);
      
      // 2. Escape a generic CSV string logic
      const escapeCsv = (val: any) => {
        if (val === null || val === undefined) return '';
        const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
        // If string contains comma, newline, or double quotes, it must be quoted
        if (str.includes(',') || str.includes('\\n') || str.includes('"')) {
           return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      // 3. Build CSV string
      const csvRows = [];
      csvRows.push(headerArray.map(escapeCsv).join(',')); // Header row
      
      dataArray.forEach(obj => {
        if (typeof obj === 'object' && obj !== null) {
          const row = headerArray.map(header => escapeCsv(obj[header]));
          csvRows.push(row.join(','));
        } else {
          // Fallback if data array contains raw primitives instead of objects
          csvRows.push(escapeCsv(obj));
        }
      });

      setCsvOutput(csvRows.join('\\n'));
      setError('');
    } catch (err: any) {
      setError('Invalid JSON syntax. Ensure your keys and string values are enclosed in double quotes.');
      setCsvOutput('');
    }
  }, [jsonInput]);

  const handleDownload = () => {
    if (!csvOutput) return;
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 w-full">     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
             <label className="block text-sm font-semibold text-gray-900">JSON Input (Array of Objects)</label>
             {error && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded truncate">{error}</span>}
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className={`w-full h-[500px] p-4 border rounded-lg focus:ring-2 focus:ring-gray-900 outline-none transition-colors font-mono text-sm bg-gray-900 text-green-400 ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300'}`}
            spellCheck="false"
          ></textarea>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
             <label className="block text-sm font-semibold text-gray-900">CSV Output</label>
             <button 
               onClick={handleDownload}
               disabled={!csvOutput}
               className="px-4 py-1 text-xs bg-gray-900 text-white rounded font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors"
             >
               Download .csv
             </button>
           </div>
          <textarea
            readOnly
            value={csvOutput}
            className="w-full h-[500px] p-4 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm outline-none text-blue-900 whitespace-pre"
            spellCheck="false"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
