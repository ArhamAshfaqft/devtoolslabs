'use client';
import React, { useState, useEffect } from 'react';

export default function QueryParserTool() {
  const [input, setInput] = useState('');
  const [parsedParams, setParsedParams] = useState<{key: string, value: string}[]>([]);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setParsedParams([]);
      setBaseUrl('');
      return;
    }

    try {
      let queryString = input;
      let base = '';
      
      if (input.includes('?')) {
        const parts = input.split('?');
        base = parts[0];
        queryString = parts[1];
      } else if (input.startsWith('http')) {
        setBaseUrl(input);
        setParsedParams([]);
        return;
      }

      if (queryString.includes('#')) {
        queryString = queryString.split('#')[0];
      }

      const params = new URLSearchParams(queryString);
      const tempParams: {key: string, value: string}[] = [];
      params.forEach((value, key) => {
        tempParams.push({ key, value });
      });

      setBaseUrl(base);
      setParsedParams(tempParams);
    } catch (e) {
      setParsedParams([]);
    }
  }, [input]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Paste URL or Query String</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/page?name=arham&age=25"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-sm bg-gray-50 text-gray-900"
        ></textarea>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Parsed Parameters</h3>
        
        {baseUrl && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Base Path</span>
            <span className="text-gray-900 font-mono text-sm break-all">{baseUrl}</span>
          </div>
        )}

        {parsedParams.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/3">
                    Parameter Key
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Decoded Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {parsedParams.map((param, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                      {param.key}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono break-all">
                      {param.value || <span className="text-gray-400 italic">empty</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center border border-gray-200 border-dashed rounded-lg bg-gray-50 text-gray-500">
            {input.trim() ? "No query parameters found in the input." : "Waiting for input. Table will appear here."}
          </div>
        )}
      </div>
    </div>
  );
}
