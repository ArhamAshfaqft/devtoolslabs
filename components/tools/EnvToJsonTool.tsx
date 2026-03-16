"use client";

import React, { useState } from 'react';

export default function EnvToJsonTool() {
  const [envInput, setEnvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const parseEnvToJson = (env: string) => {
    try {
      setError(null);
      if (!env.trim()) {
        setJsonOutput('');
        return;
      }

      const lines = env.split(/\r?\n/);
      const result: Record<string, string> = {};

      lines.forEach((line, index) => {
        const trimmed = line.trim();
        // Skip comments and empty lines
        if (!trimmed || trimmed.startsWith('#')) return;

        const firstEq = trimmed.indexOf('=');
        if (firstEq === -1) {
          // Allow loose format or warn? For now, we'll skip invalid lines
          return;
        }

        const key = trimmed.slice(0, firstEq).trim();
        let value = trimmed.slice(firstEq + 1).trim();

        // Handle quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        if (key) {
          result[key] = value;
        }
      });

      setJsonOutput(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setError('Error parsing .env content. Please check for syntax issues like missing equal signs.');
      setJsonOutput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setEnvInput(val);
    parseEnvToJson(val);
  };

  const handleExample = () => {
    const exampleEnv = `# Database Configuration\nDB_HOST=localhost\nDB_PORT=5432\nDB_USER="admin"\nDB_PASS='s3cr3t_p@ss'\n\n# API Keys\nSTRIPE_KEY=pk_test_123456\nSENDGRID_API_KEY=SG.abcdef123456\n\n# Feature Flags\nENABLE_NEW_UI=true`;
    setEnvInput(exampleEnv);
    parseEnvToJson(exampleEnv);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
            Input .env content
          </label>
          <button 
            onClick={handleExample}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Try Example
          </button>
        </div>
        <textarea
          value={envInput}
          onChange={handleInputChange}
          placeholder="DB_HOST=localhost\nAPI_KEY=123..."
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
