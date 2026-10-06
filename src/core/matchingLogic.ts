import type { Match, UploadedFile } from '../types';

/**
 * Get the file matched to a requirement
 */
export function getMatchedFile(
  requirementId: string,
  matches: Match[]
): string | null {
  const match = matches.find(m => m.requirementId === requirementId);
  return match?.fileId ?? null;
}

/**
 * Get the requirement matched to a file
 */
export function getMatchedRequirement(
  fileId: string,
  matches: Match[]
): string | null {
  const match = matches.find(m => m.fileId === fileId);
  return match?.requirementId ?? null;
}

/**
 * Get all files with the same hash (duplicates)
 */
export function getFilesByHash(
  hash: string,
  files: UploadedFile[]
): UploadedFile[] {
  return files.filter(f => f.hash === hash);
}

/**
 * Check if any file with the same hash is matched to a different requirement
 */
export function isHashMatchedToOtherRequirement(
  hash: string,
  requirementId: string,
  files: UploadedFile[],
  matches: Match[]
): boolean {
  const duplicateFiles = getFilesByHash(hash, files);
  
  for (const file of duplicateFiles) {
    const matchedReqId = getMatchedRequirement(file.id, matches);
    if (matchedReqId && matchedReqId !== requirementId) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if a file is available for matching to a requirement
 * Returns true if:
 * - The file is unmatched
 * - OR the file is already matched to this same requirement (allows changing to same)
 * 
 * Returns false if:
 * - The file is matched to another requirement
 * - OR another file with the same hash is matched to another requirement
 */
export function isFileAvailableForRequirement(
  fileId: string,
  requirementId: string,
  files: UploadedFile[],
  matches: Match[]
): boolean {
  const file = files.find(f => f.id === fileId);
  if (!file) return false;
  
  // Check if this exact file is matched to another requirement
  const matchedReqId = getMatchedRequirement(fileId, matches);
  if (matchedReqId && matchedReqId !== requirementId) {
    return false;
  }
  
  // Check if any duplicate (same hash) is matched to another requirement
  if (isHashMatchedToOtherRequirement(file.hash, requirementId, files, matches)) {
    return false;
  }
  
  return true;
}

/**
 * Get all files available for matching to a specific requirement
 */
export function getAvailableFiles(
  requirementId: string,
  files: UploadedFile[],
  matches: Match[]
): UploadedFile[] {
  return files.filter(file => 
    isFileAvailableForRequirement(file.id, requirementId, files, matches)
  );
}

/**
 * Match a file to a requirement
 * If the requirement already has a match, it will be replaced
 */
export function matchFile(
  requirementId: string,
  fileId: string,
  matches: Match[]
): Match[] {
  // Remove any existing match for this requirement
  const filtered = matches.filter(m => m.requirementId !== requirementId);
  
  // Add new match
  return [...filtered, { requirementId, fileId }];
}

/**
 * Unmatch a requirement
 */
export function unmatchRequirement(
  requirementId: string,
  matches: Match[]
): Match[] {
  return matches.filter(m => m.requirementId !== requirementId);
}

/**
 * Remove all matches associated with a file
 * Used when a file is deleted
 */
export function removeFileMatches(
  fileId: string,
  matches: Match[]
): Match[] {
  return matches.filter(m => m.fileId !== fileId);
}

/**
 * Get matching statistics
 */
export function getMatchingStats(
  requirementCount: number,
  fileCount: number,
  matches: Match[]
) {
  const matchedRequirements = new Set(matches.map(m => m.requirementId)).size;
  const matchedFiles = new Set(matches.map(m => m.fileId)).size;
  
  return {
    totalRequirements: requirementCount,
    matchedRequirements,
    unmatchedRequirements: requirementCount - matchedRequirements,
    totalDocuments: fileCount,
    matchedDocuments: matchedFiles,
    unmatchedDocuments: fileCount - matchedFiles,
  };
}
