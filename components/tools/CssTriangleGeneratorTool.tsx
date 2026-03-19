"use client";

import React, { useState, useEffect } from 'react';

type Direction = 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export default function CssTriangleGeneratorTool() {
  const [direction, setDirection] = useState<Direction>('top');
  const [color, setColor] = useState('#2563eb');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [cssOutput, setCssOutput] = useState('');

  useEffect(() => {
    // Generate the CSS based on borders
    let borders = '';
    
    // Half dimensions for orthogonal directions
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    switch (direction) {
      case 'top':
        borders = `border-left: ${halfWidth}px solid transparent;\n  border-right: ${halfWidth}px solid transparent;\n  border-bottom: ${height}px solid ${color};`;
        break;
      case 'bottom':
        borders = `border-left: ${halfWidth}px solid transparent;\n  border-right: ${halfWidth}px solid transparent;\n  border-top: ${height}px solid ${color};`;
        break;
      case 'left':
        borders = `border-top: ${halfHeight}px solid transparent;\n  border-bottom: ${halfHeight}px solid transparent;\n  border-right: ${width}px solid ${color};`;
        break;
      case 'right':
        borders = `border-top: ${halfHeight}px solid transparent;\n  border-bottom: ${halfHeight}px solid transparent;\n  border-left: ${width}px solid ${color};`;
        break;
      case 'top-right':
        borders = `border-bottom: ${height}px solid transparent;\n  border-right: ${width}px solid ${color};`;
        break;
      case 'top-left':
        borders = `border-bottom: ${height}px solid transparent;\n  border-left: ${width}px solid ${color};`;
        break;
      case 'bottom-right':
        borders = `border-top: ${height}px solid transparent;\n  border-right: ${width}px solid ${color};`;
        break;
      case 'bottom-left':
        borders = `border-top: ${height}px solid transparent;\n  border-left: ${width}px solid ${color};`;
        break;
    }

    const css = `.triangle {
  width: 0;
  height: 0;
  ${borders}
}`;
    setCssOutput(css);
  }, [direction, color, width, height]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  // The actual triangle preview div needs inline styles perfectly mapping the logic above
  const getInlineStyles = (): React.CSSProperties => {
    const halfW = width / 2;
    const halfH = height / 2;
    const base = { width: 0, height: 0, transition: 'all 0.3s ease' };

    switch (direction) {
      case 'top': return { ...base, borderLeft: `${halfW}px solid transparent`, borderRight: `${halfW}px solid transparent`, borderBottom: `${height}px solid ${color}` };
      case 'bottom': return { ...base, borderLeft: `${halfW}px solid transparent`, borderRight: `${halfW}px solid transparent`, borderTop: `${height}px solid ${color}` };
      case 'left': return { ...base, borderTop: `${halfH}px solid transparent`, borderBottom: `${halfH}px solid transparent`, borderRight: `${width}px solid ${color}` };
      case 'right': return { ...base, borderTop: `${halfH}px solid transparent`, borderBottom: `${halfH}px solid transparent`, borderLeft: `${width}px solid ${color}` };
      case 'top-right': return { ...base, borderBottom: `${height}px solid transparent`, borderRight: `${width}px solid ${color}` };
      case 'top-left': return { ...base, borderBottom: `${height}px solid transparent`, borderLeft: `${width}px solid ${color}` };
      case 'bottom-right': return { ...base, borderTop: `${height}px solid transparent`, borderRight: `${width}px solid ${color}` };
      case 'bottom-left': return { ...base, borderTop: `${height}px solid transparent`, borderLeft: `${width}px solid ${color}` };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Visual Preview */}
      <div className="rounded-2xl overflow-hidden relative min-h-[300px] flex items-center justify-center bg-gray-50 border border-gray-200 shadow-inner"
           style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      >
        <div style={getInlineStyles()}></div>

        {/* Dimension Labels */}
        <div className="absolute top-4 left-4 flex gap-3 text-xs font-mono font-bold text-gray-500 bg-white/80 px-2 py-1 rounded backdrop-blur-sm border border-gray-200">
          <span>W: {width}px</span>
          <span>H: {height}px</span>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Triangle Settings</h3>
        
        <div className="space-y-6 flex-grow">
          
          {/* Direction Selector */}
          <div>
             <label className="text-sm font-bold text-gray-700 block mb-3">Direction</label>
             <div className="grid grid-cols-3 gap-2">
                <div className="col-start-2">
                    <button onClick={() => setDirection('top')} className={`w-full py-2 flex justify-center items-center border rounded ${direction === 'top' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50'}`} title="Top">
                      <svg className="w-5 h-5 rotate-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10 4l6 8H4z"/></svg>
                    </button>
                </div>
                <div className="col-start-1 col-end-4 grid grid-cols-3 gap-2">
                     <button onClick={() => setDirection('left')} className={`py-2 flex justify-center items-center border rounded ${direction === 'left' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50'}`} title="Left">
                        <svg className="w-5 h-5 -rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10 4l6 8H4z"/></svg>
                    </button>
                    <div className="flex flex-col gap-2">
                        {/* Diagonal corners toggle */}
                        <div className="flex justify-between px-1">
                             <button onClick={() => setDirection('top-left')} className={`w-4 h-4 rounded-sm border ${direction === 'top-left' ? 'bg-blue-500 border-blue-600' : 'bg-gray-200 border-gray-300 hover:bg-gray-300'}`} title="Top Left"></button>
                             <button onClick={() => setDirection('top-right')} className={`w-4 h-4 rounded-sm border ${direction === 'top-right' ? 'bg-blue-500 border-blue-600' : 'bg-gray-200 border-gray-300 hover:bg-gray-300'}`} title="Top Right"></button>
                        </div>
                        <div className="flex justify-between px-1">
                             <button onClick={() => setDirection('bottom-left')} className={`w-4 h-4 rounded-sm border ${direction === 'bottom-left' ? 'bg-blue-500 border-blue-600' : 'bg-gray-200 border-gray-300 hover:bg-gray-300'}`} title="Bottom Left"></button>
                             <button onClick={() => setDirection('bottom-right')} className={`w-4 h-4 rounded-sm border ${direction === 'bottom-right' ? 'bg-blue-500 border-blue-600' : 'bg-gray-200 border-gray-300 hover:bg-gray-300'}`} title="Bottom Right"></button>
                        </div>
                    </div>
                    <button onClick={() => setDirection('right')} className={`py-2 flex justify-center items-center border rounded ${direction === 'right' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50'}`} title="Right">
                        <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10 4l6 8H4z"/></svg>
                    </button>
                </div>
                 <div className="col-start-2">
                    <button onClick={() => setDirection('bottom')} className={`w-full py-2 flex justify-center items-center border rounded ${direction === 'bottom' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 hover:bg-gray-50'}`} title="Bottom">
                      <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path d="M10 4l6 8H4z"/></svg>
                    </button>
                </div>
             </div>
          </div>

          {/* Width Control */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Width</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{width}px</span>
            </div>
            <input 
               type="range" min="0" max="300" step="1" 
               value={width} 
               onChange={(e) => setWidth(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Height Control */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Height</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{height}px</span>
            </div>
            <input 
               type="range" min="0" max="300" step="1" 
               value={height} 
               onChange={(e) => setHeight(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(direction) && (
                 <p className="text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded border border-blue-100">
                    <strong>Note:</strong> Corner-directional triangles don't behave nicely with mismatched width/height. Try keeping them equal!
                 </p>
            )}
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Triangle Color</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 p-1 rounded cursor-pointer border-gray-200"
              />
               <span className="text-sm font-mono text-gray-600 uppercase bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">{color}</span>
            </div>
          </div>

        </div>

        {/* Output Area */}
        <div className="mt-8 pt-6 border-t border-gray-100 relative group">
          <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CSS Output</label>
             <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded text-xs transition-colors"
                title="Copy to Clipboard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 10h7M8 11h7" /></svg>
                Copy CSS
              </button>
          </div>
          <pre className="bg-gray-900 text-blue-300 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner leading-relaxed">
            {cssOutput}
          </pre>
        </div>

      </div>
    </div>
  );
}
