'use client';
import React, { useState, useEffect } from 'react';

export default function JwtValidatorTool() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setHeader('');
      setPayload('');
      setError('');
      return;
    }

    try {
      const parts = input.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('A valid JWT must contain exactly 3 parts separated by dots (Header.Payload.Signature).');
      }

      const decodeBase64Url = (str: string) => {
        // Add padding if necessary
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(
          atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        );
      };

      const decodedHeader = JSON.parse(decodeBase64Url(parts[0]));
      const decodedPayload = JSON.parse(decodeBase64Url(parts[1]));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid JWT Format');
      setHeader('');
      setPayload('');
    }
  }, [input]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Encoded JWT Token</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-sm bg-gray-50 text-gray-900 break-all"
        ></textarea>
      </div>
      
      {error && <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Decoded Header (Algorithm & Type)</label>
          <textarea
            readOnly
            value={header}
            placeholder="Header will appear here"
            className="w-full h-40 p-4 border border-gray-300 rounded-lg text-purple-600 bg-purple-50 font-mono text-sm outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Decoded Payload (Data)</label>
          <textarea
            readOnly
            value={payload}
            placeholder="Payload will appear here"
            className="w-full h-40 p-4 border border-gray-300 rounded-lg text-blue-600 bg-blue-50 font-mono text-sm outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
