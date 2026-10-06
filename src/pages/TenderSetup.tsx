import { useState } from 'react';
import { RequirementsUploader } from '../components/RequirementsUploader';
import { TenderInfo } from '../components/TenderInfo';
import { FileUploader } from '../components/FileUploader';
import { UploadedFilesList } from '../components/UploadedFilesList';
import { RequirementMatchRow } from '../components/RequirementMatchRow';
import { DocumentSelectModal } from '../components/DocumentSelectModal';
import { MatchingSummary } from '../components/MatchingSummary';
import { parseRequirementsFile, RequirementsParseError } from '../core';
import { processPDFFile, checkLimits, findDuplicates } from '../core';
import { 
  getMatchedFile, 
  getAvailableFiles, 
  matchFile, 
  unmatchRequirement,
  removeFileMatches,
  getMatchingStats,
} from '../core';
import type { RequirementsFile, UploadedFile, Match } from '../types';
import type { Language } from '../i18n';
import { translate } from '../i18n';

export function TenderSetup() {
  const [language, setLanguage] = useState<Language>('en');
  const [data, setData] = useState<RequirementsFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [processing, setProcessing] = useState(false);
  const [pdfErrors, setPdfErrors] = useState<string[]>([]);
  
  // Modal state
  const [selectingForRequirement, setSelectingForRequirement] = useState<string | null>(null);

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

  const handlePDFsSelected = async (files: File[]) => {
    setPdfErrors([]);
    
    // Filter only PDF files
    const pdfFiles = files.filter(file => {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setPdfErrors(prev => [
          ...prev,
          translate('notPdfFile', language, { filename: file.name })
        ]);
        return false;
      }
      return true;
    });

    if (pdfFiles.length === 0) return;

    // Check limits
    const limitsCheck = checkLimits(uploadedFiles, pdfFiles);
    if (!limitsCheck.valid) {
      if (limitsCheck.error === 'MAX_FILES') {
        setPdfErrors(prev => [...prev, translate('maxFilesExceeded', language)]);
      } else if (limitsCheck.error === 'MAX_SIZE') {
        setPdfErrors(prev => [...prev, translate('maxSizeExceeded', language)]);
      }
      return;
    }

    setProcessing(true);

    // Process each PDF file
    const newFiles: UploadedFile[] = [];
    const errors: string[] = [];

    for (let i = 0; i < pdfFiles.length; i++) {
      const file = pdfFiles[i];
      const id = `${Date.now()}-${i}`;
      
      const result = await processPDFFile(file, id);
      
      if (result.success && result.file) {
        newFiles.push(result.file);
      } else {
        // Handle errors
        if (result.error === 'PASSWORD_PROTECTED') {
          errors.push(translate('pdfPasswordProtected', language, { filename: file.name }));
        } else if (result.error === 'CANNOT_OPEN') {
          errors.push(translate('pdfCannotOpen', language, { filename: file.name }));
        } else {
          errors.push(translate('pdfProcessingError', language, { filename: file.name }));
        }
      }
    }

    // Update uploaded files
    const allFiles = [...uploadedFiles, ...newFiles];
    
    // Update duplicate status
    const hashes = allFiles.map(f => f.hash);
    const duplicateHashes = findDuplicates(hashes);
    
    allFiles.forEach(file => {
      file.isDuplicate = duplicateHashes.has(file.hash);
    });

    setUploadedFiles(allFiles);
    setPdfErrors(errors);
    setProcessing(false);
  };

  const handleRemoveFile = (id: string) => {
    const newFiles = uploadedFiles.filter(f => f.id !== id);
    
    // Recalculate duplicates
    const hashes = newFiles.map(f => f.hash);
    const duplicateHashes = findDuplicates(hashes);
    
    newFiles.forEach(file => {
      file.isDuplicate = duplicateHashes.has(file.hash);
    });
    
    // Remove any matches associated with this file
    const newMatches = removeFileMatches(id, matches);
    
    setUploadedFiles(newFiles);
    setMatches(newMatches);
  };

  const handleStartMatching = (requirementId: string) => {
    setSelectingForRequirement(requirementId);
  };

  const handleSelectDocument = (fileId: string) => {
    if (selectingForRequirement) {
      const newMatches = matchFile(selectingForRequirement, fileId, matches);
      setMatches(newMatches);
    }
    setSelectingForRequirement(null);
  };

  const handleUnmatch = (requirementId: string) => {
    const newMatches = unmatchRequirement(requirementId, matches);
    setMatches(newMatches);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  // Get available files for the currently selecting requirement
  const availableFilesForSelection = selectingForRequirement
    ? getAvailableFiles(selectingForRequirement, uploadedFiles, matches)
    : [];

  const getRequirementTitle = (reqId: string): string => {
    if (!data) return '';
    const req = data.requirements.find(r => r.id === reqId);
    if (!req) return '';
    return language === 'en' ? req.title_en : req.title_bn;
  };

  const matchingStats = data
    ? getMatchingStats(data.requirements.length, uploadedFiles.length, matches)
    : null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Language Toggle */}
        <div className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              {translate('switchLanguage', language)}
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {translate('appTitle', language)}
          </h1>
          <p className="text-xl text-gray-600">
            {translate('appSubtitle', language)}
          </p>
        </div>

        {/* Requirements File Uploader */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <RequirementsUploader 
            onFileLoad={handleFileLoad} 
            disabled={false}
            language={language}
          />
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
                <h3 className="text-sm font-medium text-red-800">
                  {translate('error', language)}
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* PDF Errors */}
        {pdfErrors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  {translate('error', language)}
                </h3>
                <div className="mt-1 text-sm text-yellow-700">
                  {pdfErrors.map((err, idx) => (
                    <p key={idx}>{err}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tender Information */}
        {data && (
          <div className="space-y-6 mb-6">
            <TenderInfo tender={data.tender} language={language} />
          </div>
        )}

        {/* PDF Upload Section */}
        {data && (
          <div className="space-y-6 mb-6">
            <FileUploader
              onFilesSelected={handlePDFsSelected}
              disabled={processing}
              language={language}
            />
            
            {processing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-800">
                  {translate('pdfProcessing', language)}
                </p>
              </div>
            )}
            
            <UploadedFilesList
              files={uploadedFiles}
              requirements={data.requirements}
              matches={matches}
              onRemove={handleRemoveFile}
              language={language}
            />
          </div>
        )}

        {/* Matching Section */}
        {data && uploadedFiles.length > 0 && (
          <div className="space-y-6">
            {/* Matching Summary */}
            {matchingStats && (
              <MatchingSummary stats={matchingStats} language={language} />
            )}

            {/* Requirements Matching */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {translate('requirements', language)}
              </h2>
              <div className="space-y-3">
                {data.requirements.map((req) => {
                  const fileId = getMatchedFile(req.id, matches);
                  const matchedFile = fileId 
                    ? uploadedFiles.find(f => f.id === fileId) ?? null
                    : null;

                  return (
                    <RequirementMatchRow
                      key={req.id}
                      requirement={req}
                      matchedFile={matchedFile}
                      onMatch={() => handleStartMatching(req.id)}
                      onUnmatch={() => handleUnmatch(req.id)}
                      language={language}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Instructions when no data loaded */}
        {!data && !error && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-800">
              {translate('loadRequirementsToStart', language)}
            </p>
          </div>
        )}

        {/* Document Selection Modal */}
        {selectingForRequirement && (
          <DocumentSelectModal
            title={getRequirementTitle(selectingForRequirement)}
            availableFiles={availableFilesForSelection}
            onSelect={handleSelectDocument}
            onCancel={() => setSelectingForRequirement(null)}
            language={language}
          />
        )}
      </div>
    </div>
  );
}
