import { useState } from 'react';
import { RequirementsUploader } from '../components/RequirementsUploader';
import { TenderInfo } from '../components/TenderInfo';
import { RequirementsList } from '../components/RequirementsList';
import { parseRequirementsFile, RequirementsParseError } from '../core';
import type { RequirementsFile } from '../types';

export function TenderSetup() {
  const [data, setData] = useState<RequirementsFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileLoad = (content: string) => {
    setError(null);
    
    try {
      const parsed = parseRequirementsFile(content);
      setData(parsed);
    } catch (err) {
      if (err instanceof RequirementsParseError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while loading the file.');
      }
      setData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TenderPack
          </h1>
          <p className="text-xl text-gray-600">
            Tender Document Package Builder
          </p>
        </div>

        {/* File Uploader */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <RequirementsUploader onFileLoad={handleFileLoad} disabled={false} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tender Information and Requirements */}
        {data && (
          <div className="space-y-6">
            <TenderInfo tender={data.tender} />
            <RequirementsList requirements={data.requirements} />
          </div>
        )}

        {/* Instructions when no data loaded */}
        {!data && !error && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-800">
              Load a requirements.json file to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
