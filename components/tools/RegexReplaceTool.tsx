'use client';
import React, { useState, useEffect } from 'react';

export default function RegexReplaceTool() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog.\nThe quick brown fox jumps over the lazy dog.');
  const [regexStr, setRegexStr] = useState('fox');
  const [flags, setFlags] = useState('g');
  const [replacement, setReplacement] = useState('cat');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      if (!regexStr) {
        setOutput(text);
        setError('');
        return;
      }
      
      const regex = new RegExp(regexStr, flags);
      const newText = text.replace(regex, replacement);
      
      setOutput(newText);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid Regular Expression');
      setOutput(text);
    }
  }, [text, regexStr, flags, replacement]);

  return (
    <div className="flex flex-col gap-6 w-full">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border border-gray-200 p-4 rounded-lg bg-gray-50">
        <div className="md:col-span-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Regular Expression</label>
          <div className="flex font-mono text-sm">
            <span className="inline-flex items-center px-3 bg-gray-200 text-gray-600 border border-r-0 border-gray-300 rounded-l-md font-bold">/</span>
            <input 
              type="text" 
              value={regexStr} 
              onChange={e => setRegexStr(e.target.value)}
              placeholder="pattern"
              className="w-full p-2.5 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors text-gray-900" 
            />
            <span className="inline-flex items-center px-3 bg-gray-200 text-gray-600 border border-l-0 border-r-0 border-gray-300 font-bold">/</span>
            <input 
              type="text" 
              value={flags} 
              onChange={e => setFlags(e.target.value)}
              placeholder="gmi"
              className="w-20 p-2.5 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors text-gray-900" 
            />
          </div>
          {error && <p className="text-red-600 text-xs font-medium mt-2">{error}</p>}
        </div>

        <div className="md:col-span-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Replacement String</label>
          <input 
            type="text" 
            value={replacement} 
            onChange={e => setReplacement(e.target.value)}
            placeholder=""
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-sm text-gray-900" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Test String</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-sm bg-white text-gray-900"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Result</label>
          <textarea
            readOnly
            value={output}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-100 font-mono text-sm outline-none text-green-700 font-medium"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
