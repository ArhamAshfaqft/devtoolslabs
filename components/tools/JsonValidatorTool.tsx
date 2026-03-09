'use client';
import React, { useState } from 'react';

export default function JsonValidatorTool() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);

  const validateJson = () => {
    if (!input.trim()) {
      setStatus('idle');
      setErrorMessage(null);
      setErrorLine(null);
      return;
    }

    try {
      JSON.parse(input);
      setStatus('valid');
      setErrorMessage('Valid JSON');
      setErrorLine(null);
    } catch (e: any) {
      setStatus('invalid');
      
      const msg = e.message || 'Invalid JSON format';
      setErrorMessage(msg);

      // Attempt to extract the position from V8 Javascript errors
      // V8 usually outputs: "Unexpected token ' in JSON at position 42"
      const match = textPositionRegex(msg);
      if (match) {
        const position = parseInt(match, 10);
        // Calculate line number by counting newlines up to the position
        const lines = input.substring(0, position).split('\n');
        setErrorLine(lines.length);
      } else {
        setErrorLine(null);
      }
    }
  };

  // Helper to extract the character position from common JS engine errors
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
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={validateJson}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex-1 md:flex-none shadow-sm"
          >
            Validate JSON
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex-1 md:flex-none"
          >
            Clear
          </button>
        </div>
        
        {/* Status Indicator Bar */}
        <div className={`flex-1 md:ml-4 p-2 rounded-md border flex items-center justify-center gap-2 font-medium text-sm transition-colors w-full md:w-auto
          ${status === 'idle' ? 'bg-gray-100 border-gray-200 text-gray-500' : ''}
          ${status === 'valid' ? 'bg-green-100 border-green-300 text-green-800' : ''}
          ${status === 'invalid' ? 'bg-red-100 border-red-300 text-red-800' : ''}
        `}>
          {status === 'idle' && <span>Waiting for input...</span>}
          {status === 'valid' && (
            <>
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Valid JSON. No syntax errors detected.</span>
            </>
          )}
          {status === 'invalid' && (
            <>
              <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="truncate" title={errorMessage || 'Invalid JSON'}>
                {errorMessage} {errorLine && <span className="font-bold opacity-80 ml-1">(Line {errorLine})</span>}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-0 flex flex-col h-[500px] relative">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (status !== 'idle') setStatus('idle'); // Reset on type
          }}
          placeholder="Paste your JSON payload here..."
          className="w-full h-full p-4 bg-gray-50 font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 text-gray-800 leading-relaxed"
          spellCheck="false"
        />
        
        {/* Line highlight overlay simulation if error is found */}
        {status === 'invalid' && errorLine !== null && input.trim() && (
          <div className="absolute top-4 left-4 right-4 pointer-events-none opacity-20">
             {/* This is a simple visual helper to denote the error line region if feasible. 
                 A true monaco editor would be better, but we stick to native elements for speed/simplicity */}
          </div>
        )}
      </div>
    </div>
  );
}
