'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { JSONPath } from 'jsonpath-plus';
import { Search, Info, Copy, Check, FileJson, Hash } from 'lucide-react';

const DEFAULT_JSON = {
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  },
  "expensive": 10
};

export default function JsonExtractorTool() {
  const [inputJson, setInputJson] = useState<string>(JSON.stringify(DEFAULT_JSON, null, 2));
  const [path, setPath] = useState<string>('$.store.book[*].author');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Core Extraction Logic
  const extractData = useCallback((jsonStr: string, jsonPath: string) => {
    if (!jsonStr.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(jsonStr);
      setError(null);

      if (!jsonPath.trim()) {
        setOutput(JSON.stringify(parsed, null, 2));
        return;
      }

      const result = JSONPath({
        path: jsonPath,
        json: parsed,
        wrap: false
      });

      setOutput(JSON.stringify(result, null, 2));
    } catch (e: any) {
      if (e instanceof SyntaxError) {
        setError("Invalid JSON format");
      } else {
        setError(e.message || "Invalid JSONPath expression");
      }
      setOutput('');
    }
  }, []);

  useEffect(() => {
    extractData(inputJson, path);
  }, [inputJson, path, extractData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const examples = [
    { name: "Authors", path: "$.store.book[*].author" },
    { name: "Cheap Books", path: "$.store.book[?(@.price < 10)]" },
    { name: "All Titles", path: "$..title" },
    { name: "Bicycle Color", path: "$.store.bicycle.color" },
    { name: "Last Book", path: "$.store.book[-1:]" }
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-full">
      {/* Search Bar / Expression Area */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-indigo-600" />
              <label className="text-sm font-black text-slate-800 uppercase tracking-tight">JSONPath Expression</label>
            </div>
            <div className="flex gap-2">
              {examples.map((ex) => (
                <button
                  key={ex.name}
                  onClick={() => setPath(ex.path)}
                  className="px-2 py-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md transition-colors border border-slate-200"
                >
                  {ex.name}
                </button>
              ))}
            </div>
          </div>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="$.store.book[*].author"
            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-mono text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
          />
          {error && path.trim() && !error.includes("JSON format") && (
            <p className="text-xs font-bold text-red-500 flex items-center gap-1">
              <Info className="w-3 h-3" /> {error}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-[600px]">
        {/* Source JSON */}
        <div className="flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <FileJson className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Source JSON</span>
            </div>
            {error && error.includes("JSON format") && (
              <span className="text-xs font-bold text-red-500 translate-y-0.5">{error}</span>
            )}
          </div>
          <div className="flex-grow bg-white border-2 border-slate-200 rounded-2xl overflow-hidden focus-within:border-indigo-500 transition-colors shadow-[4px_4px_0px_0px_rgba(226,232,240,1)]">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-light"
              value={inputJson}
              onChange={(v) => setInputJson(v || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
                wordWrap: 'on'
              }}
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-3 h-full relative">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">Extracted Results</span>
            </div>
            <button
              onClick={handleCopy}
              className="group flex items-center gap-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] active:translate-y-0.5 active:shadow-none"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[10px] font-bold uppercase tracking-wider">{copied ? 'Copied!' : 'Copy Results'}</span>
            </button>
          </div>
          <div className="flex-grow bg-indigo-50/30 border-2 border-indigo-100 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(224,231,255,1)]">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-light"
              value={output}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                wordWrap: 'on',
                contextmenu: false
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
