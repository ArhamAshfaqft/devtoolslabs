'use client';

import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import yaml from 'js-yaml';

export default function JsonToYamlTool() {
  const [jsonInput, setJsonInput] = useState<string>(`[
  {
    "name": "Cloud Cluster",
    "region": "us-east-1",
    "nodes": 5,
    "tags": ["prod", "web"]
  }
]`);
  
  const [yamlOutput, setYamlOutput] = useState<string>('');
  const [indent, setIndent] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    try {
      setError(null);
      const parsed = JSON.parse(jsonInput);
      const converted = yaml.dump(parsed, {
        indent: indent,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false
      });
      setYamlOutput(converted);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format');
      setYamlOutput('');
    }
  }, [jsonInput, indent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlOutput);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-gray-400 border-none uppercase tracking-widest">Input JSON Payload</label>
            <div className="flex gap-2">
              <select 
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg p-1 font-bold"
              >
                <option value={2}>2 Spacing</option>
                <option value={4}>4 Spacing</option>
              </select>
              <button 
                onClick={handleConvert}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-all shadow-md active:scale-95"
              >
                Convert to YAML
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
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-gray-400 border-none uppercase tracking-widest">Output YAML</label>
            <button 
              onClick={handleCopy}
              disabled={!yamlOutput}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Copy YAML
            </button>
          </div>
          <div className="h-[500px] border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-gray-50">
            <Editor
              height="100%"
              defaultLanguage="yaml"
              theme="vs-light"
              value={yamlOutput}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                domReadOnly: true
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold flex items-center gap-3 rounded-xl animate-in fade-in slide-in-from-left-2">
           <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
           </svg>
           {error}
        </div>
      )}

      <div className="prose prose-slate max-w-none bg-indigo-50/30 p-8 rounded-2xl border border-indigo-100 mt-6">
        <h3 className="text-indigo-900 border-none font-black tracking-tight">Expert Technical Insight: JSON to YAML Serialization</h3>
        <p className="text-gray-700 leading-relaxed text-sm">
          Turning JSON payloads into YAML results in highly readable, configuration-ready files. Unlike generic converters, our engine handles <strong>Deep Object Nesting</strong> and <strong>Array Mapping</strong> with professional precision, ensuring compatibility with CI/CD tools like GitHub Actions and Jenkins.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl border border-indigo-200">
            <h4 className="text-xs font-black uppercase text-indigo-600 mb-4 border-none tracking-widest">CI/CD Standards</h4>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Most pipeline configurations require strict YAML formatting. Our tool defaults to 2-space indentation and disables line-wrapping, producing production-ready code that passes linter checks in Kubernetes and Docker environments.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-indigo-200">
            <h4 className="text-xs font-black uppercase text-indigo-600 mb-4 border-none tracking-widest">Metadata Preservation</h4>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              When serializing from JSON to YAML, we preserve data types (Numbers, Nulls, Booleans) and correctly escapeto strings when necessary, maintaining the integrity of your original JSON schema throughout the conversion process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
