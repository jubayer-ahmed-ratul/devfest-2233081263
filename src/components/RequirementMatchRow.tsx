import type { Requirement, UploadedFile } from '../types';
import type { Language } from '../i18n';
import { translate } from '../i18n';

interface RequirementMatchRowProps {
  requirement: Requirement;
  matchedFile: UploadedFile | null;
  onMatch: () => void;
  onUnmatch: () => void;
  language: Language;
}

export function RequirementMatchRow({
  requirement,
  matchedFile,
  onMatch,
  onUnmatch,
  language,
}: RequirementMatchRowProps) {
  const title = language === 'en' ? requirement.title_en : requirement.title_bn;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        {/* Requirement Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
              {requirement.order}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 break-words">
                {title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {requirement.mandatory ? (
                  <span className="inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 px-2">
                    {translate('mandatory', language)}
                  </span>
                ) : (
                  <span className="inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 px-2">
                    {translate('optional', language)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Matched File Info */}
          <div className="mt-3 ml-10">
            {matchedFile ? (
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4 text-green-600 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  <span className="font-medium">{translate('matched', language)}:</span>{' '}
                  <span className="text-gray-900">{matchedFile.name}</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>{translate('noDocumentMatched', language)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 sm:flex-shrink-0 ml-10 sm:ml-0">
          {matchedFile ? (
            <>
              <button
                onClick={onMatch}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {translate('change', language)}
              </button>
              <button
                onClick={onUnmatch}
                className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                {translate('unmatch', language)}
              </button>
            </>
          ) : (
            <button
              onClick={onMatch}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {translate('matchDocument', language)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
