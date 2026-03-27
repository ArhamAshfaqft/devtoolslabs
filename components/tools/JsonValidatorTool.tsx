'use client';
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import LZString from 'lz-string';

export default function JsonValidatorTool() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);

  // Load from URL or LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#payload=')) {
        try {
          const payload = hash.replace('#payload=', '');
          const decompressed = LZString.decompressFromEncodedURIComponent(payload);
          if (decompressed) {
            setInput(decompressed);
            // Auto-validate if loaded from URL
            validateJsonContent(decompressed);
            return;
          }
        } catch(e) {}
      }
      
      const saved = localStorage.getItem('dtl_json_validator_input');
      if (saved) {
        setInput(saved);
      }
    }
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    const val = value || '';
    setInput(val);
    if (status !== 'idle') setStatus('idle');
    localStorage.setItem('dtl_json_validator_input', val);
  };

  const validateJsonContent = (content: string) => {
    if (!content.trim()) {
      setStatus('idle');
      setErrorMessage(null);
      setErrorLine(null);
      return;
    }

    try {
      JSON.parse(content);
      setStatus('valid');
      setErrorMessage('Valid JSON');
      setErrorLine(null);
    } catch (e: any) {
      setStatus('invalid');
      const msg = e.message || 'Invalid JSON format';
      setErrorMessage(msg);
      
      const match = textPositionRegex(msg);
      if (match) {
        const position = parseInt(match, 10);
        const lines = content.substring(0, position).split('\n');
        setErrorLine(lines.length);
      } else {
        setErrorLine(null);
      }
    }
  };

  const validateJson = () => validateJsonContent(input);

  const textPositionRegex = (errString: string) => {
    const regex = /position\s+(\d+)/i;
    const match = errString.match(regex);
    return match ? match[1] : null;
  };

  const handleClear = () => {
    setInput('');
    setStatus('idle');
    setErrorMessage(null);
    setErrorLine(null);
    localStorage.removeItem('dtl_json_validator_input');
    window.location.hash = '';
  };

  const handleShare = () => {
    if (!input.trim()) return;
    const compressed = LZString.compressToEncodedURIComponent(input);
    window.location.hash = `payload=${compressed}`;
    navigator.clipboard.writeText(window.location.href);
    alert('Shareable URL copied to clipboard! Anyone with this link can view this JSON.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setInput(result);
      localStorage.setItem('dtl_json_validator_input', result);
      validateJsonContent(result);
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setInput(result);
      localStorage.setItem('dtl_json_validator_input', result);
      validateJsonContent(result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={validateJson}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            Validate JSON
          </button>
          
          <label className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
             <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
             Upload File
             <input type="file" accept=".json,application/json,text/plain" className="hidden" onChange={handleFileUpload} />
          </label>
          
          <button
            onClick={handleShare}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
            title="Create a shareable URL fragment"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            Share
          </button>

          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-colors"
          >
            Clear
          </button>
        </div>
        
        {/* Status Indicator Bar */}
        <div className={`flex-1 lg:ml-4 p-2.5 rounded-md border flex items-center gap-2 font-medium text-sm transition-all w-full lg:w-auto
          ${status === 'idle' ? 'bg-gray-100 border-gray-200 text-gray-500' : ''}
          ${status === 'valid' ? 'bg-green-50 border-green-300 text-green-700' : ''}
          ${status === 'invalid' ? 'bg-red-50 border-red-300 text-red-700 shadow-sm' : ''}
        `}>
          {status === 'idle' && <span>Waiting for input...</span>}
          {status === 'valid' && (
            <>
              <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Valid JSON. No syntax errors detected.</span>
            </>
          )}
          {status === 'invalid' && (
            <>
              <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="truncate" title={errorMessage || 'Invalid JSON'}>
                {errorMessage} {errorLine && <span className="font-bold ml-1">(Line {errorLine})</span>}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Editor Area with Drag and Drop */}
      <div 
        className="h-[500px] w-full relative border-t border-gray-100"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
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
          loading={
            <div className="flex items-center justify-center h-full text-gray-400 font-mono text-sm">
               Loading Monaco Editor...
            </div>
          }
        />
        
        {/* Empty State Drag & Drop Hint */}
        {input.length === 0 && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <div className="text-center bg-white/80 p-6 rounded-2xl">
               <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
               <p className="text-gray-400 font-medium">Paste JSON, Drag & Drop a file, or start typing.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
