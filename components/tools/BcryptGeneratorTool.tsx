'use client';
import React, { useState, useEffect, useRef } from 'react';
// We use bcryptjs as it works purely in JS/Browser environments without native node build requirements
import bcrypt from 'bcryptjs';

export default function BcryptGeneratorTool() {
  const [mode, setMode] = useState<'hash' | 'verify'>('hash');
  
  // Hashing state
  const [password, setPassword] = useState('');
  const [rounds, setRounds] = useState<number>(10);
  const [hash, setHash] = useState('');
  const [hashingTime, setHashingTime] = useState<number | null>(null);
  const [isHashing, setIsHashing] = useState(false);

  // Verifying state
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const performHash = () => {
    if (!password) {
        setHash('');
        setHashingTime(null);
        return;
    }
    
    setIsHashing(true);
    setHashingTime(null);
    setHash('');
    
    // Use setTimeout to allow UI to render spinner before triggering heavy CPU work
    setTimeout(() => {
        const start = performance.now();
        try {
            // bcryptjs sync generation runs in browser but blocks main thread. 
            // We use standard rounds (4 to 12) so it's usually < 500ms
            const salt = bcrypt.genSaltSync(rounds);
            const generatedHash = bcrypt.hashSync(password, salt);
            setHash(generatedHash);
            setHashingTime(Math.round(performance.now() - start));
        } catch (e) {
            setHash('Error generating hash. Try lowering rounds.');
        } finally {
            setIsHashing(false);
        }
    }, 50);
  };

  const handleCopy = () => {
    if (hash && !hash.startsWith('Error')) {
      navigator.clipboard.writeText(hash);
    }
  };

  useEffect(() => {
    if (mode === 'verify') {
        if (!verifyPassword || !verifyHash) {
            setVerifyResult(null);
            return;
        }

        try {
            // bcrypt format quick validation before heavy compute
            if (!verifyHash.startsWith('$2a$') && !verifyHash.startsWith('$2b$') && !verifyHash.startsWith('$2y$')) {
                 setVerifyResult(false);
                 return;
            }
            const isValid = bcrypt.compareSync(verifyPassword, verifyHash);
            setVerifyResult(isValid);
        } catch (e) {
            setVerifyResult(false);
        }
    }
  }, [verifyPassword, verifyHash, mode]);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Mode Switcher */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex gap-4">
        <button
          onClick={() => { setMode('hash'); setVerifyResult(null); }}
          className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
            mode === 'hash' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Generate Hash
        </button>
        <button
          onClick={() => { setMode('verify'); setHash(''); setHashingTime(null); }}
          className={`flex-1 py-3 text-sm font-semibold rounded-md transition-colors ${
            mode === 'verify' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Verify Hash
        </button>
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-6">
          {mode === 'hash' && (
              <div className="space-y-6">
                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Plaintext Password</label>
                   <input 
                      type="text" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter string to hash..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      autoComplete="off"
                      spellCheck="false"
                   />
                </div>
                
                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-1 flex justify-between">
                       <span>Work Factor (Salt Rounds)</span>
                       <span className="text-blue-600 bg-blue-50 px-2 rounded-md border border-blue-100">{rounds}</span>
                   </label>
                   <p className="text-xs text-gray-500 mb-3 block">Higher rounds exponentially increase calculation time to prevent brute-force attacks. Standard is 10 or 12.</p>
                   <input 
                      type="range" 
                      min="4" 
                      max="16" 
                      value={rounds}
                      onChange={(e) => setRounds(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                   />
                   <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                       <span>Fast (4)</span>
                       <span>Current ({rounds})</span>
                       <span>Slow (16)</span>
                   </div>
                </div>

                <button 
                    onClick={performHash}
                    disabled={isHashing || !password}
                    className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                    {isHashing ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Computing Hash...
                      </>
                    ) : 'Generate Bcrypt Hash'}
                </button>

                {hash && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Resulting Hash</label>
                        <div className="relative">
                            <textarea
                                readOnly
                                value={hash}
                                className="w-full p-4 pr-24 bg-green-50/50 border border-green-200 text-gray-900 font-mono text-sm rounded-lg break-all outline-none resize-none"
                                rows={2}
                            />
                            <button 
                                onClick={handleCopy}
                                className="absolute right-3 top-3 text-xs font-semibold px-3 py-1.5 bg-white border border-gray-300 rounded shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                        {hashingTime !== null && (
                            <p className="text-xs text-gray-500 mt-2 text-right">
                                Calculated locally in <span className="font-mono font-medium text-gray-700">{hashingTime}ms</span>
                            </p>
                        )}
                    </div>
                )}
              </div>
          )}

          {mode === 'verify' && (
              <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Bcrypt Hash</label>
                   <input 
                      type="text" 
                      value={verifyHash}
                      onChange={(e) => setVerifyHash(e.target.value)}
                      placeholder="$2a$10$..."
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      autoComplete="off"
                      spellCheck="false"
                   />
                </div>
                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Plaintext Password to Check</label>
                   <input 
                      type="text" 
                      value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                      placeholder="MySecretPassword123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      autoComplete="off"
                   />
                </div>

                {verifyPassword && verifyHash && (
                    <div className={`mt-6 p-4 rounded-lg border flex items-center gap-3 ${
                        verifyResult ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                        {verifyResult ? (
                            <>
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <div>
                                    <h4 className="font-bold">Match Successful</h4>
                                    <p className="text-xs mt-1 opacity-80">The password corresponds exactly to the provided hash.</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                <div>
                                    <h4 className="font-bold">Match Failed</h4>
                                    <p className="text-xs mt-1 opacity-80">The password does not produce this hash, or the hash format is invalid.</p>
                                </div>
                            </>
                        )}
                    </div>
                )}
              </div>
          )}
      </div>
    </div>
  );
}
