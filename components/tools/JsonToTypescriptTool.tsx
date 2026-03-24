'use client';
import React, { useState, useEffect } from 'react';

export default function JsonToTypescriptTool() {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "Leanne Graham",\n  "username": "Bret",\n  "email": "Sincere@april.biz",\n  "address": {\n    "street": "Kulas Light",\n    "suite": "Apt. 556",\n    "city": "Gwenborough"\n  }\n}');
  const [output, setOutput] = useState('');
  const [outputType, setOutputType] = useState<'interface' | 'type'>('interface');
  const [rootName, setRootName] = useState('RootObject');
  const [error, setError] = useState<string | null>(null);

  // Pro Options
  const [isOptional, setIsOptional] = useState(false);
  const [isExport, setIsExport] = useState(true);
  const [addComments, setAddComments] = useState(false);

  const generateTypescript = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setError(null);
      
      const interfaces: string[] = [];
      const processedNames = new Set<string>();

      const toPascalCase = (str: string) => {
        return str
          .replace(/[^a-z0-9]/gi, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join('');
      };

      const getType = (value: any, keyName: string): string => {
        if (value === null) return 'any';
        if (Array.isArray(value)) {
          if (value.length === 0) return 'any[]';
          const innerType = getType(value[0], keyName);
          return `${innerType}[]`;
        }
        if (typeof value === 'object') {
          const interfaceName = toPascalCase(keyName);
          generateInterface(value, interfaceName);
          return interfaceName;
        }
        return typeof value;
      };

      const generateInterface = (obj: any, name: string) => {
        if (processedNames.has(name)) return;
        processedNames.add(name);

        let result = '';
        
        if (addComments) {
            result += `/**\n * ${outputType === 'interface' ? 'Interface' : 'Type'} representing ${name}\n */\n`;
        }

        const exportModifier = isExport ? 'export ' : '';
        const assigner = outputType === 'type' ? ' =' : '';
        
        result += `${exportModifier}${outputType} ${name}${assigner} {\n`;
        for (const key in obj) {
          const type = getType(obj[key], key);
          // Only add comments to fields if addComments is true AND it's a primitive type for a clean look
          if (addComments && typeof obj[key] !== 'object') {
             result += `  /** The ${key} property */\n`;
          }
          
          const optionalModifier = isOptional ? '?' : '';
          // Wrap keys in quotes if they contain invalid identifier characters (like hyphens or spaces)
          const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
          
          result += `  ${safeKey}${optionalModifier}: ${type};\n`;
        }
        result += `}\n`;
        interfaces.unshift(result);
      };

      generateInterface(parsed, rootName || 'RootObject');
      setOutput(interfaces.join('\n'));
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput('');
    }
  };

  useEffect(() => {
    generateTypescript();
  }, [input, outputType, rootName, isOptional, isExport, addComments]);

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
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
      <div className="bg-white border-b border-gray-100 p-5 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
        
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Format:</span>
               <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                  <button onClick={() => setOutputType('interface')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${outputType === 'interface' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Interface</button>
                  <button onClick={() => setOutputType('type')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${outputType === 'type' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Type</button>
               </div>
            </div>

            <div className="flex items-center gap-6">
               <Checkbox label="Export Interface" checked={isExport} onChange={() => setIsExport(!isExport)} />
               <Checkbox label="Optional Properties (?)" checked={isOptional} onChange={() => setIsOptional(!isOptional)} />
               <Checkbox label="Generate JSDoc Comments" checked={addComments} onChange={() => setAddComments(!addComments)} />
            </div>
        </div>
        
        <div className="flex flex-col gap-1 w-full sm:w-auto">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Root Model Name</span>
            <input 
                type="text" 
                value={rootName}
                onChange={(e) => setRootName(e.target.value)}
                placeholder="RootObject"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-48 shadow-sm transition-all"
            />
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
        
        {/* Input Pane */}
        <div className="flex flex-col h-[500px] border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <div className="px-4 py-3 bg-white flex justify-between items-center border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2">
               <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Input JSON
            </h3>
            <button onClick={() => setInput('')} className="text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON payload here...'
            className="w-full flex-1 p-5 bg-transparent font-mono text-sm text-gray-800 resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-yellow-400/50 leading-relaxed"
            spellCheck="false"
          />
        </div>

        {/* Output Pane */}
        <div className="flex flex-col h-[500px] bg-gray-900 relative">
          <div className="px-4 py-3 bg-gray-800 flex justify-between items-center border-b border-gray-700">
             <h3 className="text-xs font-bold text-gray-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Generated TypeScript
             </h3>
            <button onClick={handleCopy} disabled={!output} className="text-xs font-bold text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-white px-3 py-1.5 rounded transition-colors disabled:opacity-50 flex items-center gap-1.5">
               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 10h7M8 11h7" /></svg>
               Copy Code
            </button>
          </div>
          <textarea
            value={error || output}
            readOnly
            placeholder="TypeScript definitions will appear here..."
            className={`w-full flex-1 p-5 bg-transparent font-mono text-sm resize-none outline-none leading-relaxed ${error ? 'text-red-400 font-bold' : 'text-blue-300'}`}
            spellCheck="false"
          />
        </div>

      </div>
    </div>
  );
}
