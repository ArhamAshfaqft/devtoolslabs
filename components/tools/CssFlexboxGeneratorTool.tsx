"use client";

import React, { useState, useEffect } from 'react';

export default function CssFlexboxGeneratorTool() {
  const [flexDirection, setFlexDirection] = useState('row');
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [alignContent, setAlignContent] = useState('stretch');
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(4);
  
  const [cssOutput, setCssOutput] = useState('');

  useEffect(() => {
    let css = `.flex-container {\n  display: flex;\n`;
    
    if (flexDirection !== 'row') css += `  flex-direction: ${flexDirection};\n`;
    if (flexWrap !== 'nowrap') css += `  flex-wrap: ${flexWrap};\n`;
    if (justifyContent !== 'flex-start' && justifyContent !== 'normal') css += `  justify-content: ${justifyContent};\n`;
    if (alignItems !== 'stretch' && alignItems !== 'normal') css += `  align-items: ${alignItems};\n`;
    if (alignContent !== 'stretch' && alignContent !== 'normal') css += `  align-content: ${alignContent};\n`;
    if (gap > 0) css += `  gap: ${gap}px;\n`;
    
    css += `}`;
    setCssOutput(css);
  }, [flexDirection, flexWrap, justifyContent, alignItems, alignContent, gap]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  const getContainerStyle = (): React.CSSProperties => {
    return {
      display: 'flex',
      flexDirection: flexDirection as any,
      flexWrap: flexWrap as any,
      justifyContent: justifyContent as any,
      alignItems: alignItems as any,
      alignContent: alignContent as any,
      gap: `${gap}px`,
    };
  };

  const createSelect = (label: string, value: string, setter: any, options: string[]) => (
    <div>
      <label className="text-sm font-bold text-gray-700 block mb-1">{label}</label>
      <div className="relative">
         <select 
            value={value} 
            onChange={(e) => setter(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-8 font-mono cursor-pointer"
         >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
         </select>
         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
         </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Visual Preview */}
      <div className="rounded-2xl overflow-hidden relative min-h-[500px] flex flex-col border border-gray-200 shadow-inner bg-[length:20px_20px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-gray-50">
        
        {/* Number of Items Control (Top Left) */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-2 rounded-lg border border-gray-200 shadow-sm z-10 flex items-center gap-3">
          <label className="text-xs font-bold text-gray-700">Items: {itemCount}</label>
          <input 
             type="range" min="1" max="12" step="1" 
             value={itemCount} 
             onChange={(e) => setItemCount(Number(e.target.value))}
             className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* The Flex Container Workspace */}
        <div className="w-full h-full p-6 flex-1 pt-16">
          <div 
            className="w-full h-full border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-xl transition-all duration-300"
            style={getContainerStyle()}
          >
            {Array.from({ length: itemCount }).map((_, i) => (
              <div 
                key={i} 
                className="bg-white border-2 border-blue-500 text-blue-600 font-bold rounded-lg shadow-sm flex items-center justify-center transition-all duration-300 hover:bg-blue-500 hover:text-white"
                style={{ 
                  width: ['column', 'column-reverse'].includes(flexDirection) ? '100%' : '80px', 
                  height: ['row', 'row-reverse'].includes(flexDirection) ? (alignItems === 'stretch' ? 'auto' : '80px') : '80px',
                  minHeight: '80px'
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-bold text-gray-900">Flexbox Properties</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow mb-6">
          {createSelect('flex-direction', flexDirection, setFlexDirection, ['row', 'row-reverse', 'column', 'column-reverse'])}
          {createSelect('flex-wrap', flexWrap, setFlexWrap, ['nowrap', 'wrap', 'wrap-reverse'])}
          {createSelect('justify-content', justifyContent, setJustifyContent, ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'])}
          {createSelect('align-items', alignItems, setAlignItems, ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'])}
          {createSelect('align-content', alignContent, setAlignContent, ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'])}
          
          <div>
            <div className="flex justify-between mb-1 pt-1">
              <label className="text-sm font-bold text-gray-700">gap</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{gap}px</span>
            </div>
            <input 
               type="range" min="0" max="100" step="4" 
               value={gap} 
               onChange={(e) => setGap(Number(e.target.value))}
               className="w-full h-2 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Output Area */}
        <div className="pt-6 border-t border-gray-100 relative group">
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
          <pre className="bg-gray-900 text-blue-300 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner leading-relaxed">
            {cssOutput}
          </pre>
        </div>

      </div>
    </div>
  );
}
