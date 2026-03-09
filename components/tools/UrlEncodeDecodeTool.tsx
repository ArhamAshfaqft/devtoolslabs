'use client';
import React, { useState } from 'react';

export default function UrlEncodeDecodeTool() {
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
        // encodeURIComponent handles strict URI percent-encoding natively
        setOutput(encodeURIComponent(input));
      } else {
        // Use decodeURIComponent, also catch standard query string format (replacing + with spaces first)
        const plusReplaced = input.replace(/\+/g, '%20');
        setOutput(decodeURIComponent(plusReplaced));
      }
    } catch (e) {
      setError('Malformed URI sequence. Could not decode.');
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
          URL Encode
        </button>
        <button
          onClick={() => { setMode('decode'); setInput(''); setOutput(''); setError(null); }}
          className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
            mode === 'decode' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          URL Decode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-0 flex flex-col h-[350px]">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              {mode === 'encode' ? 'Raw String / URL' : 'Percent Encoded String'}
            </h3>
            <button onClick={() => setInput('')} className="text-xs text-blue-600 hover:underline">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'https://example.com/?query=my string' : 'https%3A%2F%2Fexample.com%2F%3Fquery%3Dmy%20string'}
            className="w-full flex-1 p-4 bg-white font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-gray-300 whitespace-pre-wrap break-all"
            spellCheck="false"
          />
        </div>

        <div className="p-0 flex flex-col h-[350px] bg-gray-50 relative">
          <div className="p-3 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
             <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
            </h3>
            <button onClick={handleCopy} disabled={!output} className="text-xs font-medium text-gray-700 bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50 disabled:opacity-50">Copy</button>
          </div>
          <textarea
            value={error || output}
            readOnly
            placeholder="Result will appear here..."
            className={`w-full flex-1 p-4 bg-transparent font-mono text-sm resize-none outline-none whitespace-pre-wrap break-all ${error ? 'text-red-600 font-semibold' : 'text-gray-900'}`}
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
