'use client';
import React, { useState, useEffect } from 'react';

export default function JsonToTypescriptTool() {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "Leanne Graham",\n  "username": "Bret",\n  "email": "Sincere@april.biz",\n  "address": {\n    "street": "Kulas Light",\n    "suite": "Apt. 556",\n    "city": "Gwenborough"\n  }\n}');
  const [output, setOutput] = useState('');
  const [outputType, setOutputType] = useState<'interface' | 'type'>('interface');
  const [rootName, setRootName] = useState('RootObject');
  const [error, setError] = useState<string | null>(null);

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

        let result = `${outputType} ${name} {\n`;
        for (const key in obj) {
          const type = getType(obj[key], key);
          result += `  ${key}: ${type};\n`;
        }
        result += `}\n`;
        interfaces.unshift(result);
      };

      generateInterface(parsed, rootName);
      setOutput(interfaces.join('\n'));
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput('');
    }
  };

  useEffect(() => {
    generateTypescript();
  }, [input, outputType, rootName]);

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Configuration Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
           <button
            onClick={() => setOutputType('interface')}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${
              outputType === 'interface' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            INTERFACE
          </button>
          <button
            onClick={() => setOutputType('type')}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${
              outputType === 'type' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            TYPE
          </button>
        </div>
        
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Root Name:</span>
            <input 
                type="text" 
                value={rootName}
                onChange={(e) => setRootName(e.target.value)}
                className="px-2 py-1 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-gray-900 outline-none w-32"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-0 flex flex-col h-[450px]">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Input JSON</h3>
            <button onClick={() => setInput('')} className="text-xs text-blue-600 hover:underline">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here...'
            className="w-full flex-1 p-4 bg-white font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-gray-300"
            spellCheck="false"
          />
        </div>

        <div className="p-0 flex flex-col h-[450px] bg-gray-50 relative">
          <div className="p-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
             <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">TS Output</h3>
            <button onClick={handleCopy} disabled={!output} className="text-xs font-medium text-gray-700 bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 disabled:opacity-50">Copy Code</button>
          </div>
          <textarea
            value={error || output}
            readOnly
            placeholder="TypeScript definitions will appear here..."
            className={`w-full flex-1 p-4 bg-transparent font-mono text-sm resize-none outline-none ${error ? 'text-red-600 font-semibold' : 'text-gray-900'}`}
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
