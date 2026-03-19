"use client";

import React, { useState, useEffect } from 'react';

export default function BoxShadowGeneratorTool() {
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(10);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.1);
  const [inset, setInset] = useState(false);
  const [boxColor, setBoxColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#f3f4f6');
  const [cssOutput, setCssOutput] = useState('');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '0, 0, 0';
  };

  useEffect(() => {
    const insetStr = inset ? 'inset ' : '';
    const rgb = hexToRgb(color);
    const css = `/* CSS Box-Shadow */
.box-shadow {
  box-shadow: ${insetStr}${xOffset}px ${yOffset}px ${blur}px ${spread}px rgba(${rgb}, ${opacity});
  -webkit-box-shadow: ${insetStr}${xOffset}px ${yOffset}px ${blur}px ${spread}px rgba(${rgb}, ${opacity});
  -moz-box-shadow: ${insetStr}${xOffset}px ${yOffset}px ${blur}px ${spread}px rgba(${rgb}, ${opacity});
}`;
    setCssOutput(css);
  }, [xOffset, yOffset, blur, spread, color, opacity, inset]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  const applyPreset = (pX: number, pY: number, pB: number, pS: number, pO: number, pCol: string, pIns: boolean) => {
    setXOffset(pX);
    setYOffset(pY);
    setBlur(pB);
    setSpread(pS);
    setOpacity(pO);
    setColor(pCol);
    setInset(pIns);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div 
        className="rounded-2xl overflow-hidden relative min-h-[400px] lg:min-h-full flex flex-col items-center justify-center border border-gray-200 shadow-inner transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <div className="flex gap-2">
            <button onClick={() => setBgColor('#f3f4f6')} className="w-6 h-6 rounded-full border border-gray-300 bg-gray-100 shadow-sm transition-transform hover:scale-110" title="Light Gray"></button>
            <button onClick={() => setBgColor('#ffffff')} className="w-6 h-6 rounded-full border border-gray-300 bg-white shadow-sm transition-transform hover:scale-110" title="White"></button>
            <button onClick={() => setBgColor('#374151')} className="w-6 h-6 rounded-full border border-gray-600 bg-gray-700 shadow-sm transition-transform hover:scale-110" title="Dark"></button>
          </div>
          <div className="flex gap-2">
             <button onClick={() => setBoxColor('#ffffff')} className="w-6 h-6 rounded-md border border-gray-300 bg-white shadow-sm transition-transform hover:scale-110" title="White Box"></button>
             <button onClick={() => setBoxColor('#3b82f6')} className="w-6 h-6 rounded-md border border-blue-400 bg-blue-500 shadow-sm transition-transform hover:scale-110" title="Blue Box"></button>
             <button onClick={() => { setBgColor('#e5e7eb'); setBoxColor('#e5e7eb'); applyPreset(20, 20, 60, 0, 0.5, '#d1d5db', false); }} className="text-xs px-2 py-1 bg-white/20 hover:bg-white/40 text-gray-700 font-medium rounded border border-gray-300 transition-colors" title="Neumorphic Setup">Neumorph</button>
          </div>
        </div>

        <div 
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl transition-all duration-300 ease-out flex items-center justify-center"
          style={{
            backgroundColor: boxColor,
            boxShadow: `${inset ? 'inset ' : ''}${xOffset}px ${yOffset}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity})`
          }}
        >
        </div>
      </div>

      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-bold text-gray-900">Shadow Settings</h3>
           <div className="flex gap-2">
             <button onClick={() => applyPreset(0, 10, 25, -5, 0.1, '#000000', false)} className="text-xs font-medium px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 border border-gray-200">Soft</button>
             <button onClick={() => applyPreset(0, 35, 60, -15, 0.25, '#000000', false)} className="text-xs font-medium px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 border border-gray-200">Deep</button>
             <button onClick={() => applyPreset(0, 0, 15, 2, 0.2, '#000000', true)} className="text-xs font-medium px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 border border-gray-200">Inset</button>
           </div>
        </div>
        
        <div className="space-y-5 flex-grow">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold text-gray-700">X Offset (Horizontal)</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{xOffset}px</span>
            </div>
            <input 
               type="range" min="-100" max="100" step="1" 
               value={xOffset} 
               onChange={(e) => setXOffset(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold text-gray-700">Y Offset (Vertical)</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{yOffset}px</span>
            </div>
            <input 
               type="range" min="-100" max="100" step="1" 
               value={yOffset} 
               onChange={(e) => setYOffset(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold text-gray-700">Blur Radius</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{blur}px</span>
            </div>
            <input 
               type="range" min="0" max="150" step="1" 
               value={blur} 
               onChange={(e) => setBlur(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold text-gray-700">Spread Radius</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{spread}px</span>
            </div>
            <input 
               type="range" min="-50" max="100" step="1" 
               value={spread} 
               onChange={(e) => setSpread(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

           <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-bold text-gray-700">Shadow Opacity</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{opacity}</span>
            </div>
            <input 
               type="range" min="0" max="1" step="0.01" 
               value={opacity} 
               onChange={(e) => setOpacity(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
               <label className="text-sm font-bold text-gray-700 block mb-2">Shadow Color</label>
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
            
            <div className="flex flex-col items-end">
                <label className="text-sm font-bold text-gray-700 block mb-2">Inset (Inner Shadow)</label>
                <div className="flex items-center">
                  <input 
                     type="checkbox" 
                     id="insetToggle" 
                     className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                     checked={inset}
                     onChange={(e) => setInset(e.target.checked)}
                  />
                  <label htmlFor="insetToggle" className="ml-2 text-sm text-gray-600 font-medium cursor-pointer">
                     Enable Inset
                  </label>
                </div>
            </div>
          </div>
        </div>

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
