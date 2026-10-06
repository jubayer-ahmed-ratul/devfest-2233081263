import type { Tender } from '../types';
import type { Language } from '../i18n';
import { translate } from '../i18n';

interface TenderInfoProps {
  tender: Tender;
  language: Language;
}

export function TenderInfo({ tender, language }: TenderInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {translate('tenderInformation', language)}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {translate('tenderId', language)}
          </label>
          <p className="text-gray-900">{tender.tender_id}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {translate('submissionDeadline', language)}
          </label>
          <p className="text-gray-900">{tender.submission_deadline}</p>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {translate('tenderTitle', language)}
          </label>
          <p className="text-gray-900">{tender.title}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {translate('procuringEntity', language)}
          </label>
          <p className="text-gray-900">{tender.procuring_entity}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {translate('bidder', language)}
          </label>
          <p className="text-gray-900">{tender.bidder}</p>
        </div>
      </div>
    </div>
  );
}
