"use client";

import React, { useState } from 'react';

export default function Base64UrlSafeTool() {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toUrlSafe = (base64: string) => {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const fromUrlSafe = (urlSafe: string) => {
    let base64 = urlSafe.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return base64;
  };

  const handleEncode = (val: string) => {
    try {
      setError(null);
      if (!val) {
        setEncoded('');
        return;
      }
      const b64 = btoa(val);
      setEncoded(toUrlSafe(b64));
    } catch (e) {
      setError('Encoding error. Ensure you are using valid text characters.');
    }
  };

  const handleDecode = (val: string) => {
    try {
      setError(null);
      if (!val) {
        setDecoded('');
        return;
      }
      const b64 = fromUrlSafe(val);
      setDecoded(atob(b64));
    } catch (e) {
      setError('Invalid Base64 URL-safe string.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    handleEncode(val);
  };

  const handleEncodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setEncoded(val);
    handleDecode(val);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Raw Text / Decoded
          </label>
          <textarea
            value={input || decoded}
            onChange={handleInputChange}
            placeholder="Enter text to encode..."
            className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm shadow-sm"
          />
          {(input || decoded) && (
            <button 
              onClick={() => copyToClipboard(input || decoded)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Copy Text
            </button>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Base64 URL-Safe Output
          </label>
          <textarea
            value={encoded}
            onChange={handleEncodeChange}
            placeholder="Encoded string will appear here..."
            className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm shadow-sm bg-gray-50"
          />
          {encoded && (
            <button 
              onClick={() => copyToClipboard(encoded)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Copy Encoded
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-tight">What makes it URL-Safe?</h4>
        <p className="text-xs text-blue-800 leading-relaxed">
          Standard Base64 uses <code className="bg-blue-100 px-1 rounded">+</code>, <code className="bg-blue-100 px-1 rounded">/</code>, and <code className="bg-blue-100 px-1 rounded">=</code> which have special meanings in URLs. The **URL-Safe** variant replaces them with <code className="bg-blue-100 px-1 rounded">-</code> and <code className="bg-blue-100 px-1 rounded">_</code> and removes the padding, making it safe for query parameters and JWT tokens.
        </p>
      </div>
    </div>
  );
}
