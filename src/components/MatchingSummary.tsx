import type { Language } from '../i18n';
import { translate } from '../i18n';

interface MatchingSummaryProps {
  stats: {
    totalRequirements: number;
    matchedRequirements: number;
    unmatchedRequirements: number;
    totalDocuments: number;
    matchedDocuments: number;
    unmatchedDocuments: number;
  };
  language: Language;
}

export function MatchingSummary({ stats, language }: MatchingSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {translate('matchingSummary', language)}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requirements Stats */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">
            {translate('requirements', language)}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">
                {translate('totalRequirements', language)}:
              </span>
              <span className="font-semibold text-gray-900">
                {stats.totalRequirements}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">
                {translate('matchedRequirements', language)}:
              </span>
              <span className="font-semibold text-green-600">
                {stats.matchedRequirements}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">
                {translate('unmatchedRequirements', language)}:
              </span>
              <span className="font-semibold text-yellow-600">
                {stats.unmatchedRequirements}
              </span>
            </div>
          </div>
        </div>

        {/* Documents Stats */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-3">
            {translate('uploadedDocuments', language)}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">
                {translate('totalDocuments', language)}:
              </span>
              <span className="font-semibold text-gray-900">
                {stats.totalDocuments}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">
                {translate('matchedDocuments', language)}:
              </span>
              <span className="font-semibold text-green-600">
                {stats.matchedDocuments}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">
                {translate('unmatchedDocuments', language)}:
              </span>
              <span className="font-semibold text-yellow-600">
                {stats.unmatchedDocuments}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
