'use client';
import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';

export default function YamlConverterTool({ defaultMode = 'yaml-to-json' }: { defaultMode?: 'yaml-to-json' | 'json-to-yaml' }) {
  const [mode, setMode] = useState<'yaml-to-json' | 'json-to-yaml'>(defaultMode);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      setError(null);
      if (mode === 'yaml-to-json') {
        const parsed = yaml.load(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(input);
        setOutput(yaml.dump(parsed));
      }
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  }, [input, mode]);

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex gap-4">
        <button
          onClick={() => setMode('yaml-to-json')}
          className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
            mode === 'yaml-to-json' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          YAML to JSON
        </button>
        <button
          onClick={() => setMode('json-to-yaml')}
          className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
            mode === 'json-to-yaml' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          JSON to YAML
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-0 flex flex-col h-[400px]">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              {mode === 'yaml-to-json' ? 'Input YAML' : 'Input JSON'}
            </h3>
            <button onClick={() => setInput('')} className="text-xs text-blue-600 hover:underline">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'yaml-to-json' ? 'apiVersion: v1\nkind: Pod...' : '{\n  "name": "example"\n}'}
            className="w-full flex-1 p-4 bg-white font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-gray-300"
            spellCheck="false"
          />
        </div>

        <div className="p-0 flex flex-col h-[400px] bg-gray-50 relative">
          <div className="p-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
             <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              {mode === 'yaml-to-json' ? 'JSON Output' : 'YAML Output'}
            </h3>
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
