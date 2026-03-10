"use client";

import React, { useState } from "react";

export default function CsvToJsonTool() {
  const [csvInput, setCsvInput] = useState<string>("");
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [hasHeaders, setHasHeaders] = useState<boolean>(true);
  const [delimiter, setDelimiter] = useState<string>(",");
  const [copied, setCopied] = useState(false);

  const convertCsvToJson = () => {
    setError(null);
    setCopied(false);

    if (!csvInput.trim()) {
      setJsonOutput("");
      return;
    }

    try {
      // Basic CSV parser handling quotes
      const lines: string[][] = [];
      let currentLine: string[] = [];
      let currentCell = "";
      let inQuotes = false;

      for (let i = 0; i < csvInput.length; i++) {
        const char = csvInput[i];
        const nextChar = csvInput[i + 1];

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            currentCell += '"';
            i++; // Skip the escaped quote
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === delimiter && !inQuotes) {
          currentLine.push(currentCell.trim());
          currentCell = "";
        } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
          currentLine.push(currentCell.trim());
          if (currentLine.some(c => c !== "")) {
            lines.push(currentLine);
          }
          currentLine = [];
          currentCell = "";
          if (char === '\r') i++; // Skip \n
        } else {
          currentCell += char;
        }
      }

      // Push the very last cell/line if file doesn't end in newline
      if (currentCell || currentLine.length > 0) {
        currentLine.push(currentCell.trim());
        if (currentLine.some(c => c !== "")) {
          lines.push(currentLine);
        }
      }

      if (lines.length === 0) {
        setJsonOutput("[]");
        return;
      }

      let result: any[];

      if (hasHeaders) {
        const headers = lines[0];
        result = lines.slice(1).map(row => {
          const obj: Record<string, any> = {};
          headers.forEach((header, index) => {
            const val = row[index] || "";
            // Try to parse numbers or booleans if possible to make JSON cleaner
            if (val.toLowerCase() === 'true') obj[header] = true;
            else if (val.toLowerCase() === 'false') obj[header] = false;
            else if (val !== '' && !isNaN(Number(val))) obj[header] = Number(val);
            else obj[header] = val;
          });
          return obj;
        });
      } else {
         result = lines.map(row => {
            return row.map(val => {
                if (val.toLowerCase() === 'true') return true;
                if (val.toLowerCase() === 'false') return false;
                if (val !== '' && !isNaN(Number(val))) return Number(val);
                return val;
            });
         });
      }

      setJsonOutput(JSON.stringify(result, null, 2));
    } catch (err) {
      setError("Failed to parse CSV. Please ensure it is correctly formatted.");
    }
  };

  const clearInputs = () => {
    setCsvInput("");
    setJsonOutput("");
    setError(null);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setHasHeaders(true);
    setDelimiter(",");
    setCsvInput(`id,first_name,last_name,email,active\n1,John,Doe,john@example.com,true\n2,Jane,Smith,"smith, jane@example.com",false\n3,Bob,Johnson,bob@example.com,true`);
    setTimeout(convertCsvToJson, 50);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hasHeaders"
            checked={hasHeaders}
            onChange={(e) => setHasHeaders(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="hasHeaders" className="text-sm font-medium text-gray-700">
            First row is Header
          </label>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Delimiter:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab (\t)</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
        <button
          onClick={loadSample}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium md:ml-auto"
        >
          Load Sample Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 relative">
          <label className="block text-sm font-semibold text-gray-700">CSV Input</label>
          <textarea
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            placeholder="id,name,role&#10;1,Admin,Superuser"
            className="w-full h-96 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-sm whitespace-pre"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2 relative">
          <label className="block text-sm font-semibold text-gray-700 flex justify-between">
            JSON Output
            {jsonOutput ? (
               <span className="text-gray-400 font-normal">
                 {(() => {
                   try {
                     return `${JSON.parse(jsonOutput).length} records`;
                   } catch (e) {
                     return "";
                   }
                 })()}
               </span>
            ) : null}
          </label>
          <div className="relative">
            <textarea
              value={jsonOutput}
              readOnly
              placeholder={`[\n  {\n    "id": 1,\n    "name": "Admin",\n    "role": "Superuser"\n  }\n]`}
              className="w-full h-96 p-4 font-mono text-sm border border-gray-300 rounded-lg outline-none resize-none bg-gray-50 shadow-sm"
              spellCheck={false}
            />
            {jsonOutput && (
              <button
                onClick={handleCopy}
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  copied
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
                }`}
              >
                {copied ? "Copied!" : "Copy JSON"}
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
           <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           {error}
        </div>
      )}

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
        <button
          onClick={clearInputs}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100 font-medium transition-colors"
        >
          Clear
        </button>
        <button
          onClick={convertCsvToJson}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200 shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
            <path d="M10 9H8"></path>
          </svg>
          Convert to JSON
        </button>
      </div>
    </div>
  );
}
