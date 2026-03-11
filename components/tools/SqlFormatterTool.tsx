'use client';
import React, { useState, useEffect } from 'react';
import { format } from 'sql-formatter';

export default function SqlFormatterTool() {
  const [input, setInput] = useState('SELECT a, b, c FROM table1 WHERE a > 5 AND b < 10 ORDER BY c DESC;');
  const [output, setOutput] = useState('');
  const [dialect, setDialect] = useState('postgresql');
  const [keywordCase, setKeywordCase] = useState<'upper' | 'lower' | 'preserve'>('upper');
  const [isMinified, setIsMinified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (isMinified) {
         // Simple SQL minification logic
         const minified = input
           .replace(/\/\*[\s\S]*?\*\/|--.*?\n/g, '') // Remove comments
           .replace(/\s+/g, ' ')                      // Collapse whitespace
           .trim();
         setOutput(minified);
         setError('');
      } else {
        const formatted = format(input, {
          language: dialect as any,
          keywordCase: keywordCase,
          linesBetweenQueries: 2,
        });
        setOutput(formatted);
        setError('');
      }
    } catch (err: any) {
      setError(err.message || 'Syntax error in SQL input.');
      setOutput('');
    }
  }, [input, dialect, keywordCase, isMinified]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Precision Toolbar */}
      <div className="flex flex-col xl:flex-row gap-4 border border-gray-200 p-5 rounded-2xl bg-gray-50/50 items-center justify-between">
        <div className="flex flex-wrap items-center gap-6 w-full xl:w-auto">
          <div className="flex flex-col gap-1.5 min-w-[160px]">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Database engine</label>
             <select 
               value={dialect}
               onChange={(e) => setDialect(e.target.value)}
               className="p-2.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-bold text-gray-900 bg-white shadow-sm transition-all cursor-pointer"
             >
               <option value="postgresql">PostgreSQL</option>
               <option value="mysql">MySQL / MariaDB</option>
               <option value="tsql">SQL Server (T-SQL)</option>
               <option value="sqlite">SQLite</option>
               <option value="bigquery">BigQuery</option>
               <option value="plsql">Oracle PL/SQL</option>
             </select>
          </div>

          <div className="flex flex-col gap-1.5 min-w-[160px]">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Keywords</label>
             <select 
               value={keywordCase}
               onChange={(e) => setKeywordCase(e.target.value as any)}
               className="p-2.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-bold text-gray-900 bg-white shadow-sm transition-all cursor-pointer"
             >
               <option value="upper">UPPERCASE</option>
               <option value="lower">lowercase</option>
               <option value="preserve">Preserve Case</option>
             </select>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-xl border border-gray-200 shadow-sm h-[46px] mt-4 xl:mt-0">
             <label className="text-xs font-bold text-gray-600 cursor-pointer select-none" htmlFor="minify-toggle">Minify SQL</label>
             <input 
               id="minify-toggle"
               type="checkbox" 
               checked={isMinified}
               onChange={(e) => setIsMinified(e.target.checked)}
               className="w-5 h-5 accent-blue-600 cursor-pointer"
             />
          </div>
        </div>
        
        <button 
          onClick={handleCopy}
          disabled={!output}
          className="w-full xl:w-auto px-8 py-3 bg-blue-600 text-white text-sm font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4 xl:mt-0"
        >
          Copy Clean SQL
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
        <div className="relative group">
          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Messy / Raw SQL Query</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT * FROM users JOIN orders..."
            className="w-full h-[550px] p-6 border-2 border-gray-100 rounded-3xl focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500/30 outline-none transition-all font-mono text-sm bg-white text-gray-900 shadow-sm group-hover:shadow-md resize-none"
            spellCheck="false"
          ></textarea>
        </div>

        <div className="relative group">
          <div className="flex justify-between items-center mb-3">
             <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
               {isMinified ? "Minified SQL" : "Formatted & Beautified"}
             </label>
             {error && <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full">{error}</span>}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Standardized output will appear here..."
            className={`w-full h-[550px] p-6 border-2 rounded-3xl font-mono text-sm outline-none transition-all resize-none ${error ? 'border-red-200 bg-red-50/50 text-red-900' : 'border-blue-50 bg-blue-50/20 text-blue-900 shadow-sm'}`}
            spellCheck="false"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
