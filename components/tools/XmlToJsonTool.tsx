"use client";

import React, { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';

export default function XmlToJsonTool() {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convertXmlToJson = (xml: string) => {
    try {
      setError(null);
      if (!xml.trim()) {
        setJsonOutput('');
        return;
      }

      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        allowBooleanAttributes: true,
        parseAttributeValue: true,
        parseTagValue: true,
        trimValues: true,
      });

      const jsonObj = parser.parse(xml);
      setJsonOutput(JSON.stringify(jsonObj, null, 2));
    } catch (err: any) {
      setError('Invalid XML format. Please check your syntax.');
      setJsonOutput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setXmlInput(val);
    convertXmlToJson(val);
  };

  const handleExample = () => {
    const exampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="cooking">
    <title lang="en">Everyday Italian</title>
    <author>Giada De Laurentiis</author>
    <year>2005</year>
    <price>30.00</price>
  </book>
  <book category="children">
    <title lang="en">Harry Potter</title>
    <author>J K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
</bookstore>`;
    setXmlInput(exampleXml);
    convertXmlToJson(exampleXml);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Input XML
          </label>
          <button 
            onClick={handleExample}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Try Example
          </button>
        </div>
        <textarea
          value={xmlInput}
          onChange={handleInputChange}
          placeholder="<note>\n  <to>Tove</to>\n  <from>Jani</from>\n</note>"
          className="w-full h-80 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm shadow-sm"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Output JSON
          </label>
          {jsonOutput && (
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
            value={jsonOutput}
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
