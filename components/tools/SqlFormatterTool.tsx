'use client';
import React, { useState, useEffect } from 'react';
import { format } from 'sql-formatter';

export default function SqlFormatterTool() {
  const [input, setInput] = useState('SELECT a, b, c FROM table1 WHERE a > 5 AND b < 10 ORDER BY c DESC;');
  const [output, setOutput] = useState('');
  const [dialect, setDialect] = useState('postgresql');
  const [keywordCase, setKeywordCase] = useState<'upper' | 'lower' | 'preserve'>('upper');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const formatted = format(input, {
        language: dialect as any,
        keywordCase: keywordCase,
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Syntax error in SQL input.');
      setOutput('');
    }
  }, [input, dialect, keywordCase]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row gap-4 border border-gray-200 p-4 rounded-lg bg-gray-50 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex flex-col gap-1 w-full md:w-48">
             <label className="text-xs font-semibold text-gray-700 uppercase tracking-widest">SQL Dialect</label>
             <select 
               value={dialect}
               onChange={(e) => setDialect(e.target.value)}
               className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm text-gray-900 bg-white"
             >
               <option value="postgresql">PostgreSQL</option>
               <option value="mysql">MySQL</option>
               <option value="tsql">SQL Server (T-SQL)</option>
               <option value="sqlite">SQLite</option>
               <option value="mariadb">MariaDB</option>
               <option value="bigquery">BigQuery</option>
             </select>
          </div>
          <div className="flex flex-col gap-1 w-full md:w-48">
             <label className="text-xs font-semibold text-gray-700 uppercase tracking-widest">Keyword Case</label>
             <select 
               value={keywordCase}
               onChange={(e) => setKeywordCase(e.target.value as any)}
               className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm text-gray-900 bg-white"
             >
               <option value="upper">UPPERCASE</option>
               <option value="lower">lowercase</option>
               <option value="preserve">Preserve Original</option>
             </select>
          </div>
        </div>
        
        <button 
          onClick={handleCopy}
          disabled={!output}
          className="w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors focus:ring-4 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Copy Formatted SQL
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Minified or Messy SQL Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT * FROM users WHERE active = true..."
            className="w-full h-[500px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-sm bg-white text-gray-900"
            spellCheck="false"
          ></textarea>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
             <label className="block text-sm font-semibold text-gray-900">Beautified Output</label>
             {error && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">{error}</span>}
          </div>
          <textarea
            readOnly
            value={output}
            className={`w-full h-[500px] p-4 border rounded-lg font-mono text-sm outline-none ${error ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-300 bg-gray-100 text-blue-900'}`}
            spellCheck="false"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
