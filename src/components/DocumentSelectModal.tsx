import type { UploadedFile } from '../types';
import type { Language } from '../i18n';
import { translate } from '../i18n';
import { formatFileSize } from '../core';

interface DocumentSelectModalProps {
  title: string;
  availableFiles: UploadedFile[];
  onSelect: (fileId: string) => void;
  onCancel: () => void;
  language: Language;
}

export function DocumentSelectModal({
  title,
  availableFiles,
  onSelect,
  onCancel,
  language,
}: DocumentSelectModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {translate('selectDocumentFor', language, { title })}
          </h3>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {availableFiles.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {translate('noAvailableFiles', language)}
            </p>
          ) : (
            <div className="space-y-2">
              {availableFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => onSelect(file.id)}
                  className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {file.pages} {translate('pages', language).toLowerCase()} • {formatFileSize(file.size)}
                      </p>
                    </div>
                    <div className="ml-4">
                      <svg
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {translate('cancel', language)}
          </button>
        </div>
      </div>
    </div>
  );
}
