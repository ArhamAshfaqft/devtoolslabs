'use client';
import React, { useState } from 'react';

export default function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentation, setIndentation] = useState('2');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to format.');
      setOutput('');
      return;
    }

    try {
      setError(null);
      // Attempt to parse the input string as JSON
      const parsedObj = JSON.parse(input);
      
      // Determine the space string based on user selection
      let spaceStr: number | string = 2;
      if (indentation === '2') spaceStr = 2;
      else if (indentation === '4') spaceStr = 4;
      else if (indentation === 'tab') spaceStr = '\t';
      else if (indentation === 'minified') spaceStr = 0;

      // Stringify it back with the selected indentation
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
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label htmlFor="indentation" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Space Indentation:
          </label>
          <select
            id="indentation"
            value={indentation}
            onChange={(e) => setIndentation(e.target.value)}
            className="w-full md:w-auto bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-mono"
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">Tabs</option>
            <option value="minified">Minify (0 spaces)</option>
          </select>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={formatJson}
            className="px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors flex-1 md:flex-none"
          >
            Format JSON
          </button>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Input */}
        <div className="p-4 flex flex-col h-[500px]">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 uppercase tracking-wide">Input JSON</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unformatted, minified, or messy JSON here..."
            className="w-full flex-1 p-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
            spellCheck="false"
          />
          {error && (
            <div className="mt-3 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200 break-words font-mono">
              <strong>Parse Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="p-4 flex flex-col h-[500px] bg-gray-50 relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Formatted Output</h3>
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`text-xs px-3 py-1 font-medium rounded-md transition-colors border ${
                copied
                  ? 'bg-green-100 text-green-700 border-green-300'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Your beautified JSON will appear here..."
            className="w-full flex-1 p-3 bg-white border border-gray-200 rounded-md font-mono text-sm resize-none outline-none text-gray-800"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
