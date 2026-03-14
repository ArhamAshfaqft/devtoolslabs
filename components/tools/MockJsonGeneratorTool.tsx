'use client';
import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

// Define the blueprint structure for our mock data
interface BlueprintField {
  id: string;
  key: string;
  type: string;
  options?: any;
}

const DEFAULT_BLUEPRINT: BlueprintField[] = [
  { id: '1', key: 'id', type: 'uuid' },
  { id: '2', key: 'firstName', type: 'firstName' },
  { id: '3', key: 'lastName', type: 'lastName' },
  { id: '4', key: 'email', type: 'email' },
  { id: '5', key: 'avatar', type: 'avatar' },
  { id: '6', key: 'createdAt', type: 'pastDate' },
];

const FIELD_TYPES = [
  { group: 'ID & Basic', types: [
      { id: 'uuid', label: 'UUID (v4)', generate: () => faker.string.uuid() },
      { id: 'boolean', label: 'Boolean (true/false)', generate: () => faker.datatype.boolean() },
      { id: 'number', label: 'Random Number (1-10k)', generate: () => faker.number.int({ min: 1, max: 10000 }) },
  ]},
  { group: 'Personal Data', types: [
      { id: 'firstName', label: 'First Name', generate: () => faker.person.firstName() },
      { id: 'lastName', label: 'Last Name', generate: () => faker.person.lastName() },
      { id: 'fullName', label: 'Full Name', generate: () => faker.person.fullName() },
      { id: 'email', label: 'Email Address', generate: () => faker.internet.email() },
      { id: 'phone', label: 'Phone Number', generate: () => faker.phone.number() },
      { id: 'jobTitle', label: 'Job Title', generate: () => faker.person.jobTitle() },
      { id: 'avatar', label: 'Avatar URL', generate: () => faker.image.avatar() },
  ]},
  { group: 'Commerce & Products', types: [
      { id: 'productName', label: 'Product Name', generate: () => faker.commerce.productName() },
      { id: 'price', label: 'Price ($)', generate: () => faker.commerce.price() },
      { id: 'company', label: 'Company Name', generate: () => faker.company.name() },
      { id: 'department', label: 'Department', generate: () => faker.commerce.department() },
  ]},
  { group: 'Dates & Location', types: [
      { id: 'pastDate', label: 'Date (Past)', generate: () => faker.date.past().toISOString() },
      { id: 'futureDate', label: 'Date (Future)', generate: () => faker.date.future().toISOString() },
      { id: 'city', label: 'City', generate: () => faker.location.city() },
      { id: 'country', label: 'Country', generate: () => faker.location.country() },
      { id: 'streetAddress', label: 'Street Address', generate: () => faker.location.streetAddress() },
  ]},
  { group: 'Internet & Tech', types: [
      { id: 'username', label: 'Username', generate: () => faker.internet.username() },
      { id: 'password', label: 'Password (Hash)', generate: () => faker.internet.password() },
      { id: 'ip', label: 'IP Address (v4)', generate: () => faker.internet.ipv4() },
      { id: 'macAddress', label: 'MAC Address', generate: () => faker.internet.mac() },
      { id: 'domain', label: 'Domain Name', generate: () => faker.internet.domainName() },
  ]}
];

// Helper to find the generation function based on ID
const generateValue = (typeId: string) => {
    for (const group of FIELD_TYPES) {
        const typeDef = group.types.find(t => t.id === typeId);
        if (typeDef) return typeDef.generate();
    }
    return "Unknown";
};


export default function MockJsonGeneratorTool() {
  const [blueprint, setBlueprint] = useState<BlueprintField[]>(DEFAULT_BLUEPRINT);
  const [rowCount, setRowCount] = useState<number>(10);
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  
  const [output, setOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationTime, setGenerationTime] = useState<number | null>(null);

  const addField = () => {
    setBlueprint([
      ...blueprint,
      { id: Date.now().toString(), key: `field_${blueprint.length + 1}`, type: 'firstName' }
    ]);
  };

  const updateField = (id: string, updates: Partial<BlueprintField>) => {
    setBlueprint(blueprint.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    setBlueprint(blueprint.filter(f => f.id !== id));
  };

  const generateData = () => {
      setIsGenerating(true);
      
      // Use setTimeout to allow UI to show spinner for huge arrays (e.g., 5000 rows)
      setTimeout(() => {
          const start = performance.now();
          try {
              const rows = [];
              for (let i = 0; i < rowCount; i++) {
                  const rowObject: any = {};
                  blueprint.forEach(field => {
                      if (field.key.trim() === '') return;
                      rowObject[field.key] = generateValue(field.type);
                  });
                  rows.push(rowObject);
              }

              if (format === 'json') {
                  setOutput(JSON.stringify(rows, null, 2));
              } else if (format === 'csv') {
                  if (rows.length === 0) setOutput('');
                  else {
                      // Extract headers from first non-empty row construct
                      const headers = blueprint.map(f => f.key).filter(k => k.trim() !== '');
                      const csvRows = [headers.join(',')];
                      
                      for (const row of rows) {
                          const values = headers.map(header => {
                              const val = row[header];
                              // Quote strings that contain commas or newlines
                              if (typeof val === 'string' && (val.includes(',') || val.includes('\n'))) {
                                  return `"${val.replace(/"/g, '""')}"`;
                              }
                              return val;
                          });
                          csvRows.push(values.join(','));
                      }
                      setOutput(csvRows.join('\n'));
                  }
              }
              setGenerationTime(Math.round(performance.now() - start));
          } catch (e) {
              setOutput("Error generating data. Check your field configurations.");
          } finally {
              setIsGenerating(false);
          }
      }, 20);
  };

  // Initial trigger to show example data
  useEffect(() => {
      generateData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
      if (output) {
          navigator.clipboard.writeText(output);
      }
  };

  const handleDownload = () => {
      if (!output) return;
      const blob = new Blob([output], { type: format === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mock_data_${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      
      {/* Sidebar: Configuration */}
      <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 p-4 shrink-0 flex flex-col h-full overflow-y-auto">
         <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex justify-between items-center">
             Data Blueprint
             <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-mono lowercase">faker.js api</span>
         </h3>

         {/* Fields List */}
         <div className="space-y-3 mb-6 flex-1">
             {blueprint.map((field, index) => (
                 <div key={field.id} className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm relative group">
                     {/* Remove Button */}
                     {blueprint.length > 1 && (
                        <button 
                            onClick={() => removeField(field.id)}
                            className="absolute -top-2 -right-2 bg-white border border-gray-300 text-gray-500 hover:text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            ×
                        </button>
                     )}
                     
                     <div className="flex flex-col gap-2">
                         <div className="flex gap-2 items-center">
                             <input 
                                 type="text" 
                                 value={field.key}
                                 onChange={(e) => updateField(field.id, { key: e.target.value })}
                                 className="flex-1 px-2 py-1.5 border border-gray-300 rounded font-mono text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                                 placeholder="field_key"
                             />
                         </div>
                         <select
                             value={field.type}
                             onChange={(e) => updateField(field.id, { type: e.target.value })}
                             className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none"
                         >
                             {FIELD_TYPES.map(group => (
                                 <optgroup key={group.group} label={group.group}>
                                     {group.types.map(t => (
                                         <option key={t.id} value={t.id}>{t.label}</option>
                                     ))}
                                 </optgroup>
                             ))}
                         </select>
                     </div>
                 </div>
             ))}
         </div>

         <button 
             onClick={addField}
             className="w-full py-2 mb-6 border-2 border-dashed border-gray-300 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-100 transition-colors flex justify-center items-center gap-2"
         >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
             Add Property
         </button>

         {/* Generation Settings */}
         <div className="mt-auto space-y-4 pt-4 border-t border-gray-200">
             <div className="flex gap-4">
                 <div className="flex-1">
                     <label className="block text-xs font-semibold text-gray-600 mb-1">Row Count</label>
                     <input 
                         type="number" 
                         min="1" 
                         max="5000"
                         value={rowCount}
                         onChange={(e) => setRowCount(Math.max(1, Math.min(5000, parseInt(e.target.value) || 1)))}
                         className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500"
                     />
                 </div>
                 <div className="flex-1">
                     <label className="block text-xs font-semibold text-gray-600 mb-1">Output Format</label>
                     <select 
                         value={format}
                         onChange={(e) => setFormat(e.target.value as 'json' | 'csv')}
                         className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500"
                     >
                         <option value="json">JSON</option>
                         <option value="csv">CSV</option>
                     </select>
                 </div>
             </div>

             <button 
                onClick={generateData}
                disabled={isGenerating}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
             >
                {isGenerating ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Brewing Data...
                      </>
                ) : 'Generate Mock Data'}
             </button>
         </div>
      </div>

      {/* Main Area: Output Viewer */}
      <div className="w-full md:w-2/3 flex flex-col h-[600px] md:h-auto relative bg-white">
         <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
             <div className="flex items-center gap-3">
                 <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Generated Output</h3>
                 {generationTime !== null && (
                     <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-mono border border-green-200">
                         {rowCount} rows generated in {generationTime}ms
                     </span>
                 )}
             </div>
             
             <div className="flex gap-2">
                 <button 
                     onClick={handleCopy}
                     className="text-xs font-semibold px-3 py-1.5 bg-white border border-gray-300 shadow-sm rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-1 transition-colors"
                 >
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                     Copy
                 </button>
                 <button 
                     onClick={handleDownload}
                     className="text-xs font-semibold px-3 py-1.5 bg-gray-900 border border-transparent shadow-sm rounded-md text-white hover:bg-gray-800 flex items-center gap-1 transition-colors"
                 >
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                     Download
                 </button>
             </div>
         </div>
         
         <div className="flex-1 p-0 overflow-hidden relative group">
             {output ? (
                 <textarea
                     readOnly
                     value={output}
                     className="w-full h-full p-4 font-mono text-sm bg-white text-gray-800 resize-none outline-none leading-relaxed"
                     spellCheck="false"
                 />
             ) : (
                 <div className="h-full flex items-center justify-center text-gray-400">
                     No data generated yet. Click "Generate Mock Data".
                 </div>
             )}
         </div>
      </div>

    </div>
  );
}
