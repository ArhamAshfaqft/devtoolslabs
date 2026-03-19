"use client";

import React, { useState, useEffect } from 'react';

export default function GlassmorphismGeneratorTool() {
  const [blur, setBlur] = useState(10);
  const [transparency, setTransparency] = useState(0.2);
  const [outline, setOutline] = useState(0.1);
  const [color, setColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(16);
  const [cssOutput, setCssOutput] = useState('');

  // Convert hex to rgb string, e.g. "255, 255, 255"
  const hexToRgb = (hex: string) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '255, 255, 255';
  };

  useEffect(() => {
    const rgb = hexToRgb(color);
    const css = `/* CSS */
.glass-effect {
  background: rgba(${rgb}, ${transparency});
  border-radius: ${borderRadius}px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border: 1px solid rgba(${rgb}, ${outline});
}`;
    setCssOutput(css);
  }, [blur, transparency, outline, color, borderRadius]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Visual Preview */}
      <div className="rounded-2xl overflow-hidden relative min-h-[400px] lg:min-h-full flex items-center justify-center bg-gray-100 border border-gray-200 shadow-sm" style={{
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgb(255, 12, 253) 0%, rgb(255, 241, 0) 90%)',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
        {/* Background Decorative Blobs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* The Glass Component */}
        <div 
          className="relative px-8 py-10 w-3/4 max-w-sm flex flex-col items-center justify-center text-center transition-all duration-300 z-10"
          style={{
            background: `rgba(${hexToRgb(color)}, ${transparency})`,
            borderRadius: `${borderRadius}px`,
            boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            border: `1px solid rgba(${hexToRgb(color)}, ${outline})`
          }}
        >
           <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/50 mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
           </div>
           <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">Glassmorphism</h3>
           <p className="text-white/90 text-sm font-medium drop-shadow-sm">Building beautiful, frosted glass UI components directly in your browser.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Glass Settings</h3>
        
        <div className="space-y-6 flex-grow">
          {/* Blur Control */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Blur Value</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{blur}px</span>
            </div>
            <input 
               type="range" min="0" max="40" step="1" 
               value={blur} 
               onChange={(e) => setBlur(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Transparency Control */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Transparency</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{transparency}</span>
            </div>
            <input 
               type="range" min="0.01" max="1" step="0.01" 
               value={transparency} 
               onChange={(e) => setTransparency(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Outline Transparency Control */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Outline</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{outline}</span>
            </div>
            <input 
               type="range" min="0" max="1" step="0.01" 
               value={outline} 
               onChange={(e) => setOutline(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Border Radius Control */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Border Radius</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{borderRadius}px</span>
            </div>
            <input 
               type="range" min="0" max="100" step="1" 
               value={borderRadius} 
               onChange={(e) => setBorderRadius(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Glass Color</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 p-1 rounded cursor-pointer border-gray-200"
              />
               <span className="text-sm font-mono text-gray-600 uppercase bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">{color}</span>
               <div className="flex gap-2 ml-auto">
                 {/* Quick Presets */}
                 <button onClick={() => setColor('#ffffff')} className="w-8 h-8 rounded-full border-2 border-gray-200 bg-white hover:scale-110 shadow-sm transition-transform" title="White / Light Mode"></button>
                 <button onClick={() => setColor('#000000')} className="w-8 h-8 rounded-full border-2 border-gray-200 bg-black hover:scale-110 shadow-sm transition-transform" title="Black / Dark Mode"></button>
                 <button onClick={() => setColor('#2563eb')} className="w-8 h-8 rounded-full border-2 border-gray-200 bg-blue-600 hover:scale-110 shadow-sm transition-transform" title="Blue Tint"></button>
               </div>
            </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="mt-8 pt-6 border-t border-gray-100 relative group">
          <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Generated CSS Output</label>
             <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded text-xs transition-colors"
                title="Copy to Clipboard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 10h7M8 11h7" /></svg>
                Copy CSS
              </button>
          </div>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner leading-relaxed">
            {cssOutput}
          </pre>
        </div>

      </div>
    </div>
  );
}
