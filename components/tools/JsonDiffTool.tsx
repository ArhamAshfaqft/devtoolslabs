"use client";

import React, { useState } from "react";
import * as diff from "diff";

export default function JsonDiffTool() {
  const [leftJson, setLeftJson] = useState<string>("");
  const [rightJson, setRightJson] = useState<string>("");
  const [diffResult, setDiffResult] = useState<diff.Change[]>([]);
  const [error, setError] = useState<string | null>(null);

  const formatJson = (jsonStr: string): string => {
    try {
      if (!jsonStr.trim()) return "";
      const parsed = JSON.parse(jsonStr);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      throw new Error("Invalid JSON format");
    }
  };

  const handleCompare = () => {
    setError(null);
    try {
      const formattedLeft = formatJson(leftJson);
      const formattedRight = formatJson(rightJson);
      
      const changes = diff.diffLines(formattedLeft, formattedRight);
      setDiffResult(changes);
    } catch (err: any) {
      setError("Error parsing JSON. Please ensure both fields contain valid JSON objects or arrays.");
      setDiffResult([]);
    }
  };

  const clearInputs = () => {
    setLeftJson("");
    setRightJson("");
    setDiffResult([]);
    setError(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Original JSON</label>
          <textarea
            value={leftJson}
            onChange={(e) => setLeftJson(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y shadow-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Modified JSON</label>
          <textarea
            value={rightJson}
            onChange={(e) => setRightJson(e.target.value)}
            placeholder='{"key": "new_value"}'
            className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y shadow-sm"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
        <button
          onClick={clearInputs}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100 font-medium transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleCompare}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200 shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Compare JSON
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      {/* Diff Output */}
      {diffResult.length > 0 && !error && (
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 border-opacity-60 text-sm font-semibold text-gray-700 flex gap-4">
               <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-200 border border-red-300 inline-block rounded-sm"></span> Removed</span>
               <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-200 border border-green-300 inline-block rounded-sm"></span> Added</span>
          </div>
          <div className="bg-[#f8f9fa] p-4 overflow-x-auto text-sm font-mono text-gray-800 leading-relaxed whitespace-pre font-medium">
            {diffResult.map((part, index) => {
              const bgClass = part.added 
                ? "bg-green-100 text-green-900" 
                : part.removed 
                  ? "bg-red-100 text-red-900" 
                  : "text-gray-600";
              
              const prefixChar = part.added ? "+ " : part.removed ? "- " : "  ";
              
              // We split by newline to render lines nicely, adding prefixes
              const lines = part.value.split('\n');
              // Remove the last empty string caused by split('\n') on a string ending with \n
              if (lines[lines.length - 1] === "") {
                  lines.pop();
              }

              return lines.map((line, lineIdx) => (
                <div key={`${index}-${lineIdx}`} className={`${bgClass} px-2 py-0.5 min-w-max border-b border-transparent hover:border-black/5`}>
                  <span className="opacity-50 select-none w-4 inline-block">{prefixChar}</span>{line}
                </div>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
}
