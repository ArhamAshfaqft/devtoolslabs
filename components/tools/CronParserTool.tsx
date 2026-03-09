'use client';
import React, { useState, useEffect } from 'react';
import cronstrue from 'cronstrue';

export default function CronParserTool() {
  const [cron, setCron] = useState('0 22 * * 1-5');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!cron.trim()) {
      setDescription('');
      setError('');
      return;
    }

    try {
      // The cronstrue package translates expressions like "0 4 * * *" into "At 04:00 AM"
      const humanReadable = cronstrue.toString(cron, { use24HourTimeFormat: true });
      setDescription(humanReadable);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid cron expression syntax.');
      setDescription('');
    }
  }, [cron]);

  const insertExample = (str: string) => {
    setCron(str);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col gap-6">
        
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2 text-center text-xl">Cron Expression</label>
          <input 
             type="text" 
             value={cron} 
             onChange={e => setCron(e.target.value)}
             placeholder="* * * * *"
             className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-200 focus:border-gray-900 outline-none text-2xl font-mono text-center tracking-[0.2em] bg-white text-gray-900"
          />
        </div>
        
        <div className="flex flex-col items-center justify-center min-h-[120px]">
           {error ? (
             <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-200 font-medium">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               {error}
             </div>
           ) : (
             <div className="text-center">
               <span className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Translates To</span>
               <span className="block text-2xl md:text-3xl font-bold text-blue-700 leading-tight">
                 &quot;{description}&quot;
               </span>
             </div>
           )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Quick Examples</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
           <button onClick={() => insertExample('* * * * *')} className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 text-left transition-colors flex flex-col">
             <span className="font-mono text-xs text-gray-500 mb-1">* * * * *</span>
             <span className="text-sm font-semibold text-gray-900">Every minute</span>
           </button>
           <button onClick={() => insertExample('0 * * * *')} className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 text-left transition-colors flex flex-col">
             <span className="font-mono text-xs text-gray-500 mb-1">0 * * * *</span>
             <span className="text-sm font-semibold text-gray-900">Every hour</span>
           </button>
           <button onClick={() => insertExample('0 0 * * *')} className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 text-left transition-colors flex flex-col">
             <span className="font-mono text-xs text-gray-500 mb-1">0 0 * * *</span>
             <span className="text-sm font-semibold text-gray-900">Every day at midnight</span>
           </button>
           <button onClick={() => insertExample('0 9 * * 1-5')} className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 text-left transition-colors flex flex-col">
             <span className="font-mono text-xs text-gray-500 mb-1">0 9 * * 1-5</span>
             <span className="text-sm font-semibold text-gray-900">Every weekday at 09:00</span>
           </button>
           <button onClick={() => insertExample('*/15 * * * *')} className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 text-left transition-colors flex flex-col">
             <span className="font-mono text-xs text-gray-500 mb-1">*/15 * * * *</span>
             <span className="text-sm font-semibold text-gray-900">Every 15 minutes</span>
           </button>
           <button onClick={() => insertExample('0 0 * * 0')} className="px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 text-left transition-colors flex flex-col">
             <span className="font-mono text-xs text-gray-500 mb-1">0 0 * * 0</span>
             <span className="text-sm font-semibold text-gray-900">Every Sunday at midnight</span>
           </button>
        </div>
      </div>
      
      <div className="mt-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
         <h4 className="font-bold text-gray-900 mb-3 text-sm border-b border-gray-200 pb-2">Syntax Reference</h4>
         <pre className="text-xs text-gray-600 font-mono leading-relaxed">
{`┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
* * * * *`}
         </pre>
      </div>
    </div>
  );
}
