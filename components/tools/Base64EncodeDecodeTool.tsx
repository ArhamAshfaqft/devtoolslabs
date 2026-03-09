'use client';
import React, { useState } from 'react';

export default function Base64EncodeDecodeTool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const processText = () => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      setError(null);
      if (mode === 'encode') {
        // Use btoa safely, encoding unicode properly
        const utf8Bytes = new TextEncoder().encode(input);
        const binaryStr = String.fromCharCode(...utf8Bytes);
        setOutput(btoa(binaryStr));
      } else {
        // Decode and parse back to unicode
        const binaryStr = atob(input.trim());
        const utf8Bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          utf8Bytes[i] = binaryStr.charCodeAt(i);
        }
        setOutput(new TextDecoder().decode(utf8Bytes));
      }
    } catch (e) {
      setError(mode === 'encode' ? 'Error encoding string.' : 'Invalid Base64 sequence detected.');
      setOutput('');
    }
  };

  React.useEffect(() => {
    processText();
  }, [input, mode]);

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Mode Switcher */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex gap-4">
        <button
          onClick={() => { setMode('encode'); setInput(''); setOutput(''); setError(null); }}
          className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
            mode === 'encode' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Base64 Encode
        </button>
        <button
          onClick={() => { setMode('decode'); setInput(''); setOutput(''); setError(null); }}
          className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
            mode === 'decode' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Base64 Decode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Input */}
        <div className="p-0 flex flex-col h-[400px]">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              {mode === 'encode' ? 'Raw Text String' : 'Base64 Encoded String'}
            </h3>
            <button onClick={() => setInput('')} className="text-xs text-blue-600 hover:underline">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'e.g., Hello World!' : 'e.g., SGVsbG8gV29ybGQh'}
            className="w-full flex-1 p-4 bg-white font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-gray-300"
            spellCheck="false"
          />
        </div>

        {/* Output */}
        <div className="p-0 flex flex-col h-[400px] bg-gray-50 relative">
          <div className="p-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
             <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              {mode === 'encode' ? 'Base64 Result' : 'Decoded Text Result'}
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
