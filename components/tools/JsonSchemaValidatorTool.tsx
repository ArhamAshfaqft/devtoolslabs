"use client";

import React, { useState, useEffect } from 'react';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export default function JsonSchemaValidatorTool() {
  const [schemaInput, setSchemaInput] = useState('{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "type": "object",\n  "properties": {\n    "id": { "type": "integer" },\n    "name": { "type": "string" },\n    "email": { "type": "string", "format": "email" }\n  },\n  "required": ["id", "name"]\n}');
  const [jsonInput, setJsonInput] = useState('{\n  "id": "123",\n  "name": "Alice",\n  "email": "invalid-email"\n}');
  const [validationResult, setValidationResult] = useState<{ valid: boolean | null; errors: any[] | null; message: string | null }>({
    valid: null,
    errors: null,
    message: null,
  });

  useEffect(() => {
    validateInputs(schemaInput, jsonInput);
  }, [schemaInput, jsonInput]);

  const validateInputs = (schemaStr: string, jsonStr: string) => {
    if (!schemaStr.trim() || !jsonStr.trim()) {
      setValidationResult({ valid: null, errors: null, message: null });
      return;
    }

    let schemaObj;
    let jsonObj;

    try {
      schemaObj = JSON.parse(schemaStr);
    } catch (e: any) {
      setValidationResult({ valid: false, errors: null, message: `Schema Parsing Error: ${e.message}` });
      return;
    }

    try {
      jsonObj = JSON.parse(jsonStr);
    } catch (e: any) {
      setValidationResult({ valid: false, errors: null, message: `JSON Data Parsing Error: ${e.message}` });
      return;
    }

    try {
      // Initialize AJV
      const ajv = new Ajv({ allErrors: true, strict: false });
      addFormats(ajv);

      const validate = ajv.compile(schemaObj);
      const valid = validate(jsonObj);

      if (valid) {
        setValidationResult({ valid: true, errors: null, message: 'JSON matches the Schema perfectly!' });
      } else {
        setValidationResult({ valid: false, errors: validate.errors || [], message: 'Validation Failed' });
      }
    } catch (e: any) {
      setValidationResult({ valid: false, errors: null, message: `AJV Error: ${e.message}` });
    }
  };

  const handleExampleValid = () => {
    setJsonInput('{\n  "id": 123,\n  "name": "Alice",\n  "email": "alice@example.com"\n}');
  };

  const handleExampleInvalid = () => {
    setJsonInput('{\n  "id": "123",\n  "name": "Alice",\n  "email": "invalid-email"\n}');
  };

  return (
    <div className="space-y-6">
      
      {/* Validation Status Bar */}
      {validationResult.valid !== null && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 shadow-sm transition-all duration-300 ${validationResult.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="mt-0.5 flex-shrink-0">
            {validationResult.valid ? (
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : (
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
          </div>
          <div>
            <h3 className={`font-bold text-lg ${validationResult.valid ? 'text-green-800' : 'text-red-800'}`}>
              {validationResult.message}
            </h3>
            {validationResult.errors && validationResult.errors.length > 0 && (
              <ul className="mt-2 space-y-1">
                {validationResult.errors.map((err, idx) => (
                  <li key={idx} className="text-sm text-red-700 font-mono bg-red-100/50 px-2 py-1 rounded">
                    <strong>{err.instancePath || 'root'}</strong> {err.message} 
                    {err.params && ' ' + JSON.stringify(err.params)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Schema Input */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
              JSON Schema
            </label>
          </div>
          <textarea
            value={schemaInput}
            onChange={(e) => setSchemaInput(e.target.value)}
            placeholder='{"type": "object", ...}'
            className="w-full h-[500px] p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm shadow-sm"
          />
        </div>

        {/* JSON Data Input */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
              JSON Data
            </label>
            <div className="flex gap-2">
              <button 
                onClick={handleExampleInvalid}
                className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-red-600 hover:bg-gray-200"
              >
                Test Invalid
              </button>
              <button 
                onClick={handleExampleValid}
                className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-green-600 hover:bg-gray-200"
              >
                Test Valid
              </button>
            </div>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"id": 123, ...}'
            className="w-full h-[500px] p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm shadow-sm"
          />
        </div>
        
      </div>
    </div>
  );
}
