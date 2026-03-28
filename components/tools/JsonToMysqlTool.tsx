'use client';
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export default function JsonToMysqlTool() {
  const [input, setInput] = useState('{\n  "id": 1024,\n  "username": "developer123",\n  "email": "test@devtoolslabs.com",\n  "is_active": true,\n  "balance": 150.50,\n  "bio": "A passionate software engineer building tools.",\n  "last_login": "2026-03-27T10:00:00Z"\n}');
  const [output, setOutput] = useState('');
  const [tableName, setTableName] = useState('users');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // SQL Generation Options
  const [addId, setAddId] = useState(false); // User might want us to autogenerate an ID if not present
  const [addTimestamps, setAddTimestamps] = useState(true);
  const [engine, setEngine] = useState('InnoDB');
  const [charset, setCharset] = useState('utf8mb4');

  const generateSchema = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setError(null);
      
      // Determine the root object
      let rootObj = parsed;
      if (Array.isArray(parsed)) {
        if (parsed.length === 0) {
          setOutput('-- Empty JSON array provided.');
          return;
        }
        rootObj = parsed[0]; // Infer schema from the first element
      }

      if (typeof rootObj !== 'object' || rootObj === null) {
        throw new Error("Top-level entity must be an object or an array of objects.");
      }

      const columns: string[] = [];
      const primaryKeys: string[] = [];

      if (addId && !('id' in rootObj)) {
        columns.push(`  \`id\` BIGINT AUTO_INCREMENT NOT NULL`);
        primaryKeys.push('id');
      }

      // Type Inference Logic
      const inferType = (key: string, value: any): string => {
        if (value === null) return 'VARCHAR(255) NULL';
        
        const type = typeof value;
        if (type === 'boolean') return 'TINYINT(1)';
        if (type === 'number') {
          return Number.isInteger(value) ? 'INT' : 'DECIMAL(10, 2)';
        }
        if (type === 'string') {
          // Check for ISO Datetime
          const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
          if (isoRegex.test(value)) return 'DATETIME';
          
          // Check for Date only
          if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'DATE';
          
          // Heuristics for Text vs Varchar (if string is very long, use TEXT)
          if (value.length > 255) return 'TEXT';
          return 'VARCHAR(255)';
        }
        if (type === 'object') {
           return 'JSON'; // Arrays or nested objects become JSON columns in Modern MySQL
        }
        
        return 'VARCHAR(255)';
      };

      for (const [key, value] of Object.entries(rootObj)) {
        const safeKey = `\`${key}\``;
        const colType = inferType(key, value);
        
        let modifier = 'NULL'; // Default to NULL
        if (key.toLowerCase() === 'id') {
          modifier = 'NOT NULL AUTO_INCREMENT';
          if (!primaryKeys.includes(key)) primaryKeys.push(key);
        }
        
        columns.push(`  ${safeKey} ${colType} ${modifier}`);
      }

      if (addTimestamps) {
        if (!('created_at' in rootObj)) {
          columns.push(`  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
        }
        if (!('updated_at' in rootObj)) {
          columns.push(`  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        }
      }

      if (primaryKeys.length > 0) {
        columns.push(`  PRIMARY KEY (\`${primaryKeys[0]}\`)`);
      }

      const safeTableName = `\`${tableName.replace(/[^a-zA-Z0-9_]/g, '_') || 'generated_table'}\``;
      
      const sql = `CREATE TABLE ${safeTableName} (\n${columns.join(',\n')}\n) ENGINE=${engine} DEFAULT CHARSET=${charset};`;
      
      setOutput(sql);
      
    } catch (e: any) {
      setError(`JSON Parse Error: ${e.message}`);
      setOutput('');
    }
  };

  useEffect(() => {
    generateSchema();
  }, [input, tableName, addId, addTimestamps, engine, charset]);

  const handleEditorChange = (value: string | undefined) => {
    setInput(value || '');
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInput(ev.target?.result as string);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <label className="flex items-center gap-2 cursor-pointer group">
       <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 group-hover:border-blue-500'}`}>
         {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
       </div>
       <span className="text-xs font-semibold text-gray-700 select-none group-hover:text-black">{label}</span>
    </label>
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col gap-0">
      
      {/* Configuration Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-5 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-6">
               <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Engine:</span>
                  <select value={engine} onChange={(e) => setEngine(e.target.value)} className="px-3 py-1.5 text-xs font-bold bg-white border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="InnoDB">InnoDB</option>
                    <option value="MyISAM">MyISAM</option>
                    <option value="Memory">Memory</option>
                  </select>
               </div>
               
               <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Charset:</span>
                  <select value={charset} onChange={(e) => setCharset(e.target.value)} className="px-3 py-1.5 text-xs font-bold bg-white border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="utf8mb4">utf8mb4 (Recommended)</option>
                    <option value="utf8">utf8</option>
                    <option value="latin1">latin1</option>
                  </select>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
               <Checkbox label="Add Missing ID (Auto-Increment)" checked={addId} onChange={() => setAddId(!addId)} />
               <Checkbox label="Add Default Timestamps (created_at/updated_at)" checked={addTimestamps} onChange={() => setAddTimestamps(!addTimestamps)} />
            </div>
        </div>
        
        <div className="flex flex-col gap-4 w-full lg:w-auto border-t lg:border-none border-gray-200 pt-4 lg:pt-0">
            <div className="flex flex-col gap-1 w-full lg:w-auto">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Table Name</span>
                <input 
                    type="text" 
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    placeholder="users"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none w-full lg:w-64 shadow-sm transition-all"
                />
            </div>
        </div>

      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs border-b border-red-200 font-mono flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Split Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        
        {/* Input Pane */}
        <div className="flex flex-col h-[500px] bg-white relative">
          <div className="px-4 py-3 bg-gray-50 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
               Input JSON Array / Object
            </h3>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-wider">
                 Upload File
                 <input type="file" accept=".json,application/json,text/plain" className="hidden" onChange={handleFileUpload} />
              </label>
              <button onClick={() => setInput('')} className="text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider">Clear</button>
            </div>
          </div>
          <Editor
            height="100%"
            defaultLanguage="json"
            value={input}
            onChange={handleEditorChange}
            theme="light"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              padding: { top: 16 },
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            }}
          />
        </div>

        {/* Output Pane */}
        <div className="flex flex-col h-[500px] bg-white relative">
          <div className="px-4 py-3 bg-gray-50 flex justify-between items-center border-b border-gray-200">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                Generated SQL Schema
             </h3>
             <button
                onClick={handleCopy}
                disabled={!output}
                className={`text-xs px-3 py-1 font-bold uppercase tracking-wider rounded transition-colors border ${
                  copied
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {copied ? 'Copied!' : 'Copy SQL'}
              </button>
          </div>
          <Editor
            height="100%"
            defaultLanguage="sql"
            value={output}
            theme="light"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'off',
              scrollBeyondLastLine: false,
              readOnly: true,
              padding: { top: 16 },
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            }}
          />
        </div>

      </div>
    </div>
  );
}
