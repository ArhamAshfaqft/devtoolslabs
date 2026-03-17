"use client";

import React, { useState } from 'react';

// Custom lightweight JSON to Pydantic inference engine
function capitalize(str: string) {
  if (!str) return 'Item';
  // Remove non-alphanumeric, split by underscore/dash/space, capitalize each, join
  const parts = str.replace(/[^a-zA-Z0-9]/g, ' ').trim().split(/\s+/);
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') || 'Item';
}

function inferType(value: any, key: string, models: Map<string, any[]>): string {
  if (value === null) return 'Optional[Any]';
  if (typeof value === 'boolean') return 'bool';
  if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'float';
  if (typeof value === 'string') return 'str';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'List[Any]';
    // Deep inspection of first item or merge all types (simplified to first for now)
    const itemType = inferType(value[0], key.endsWith('s') ? key.slice(0, -1) : key + 'Item', models);
    return `List[${itemType}]`;
  }
  if (typeof value === 'object') {
    const className = capitalize(key);
    if (!models.has(className)) {
      models.set(className, []);
    }
    models.get(className)!.push(value);
    return className;
  }
  return 'Any';
}

function generatePydanticCode(jsonStr: string, rootName: string = 'RootModel'): string {
  const obj = JSON.parse(jsonStr);
  const models = new Map<string, any[]>();
  
  if (Array.isArray(obj)) {
    // If root is array, infer inner type
    inferType(obj, rootName, models);
  } else {
    models.set(rootName, [obj]);
  }

  let code = `from typing import Any, List, Optional\nfrom pydantic import BaseModel, Field\n\n`;
  const generatedModels = new Set<string>();

  // Process models iteratively (as new nested models might be discovered)
  let processMore = true;
  while (processMore) {
    processMore = false;
    const currentModels = Array.from(models.entries());
    
    for (const [modelName, samples] of currentModels) {
      if (generatedModels.has(modelName)) continue;
      
      // Merge keys from all samples
      const mergedProps = new Map<string, { type: string, isOptional: boolean }>();
      
      for (const sample of samples) {
        if (!sample || typeof sample !== 'object' || Array.isArray(sample)) continue;
        
        for (const [k, v] of Object.entries(sample)) {
          const type = inferType(v, k, models);
          if (!mergedProps.has(k)) {
            mergedProps.set(k, { type, isOptional: false });
          } else {
            // Very basic union/upgrade (e.g., int -> float)
            const current = mergedProps.get(k)!;
            if (current.type !== type && current.type !== 'Any') {
                if ((current.type === 'int' && type === 'float') || (current.type === 'float' && type === 'int')) {
                   current.type = 'float';
                } else if (!current.type.includes(type)) { // Rough check
                   current.type = 'Any';
                }
            }
          }
        }
      }

      // Check for optional props (present in some samples but not others)
      if (samples.length > 1) {
        for (const [k, v] of mergedProps.entries()) {
          for (const sample of samples) {
             if (sample && typeof sample === 'object' && !(k in sample)) {
                 v.isOptional = true;
                 break;
             }
          }
        }
      }

      // Generate class code
      code += `class ${modelName}(BaseModel):\n`;
      if (mergedProps.size === 0) {
        code += `    pass\n\n`;
      } else {
        for (const [k, v] of mergedProps.entries()) {
          // Check if key is valid python identifier
          const isValidId = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k);
          const pyType = v.isOptional && !v.type.startsWith('Optional[') ? `Optional[${v.type}]` : v.type;
          
          if (!isValidId) {
            // Sanitize identifier
            const validId = k.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^([0-9])/, '_$1');
            const defaultVal = v.isOptional ? ' = Field(default=None, alias=...)' : ' = Field(..., alias=...)';
            code += `    ${validId}: ${pyType}${defaultVal.replace('...', `"${k}"`)}\n`;
          } else {
             const defaultVal = v.isOptional ? ' = None' : '';
             code += `    ${k}: ${pyType}${defaultVal}\n`;
          }
        }
        code += `\n`;
      }
      
      generatedModels.add(modelName);
      processMore = true; // Models map might have grown
    }
  }

  return code.trim();
}

export default function JsonToPydanticTool() {
  const [jsonInput, setJsonInput] = useState('');
  const [pythonOutput, setPythonOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [rootName, setRootName] = useState('RootModel');

  const convertJson = (json: string, root: string) => {
    try {
      setError(null);
      if (!json.trim()) {
        setPythonOutput('');
        return;
      }
      JSON.parse(json); // Validate JSON first
      const pyCode = generatePydanticCode(json, root);
      setPythonOutput(pyCode);
    } catch (err: any) {
      setError('Invalid JSON format. Please check your syntax.');
      setPythonOutput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonInput(val);
    convertJson(val, rootName);
  };

  const handleRootNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value || 'RootModel';
    setRootName(val);
    if (jsonInput) {
      convertJson(jsonInput, val);
    }
  };

  const handleExample = () => {
    const exampleJson = {
      user_id: 1024,
      is_active: true,
      profile: {
        first_name: "Alice",
        last_name: "Smith",
        "avatar-url": "https://example.com/avatar.png"
      },
      tags: ["admin", "beta-tester"],
      scores: [95.5, 80.0, 100.0]
    };
    const str = JSON.stringify(exampleJson, null, 2);
    setJsonInput(str);
    convertJson(str, rootName);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonOutput);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Input JSON
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Root Class:</span>
              <input 
                type="text" 
                value={rootName} 
                onChange={handleRootNameChange}
                className="w-28 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="RootModel"
              />
            </div>
            <button 
              onClick={handleExample}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Try Example
            </button>
          </div>
        </div>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='{"name": "John Doe", "age": 30}'
          className="w-full h-[500px] p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm shadow-sm"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Pydantic V2 Models
          </label>
          {pythonOutput && (
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
            value={pythonOutput}
            readOnly
            className="w-full h-[500px] p-4 border border-gray-200 rounded-xl bg-gray-50 font-mono text-sm shadow-sm whitespace-pre"
          />
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
              <span className="p-4 text-red-600 text-sm font-medium text-center shadow-lg bg-white rounded-lg border border-red-100">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
