export const en = {
  // App Title
  appTitle: 'TenderPack',
  appSubtitle: 'Tender Document Package Builder',

  // Language
  language: 'English',
  switchLanguage: 'বাংলা',

  // Requirements Section
  loadRequirements: 'Load requirements.json',
  selectRequirementsFile: 'Select a requirements.json file from your computer',
  tenderInformation: 'Tender Information',
  tenderId: 'Tender ID',
  tenderTitle: 'Tender Title',
  procuringEntity: 'Procuring Entity',
  bidder: 'Bidder',
  submissionDeadline: 'Submission Deadline',
  requirements: 'Requirements',
  order: 'Order',
  documentName: 'Document Name',
  type: 'Type',
  expiry: 'Expiry',
  mandatory: 'Mandatory',
  optional: 'Optional',
  expiryRequired: 'Expiry required',
  notRequired: 'Not required',
  totalRequirements: 'Total',
  requirement: 'requirement',
  requirementsPlural: 'requirements',

  // PDF Upload Section
  uploadDocuments: 'Upload Documents',
  uploadPDFs: 'Upload PDF Files',
  dragDropText: 'Drag and drop PDF files here, or click to select',
  selectFiles: 'Select Files',
  uploadedDocuments: 'Uploaded Documents',
  fileName: 'File Name',
  pages: 'Pages',
  size: 'Size',
  status: 'Status',
  action: 'Action',
  remove: 'Remove',
  processing: 'Processing...',
  pdfProcessing: 'PDF processing...',
  duplicateFile: 'Duplicate file',
  totalFiles: 'Total files',
  totalSize: 'Total size',
  noFilesUploaded: 'No files uploaded yet',

  // Error Messages
  error: 'Error',
  invalidJson: 'Invalid requirements.json. The file contains invalid JSON format.',
  invalidJsonObject: 'Invalid requirements.json. The file must contain a JSON object.',
  missingTender: 'Invalid requirements.json. Missing "tender" field.',
  invalidTender: 'Invalid requirements.json. The "tender" field is missing required properties (tender_id, title, procuring_entity, bidder, submission_deadline).',
  missingRequirements: 'Invalid requirements.json. Missing "requirements" field.',
  requirementsNotArray: 'Invalid requirements.json. The "requirements" field must be an array.',
  emptyRequirements: 'Invalid requirements.json. The "requirements" array is empty.',
  invalidRequirement: 'Invalid requirements.json. Requirement at index {index} is missing required properties (id, order, title_en, title_bn, mandatory, has_expiry).',
  
  // PDF Error Messages
  notPdfFile: 'This file is not a PDF and was not added: {filename}',
  maxFilesExceeded: 'You can upload a maximum of 30 PDF files.',
  maxSizeExceeded: 'The total file size cannot exceed 50 MB.',
  pdfCannotOpen: 'This PDF could not be opened. The file may be damaged or invalid: {filename}',
  pdfPasswordProtected: 'This PDF is password-protected and cannot be processed: {filename}',
  pdfProcessingError: 'An error occurred while processing: {filename}',

  // Instructions
  loadRequirementsToStart: 'Load a requirements.json file to get started',
} as const;

export type TranslationKeys = keyof typeof en;
