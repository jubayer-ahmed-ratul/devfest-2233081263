import type { UploadedFile, Requirement, Match } from '../types';
import type { Language } from '../i18n';
import { translate } from '../i18n';
import { formatFileSize, getMatchedRequirement, isHashMatchedToOtherRequirement } from '../core';

interface UploadedFilesListProps {
  files: UploadedFile[];
  requirements: Requirement[];
  matches: Match[];
  onRemove: (id: string) => void;
  language: Language;
}

export function UploadedFilesList({ 
  files, 
  requirements, 
  matches, 
  onRemove, 
  language 
}: UploadedFilesListProps) {
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  const getRequirementTitle = (reqId: string): string => {
    const req = requirements.find(r => r.id === reqId);
    if (!req) return reqId;
    return language === 'en' ? req.title_en : req.title_bn;
  };

  const isFileUnavailableDuplicate = (file: UploadedFile): boolean => {
    if (!file.isDuplicate) return false;
    
    // Check if this file itself is matched
    const matchedReqId = getMatchedRequirement(file.id, matches);
    if (matchedReqId) return false;
    
    // Check if another file with same hash is matched
    return isHashMatchedToOtherRequirement(file.hash, '', files, matches);
  };

  if (files.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {translate('uploadedDocuments', language)}
        </h2>
        <p className="text-gray-500 text-center py-8">
          {translate('noFilesUploaded', language)}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {translate('uploadedDocuments', language)}
      </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translate('fileName', language)}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translate('pages', language)}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translate('size', language)}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translate('status', language)}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translate('action', language)}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => {
              const matchedReqId = getMatchedRequirement(file.id, matches);
              const isUnavailableDup = isFileUnavailableDuplicate(file);
              
              return (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="truncate">{file.name}</div>
                    {matchedReqId && (
                      <div className="text-xs text-green-600 mt-1">
                        {translate('matchedTo', language)}: {getRequirementTitle(matchedReqId)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {file.pages}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="space-y-1">
                      {file.isDuplicate && (
                        <span className="block px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          ⚠ {translate('duplicateFile', language)}
                        </span>
                      )}
                      {matchedReqId ? (
                        <span className="block px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          ✓ {translate('matched', language)}
                        </span>
                      ) : isUnavailableDup ? (
                        <span className="block px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
                          {translate('unavailableDuplicateMatched', language)}
                        </span>
                      ) : (
                        <span className="block px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
                          {translate('unmatched', language)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onRemove(file.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      {translate('remove', language)}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>
          {translate('totalFiles', language)}: {files.length} / 30
        </span>
        <span>
          {translate('totalSize', language)}: {formatFileSize(totalSize)} / 50 MB
        </span>
      </div>
    </div>
  );
}
