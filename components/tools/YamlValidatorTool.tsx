'use client';
import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';

export default function YamlValidatorTool() {
  const [input, setInput] = useState('apiVersion: v1\nkind: Pod\nmetadata:\n  name: devtoolslabs-pod\n  labels:\n    app: web\nspec:\n  containers:\n    - name: nginx\n      image: nginx:1.14.2\n      ports:\n        - containerPort: 80');
  const [error, setError] = useState<{ message: string; line: number | null } | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [jsonOutput, setJsonOutput] = useState('');

  const validateYaml = () => {
    try {
      if (!input.trim()) {
        setError(null);
        setIsValid(false);
        setJsonOutput('');
        return;
      }

      const parsed = yaml.load(input);
      setError(null);
      setIsValid(true);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (e: any) {
      setIsValid(false);
      setJsonOutput('');
      
      // Extract line number if available from js-yaml error
      let line = null;
      if (e.mark) {
        line = e.mark.line + 1;
      }
      
      setError({
        message: e.reason || 'Invalid YAML syntax.',
        line: line
      });
    }
  };

  useEffect(() => {
    validateYaml();
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        
        {/* YAML Input */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">YAML Input</h3>
            <div className="flex gap-4">
               <button onClick={() => setInput('')} className="text-xs font-bold text-red-500 hover:text-red-600">Clear</button>
               <button onClick={handleCopy} className="text-xs font-bold text-gray-500 hover:text-gray-900">Copy Raw</button>
            </div>
          </div>
          <div className="flex-1 relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`w-full h-full p-6 font-mono text-sm border-2 rounded-xl focus:ring-4 outline-none resize-none transition-all ${
                isValid ? 'bg-gray-50 border-gray-100 focus:ring-blue-500/5 focus:border-blue-500' : 
                error ? 'bg-red-50 border-red-100 focus:ring-red-500/5 focus:border-red-500' : 
                'bg-gray-50 border-gray-100 focus:ring-blue-500/5 focus:border-blue-500'
              }`}
              placeholder="apiVersion: v1..."
              spellCheck="false"
            />
          </div>
        </div>

        {/* Status & Preview */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Validation Status</h3>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
             {/* Status Badge */}
             <div className={`p-6 rounded-xl border flex items-center gap-4 ${
                isValid ? 'bg-green-50 border-green-100 text-green-800' : 
                error ? 'bg-red-50 border-red-100 text-red-800' : 
                'bg-gray-50 border-gray-100 text-gray-500'
             }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                   isValid ? 'bg-green-500 text-white' : 
                   error ? 'bg-red-500 text-white' : 
                   'bg-gray-300 text-white'
                }`}>
                   {isValid ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                   ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                   )}
                </div>
                <div>
                   <h4 className="font-bold text-lg">{isValid ? 'Valid YAML Syntax' : error ? 'Syntax Error Identified' : 'Awaiting Input'}</h4>
                   {error && <p className="text-sm font-medium opacity-80">{error.message} {error.line && `(Line ${error.line})`}</p>}
                   {isValid && <p className="text-sm font-medium opacity-80">Structure successfully parsed and mapped.</p>}
                </div>
             </div>

             {/* JSON Preview */}
             {isValid && (
                <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Object Schema Preview (JSON)</span>
                    <div className="flex-1 bg-gray-900 rounded-xl p-6 font-mono text-xs text-blue-300 overflow-auto border border-gray-800 shadow-inner">
                       <pre>{jsonOutput}</pre>
                    </div>
                </div>
             )}

             {error && (
                <div className="p-6 bg-red-900 text-white rounded-xl flex flex-col gap-4 shadow-lg animate-in shake duration-300">
                   <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-widest text-red-400">Linter Trace</span>
                        <div className="flex-1 h-px bg-red-800"></div>
                   </div>
                   <div className="font-mono text-sm leading-relaxed">
                      Detected a structural anomaly at line <span className="text-yellow-400 font-bold">{error.line || '?'}</span>. 
                      Common causes include tab characters (indentation must be spaces) or missing colons.
                   </div>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* DevOps Reference */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-wrap gap-8 items-center justify-around">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">K8s</div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kubernetes Ready</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-xs">DC</div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Docker Compose</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold text-xs">A</div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ansible Playbooks</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold text-xs">CI</div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">GitHub Actions</span>
         </div>
      </div>
    </div>
  );
}
