export const bn = {
  // App Title
  appTitle: 'টেন্ডারপ্যাক',
  appSubtitle: 'টেন্ডার ডকুমেন্ট প্যাকেজ বিল্ডার',

  // Language
  language: 'বাংলা',
  switchLanguage: 'English',

  // Requirements Section
  loadRequirements: 'requirements.json লোড করুন',
  selectRequirementsFile: 'আপনার কম্পিউটার থেকে একটি requirements.json ফাইল নির্বাচন করুন',
  tenderInformation: 'টেন্ডার তথ্য',
  tenderId: 'টেন্ডার আইডি',
  tenderTitle: 'টেন্ডার শিরোনাম',
  procuringEntity: 'ক্রয়কারী সংস্থা',
  bidder: 'দরদাতা',
  submissionDeadline: 'জমা দেওয়ার সময়সীমা',
  requirements: 'প্রয়োজনীয়তা',
  order: 'ক্রম',
  documentName: 'ডকুমেন্টের নাম',
  type: 'ধরন',
  expiry: 'মেয়াদ',
  mandatory: 'বাধ্যতামূলক',
  optional: 'ঐচ্ছিক',
  expiryRequired: 'মেয়াদ প্রয়োজন',
  notRequired: 'প্রয়োজন নেই',
  totalRequirements: 'মোট',
  requirement: 'প্রয়োজনীয়তা',
  requirementsPlural: 'প্রয়োজনীয়তা',

  // PDF Upload Section
  uploadDocuments: 'ডকুমেন্ট আপলোড করুন',
  uploadPDFs: 'PDF ফাইল আপলোড করুন',
  dragDropText: 'এখানে PDF ফাইল টেনে আনুন, অথবা নির্বাচন করতে ক্লিক করুন',
  selectFiles: 'ফাইল নির্বাচন করুন',
  uploadedDocuments: 'আপলোড করা ডকুমেন্ট',
  fileName: 'ফাইলের নাম',
  pages: 'পৃষ্ঠা',
  size: 'আকার',
  status: 'অবস্থা',
  action: 'কার্যক্রম',
  remove: 'মুছুন',
  processing: 'প্রসেস হচ্ছে...',
  pdfProcessing: 'PDF প্রসেস হচ্ছে...',
  duplicateFile: 'ডুপ্লিকেট ফাইল',
  totalFiles: 'মোট ফাইল',
  totalSize: 'মোট আকার',
  noFilesUploaded: 'এখনও কোনো ফাইল আপলোড করা হয়নি',

  // Error Messages
  error: 'ত্রুটি',
  invalidJson: 'অবৈধ requirements.json। ফাইলটিতে অবৈধ JSON ফরম্যাট রয়েছে।',
  invalidJsonObject: 'অবৈধ requirements.json। ফাইলটিতে একটি JSON অবজেক্ট থাকতে হবে।',
  missingTender: 'অবৈধ requirements.json। "tender" ফিল্ড অনুপস্থিত।',
  invalidTender: 'অবৈধ requirements.json। "tender" ফিল্ডে প্রয়োজনীয় বৈশিষ্ট্যগুলি (tender_id, title, procuring_entity, bidder, submission_deadline) অনুপস্থিত।',
  missingRequirements: 'অবৈধ requirements.json। "requirements" ফিল্ড অনুপস্থিত।',
  requirementsNotArray: 'অবৈধ requirements.json। "requirements" ফিল্ড একটি অ্যারে হতে হবে।',
  emptyRequirements: 'অবৈধ requirements.json। "requirements" অ্যারেটি খালি।',
  invalidRequirement: 'অবৈধ requirements.json। {index} ইনডেক্সে থাকা প্রয়োজনীয়তায় প্রয়োজনীয় বৈশিষ্ট্যগুলি (id, order, title_en, title_bn, mandatory, has_expiry) অনুপস্থিত।',
  
  // PDF Error Messages
  notPdfFile: 'এই ফাইলটি PDF নয় এবং যোগ করা হয়নি: {filename}',
  maxFilesExceeded: 'সর্বোচ্চ ৩০টি PDF ফাইল আপলোড করা যাবে।',
  maxSizeExceeded: 'মোট ফাইলের আকার ৫০ MB-এর বেশি হতে পারবে না।',
  pdfCannotOpen: 'এই PDF খোলা যায়নি। ফাইলটি ক্ষতিগ্রস্ত বা অবৈধ হতে পারে: {filename}',
  pdfPasswordProtected: 'এই PDF পাসওয়ার্ড-সুরক্ষিত এবং প্রক্রিয়া করা যাচ্ছে না: {filename}',
  pdfProcessingError: 'প্রসেস করার সময় একটি ত্রুটি ঘটেছে: {filename}',

  // Instructions
  loadRequirementsToStart: 'শুরু করতে একটি requirements.json ফাইল লোড করুন',
} as const;
