"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

const DiffEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.DiffEditor),
  { ssr: false }
);

export default function JsonDiffTool() {
  const [leftJson, setLeftJson] = useState<string>(`{
  "name": "DevToolsLabs",
  "version": 1,
  "features": ["Privacy", "Speed"]
}`);
  const [rightJson, setRightJson] = useState<string>(`{
  "version": 1.1,
  "name": "DevToolsLabs",
  "features": ["Privacy", "Speed", "SEO"],
  "status": "active"
}`);
  const [semanticMode, setSemanticMode] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Deep sort keys to allow semantic comparison (ignore key order)
  const sortJsonObject = (obj: any): any => {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(sortJsonObject);
    
    return Object.keys(obj)
      .sort()
      .reduce((acc: any, key) => {
        acc[key] = sortJsonObject(obj[key]);
        return acc;
      }, {});
  };

  const processJson = (jsonStr: string, semantic: boolean): string => {
    try {
      if (!jsonStr.trim()) return "";
      let parsed = JSON.parse(jsonStr);
      if (semantic) {
        parsed = sortJsonObject(parsed);
      }
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      throw new Error("Invalid JSON input detected");
    }
  };

  const [leftProcessed, setLeftProcessed] = useState("");
  const [rightProcessed, setRightProcessed] = useState("");

  const handleCompare = useCallback(() => {
    setError(null);
    try {
      setLeftProcessed(processJson(leftJson, semanticMode));
      setRightProcessed(processJson(rightJson, semanticMode));
    } catch (err: any) {
      setError(err.message || "Error parsing JSON. Check your syntax.");
    }
  }, [leftJson, rightJson, semanticMode]);

  useEffect(() => {
    handleCompare();
  }, [handleCompare]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center gap-6">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={semanticMode}
              onChange={(e) => setSemanticMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-bold text-gray-700">Semantic Diff (Ignore Key Order)</span>
          </label>
        </div>
        <div className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Hero Mode: Side-by-Side Comparison
        </div>
      </div>

      {/* Editor Main Section */}
      <div className="h-[600px] border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-[#1e1e1e]">
        <DiffEditor
          height="100%"
          original={leftProcessed}
          modified={rightProcessed}
          language="json"
          theme="vs-dark"
          options={{
            renderSideBySide: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            automaticLayout: true,
          }}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* Manual Input Controls (Hidden or Secondary) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase">Raw Input 1</label>
          <textarea
            value={leftJson}
            onChange={(e) => setLeftJson(e.target.value)}
            className="w-full h-32 p-3 font-mono text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase">Raw Input 2</label>
          <textarea
            value={rightJson}
            onChange={(e) => setRightJson(e.target.value)}
            className="w-full h-32 p-3 font-mono text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Expert Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
           <h3 className="text-sm font-bold text-blue-900 mb-2">What is Semantic Diffing?</h3>
           <p className="text-xs text-blue-800 leading-relaxed">
             Regular diff tools fail if JSON keys are shuffled (e.g., from a database vs. an API). 
             <strong>Semantic Diff</strong> recursively sorts all keys alphabetically before comparison, 
             so you only see the <em>real</em> data changes.
           </p>
        </div>
        <div className="p-5 bg-purple-50 border border-purple-100 rounded-xl">
           <h3 className="text-sm font-bold text-purple-900 mb-2">Monaco Power</h3>
           <p className="text-xs text-purple-800 leading-relaxed">
             We use the same engine that powers VS Code. You get pixel-perfect line highlighting, 
             inline diff indicators, and syntax-aware comparison for the most accurate debugging possible.
           </p>
        </div>
      </div>
    </div>
  );
}
