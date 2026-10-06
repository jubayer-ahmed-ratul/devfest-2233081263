import type { Requirement } from '../types';
import type { Language } from '../i18n';
import { translate } from '../i18n';

interface RequirementsListProps {
  requirements: Requirement[];
  language: Language;
}

export function RequirementsList({ requirements, language }: RequirementsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {translate('requirements', language)}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translate('order', language)}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translate('documentName', language)}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translate('type', language)}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {translate('expiry', language)}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requirements.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {req.order}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {language === 'en' ? req.title_en : req.title_bn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {req.mandatory ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {translate('mandatory', language)}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {translate('optional', language)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {req.has_expiry 
                    ? translate('expiryRequired', language) 
                    : translate('notRequired', language)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        {translate('totalRequirements', language)}: {requirements.length} {' '}
        {requirements.length === 1 
          ? translate('requirement', language) 
          : translate('requirementsPlural', language)
        }
      </div>
    </div>
  );
}
