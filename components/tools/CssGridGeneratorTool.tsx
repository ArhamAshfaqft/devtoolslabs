"use client";

import React, { useState, useEffect } from 'react';

export default function CssGridGeneratorTool() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [columnGap, setColumnGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  
  // Array of tracks. For simplicity in this tool, we use "1fr" across the board. 
  // Advanced users could tweak the output CSS, but the raw layout logic is purely numeric for the grid visualizer.
  
  const [cssOutput, setCssOutput] = useState('');

  useEffect(() => {
    const colStr = `repeat(${columns}, 1fr)`;
    const rowStr = `repeat(${rows}, 1fr)`;

    let css = `.grid-container {\n  display: grid;\n  grid-template-columns: ${colStr};\n  grid-template-rows: ${rowStr};\n`;
    
    if (columnGap === rowGap) {
        if (columnGap > 0) css += `  gap: ${columnGap}px;\n`;
    } else {
        css += `  column-gap: ${columnGap}px;\n  row-gap: ${rowGap}px;\n`;
    }
    
    css += `}`;
    setCssOutput(css);
  }, [columns, rows, columnGap, rowGap]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  const getContainerStyle = (): React.CSSProperties => {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      columnGap: `${columnGap}px`,
      rowGap: `${rowGap}px`,
      width: '100%',
      height: '100%',
    };
  };

  const totalItems = columns * rows;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Visual Preview */}
      <div className="rounded-2xl overflow-hidden relative min-h-[500px] flex flex-col border border-gray-200 shadow-inner bg-[length:20px_20px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-gray-50 p-6">
        
        {/* The Grid Workspace */}
        <div 
            className="w-full h-full border-2 border-dashed border-purple-300 bg-purple-50/50 rounded-xl transition-all duration-300"
            style={getContainerStyle()}
        >
            {Array.from({ length: totalItems }).map((_, i) => (
                <div 
                    key={i} 
                    className="bg-white border-2 border-purple-500 text-purple-600 font-bold rounded-lg shadow-sm flex items-center justify-center transition-all duration-300 hover:bg-purple-500 hover:text-white"
                >
                    {i + 1}
                </div>
            ))}
        </div>

        {/* Dimension Overlays */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded text-xs font-bold text-gray-600 border border-gray-200 shadow-sm backdrop-blur">
            {columns} Columns
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 bg-white/90 px-3 py-1 rounded text-xs font-bold text-gray-600 border border-gray-200 shadow-sm backdrop-blur origin-center">
            {rows} Rows
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-bold text-gray-900">Grid Properties</h3>
           <div className="flex gap-2">
             <button onClick={() => { setColumns(3); setRows(3); setColumnGap(16); setRowGap(16); }} className="text-xs font-medium px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 border border-gray-200">3x3</button>
             <button onClick={() => { setColumns(4); setRows(2); setColumnGap(8); setRowGap(32); }} className="text-xs font-medium px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 border border-gray-200">Gallery</button>
           </div>
        </div>
        
        <div className="space-y-6 flex-grow">
          {/* Columns */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold text-gray-700">Columns</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{columns}</span>
            </div>
            <input 
               type="range" min="1" max="12" step="1" 
               value={columns} 
               onChange={(e) => setColumns(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Rows */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold text-gray-700">Rows</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{rows}</span>
            </div>
            <input 
               type="range" min="1" max="12" step="1" 
               value={rows} 
               onChange={(e) => setRows(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Column Gap */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold text-gray-700">Column Gap</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{columnGap}px</span>
            </div>
            <input 
               type="range" min="0" max="64" step="2" 
               value={columnGap} 
               onChange={(e) => setColumnGap(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Row Gap */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold text-gray-700">Row Gap</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{rowGap}px</span>
            </div>
            <input 
               type="range" min="0" max="64" step="2" 
               value={rowGap} 
               onChange={(e) => setRowGap(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
          
          <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
             <h4 className="font-bold text-purple-800 text-sm mb-1">Responsive Tip</h4>
             <p className="text-xs text-purple-700">
               This generator uses the <code>1fr</code> fractional unit, meaning tracks will perfectly distribute the available space regardless of screen size!
             </p>
          </div>
        </div>

        {/* Output Area */}
        <div className="pt-6 border-t border-gray-100 relative group mt-4">
          <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Generated CSS Output</label>
             <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded text-xs transition-colors"
                title="Copy to Clipboard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 10h7M8 11h7" /></svg>
                Copy CSS
              </button>
          </div>
          <pre className="bg-gray-900 text-purple-300 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner leading-relaxed">
            {cssOutput}
          </pre>
        </div>

      </div>
    </div>
  );
}
