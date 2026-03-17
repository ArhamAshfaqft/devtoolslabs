"use client";

import React, { useState, useEffect } from 'react';
import cronstrue from 'cronstrue';

const CRON_PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every 5 minutes', value: '*/5 * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Every 12 hours', value: '0 */12 * * *' },
  { label: 'Every day at midnight', value: '0 0 * * *' },
  { label: 'Every Sunday at midnight', value: '0 0 * * 0' },
  { label: 'Every weekday (Mon-Fri) at midnight', value: '0 0 * * 1-5' },
  { label: '1st of every month', value: '0 0 1 * *' },
];

const PARSE_ERRORS = {
  EMPTY: 'Cron expression cannot be empty.',
  INVALID_LENGTH: 'A standard cron expression must have exactly 5 parts (Minute, Hour, Day of Month, Month, Day of Week).',
  INVALID_SYNTAX: 'Invalid cron syntax. Please check the highlights below.',
};

export default function CrontabGuiBuilderTool() {
  const [expression, setExpression] = useState('0 0 * * 1-5');
  const [humanReadable, setHumanReadable] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Split expression states
  const [parts, setParts] = useState({
    minute: '0',
    hour: '0',
    dayMonth: '*',
    month: '*',
    dayWeek: '1-5'
  });

  // Highlight state for interactive hovering
  const [activePart, setActivePart] = useState<string | null>(null);

  useEffect(() => {
    updateFromExpressionString(expression);
  }, [expression]);

  const updateFromExpressionString = (exp: string) => {
    const split = exp.trim().split(/\s+/);
    
    if (split.length !== 5) {
      if (exp.trim() === '') {
        setError(PARSE_ERRORS.EMPTY);
        setHumanReadable('');
      } else {
        setError(PARSE_ERRORS.INVALID_LENGTH);
        setHumanReadable('');
      }
      return;
    }

    setParts({
      minute: split[0],
      hour: split[1],
      dayMonth: split[2],
      month: split[3],
      dayWeek: split[4]
    });

    try {
      const parsed = cronstrue.toString(exp, { use24HourTimeFormat: true });
      setHumanReadable(parsed);
      setError(null);
    } catch (err: any) {
      setError(err.toString() || PARSE_ERRORS.INVALID_SYNTAX);
      setHumanReadable('');
    }
  };

  const handlePartChange = (partKey: keyof typeof parts, value: string) => {
    const newParts = { ...parts, [partKey]: value };
    setParts(newParts);
    const newExpression = `${newParts.minute} ${newParts.hour} ${newParts.dayMonth} ${newParts.month} ${newParts.dayWeek}`;
    setExpression(newExpression);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(expression);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Visual Builder */}
      <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm">
        
        {/* Main Display */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center space-x-2 bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-sm font-mono text-3xl font-black text-gray-800 relative group cursor-pointer" onClick={copyToClipboard}>
             {Object.entries(parts).map(([key, val], i) => (
                <span 
                    key={key} 
                    className={`px-1 rounded transition-colors duration-200 ${activePart === key ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                    onMouseEnter={() => setActivePart(key)}
                    onMouseLeave={() => setActivePart(null)}
                >
                    {val}
                </span>
             ))}
             <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -top-10 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow pointer-events-none">
                Copy Cron
             </div>
          </div>
          
          <div className="mt-6 min-h-[3rem]">
            {error ? (
               <p className="text-red-500 font-medium">{error}</p>
            ) : (
               <h2 className="text-2xl font-bold text-gray-900">"{humanReadable}"</h2>
            )}
          </div>
        </div>

        {/* Input Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div 
             className={`p-4 rounded-xl border transition-colors ${activePart === 'minute' ? 'bg-blue-50 border-blue-200 shadow-inner' : 'bg-white border-gray-200'}`}
             onMouseEnter={() => setActivePart('minute')}
             onMouseLeave={() => setActivePart(null)}
          >
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Minute</label>
            <input 
              type="text" 
              value={parts.minute} 
              onChange={(e) => handlePartChange('minute', e.target.value)}
              className="w-full font-mono text-center text-lg border-b-2 border-transparent focus:border-blue-500 focus:outline-none bg-transparent"
            />
            <p className="text-[10px] text-gray-400 mt-2 text-center">0 - 59</p>
          </div>

          <div 
             className={`p-4 rounded-xl border transition-colors ${activePart === 'hour' ? 'bg-blue-50 border-blue-200 shadow-inner' : 'bg-white border-gray-200'}`}
             onMouseEnter={() => setActivePart('hour')}
             onMouseLeave={() => setActivePart(null)}
          >
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Hour</label>
            <input 
              type="text" 
              value={parts.hour} 
              onChange={(e) => handlePartChange('hour', e.target.value)}
              className="w-full font-mono text-center text-lg border-b-2 border-transparent focus:border-blue-500 focus:outline-none bg-transparent"
            />
            <p className="text-[10px] text-gray-400 mt-2 text-center">0 - 23</p>
          </div>

          <div 
             className={`p-4 rounded-xl border transition-colors ${activePart === 'dayMonth' ? 'bg-blue-50 border-blue-200 shadow-inner' : 'bg-white border-gray-200'}`}
             onMouseEnter={() => setActivePart('dayMonth')}
             onMouseLeave={() => setActivePart(null)}
          >
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Day (Month)</label>
            <input 
              type="text" 
              value={parts.dayMonth} 
              onChange={(e) => handlePartChange('dayMonth', e.target.value)}
              className="w-full font-mono text-center text-lg border-b-2 border-transparent focus:border-blue-500 focus:outline-none bg-transparent"
            />
            <p className="text-[10px] text-gray-400 mt-2 text-center">1 - 31</p>
          </div>

          <div 
             className={`p-4 rounded-xl border transition-colors ${activePart === 'month' ? 'bg-blue-50 border-blue-200 shadow-inner' : 'bg-white border-gray-200'}`}
             onMouseEnter={() => setActivePart('month')}
             onMouseLeave={() => setActivePart(null)}
          >
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Month</label>
            <input 
              type="text" 
              value={parts.month} 
              onChange={(e) => handlePartChange('month', e.target.value)}
              className="w-full font-mono text-center text-lg border-b-2 border-transparent focus:border-blue-500 focus:outline-none bg-transparent"
            />
            <p className="text-[10px] text-gray-400 mt-2 text-center">1 - 12 (or JAN-DEC)</p>
          </div>

          <div 
             className={`p-4 rounded-xl border transition-colors md:col-span-1 col-span-2 ${activePart === 'dayWeek' ? 'bg-blue-50 border-blue-200 shadow-inner' : 'bg-white border-gray-200'}`}
             onMouseEnter={() => setActivePart('dayWeek')}
             onMouseLeave={() => setActivePart(null)}
          >
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Day (Week)</label>
            <input 
              type="text" 
              value={parts.dayWeek} 
              onChange={(e) => handlePartChange('dayWeek', e.target.value)}
              className="w-full font-mono text-center text-lg border-b-2 border-transparent focus:border-blue-500 focus:outline-none bg-transparent"
            />
            <p className="text-[10px] text-gray-400 mt-2 text-center">0 - 6 (Sun-Sat)</p>
          </div>
        </div>
      </div>

      {/* Raw String Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-bold text-gray-700 uppercase">Or Paste Existing Cron Expression</label>
        <input 
          type="text" 
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="* * * * *"
          className={`w-full p-4 border rounded-xl font-mono text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
        />
      </div>

      {/* Presets Grid */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 uppercase mb-4">Quick Presets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {CRON_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setExpression(preset.value)}
              className="text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <div className="font-mono text-sm font-bold text-gray-800 group-hover:text-blue-700">{preset.value}</div>
              <div className="text-xs text-gray-500 mt-1">{preset.label}</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
