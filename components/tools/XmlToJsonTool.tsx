"use client";

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { XMLParser } from 'fast-xml-parser';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function XmlToJsonTool() {
  const [xmlInput, setXmlInput] = useState(`<?xml version="1.0" encoding="UTF-8"?>
<root>
  <user id="101" active="true">
    <name>John Doe</name>
    <preferences>
      <theme>dark</theme>
      <notifications>enabled</notifications>
    </preferences>
  </user>
</root>`);
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [ignoreAttr, setIgnoreAttr] = useState(false);
  const [alwaysArray, setAlwaysArray] = useState(false);

  const convertXmlToJson = useCallback(() => {
    try {
      setError(null);
      if (!xmlInput.trim()) {
        setJsonOutput('');
        return;
      }

      const parser = new XMLParser({
        ignoreAttributes: ignoreAttr,
        attributeNamePrefix: "@_",
        alwaysCreateTextNode: false,
        allowBooleanAttributes: true,
        parseAttributeValue: true,
        parseTagValue: true,
        trimValues: true,
        // If alwaysArray is true, we force tags to be arrays even if only one item exists
        isArray: (name, jpath, isLeafNode, isAttribute) => {
          return alwaysArray && !isAttribute;
        }
      });

      const jsonObj = parser.parse(xmlInput);
      setJsonOutput(JSON.stringify(jsonObj, null, 2));
    } catch (err: any) {
      setError(err.message || 'Invalid XML format. Please check for unclosed tags.');
      setJsonOutput('');
    }
  }, [xmlInput, ignoreAttr, alwaysArray]);

  useEffect(() => {
    convertXmlToJson();
  }, [convertXmlToJson]);

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
               type="checkbox" 
               checked={ignoreAttr} 
               onChange={(e) => setIgnoreAttr(e.target.checked)}
               className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs font-bold text-gray-700 group-hover:text-black transition-colors">Ignore Attributes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
               type="checkbox" 
               checked={alwaysArray} 
               onChange={(e) => setAlwaysArray(e.target.checked)}
               className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs font-bold text-gray-700 group-hover:text-black transition-colors">Force Every Tag as Array</span>
          </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        {/* Editor Left */}
        <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Input XML</span>
          </div>
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language="xml"
              theme="vs-light"
              value={xmlInput}
              onChange={(v) => setXmlInput(v || '')}
              options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
            />
          </div>
        </div>

        {/* Editor Right */}
        <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white relative">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">JSON Output</span>
          </div>
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language="json"
              theme="vs-dark"
              value={jsonOutput}
              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
            />
          </div>
          {error && (
            <div className="absolute inset-x-0 bottom-0 p-4 bg-red-600 text-white text-xs font-bold animate-in slide-in-from-bottom-2">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Expert Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
           <h3 className="text-sm font-bold text-blue-900 mb-2">Attribute Handling</h3>
           <p className="text-[11px] text-blue-800 leading-relaxed italic">
             Our converter preserves XML attributes by prefixing them with "@_". This ensures 
             metadata like <code className="bg-blue-100 px-1 rounded">id="1"</code> is not lost during transformation, 
             a common failure in basic XML parsers.
           </p>
        </div>
        <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl">
           <h3 className="text-sm font-bold text-emerald-900 mb-2">Array Consistency</h3>
           <p className="text-[11px] text-emerald-800 leading-relaxed italic">
             By default, parsers convert single tags to objects and multiple tags to arrays. 
             Enable <strong>"Force Every Tag as Array"</strong> to ensure your downstream code 
             always receives a consistent structure, preventing "is it an array?" checks.
           </p>
        </div>
      </div>
    </div>
  );
}
