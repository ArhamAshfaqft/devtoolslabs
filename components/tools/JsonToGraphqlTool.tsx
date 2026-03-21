"use client";

import React, { useState, useEffect } from 'react';

export default function JsonToGraphqlTool() {
  const [jsonInput, setJsonInput] = useState('{\n  "user": {\n    "id": 1,\n    "name": "Jane Doe",\n    "isActive": true,\n    "roles": ["admin", "editor"],\n    "profile": {\n      "avatarUrl": "https://example.com/avatar.jpg",\n      "age": 28\n    }\n  }\n}');
  const [graphqlOutput, setGraphqlOutput] = useState('');
  const [rootName, setRootName] = useState('RootType');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      if (!jsonInput.trim()) {
         setGraphqlOutput('// Output will appear here...');
         setError('');
         return;
      }

      const parsedJson = JSON.parse(jsonInput);
      const generatedSchema = generateGraphqlSchema(parsedJson, rootName || 'Root');
      setGraphqlOutput(generatedSchema);
      setError('');
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
    }
  }, [jsonInput, rootName]);

  const generateGraphqlSchema = (obj: any, rootTypeName: string) => {
    const types: Record<string, string> = {};

    const formatTypeName = (name: string) => {
        // Remove special chars, capitalize first letter
        return name.replace(/[^a-zA-Z0-9]/g, '').charAt(0).toUpperCase() + name.replace(/[^a-zA-Z0-9]/g, '').slice(1);
    };

    const getType = (value: any, key: string): string => {
      if (value === null || value === undefined) return 'String';
      
      const t = typeof value;
      if (t === 'string') return 'String';
      if (t === 'boolean') return 'Boolean';
      if (t === 'number') return Number.isInteger(value) ? 'Int' : 'Float';
      
      if (Array.isArray(value)) {
        if (value.length === 0) return '[String]';
        // Check first element to guess array type
        const itemType = getType(value[0], key);
        return `[${itemType}]`;
      }
      
      if (t === 'object') {
        const typeName = formatTypeName(key);
        // Avoid naming collision if root type matches a key
        const safeTypeName = typeName === rootTypeName ? `${typeName}Type` : typeName;
        parseObject(value, safeTypeName);
        return safeTypeName;
      }
      
      return 'String';
    };

    const parseObject = (o: any, name: string) => {
      // Prevent infinite loops / duplicate parsing
      if (types[name] || !o) return;
      
      // Placeholder to prevent recursion issues
      types[name] = 'parsing'; 
      
      let fields = '';
      for (const [k, v] of Object.entries(o)) {
        // Sanitize field name
        const safeKey = k.replace(/[^a-zA-Z0-9_]/g, '');
        if (!safeKey) continue;
        fields += `  ${safeKey}: ${getType(v, k)}\n`;
      }
      
      types[name] = `type ${name} {\n${fields}}`;
    };

    // If root is an array, parse its first object
    if (Array.isArray(obj)) {
        if (obj.length > 0 && typeof obj[0] === 'object') {
            parseObject(obj[0], rootTypeName);
        } else {
            types[rootTypeName] = `type ${rootTypeName} {\n  items: [${getType(obj[0], 'item')}]\n}`;
        }
    } else if (typeof obj === 'object') {
        parseObject(obj, rootTypeName);
    } else {
        types[rootTypeName] = `type ${rootTypeName} {\n  value: ${getType(obj, 'value')}\n}`;
    }

    return Object.values(types).filter(t => t !== 'parsing').join('\n\n');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(graphqlOutput);
  };

  const loadExample = () => {
    setJsonInput('{\n  "movie": {\n    "title": "Inception",\n    "releaseYear": 2010,\n    "rating": 8.8,\n    "isSciFi": true,\n    "cast": [\n      {\n        "actorName": "Leonardo DiCaprio",\n        "role": "Cobb"\n      }\n    ]\n  }\n}');
    setRootName('CinemaData');
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
         <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
               <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Root Type Name:</label>
               <input 
                 type="text" 
                 value={rootName} 
                 onChange={(e) => setRootName(e.target.value || 'Root')}
                 className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-32 sm:w-48 font-mono text-blue-600"
               />
            </div>
         </div>
         <button 
             onClick={loadExample}
             className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors w-full sm:w-auto text-left sm:text-right"
           >
             Load Example JSON
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* JSON Input */}
        <div className="bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-sm h-full min-h-[500px]">
           <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center relative">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-yellow-400"></span> 
                 JSON Payload
              </h3>
              {error && <span className="absolute right-4 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">{error}</span>}
           </div>
           <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full flex-grow p-4 bg-white text-gray-800 font-mono text-sm resize-none outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 leading-relaxed"
              spellCheck="false"
           />
        </div>

        {/* GraphQL Output */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl flex flex-col overflow-hidden shadow-lg h-full min-h-[500px]">
           <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-100 text-sm flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-pink-500"></span> 
                 GraphQL Schema
              </h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded transition-colors"
                title="Copy GraphQL"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 10h7M8 11h7" /></svg>
                Copy Code
              </button>
           </div>
           <div className="p-4 flex-grow relative overflow-y-auto">
              <pre className="text-pink-300 font-mono text-sm leading-relaxed whitespace-pre-wrap break-all absolute inset-0 p-4">
                 {graphqlOutput}
              </pre>
           </div>
        </div>

      </div>
    </div>
  );
}
