import type { RequirementsFile, Tender, Requirement } from '../types';

export class RequirementsParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RequirementsParseError';
  }
}

function isValidTender(obj: unknown): obj is Tender {
  if (!obj || typeof obj !== 'object') return false;
  
  const tender = obj as Record<string, unknown>;
  
  return (
    typeof tender.tender_id === 'string' &&
    typeof tender.title === 'string' &&
    typeof tender.procuring_entity === 'string' &&
    typeof tender.bidder === 'string' &&
    typeof tender.submission_deadline === 'string' &&
    tender.tender_id.trim() !== '' &&
    tender.title.trim() !== '' &&
    tender.procuring_entity.trim() !== '' &&
    tender.bidder.trim() !== '' &&
    tender.submission_deadline.trim() !== ''
  );
}

function isValidRequirement(obj: unknown): obj is Requirement {
  if (!obj || typeof obj !== 'object') return false;
  
  const req = obj as Record<string, unknown>;
  
  return (
    typeof req.id === 'string' &&
    typeof req.order === 'number' &&
    typeof req.title_en === 'string' &&
    typeof req.title_bn === 'string' &&
    typeof req.mandatory === 'boolean' &&
    typeof req.has_expiry === 'boolean' &&
    req.id.trim() !== '' &&
    req.title_en.trim() !== '' &&
    req.title_bn.trim() !== ''
  );
}

export function parseRequirementsFile(jsonText: string): RequirementsFile {
  // Parse JSON
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new RequirementsParseError(
      'Invalid requirements.json. The file contains invalid JSON format.'
    );
  }

  // Check if it's an object
  if (!parsed || typeof parsed !== 'object') {
    throw new RequirementsParseError(
      'Invalid requirements.json. The file must contain a JSON object.'
    );
  }

  const data = parsed as Record<string, unknown>;

  // Check for tender field
  if (!data.tender) {
    throw new RequirementsParseError(
      'Invalid requirements.json. Missing "tender" field.'
    );
  }

  // Validate tender
  if (!isValidTender(data.tender)) {
    throw new RequirementsParseError(
      'Invalid requirements.json. The "tender" field is missing required properties (tender_id, title, procuring_entity, bidder, submission_deadline).'
    );
  }

  // Check for requirements field
  if (!data.requirements) {
    throw new RequirementsParseError(
      'Invalid requirements.json. Missing "requirements" field.'
    );
  }

  // Check if requirements is an array
  if (!Array.isArray(data.requirements)) {
    throw new RequirementsParseError(
      'Invalid requirements.json. The "requirements" field must be an array.'
    );
  }

  // Check if requirements array is empty
  if (data.requirements.length === 0) {
    throw new RequirementsParseError(
      'Invalid requirements.json. The "requirements" array is empty.'
    );
  }

  // Validate each requirement
  const requirements: Requirement[] = [];
  for (let i = 0; i < data.requirements.length; i++) {
    const req = data.requirements[i];
    if (!isValidRequirement(req)) {
      throw new RequirementsParseError(
        `Invalid requirements.json. Requirement at index ${i} is missing required properties (id, order, title_en, title_bn, mandatory, has_expiry).`
      );
    }
    requirements.push(req);
  }

  // Sort requirements by order
  requirements.sort((a, b) => a.order - b.order);

  return {
    tender: data.tender,
    requirements,
  };
}
