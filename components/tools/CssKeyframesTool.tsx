'use client';
import React, { useState, useEffect } from 'react';

export default function CssKeyframesTool() {
  const [name, setName] = useState('bounce');
  const [duration, setDuration] = useState('2s');
  const [timing, setTiming] = useState('ease-in-out');
  const [iteration, setIteration] = useState('infinite');
  const [steps, setSteps] = useState([
    { percent: 0, css: 'transform: translateY(0);' },
    { percent: 50, css: 'transform: translateY(-20px);' },
    { percent: 100, css: 'transform: translateY(0);' }
  ]);
  
  const [outputClass, setOutputClass] = useState('');
  const [outputKeyframes, setOutputKeyframes] = useState('');

  useEffect(() => {
    // Generate valid CSS output dynamically
    const sortedSteps = [...steps].sort((a, b) => a.percent - b.percent);
    
    let keyframeStr = `@keyframes ${name} {\n`;
    sortedSteps.forEach(step => {
       keyframeStr += `  ${step.percent}% {\n    ${step.css.replace(/\\n/g, '\\n    ')}\n  }\n`;
    });
    keyframeStr += `}`;
    
    const classStr = `.animate-${name} {\n  animation: ${name} ${duration} ${timing} ${iteration};\n}`;

    setOutputKeyframes(keyframeStr);
    setOutputClass(classStr);
  }, [name, duration, timing, iteration, steps]);

  const updateStepPercent = (index: number, val: number) => {
    const newSteps = [...steps];
    newSteps[index].percent = Math.min(100, Math.max(0, val));
    setSteps(newSteps);
  };

  const updateStepCss = (index: number, val: string) => {
    const newSteps = [...steps];
    newSteps[index].css = val;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, { percent: 100, css: '' }]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 w-full">
      <div className="w-full xl:w-5/12 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 border border-gray-200 rounded-lg">
           <div className="col-span-2">
             <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">Animation Name</label>
             <input type="text" value={name} onChange={e => setName(e.target.value.replace(/\\s+/g, '-'))} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm font-mono" />
           </div>
           <div>
             <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">Duration</label>
             <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm font-mono" placeholder="2s, 500ms" />
           </div>
           <div>
             <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">Timing Function</label>
             <select value={timing} onChange={e => setTiming(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm bg-white">
               <option>linear</option>
               <option>ease</option>
               <option>ease-in</option>
               <option>ease-out</option>
               <option>ease-in-out</option>
               <option>step-end</option>
             </select>
           </div>
           <div className="col-span-2">
             <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">Iteration Count</label>
             <select value={iteration} onChange={e => setIteration(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm bg-white">
               <option>infinite</option>
               <option>1</option>
               <option>2</option>
               <option>3</option>
               <option>forwards</option>
             </select>
           </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center mb-1">
             <label className="block text-sm font-semibold text-gray-900">Keyframe Timestamps</label>
             <button onClick={addStep} className="text-xs bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-800 font-semibold">+ Add Step</button>
          </div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-3 items-start border border-gray-200 p-3 rounded bg-white shadow-sm relative group">
              <div className="w-20 shrink-0">
                <div className="relative">
                  <input type="number" min="0" max="100" value={step.percent} onChange={e => updateStepPercent(idx, parseInt(e.target.value) || 0)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm font-bold text-center pr-5" />
                  <span className="absolute right-2 top-[9px] text-xs text-gray-500 font-bold">%</span>
                </div>
              </div>
              <textarea
                value={step.css}
                onChange={e => updateStepCss(idx, e.target.value)}
                placeholder="transform: scale(1.1);"
                className="w-full h-16 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm font-mono"
                spellCheck="false"
              ></textarea>
              <button onClick={() => removeStep(idx)} className="absolute -right-2 -top-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs font-bold leading-none shadow hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full xl:w-7/12 flex flex-col gap-6">
        <div>
           <label className="block text-sm font-semibold text-gray-900 mb-2">Live Preview</label>
           <div className="h-[250px] border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden checkerboard-bg">
              <style dangerouslySetInnerHTML={{__html: `
                 .checkerboard-bg {
                   background-image: linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
                   background-size: 20px 20px;
                   background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                 }
                 ${outputKeyframes}
                 ${outputClass}
               `}} />
               <div className={`w-24 h-24 bg-blue-500 rounded-xl shadow-lg animate-${name}`}></div>
           </div>
        </div>

        <div>
           <label className="block text-sm font-semibold text-gray-900 mb-2">Generated CSS</label>
           <textarea
             readOnly
             value={`${outputClass}\n\n${outputKeyframes}`}
             className="w-full h-[260px] p-4 border border-gray-300 rounded-lg bg-gray-900 text-green-400 font-mono text-sm outline-none whitespace-pre"
             spellCheck="false"
           ></textarea>
        </div>
      </div>
    </div>
  );
}
