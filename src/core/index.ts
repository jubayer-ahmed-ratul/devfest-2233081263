export { parseRequirementsFile, RequirementsParseError } from './requirementsParser';
export { computeFileHash, findDuplicates } from './duplicateDetector';
export {
  processPDFFile,
  isPDFFile,
  checkLimits,
  formatFileSize,
  type PDFProcessingResult,
} from './pdfFileProcessor';
export {
  getMatchedFile,
  getMatchedRequirement,
  getFilesByHash,
  isHashMatchedToOtherRequirement,
  isFileAvailableForRequirement,
  getAvailableFiles,
  matchFile,
  unmatchRequirement,
  removeFileMatches,
  getMatchingStats,
} from './matchingLogic';
