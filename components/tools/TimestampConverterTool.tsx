'use client';
import React, { useState, useEffect } from 'react';

export default function TimestampConverterTool() {
  const [timestampStr, setTimestampStr] = useState('');
  const [datetimeStr, setDatetimeStr] = useState('');
  const [currentEpoch, setCurrentEpoch] = useState(0);

  // Live clock
  useEffect(() => {
    setCurrentEpoch(Math.floor(Date.now() / 1000));
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleEpochChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTimestampStr(val);
    
    if (!val) {
      setDatetimeStr('');
      return;
    }

    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      try {
        // Assume seconds if length is 10 or less, otherwise assume milliseconds
        const isMs = val.length > 10;
        const date = isMs ? new Date(num) : new Date(num * 1000);
        
        // Format to strict ISO string for the datetime-local input
        if (!isNaN(date.getTime())) {
          // datetime-local expects: YYYY-MM-DDThh:mm
          const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
          const localISOTime = (new Date(date.getTime() - tzOffset)).toISOString().slice(0, -1);
          setDatetimeStr(localISOTime.substring(0, 16));
        }
      } catch (err) {
        // Ignore parsing errors for partial typing
      }
    }
  };

  const handleDatetimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDatetimeStr(val);
    
    if (!val) {
      setTimestampStr('');
      return;
    }

    try {
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        setTimestampStr(Math.floor(date.getTime() / 1000).toString());
      }
    } catch (err) {
      // Ignore
    }
  };

  // Helper getters
  const getRenderedDateContext = () => {
    if (!timestampStr) return null;
    const num = parseInt(timestampStr, 10);
    if (isNaN(num)) return null;
    
    const isMs = timestampStr.length > 10;
    const date = isMs ? new Date(num) : new Date(num * 1000);
    if (isNaN(date.getTime())) return null;

    return {
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      relative: getRelativeTime(date)
    };
  };

  const getRelativeTime = (date: Date) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    if (Math.abs(daysDifference) > 365) {
      return rtf.format(Math.round(daysDifference / 365), 'year');
    } else if (Math.abs(daysDifference) > 30) {
      return rtf.format(Math.round(daysDifference / 30), 'month');
    } else if (Math.abs(daysDifference) > 0) {
      return rtf.format(daysDifference, 'day');
    } else {
      const hoursDiff = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60));
      if (Math.abs(hoursDiff) > 0) return rtf.format(hoursDiff, 'hour');
      const minsDiff = Math.round((date.getTime() - Date.now()) / (1000 * 60));
      return rtf.format(minsDiff, 'minute');
    }
  };

  const cDate = getRenderedDateContext();

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Current Epoch Bar */}
      <div className="bg-blue-50 border-b border-blue-100 p-4 flex flex-col md:flex-row items-center justify-between text-blue-900">
        <span className="font-semibold text-sm tracking-wide uppercase">Current Epoch Time</span>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <span className="font-mono text-xl font-bold">{currentEpoch}</span>
          <button 
            onClick={() => {
              setTimestampStr(currentEpoch.toString());
              handleEpochChange({ target: { value: currentEpoch.toString() } } as any);
            }} 
            className="text-xs bg-white text-blue-700 px-3 py-1 rounded border border-blue-200 hover:bg-blue-100 transition-colors shadow-sm"
          >
            Load Current
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Epoch Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-widest">Unix Timestamp</label>
            <input 
              type="number" 
              value={timestampStr}
              onChange={handleEpochChange}
              placeholder="e.g. 1729623547"
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg text-center shadow-inner"
            />
            <span className="text-xs text-center text-gray-500 mt-1">
              Supports both seconds and milliseconds
            </span>
          </div>

          {/* Local Date Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-widest">Local Date & Time</label>
            <input 
              type="datetime-local" 
              value={datetimeStr}
              onChange={handleDatetimeChange}
              className="w-full p-4 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans text-lg text-center shadow-inner"
            />
            <span className="text-xs text-center text-gray-500 mt-1">
              Based on your system timezone
            </span>
          </div>
        </div>

        {/* Translation Results */}
        {cDate && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Converted Timestamps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <div className="text-xs font-semibold text-gray-500 mb-1">Local Timezone</div>
                <div className="font-mono text-gray-900 break-words">{cDate.local}</div>
              </div>
              
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <div className="text-xs font-semibold text-gray-500 mb-1">UTC Time</div>
                <div className="font-mono text-gray-900 break-words">{cDate.utc}</div>
              </div>
              
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <div className="text-xs font-semibold text-gray-500 mb-1">ISO 8601</div>
                <div className="font-mono text-gray-900 break-words">{cDate.iso}</div>
              </div>
              
              <div className="bg-gray-50 p-4 border border-gray-200 rounded">
                <div className="text-xs font-semibold text-gray-500 mb-1">Relative Time</div>
                <div className="font-semibold text-blue-600 capitalize break-words">{cDate.relative}</div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
