"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Color {
  hex: string;
  locked: boolean;
}

export default function ColorPaletteGeneratorTool() {
  const [colors, setColors] = useState<Color[]>([
    { hex: "#2563EB", locked: false },
    { hex: "#3B82F6", locked: false },
    { hex: "#60A5FA", locked: false },
    { hex: "#93C5FD", locked: false },
    { hex: "#DBEAFE", locked: false },
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateRandomHex = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase();
  };

  const generatePalette = useCallback(() => {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.locked ? color : { ...color, hex: generateRandomHex() }
      )
    );
  }, []);

  const toggleLock = (index: number) => {
    setColors((prevColors) =>
      prevColors.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      )
    );
  };

  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Generate initial palette on mount
  useEffect(() => {
    generatePalette();
  }, [generatePalette]);

  // Handle spacebar to generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generatePalette]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-96">
        {colors.map((color, index) => (
          <div
            key={index}
            className="group relative flex flex-col justify-end items-center p-4 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: color.hex }}
          >
            {/* Overlay for better readability of text on colors */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-3 w-full">
              <button
                onClick={() => copyToClipboard(color.hex, index)}
                className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-bold text-gray-900 shadow-sm transition-transform active:scale-95 w-full flex justify-between items-center"
              >
                <span>{color.hex}</span>
                <span className="text-xs text-gray-500 font-medium">
                  {copiedIndex === index ? "COPIED" : "COPY"}
                </span>
              </button>
              
              <button
                onClick={() => toggleLock(index)}
                className={`p-3 rounded-full transition-all border ${
                  color.locked
                    ? "bg-blue-600 border-blue-700 text-white shadow-inner"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
                }`}
              >
                {color.locked ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-50 rounded-2xl border border-gray-200 gap-4">
        <div className="text-gray-600 text-sm font-medium text-center md:text-left">
          <p>Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded shadow-sm text-gray-800 font-bold mx-1">SPACE</kbd> or click the button to generate a new palette.</p>
          <p className="mt-1 text-gray-400">Lock colors you like to keep them for the next roll.</p>
        </div>
        
        <button
          onClick={generatePalette}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center gap-2 group"
        >
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Generate New Palette
        </button>
      </div>

    </div>
  );
}
