'use client';

import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import yaml from 'js-yaml';

export default function YamlToJsonTool() {
  const [yamlInput, setYamlInput] = useState<string>(`# Sample YAML to Convert
user:
  id: 101
  profile:
    name: "John Doe"
    verified: true
  tags:
    - developer
    - seo_expert`);
  
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = useCallback(() => {
    try {
      setError(null);
      const parsed = yaml.load(yamlInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(err.reason || err.message || 'Invalid YAML format');
      setJsonOutput('');
    }
  }, [yamlInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-gray-400 border-none uppercase tracking-widest">Input YAML</label>
            <button 
              onClick={handleConvert}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-all shadow-md active:scale-95"
            >
              Convert to JSON
            </button>
          </div>
          <div className="h-[500px] border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-white">
            <Editor
              height="100%"
              defaultLanguage="yaml"
              theme="vs-light"
              value={yamlInput}
              onChange={(value) => setYamlInput(value || '')}
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
            <label className="text-xs font-black text-gray-400 border-none uppercase tracking-widest">Output JSON</label>
            <button 
              onClick={handleCopy}
              disabled={!jsonOutput}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Copy JSON
            </button>
          </div>
          <div className="h-[500px] border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-gray-50">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-light"
              value={jsonOutput}
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

      <div className="prose prose-slate max-w-none bg-slate-50/50 p-8 rounded-2xl border border-slate-100 mt-6">
        <h3 className="text-slate-900 border-none font-black tracking-tight">Expert Technical Insight: YAML to JSON Parsing</h3>
        <p className="text-gray-700 leading-relaxed text-sm">
          While YAML is a superset of JSON, converting it requires a robust parser to handle advanced features like <strong>anchors (&)</strong>, <strong>aliases (*)</strong>, and complex multi-line blocks. Our tool uses the <code>js-yaml</code> industrial-grade engine for 100% compliance with safe loading standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-black uppercase text-blue-600 mb-4 border-none tracking-widest">Safe Loading Protocol</h4>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              We exclusively use "Safe Load" logic, which prevents the execution of malicious code snippets embedded in YAML files (e.g., custom tags). This is critical for DevOps teams handling untrusted configuration payloads.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-black uppercase text-blue-600 mb-4 border-none tracking-widest">Type Inference</h4>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Native YAML types (booleans, floats, nulls) are correctly mapped to their standard JSON equivalents. This ensures that your configuration values remain consistent when moving from a <code>.yaml</code> source to a programmatic JSON environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
