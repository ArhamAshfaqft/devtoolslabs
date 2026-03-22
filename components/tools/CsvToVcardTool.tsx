"use client";

import React, { useState, useEffect } from 'react';

interface Mapping {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
}

export default function CsvToVcardTool() {
  const [csvInput, setCsvInput] = useState('FirstName,LastName,Email,Phone,Company\nJohn,Smith,john@example.com,+1234567890,Acme Corp\nJane,Doe,jane@test.org,+0987654321,Globex');
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Mapping>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: ''
  });
  const [vcardOutput, setVcardOutput] = useState('');
  const [error, setError] = useState('');

  // Simple CSV parser ignoring complex quotes for speed & offline use.
  const parseCsv = (csv: string) => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return { headers: [], rows: [] };
    
    const rawHeaders = lines[0].split(',').map(h => h.trim());
    const parsedHeaders = rawHeaders.map((h, i) => h || `Column ${i+1}`); // Fallback for empty headers
    
    const rows = lines.slice(1).map(line => line.split(',').map(c => c.trim()));
    return { headers: parsedHeaders, rows };
  };

  useEffect(() => {
    try {
      if (!csvInput.trim()) {
        setVcardOutput('// VCF Output will appear here...');
        setHeaders([]);
        setError('');
        return;
      }

      const { headers: parsedHeaders, rows } = parseCsv(csvInput);
      setHeaders(parsedHeaders);
      
      // Auto-map if headers match common names, only on first valid parse
      if (parsedHeaders.length > 0) {
         setMapping(prev => ({
           firstName: prev.firstName || parsedHeaders.find(h => /first.?name/i.test(h)) || '',
           lastName: prev.lastName || parsedHeaders.find(h => /last.?name/i.test(h)) || '',
           phone: prev.phone || parsedHeaders.find(h => /phone|tel|mobile/i.test(h)) || '',
           email: prev.email || parsedHeaders.find(h => /email|mail/i.test(h)) || '',
           organization: prev.organization || parsedHeaders.find(h => /company|org|business/i.test(h)) || ''
         }));
      }

      setError('');
    } catch (e: any) {
      setError(`Error parsing CSV: ${e.message}`);
    }
  }, [csvInput]);

  useEffect(() => {
     if (headers.length === 0) return;
     const { rows } = parseCsv(csvInput);
     
     let generatedVcards = '';
     
     for (const row of rows) {
       const getVal = (colName: string) => {
          if (!colName) return '';
          const idx = headers.indexOf(colName);
          return idx !== -1 && row[idx] ? row[idx] : '';
       };

       const fn = getVal(mapping.firstName);
       const ln = getVal(mapping.lastName);
       const eml = getVal(mapping.email);
       const tel = getVal(mapping.phone);
       const org = getVal(mapping.organization);
       
       if (!fn && !ln && !eml && !tel && !org) continue; // Skip entirely empty mapped rows

       let card = 'BEGIN:VCARD\nVERSION:3.0\n';
       card += `N:${ln};${fn};;;\n`;
       card += `FN:${fn} ${ln}`.trim() + '\n';
       if (org) card += `ORG:${org}\n`;
       if (tel) card += `TEL;TYPE=CELL:${tel}\n`;
       if (eml) card += `EMAIL;TYPE=WORK:${eml}\n`;
       card += 'END:VCARD\n\n';
       
       generatedVcards += card;
     }

     setVcardOutput(generatedVcards.trim() || '// No data mapped. Select columns above to generate vCards.');
  }, [mapping, headers, csvInput]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vcardOutput);
  };

  const downloadVcf = () => {
    if (!vcardOutput.trim() || vcardOutput.startsWith('//')) return;
    const blob = new Blob([vcardOutput], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contacts.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Mapping Controls */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
         <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
            <div>
               <h3 className="text-lg font-bold text-gray-900">Map CSV Columns</h3>
               <p className="text-xs text-gray-500 mt-1">Select which CSV columns correspond to standard vCard fields.</p>
            </div>
            {error && <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded">{error}</span>}
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
             {Object.entries({
               firstName: 'First Name',
               lastName: 'Last Name',
               email: 'Email Address',
               phone: 'Phone Number',
               organization: 'Company'
             }).map(([key, label]) => (
                <div key={key}>
                   <label className="block text-xs font-bold text-gray-500 mb-1">{label}</label>
                   <select 
                     value={(mapping as any)[key]} 
                     onChange={(e) => setMapping(prev => ({ ...prev, [key]: e.target.value }))}
                     className="w-full border border-gray-300 bg-white rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm font-mono text-gray-800"
                   >
                     <option value="">-- Ignore --</option>
                     {headers.map((h, i) => (
                        <option key={i} value={h}>{h}</option>
                     ))}
                   </select>
                </div>
             ))}
         </div>
      </div>

      {/* Editor Space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* CSV Input */}
        <div className="bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-sm h-[500px]">
           <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center text-gray-800">
              <h3 className="font-bold text-sm flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-blue-500"></span> 
                 Raw CSV Data
              </h3>
           </div>
           <textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="Paste comma-separated data here..."
              className="w-full flex-grow p-4 bg-white text-gray-800 font-mono text-sm resize-none outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 leading-relaxed whitespace-pre-wrap"
              spellCheck="false"
           />
        </div>

        {/* VCF Output */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl flex flex-col overflow-hidden shadow-lg h-[500px]">
           <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center text-gray-100">
              <h3 className="font-bold text-sm flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-green-500"></span> 
                 .vcf Output (vCard 3.0)
              </h3>
              <div className="flex gap-2">
                 <button
                   onClick={downloadVcf}
                   disabled={!vcardOutput || vcardOutput.startsWith('//')}
                   className="flex items-center gap-1.5 text-xs font-bold text-gray-800 bg-green-400 hover:bg-green-300 px-3 py-1.5 rounded transition-colors disabled:opacity-50"
                   title="Download VCF File"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                   Download
                 </button>
                 <button
                   onClick={copyToClipboard}
                   disabled={!vcardOutput || vcardOutput.startsWith('//')}
                   className="flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded transition-colors disabled:opacity-50"
                 >
                   Copy
                 </button>
              </div>
           </div>
           <div className="p-4 flex-grow relative overflow-y-auto">
              <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap break-all absolute inset-0 p-4">
                 {vcardOutput}
              </pre>
           </div>
        </div>

      </div>
    </div>
  );
}
