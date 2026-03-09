import React from 'react';

export default function FAQAccordion({ question, answer }: { question: string, answer: string }) {
  return (
    <details className="group py-4 cursor-pointer">
      <summary className="flex justify-between items-center font-medium text-gray-900 list-none">
        <span>{question}</span>
        <span className="transition group-open:rotate-180 text-gray-500">
          <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
        </span>
      </summary>
      <p className="text-gray-600 mt-3 text-sm leading-relaxed">
        {answer}
      </p>
    </details>
  );
}
