"use client";

import React, { useState, useEffect } from "react";

export default function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(5);
  const [format, setFormat] = useState<"standard" | "no-hyphens">("standard");
  const [casing, setCasing] = useState<"lowercase" | "uppercase">("lowercase");
  const [copied, setCopied] = useState(false);

  // Generate UUIDs on mount
  useEffect(() => {
    generateUuids();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateUuids = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      let id = crypto.randomUUID();
      
      if (format === "no-hyphens") {
        id = id.replace(/-/g, "");
      }
      
      if (casing === "uppercase") {
        id = id.toUpperCase();
      }
      
      newUuids.push(id);
    }
    setUuids(newUuids);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentText = uuids.join("\n");

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of UUIDs to Generate
              </label>
              <select
                value={count}
                onChange={(e) => {
                  setCount(Number(e.target.value));
                  /* We don't auto-generate here to let users change multiple settings before generating, 
                     but we could. Let's auto-generate for better UX. */
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              >
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="standard">Standard (with hyphens)</option>
                  <option value="no-hyphens">No Hyphens</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Casing
                </label>
                <select
                  value={casing}
                  onChange={(e) => setCasing(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="lowercase">lowercase</option>
                  <option value="uppercase">UPPERCASE</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={generateUuids}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate UUIDs
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={currentText}
            readOnly
            className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm resize-y outline-none"
          />
          <button
            onClick={handleCopy}
            className={`absolute top-4 right-4 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
              copied
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
            }`}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          UUIDs are generated securely using the native Web Crypto API (crypto.randomUUID) on this device.
        </p>
      </div>
    </div>
  );
}
