"use client";

import React, { useState, useEffect } from 'react';

type Permission = 'read' | 'write' | 'execute';
type Entity = 'owner' | 'group' | 'public';

interface PermissionsState {
  owner: { read: boolean; write: boolean; execute: boolean };
  group: { read: boolean; write: boolean; execute: boolean };
  public: { read: boolean; write: boolean; execute: boolean };
}

export default function ChmodCalculatorTool() {
  const [perms, setPerms] = useState<PermissionsState>({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    public: { read: true, write: false, execute: true }
  });

  const [octal, setOctal] = useState('755');
  const [symbolic, setSymbolic] = useState('-rwxr-xr-x');

  // Calculate octal and symbolic strings when checkboxes change
  useEffect(() => {
    const calculateOctalForEntity = (entityPerms: { read: boolean; write: boolean; execute: boolean }) => {
      let value = 0;
      if (entityPerms.read) value += 4;
      if (entityPerms.write) value += 2;
      if (entityPerms.execute) value += 1;
      return value;
    };

    const calculateSymbolicForEntity = (entityPerms: { read: boolean; write: boolean; execute: boolean }) => {
      let sym = '';
      sym += entityPerms.read ? 'r' : '-';
      sym += entityPerms.write ? 'w' : '-';
      sym += entityPerms.execute ? 'x' : '-';
      return sym;
    };

    const newOctal = `${calculateOctalForEntity(perms.owner)}${calculateOctalForEntity(perms.group)}${calculateOctalForEntity(perms.public)}`;
    const newSymbolic = `-${calculateSymbolicForEntity(perms.owner)}${calculateSymbolicForEntity(perms.group)}${calculateSymbolicForEntity(perms.public)}`;

    setOctal(newOctal);
    setSymbolic(newSymbolic);
  }, [perms]);

  const togglePerm = (entity: Entity, perm: Permission) => {
    setPerms(prev => ({
      ...prev,
      [entity]: {
        ...prev[entity],
        [perm]: !prev[entity][perm]
      }
    }));
  };

  // Allow setting via octal input
  const handleOctalChange = (value: string) => {
    // Only accept 3 digits between 0 and 7
    if (!/^[0-7]{0,3}$/.test(value)) return;
    
    // We update the state visually, but if it's less than 3 chars, we pad zeros for calculation
    setOctal(value);
    
    if (value.length === 3) {
      const parseOctalChar = (char: string) => {
        const num = parseInt(char, 10);
        return {
          read: (num & 4) !== 0,
          write: (num & 2) !== 0,
          execute: (num & 1) !== 0
        };
      };
      
      setPerms({
        owner: parseOctalChar(value[0]),
        group: parseOctalChar(value[1]),
        public: parseOctalChar(value[2])
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderCheckbox = (entity: Entity, perm: Permission, label: string) => (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative flex items-center">
        <input 
          type="checkbox" 
          checked={perms[entity][perm]} 
          onChange={() => togglePerm(entity, perm)}
          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded cursor-pointer checked:bg-blue-600 checked:border-transparent transition-all"
        />
        <svg className="absolute w-3 h-3 text-white left-1 pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors select-none">{label}</span>
      <span className="text-xs text-gray-400 font-mono hidden sm:inline-block select-none">
        ({perm === 'read' ? '4' : perm === 'write' ? '2' : '1'})
      </span>
    </label>
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      
      {/* Visual Workspace Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Owner Block */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
           <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Owner</h3>
           </div>
           <div className="p-5 flex flex-col gap-4">
              {renderCheckbox('owner', 'read', 'Read')}
              {renderCheckbox('owner', 'write', 'Write')}
              {renderCheckbox('owner', 'execute', 'Execute')}
           </div>
        </div>

        {/* Group Block */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
           <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Group</h3>
           </div>
           <div className="p-5 flex flex-col gap-4">
              {renderCheckbox('group', 'read', 'Read')}
              {renderCheckbox('group', 'write', 'Write')}
              {renderCheckbox('group', 'execute', 'Execute')}
           </div>
        </div>

        {/* Public Block */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
           <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Public</h3>
           </div>
           <div className="p-5 flex flex-col gap-4">
              {renderCheckbox('public', 'read', 'Read')}
              {renderCheckbox('public', 'write', 'Write')}
              {renderCheckbox('public', 'execute', 'Execute')}
           </div>
        </div>

      </div>

      {/* Outputs & Generators */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col gap-6 w-full text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Standard Outputs */}
            <div className="space-y-6">
                <div>
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Linux Command</label>
                   <div className="flex bg-gray-800 rounded-lg overflow-hidden border border-gray-700 font-mono group">
                      <div className="p-3 text-blue-400 flex-grow text-lg tracking-wide border-r border-gray-700">chmod {octal} file.txt</div>
                      <button onClick={() => copyToClipboard(`chmod ${octal} file.txt`)} className="px-5 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors flex items-center justify-center font-sans font-medium text-sm" title="Copy Command">
                        Copy
                      </button>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="flex-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Octal Notation</label>
                      <input 
                         type="text" 
                         value={octal} 
                         onChange={(e) => handleOctalChange(e.target.value)}
                         className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white font-mono text-xl tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                         maxLength={3}
                      />
                   </div>
                   <div className="flex-[2]">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Symbolic Notation</label>
                      <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-green-400 font-mono text-xl tracking-widest text-center">
                         {symbolic}
                      </div>
                   </div>
                </div>
            </div>

            {/* Quick Presets */}
            <div className="border-t lg:border-t-0 lg:border-l border-gray-700 pt-6 lg:pt-0 lg:pl-8 flex flex-col gap-3">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Common Presets</label>
               
               <button onClick={() => handleOctalChange('777')} className="flex items-center justify-between group p-3 rounded-lg hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700 text-left">
                  <div>
                    <span className="font-mono text-blue-400 font-bold mr-3">777</span>
                    <span className="text-sm text-gray-300">Open to everyone (DANGEROUS)</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
               </button>

               <button onClick={() => handleOctalChange('755')} className="flex items-center justify-between group p-3 rounded-lg hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700 text-left">
                  <div>
                    <span className="font-mono text-green-400 font-bold mr-3">755</span>
                    <span className="text-sm text-gray-300">Web Root Files / Executables</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
               </button>

               <button onClick={() => handleOctalChange('644')} className="flex items-center justify-between group p-3 rounded-lg hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700 text-left">
                  <div>
                    <span className="font-mono text-purple-400 font-bold mr-3">644</span>
                    <span className="text-sm text-gray-300">Standard Text / HTML Files</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
               </button>

               <button onClick={() => handleOctalChange('600')} className="flex items-center justify-between group p-3 rounded-lg hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700 text-left">
                  <div>
                    <span className="font-mono text-red-400 font-bold mr-3">600</span>
                    <span className="text-sm text-gray-300">Private SSH Keys / Secrets</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
               </button>

            </div>
        </div>

      </div>
    </div>
  );
}
