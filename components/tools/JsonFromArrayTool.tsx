"use client";

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function JsonFromArrayTool() {
  const [headers, setHeaders] = useState<string[]>(['id', 'name', 'active']);
  const [rows, setRows] = useState<string[][]>([
    ['1', 'Project Alpha', 'true'],
    ['2', 'Component Beta', 'false']
  ]);
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const addColumn = () => {
    const newHeader = `field_${headers.length + 1}`;
    setHeaders([...headers, newHeader]);
    setRows(rows.map(row => [...row, '']));
  };

  const removeColumn = (index: number) => {
    if (headers.length <= 1) return;
    setHeaders(headers.filter((_, i) => i !== index));
    setRows(rows.map(row => row.filter((_, i) => i !== index)));
  };

  const addRow = () => {
    setRows([...rows, new Array(headers.length).fill('')]);
  };

  const removeRow = (index: number) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
  };

  const inferType = (val: string) => {
    if (val.toLowerCase() === 'true') return true;
    if (val.toLowerCase() === 'false') return false;
    if (val === '' || isNaN(Number(val))) return val;
    return Number(val);
  };

  const convertToJson = useCallback(() => {
    const result = rows.map(row => {
      const obj: Record<string, any> = {};
      headers.forEach((header, i) => {
        obj[header || `field_${i}`] = inferType(row[i]);
      });
      return obj;
    });
    setJsonOutput(JSON.stringify(result, null, 2));
  }, [headers, rows]);

  useEffect(() => {
    convertToJson();
  }, [convertToJson]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Table Interface */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Visual Data Table</h3>
            <div className="flex gap-2">
                <button onClick={addColumn} className="px-3 py-1.5 bg-white border border-gray-300 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                   Column
                </button>
                <button onClick={addRow} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                   Row
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                {headers.map((header, i) => (
                  <th key={i} className="p-0 border-b border-r border-gray-200 min-w-[150px]">
                    <div className="flex items-center group">
                      <input
                        type="text"
                        value={header}
                        onChange={(e) => updateHeader(i, e.target.value)}
                        className="w-full px-4 py-3 bg-transparent font-bold text-gray-700 focus:bg-blue-50 outline-none transition-colors border-none text-sm"
                        placeholder="Column Key"
                      />
                      <button onClick={() => removeColumn(i)} className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </th>
                ))}
                <th className="w-12 bg-gray-50/20"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors group">
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="p-0 border-b border-r border-gray-100">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="w-full px-4 py-2.5 bg-transparent text-sm text-gray-600 focus:bg-white focus:ring-1 focus:ring-blue-200 outline-none transition-all placeholder-gray-300"
                        placeholder="..."
                      />
                    </td>
                  ))}
                  <td className="p-0 border-b border-gray-100 text-center">
                    <button onClick={() => removeRow(rowIndex)} className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Preview */}
      <div className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-[#1e1e1e] h-[400px]">
        <div className="bg-[#252526] px-6 py-3 border-b border-white/5 flex justify-between items-center">
          <span className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Generated JSON Output</span>
          <button onClick={handleCopy} className="text-xs font-bold px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {copied ? 'Copied to Clipboard!' : 'Copy JSON'}
          </button>
        </div>
        <div className="flex-1 min-h-0">
          <MonacoEditor
            height="100%"
            language="json"
            theme="vs-dark"
            value={jsonOutput}
            options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, wordWrap: 'on', padding: { top: 20 } }}
          />
        </div>
      </div>

      {/* Authority Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 italic">
               <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
               Automatic Type Inference
             </h4>
             <p className="text-xs text-gray-500 leading-relaxed">
               Unlike basic CSV converters, our generator intelligently detects data types. 
               Numeric strings like <code className="text-blue-600">"123"</code> are converted to numbers, 
               and <code className="text-blue-600">"true"</code>/<code className="text-blue-600">"false"</code> are converted to proper booleans in the final JSON schema.
             </p>
          </div>
          <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-sm">
             <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 italic">
               <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
               Why build JSON visually?
             </h4>
             <p className="text-xs text-gray-500 leading-relaxed">
               Constructing large JSON arrays manually is error-prone due to bracket matching and escaping. 
               Using a visual table interface ensures zero syntax errors and provides a spreadsheet-like workflow 
               for building configuration files, mock data, or database seeding script payloads.
             </p>
          </div>
      </div>
    </div>
  );
}
