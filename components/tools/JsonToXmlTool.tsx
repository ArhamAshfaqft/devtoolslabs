"use client";

import React, { useState } from 'react';
import { XMLBuilder } from 'fast-xml-parser';

export default function JsonToXmlTool() {
  const [jsonInput, setJsonInput] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convertJsonToXml = (json: string) => {
    try {
      setError(null);
      if (!json.trim()) {
        setXmlOutput('');
        return;
      }

      const jsonObj = JSON.parse(json);
      const builder = new XMLBuilder({
        format: true,
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
      });

      const xml = builder.build(jsonObj);
      setXmlOutput(`<?xml version="1.0" encoding="UTF-8"?>\n${xml}`);
    } catch (err: any) {
      setError('Invalid JSON format. Please check your syntax.');
      setXmlOutput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonInput(val);
    convertJsonToXml(val);
  };

  const handleExample = () => {
    const exampleJson = {
      note: {
        to: "Tove",
        from: "Jani",
        heading: "Reminder",
        body: "Don't forget me this weekend!",
        priority: "high"
      }
    };
    const str = JSON.stringify(exampleJson, null, 2);
    setJsonInput(str);
    convertJsonToXml(str);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlOutput);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Input JSON
          </label>
          <button 
            onClick={handleExample}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Try Example
          </button>
        </div>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='{ "note": { "to": "Tove" } }'
          className="w-full h-80 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm shadow-sm"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Output XML
          </label>
          {xmlOutput && (
            <button 
              onClick={copyToClipboard}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 10h7M8 11h7" />
              </svg>
              Copy
            </button>
          )}
        </div>
        <div className="relative">
          <textarea
            value={xmlOutput}
            readOnly
            className="w-full h-80 p-4 border border-gray-200 rounded-xl bg-gray-50 font-mono text-sm shadow-sm"
          />
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
              <span className="p-4 text-red-600 text-sm font-medium text-center">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
