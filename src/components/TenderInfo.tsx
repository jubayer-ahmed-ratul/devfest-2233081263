import type { Tender } from '../types';

interface TenderInfoProps {
  tender: Tender;
}

export function TenderInfo({ tender }: TenderInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tender Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tender ID
          </label>
          <p className="text-gray-900">{tender.tender_id}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Submission Deadline
          </label>
          <p className="text-gray-900">{tender.submission_deadline}</p>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tender Title
          </label>
          <p className="text-gray-900">{tender.title}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Procuring Entity
          </label>
          <p className="text-gray-900">{tender.procuring_entity}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Bidder
          </label>
          <p className="text-gray-900">{tender.bidder}</p>
        </div>
      </div>
    </div>
  );
}
