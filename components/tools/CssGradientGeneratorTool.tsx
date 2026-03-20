"use client";

import React, { useState, useEffect } from 'react';

type GradientType = 'linear' | 'radial';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export default function CssGradientGeneratorTool() {
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(90);
  const [radialShape, setRadialShape] = useState('circle');
  
  const [stops, setStops] = useState<ColorStop[]>([
    { id: '1', color: '#4f46e5', position: 0 },   // Indigo 600
    { id: '2', color: '#ec4899', position: 100 }  // Pink 500
  ]);

  const [cssOutput, setCssOutput] = useState('');

  // Update a specific color stop
  const updateStop = (id: string, field: 'color' | 'position', value: string | number) => {
    setStops(prev => prev.map(stop => 
       stop.id === id ? { ...stop, [field]: value } : stop
    ));
  };

  // Add a new color stop in the middle
  const addStop = () => {
    if (stops.length >= 5) return; // limit to 5 logic
    const newId = Math.random().toString(36).substr(2, 9);
    setStops(prev => {
        const sorted = [...prev].sort((a,b) => a.position - b.position);
        const newPos = sorted.length > 1 
            ? Math.floor((sorted[0].position + sorted[sorted.length-1].position) / 2)
            : 50;
        return [...sorted, { id: newId, color: '#3b82f6', position: newPos }].sort((a,b) => a.position - b.position);
    });
  };

  // Remove a color stop
  const removeStop = (id: string) => {
    if (stops.length <= 2) return; // Must have at least 2
    setStops(prev => prev.filter(s => s.id !== id));
  };

  useEffect(() => {
    // Generate valid CSS
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopString = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
    
    let gradientValue = '';
    if (type === 'linear') {
        gradientValue = `linear-gradient(${angle}deg, ${stopString})`;
    } else {
        gradientValue = `radial-gradient(${radialShape} at center, ${stopString})`;
    }

    const css = `.gradient-background {\n  background: ${sortedStops[0].color}; /* Fallback */\n  background: ${gradientValue};\n}`;
    setCssOutput(css);
  }, [type, angle, radialShape, stops]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssOutput);
  };

  // Generate the raw inline style for the preview box
  const getPreviewStyle = (): React.CSSProperties => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopString = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
    const bgImage = type === 'linear' 
       ? `linear-gradient(${angle}deg, ${stopString})`
       : `radial-gradient(${radialShape} at center, ${stopString})`;
    
    return { backgroundImage: bgImage };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Visual Preview */}
      <div className="rounded-2xl overflow-hidden relative min-h-[400px] flex items-center justify-center shadow-inner border border-gray-200">
        
        {/* Transparent Checkerboard Base */}
        <div className="absolute inset-0 z-0 bg-white" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6), repeating-linear-gradient(45deg, #f3f4f6 25%, #ffffff 25%, #ffffff 75%, #f3f4f6 75%, #f3f4f6)`,
            backgroundPosition: `0 0, 10px 10px`,
            backgroundSize: `20px 20px`
        }}></div>

        {/* The Gradient Box */}
        <div 
            className="absolute inset-0 z-10 w-full h-full transition-all duration-300"
            style={getPreviewStyle()}
        ></div>

      </div>

      {/* Controls */}
      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-bold text-gray-900">Gradient Configuration</h3>
        </div>
        
        <div className="space-y-6 flex-grow">
          
          {/* Global Settings */}
          <div className="grid grid-cols-2 gap-4">
             {/* Type */}
             <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Type</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                   <button 
                      onClick={() => setType('linear')} 
                      className={`flex-1 text-sm font-medium py-1.5 rounded-md ${type === 'linear' ? 'bg-white shadow-sm text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
                   >
                     Linear
                   </button>
                   <button 
                      onClick={() => setType('radial')} 
                      className={`flex-1 text-sm font-medium py-1.5 rounded-md ${type === 'radial' ? 'bg-white shadow-sm text-blue-600 border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
                   >
                     Radial
                   </button>
                </div>
             </div>

             {/* Dynamic Setup based on Type */}
             {type === 'linear' ? (
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-bold text-gray-700">Direction</label>
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1 rounded">{angle}°</span>
                  </div>
                  <input 
                    type="range" min="0" max="360" step="1" 
                    value={angle} 
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-2 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
             ) : (
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Shape</label>
                  <select 
                     value={radialShape} 
                     onChange={(e) => setRadialShape(e.target.value)}
                     className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                  >
                     <option value="circle">Circle</option>
                     <option value="ellipse">Ellipse</option>
                  </select>
                </div>
             )}
          </div>

          <hr className="border-gray-100" />

          {/* Color Stops Manager */}
          <div>
              <div className="flex justify-between items-center mb-3">
                 <label className="text-sm font-bold text-gray-700">Color Stops</label>
                 <button 
                    onClick={addStop} 
                    disabled={stops.length >= 5}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    + Add Stop
                 </button>
              </div>

              <div className="space-y-3">
                 {[...stops].sort((a,b) => a.position - b.position).map((stop, index) => (
                    <div key={stop.id} className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                        <input 
                           type="color" 
                           value={stop.color}
                           onChange={(e) => updateStop(stop.id, 'color', e.target.value)}
                           className="w-10 h-10 p-0.5 rounded cursor-pointer border border-gray-300 bg-white"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <span className="text-xs font-mono text-gray-600 uppercase">{stop.color}</span>
                                <span className="text-xs font-mono text-gray-500">{stop.position}%</span>
                            </div>
                            <input 
                                type="range" min="0" max="100" step="1" 
                                value={stop.position} 
                                onChange={(e) => updateStop(stop.id, 'position', Number(e.target.value))}
                                className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-700"
                            />
                        </div>
                        <button 
                           onClick={() => removeStop(stop.id)}
                           disabled={stops.length <= 2}
                           className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400"
                           title="Remove color stop"
                        >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                 ))}
              </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="pt-6 border-t border-gray-100 relative group mt-4">
          <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CSS Code</label>
             <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 font-bold px-3 py-1 rounded text-xs transition-colors"
                title="Copy to Clipboard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 10h7M8 11h7" /></svg>
                Copy CSS
              </button>
          </div>
          <pre className="bg-gray-900 text-green-300 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner leading-relaxed">
            {cssOutput}
          </pre>
        </div>

      </div>
    </div>
  );
}
