import type { UploadedFile } from '../types';
import type { Language } from '../i18n';
import { translate } from '../i18n';
import { formatFileSize } from '../core';

interface UploadedFilesListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  language: Language;
}

export function UploadedFilesList({ files, onRemove, language }: UploadedFilesListProps) {
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

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
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {file.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {file.pages}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatFileSize(file.size)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {file.isDuplicate && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      ⚠ {translate('duplicateFile', language)}
                    </span>
                  )}
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
            ))}
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
