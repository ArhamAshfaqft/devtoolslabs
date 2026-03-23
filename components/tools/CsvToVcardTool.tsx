"use client";

import React, { useState, useEffect } from 'react';

interface Mapping {
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  organization: string;
  jobTitle: string;
  addressFull: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export default function CsvToVcardTool() {
  const [csvInput, setCsvInput] = useState('FirstName,LastName,Email,Phone,Company,JobTitle,Street,City,State,Zip,Country\nJohn,Smith,john.doe@example.com,+1234567890,TechCorp,Software Engineer,123 Main St,New York,NY,10001,USA\nJane,Doe,jane.smith@example.com,+0987654321,Designify,Designer,456 Park Ave,Los Angeles,CA,90001,USA');
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Mapping>({
    firstName: '', lastName: '', fullName: '', phone: '', email: '',
    organization: '', jobTitle: '', addressFull: '', street: '', city: '', state: '', zip: '', country: ''
  });
  const [vcardOutput, setVcardOutput] = useState('');
  const [error, setError] = useState('');

  const parseCsv = (csv: string) => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return { headers: [], rows: [] };
    
    const splitCsvLine = (line: string) => {
       const result = [];
       let current = '';
       let inQuotes = false;
       for (let i = 0; i < line.length; i++) {
         if (line[i] === '"') inQuotes = !inQuotes;
         else if (line[i] === ',' && !inQuotes) {
           result.push(current.trim().replace(/^"|"$/g, ''));
           current = '';
         } else current += line[i];
       }
       result.push(current.trim().replace(/^"|"$/g, ''));
       return result;
    };

    const rawHeaders = splitCsvLine(lines[0]);
    const parsedHeaders = rawHeaders.map((h, i) => h || `Column ${i+1}`);
    const rows = lines.slice(1).map(splitCsvLine);
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
      
      // Auto-map if headers match common names. Discard mappings that don't exist in new headers!
      if (parsedHeaders.length > 0) {
         setMapping(prev => {
           const getValid = (key: keyof Mapping, regex: RegExp) => {
              // If the previous mapping is STILL valid, keep it. Otherwise regex search.
              if (prev[key] && parsedHeaders.includes(prev[key])) return prev[key];
              return parsedHeaders.find(h => regex.test(h)) || '';
           };
           
           return {
             firstName: getValid('firstName', /^first.?name$/i),
             lastName: getValid('lastName', /^last.?name$/i),
             fullName: getValid('fullName', /^name$|^full.?name$/i),
             phone: getValid('phone', /phone|tel|mobile/i),
             email: getValid('email', /email|mail/i),
             organization: getValid('organization', /company|org|business/i),
             jobTitle: getValid('jobTitle', /title|role|position/i),
             addressFull: getValid('addressFull', /^address$|^location$|^full.?address$/i),
             street: getValid('street', /street|addr1/i),
             city: getValid('city', /city/i),
             state: getValid('state', /state|province/i),
             zip: getValid('zip', /zip|postal/i),
             country: getValid('country', /country/i)
           };
         });
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

       const fullN = getVal(mapping.fullName);
       let fn = getVal(mapping.firstName);
       let ln = getVal(mapping.lastName);
       
       if (fullN && !fn && !ln) {
          const parts = fullN.split(' ');
          ln = parts.pop() || '';
          fn = parts.join(' ') || '';
       }

       const eml = getVal(mapping.email);
       const tel = getVal(mapping.phone);
       const org = getVal(mapping.organization);
       const title = getVal(mapping.jobTitle);
       
       const adrFull = getVal(mapping.addressFull);
       const street = getVal(mapping.street);
       const city = getVal(mapping.city);
       const state = getVal(mapping.state);
       const zip = getVal(mapping.zip);
       const country = getVal(mapping.country);
       
       if (!fn && !ln && !eml && !tel && !org && !title && !adrFull && !street && !fullN) continue;

       const finalFn = fullN || `${fn} ${ln}`.trim() || 'Unknown Contact';
       
       // Pro Features: UID (for de-duplication) and REV (last updated)
       const uidValue = eml || `uid-${Math.random().toString(36).substring(2, 11)}`;
       const revTimestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

       let card = 'BEGIN:VCARD\nVERSION:3.0\n';
       card += `N:${ln};${fn};;;\n`;
       card += `FN:${finalFn}\n`;
       if (org) card += `ORG:${org}\n`;
       if (title) card += `TITLE:${title}\n`;
       if (tel) card += `TEL;TYPE=CELL,VOICE:${tel}\n`;
       if (eml) card += `EMAIL;TYPE=WORK,INTERNET:${eml}\n`;
       
       // Construct ADR (vCard 3.0: P.O. Box; Extended; Street; Locality; Region; ZIP; Country)
        // Use adrFull as fallback for street to prevent field-shifting when "Address" is mapped but not "Street"
        const streetValue = street || adrFull || '';
        if (streetValue || city || state || zip || country) {
            card += `ADR;TYPE=HOME:;;${streetValue};${city};${state};${zip};${country}\n`;
        }
       
       card += `UID:${uidValue}\n`;
       card += `REV:${revTimestamp}\n`;
       card += 'END:VCARD\n\n';
       generatedVcards += card;
     }

     setVcardOutput(generatedVcards.trim() || '// No data mapped. Select columns above to generate vCards.');
  }, [mapping, headers, csvInput]);

  const copyToClipboard = () => navigator.clipboard.writeText(vcardOutput);

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
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
         <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
            <div>
               <h3 className="text-lg font-bold text-gray-900">Map CSV Columns</h3>
               <p className="text-xs text-gray-500 mt-1">Select which CSV columns correspond to standard vCard fields.</p>
            </div>
            {error && <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded">{error}</span>}
         </div>

         <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
             {Object.entries({
               firstName: 'First Name', lastName: 'Last Name', fullName: 'Full Name',
               email: 'Email', phone: 'Phone', organization: 'Company', jobTitle: 'Job Title',
               addressFull: 'Full Address', street: 'Street', city: 'City', state: 'State', zip: 'Zip', country: 'Country'
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
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
                 >
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
