'use client';
import React, { useState, useEffect } from 'react';

export default function SqlToObjectTool() {
  const [input, setInput] = useState(`CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP
);`);
  const [output, setOutput] = useState('');
  const [format, setFormat] = useState<'typescript' | 'json'>('typescript');
  const [error, setError] = useState<string | null>(null);

  const parseSql = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      setError(null);
      // Basic regex to find columns in a CREATE TABLE statement
      const lines = input.split('\n');
      const columns: { name: string; type: string }[] = [];
      
      const columnRegex = /^\s*([a-zA-Z0-9_]+)\s+([a-zA-Z]+)/;

      lines.forEach(line => {
        const match = line.match(columnRegex);
        if (match) {
          const name = match[1];
          const rawType = match[2].toUpperCase();
          
          let tsType = 'any';
          if (['INT', 'INTEGER', 'FLOAT', 'DOUBLE', 'DECIMAL', 'NUMERIC'].some(t => rawType.includes(t))) tsType = 'number';
          else if (['VARCHAR', 'TEXT', 'CHAR', 'UUID', 'TIMESTAMP', 'DATE'].some(t => rawType.includes(t))) tsType = 'string';
          else if (['BOOL', 'BOOLEAN'].some(t => rawType.includes(t))) tsType = 'boolean';

          columns.push({ name, type: tsType });
        }
      });

      if (columns.length === 0) {
        setError('No columns detected. Please provide a standard CREATE TABLE statement.');
        setOutput('');
        return;
      }

      if (format === 'typescript') {
        const interfaceName = 'SqlResult';
        let res = `interface ${interfaceName} {\n`;
        columns.forEach(col => {
          res += `  ${col.name}: ${col.type};\n`;
        });
        res += '}';
        setOutput(res);
      } else {
        const obj: any = {};
        columns.forEach(col => {
          obj[col.name] = col.type === 'number' ? 0 : col.type === 'boolean' ? false : "";
        });
        setOutput(JSON.stringify(obj, null, 2));
      }
    } catch (e: any) {
      setError(`Parsing Error: ${e.message}`);
    }
  };

  useEffect(() => {
    parseSql();
  }, [input, format]);

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex gap-4">
        <button
          onClick={() => setFormat('typescript')}
          className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
            format === 'typescript' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          TYPESCRIPT
        </button>
        <button
          onClick={() => setFormat('json')}
          className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
            format === 'json' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          JSON OBJECT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-0 flex flex-col h-[400px]">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">SQL Schema</h3>
            <button onClick={() => setInput('')} className="text-xs text-blue-600 hover:underline">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste CREATE TABLE SQL...'
            className="w-full flex-1 p-4 bg-white font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-gray-300"
            spellCheck="false"
          />
        </div>

        <div className="p-0 flex flex-col h-[400px] bg-gray-50 relative">
          <div className="p-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
             <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Output Object</h3>
            <button onClick={handleCopy} disabled={!output} className="text-xs font-medium text-gray-700 bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 disabled:opacity-50">Copy</button>
          </div>
          <textarea
            value={error || output}
            readOnly
            placeholder="Result will appear here..."
            className={`w-full flex-1 p-4 bg-transparent font-mono text-sm resize-none outline-none ${error ? 'text-red-600 font-semibold' : 'text-gray-900'}`}
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
