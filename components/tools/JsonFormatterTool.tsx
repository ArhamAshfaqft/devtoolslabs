'use client';
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import LZString from 'lz-string';

export default function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentation, setIndentation] = useState('2');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#payload=')) {
        try {
          const payload = hash.replace('#payload=', '');
          const decompressed = LZString.decompressFromEncodedURIComponent(payload);
          if (decompressed) {
            setInput(decompressed);
            try { 
              setOutput(JSON.stringify(JSON.parse(decompressed), null, 2)); 
            } catch(e){}
            return;
          }
        } catch(e) {}
      }
      const saved = localStorage.getItem('dtl_json_formatter_input');
      if (saved) setInput(saved);
    }
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    const val = value || '';
    setInput(val);
    localStorage.setItem('dtl_json_formatter_input', val);
  };

  const formatJson = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to format.');
      setOutput('');
      return;
    }
    try {
      setError(null);
      const parsedObj = JSON.parse(input);
      let spaceStr: number | string = 2;
      if (indentation === '2') spaceStr = 2;
      else if (indentation === '4') spaceStr = 4;
      else if (indentation === 'tab') spaceStr = '\t';
      else if (indentation === 'minified') spaceStr = 0;

      const formatted = JSON.stringify(parsedObj, null, spaceStr);
      setOutput(formatted);
      setCopied(false);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON format. Please check your syntax.');
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setCopied(false);
    localStorage.removeItem('dtl_json_formatter_input');
    window.location.hash = '';
  };

  const handleShare = () => {
    if (!input.trim()) return;
    const compressed = LZString.compressToEncodedURIComponent(input);
    window.location.hash = `payload=${compressed}`;
    navigator.clipboard.writeText(window.location.href);
    alert('Shareable URL copied to clipboard!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setInput(result);
      localStorage.setItem('dtl_json_formatter_input', result);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setInput(result);
      localStorage.setItem('dtl_json_formatter_input', result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button onClick={formatJson} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
            Format JSON
          </button>

          <label htmlFor="indentation" className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:block">
            Indentation:
          </label>
          <select
            id="indentation"
            value={indentation}
            onChange={(e) => setIndentation(e.target.value)}
            className="w-full sm:w-auto bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 outline-none font-medium"
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">Tabs</option>
            <option value="minified">Minified</option>
          </select>

          <label className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
             Upload
             <input type="file" accept=".json,application/json,text/plain" className="hidden" onChange={handleFileUpload} />
          </label>
          
          <button onClick={handleShare} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            Share
          </button>

          <button onClick={handleClear} className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-colors">
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm border-b border-red-200 font-mono flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <strong>Parse Error:</strong> {error}
        </div>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        {/* Input */}
        <div 
          className="flex flex-col h-[500px] relative bg-gray-50"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="bg-gray-100/50 p-2 border-b border-gray-200 flex justify-between items-center">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Input JSON</h3>
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
              renderLineHighlight: "all",
              smoothScrolling: true,
              cursorBlinking: "smooth"
            }}
            loading={<div className="flex items-center justify-center h-full text-gray-400 font-mono text-sm">Loading Editor...</div>}
          />
          {input.length === 0 && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
               <div className="text-center p-6">
                 <p className="text-gray-400 font-medium">Paste messy JSON or Drag & Drop a file here.</p>
               </div>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="flex flex-col h-[500px] relative bg-white">
          <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center pr-4">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Formatted Output</h3>
             <button
                onClick={handleCopy}
                disabled={!output}
                className={`text-xs px-3 py-1 font-bold uppercase tracking-wider rounded transition-colors border ${
                  copied
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
          </div>
          <Editor
            height="100%"
            defaultLanguage="json"
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
              renderLineHighlight: "none",
              smoothScrolling: true
            }}
            loading={<div className="flex items-center justify-center h-full text-gray-400 font-mono text-sm">Loading Editor...</div>}
          />
        </div>
      </div>
    </div>
  );
}
