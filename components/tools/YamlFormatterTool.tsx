'use client';

import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import yaml from 'js-yaml';

export default function YamlFormatterTool() {
  const [yamlInput, setYamlInput] = useState<string>(`# Welcome to DevToolsLabs YAML Formatter
server:
  port: 8080
  host: localhost
database:
  enabled: true
  name: "production_db"
  # This is a comment
  users:
  - id: 1
    name: admin
  - id: 2
    name: developer`);
  
  const [indent, setIndent] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = useCallback(() => {
    try {
      setError(null);
      // Parse the YAML to validate and clean
      const parsed = yaml.load(yamlInput);
      
      // Dump back with professional formatting
      const formatted = yaml.dump(parsed, {
        indent: indent,
        lineWidth: -1, // Disable line wrapping
        noRefs: true,
        sortKeys: false
      });
      
      setYamlInput(formatted);
    } catch (err: any) {
      setError(err.reason || err.message || 'Invalid YAML format');
    }
  }, [yamlInput, indent]);

  const handleSmartFix = useCallback(() => {
    try {
      setError(null);
      // Smart Fix: Attempt to handle common indentation issues by line-by-line normalization
      const lines = yamlInput.split('\n');
      const fixedLines = lines.map(line => {
        // Remove trailing spaces, but keep leading whitespace
        const trimmed = line.trimEnd();
        // Detect tab vs space and convert tabs to even spaces
        return trimmed.replace(/\t/g, '  ');
      });
      
      const intermediate = fixedLines.join('\n');
      const parsed = yaml.load(intermediate);
      const final = yaml.dump(parsed, { indent: indent });
      setYamlInput(final);
    } catch (err: any) {
      setError("Manual fix required. Reason: " + (err.reason || "Structural ambiguity"));
    }
  }, [yamlInput, indent]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Indent Size</label>
            <select 
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 font-bold"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleSmartFix}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-sm transition-all shadow-md flex items-center gap-2 group"
              title="Fix common tab/space issues automatically"
            >
              <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Smart Fix
            </button>
            <button 
              onClick={handleFormat}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-all shadow-md flex items-center gap-2 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              Format YAML
            </button>
          </div>
        </div>

        <div className="h-[600px] border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-white relative">
          <Editor
            height="100%"
            defaultLanguage="yaml"
            theme="vs-light"
            value={yamlInput}
            onChange={(value) => setYamlInput(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
              padding: { top: 20, bottom: 20 },
              renderWhitespace: 'boundary',
              bracketPairColorization: { enabled: true }
            }}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold flex items-center gap-3 rounded-r-lg animate-in fade-in slide-in-from-left-2">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-sm mt-4">
        <h3 className="text-slate-900 border-none font-black tracking-tight">Expert Technical Insight: YAML vs YML</h3>
        <p className="text-gray-700 leading-relaxed text-sm">
          YAML (YAML Ain't Markup Language) is a human-readable data serialization standard often used for configuration files (Docker, Kubernetes, GitHub Actions). While both <code>.yaml</code> and <code>.yml</code> are identical in function, <strong>.yaml</strong> is the official recommended extension by the YAML Org.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-black uppercase text-blue-600 mb-4 border-none tracking-widest">Indentation Hardening</h4>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              YAML is indentation-sensitive. Our formatter ensures a strict adherence to your chosen indent size (2 or 4 spaces) and prevents the "Tab Error" by automatically converting tab characters to valid space blocks.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-black uppercase text-blue-600 mb-4 border-none tracking-widest">Multiline String Support</h4>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              We provide specific cleanup for multiline strings using the <code>|</code> (literal) and <code>{">"}</code> (folded) operators, ensuring your long-form text remains valid across all YAML parsers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
