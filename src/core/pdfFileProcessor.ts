import { readPDFPageCount, PDFReadError } from '../pdf';
import { computeFileHash } from './duplicateDetector';
import type { UploadedFile } from '../types';

export interface PDFProcessingResult {
  success: boolean;
  file?: UploadedFile;
  error?: string;
  isPasswordProtected?: boolean;
}

const MAX_FILES = 30;
const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50 MB in bytes

/**
 * Validate if a file is a PDF
 */
export function isPDFFile(file: File): boolean {
  // Check MIME type
  if (file.type === 'application/pdf') {
    return true;
  }
  
  // Check file extension as fallback
  if (file.name.toLowerCase().endsWith('.pdf')) {
    return true;
  }
  
  return false;
}

/**
 * Check if adding files would exceed limits
 */
export function checkLimits(
  currentFiles: UploadedFile[],
  newFiles: File[]
): { valid: boolean; error?: 'MAX_FILES' | 'MAX_SIZE' } {
  // Check file count
  if (currentFiles.length + newFiles.length > MAX_FILES) {
    return { valid: false, error: 'MAX_FILES' };
  }
  
  // Check total size
  const currentSize = currentFiles.reduce((sum, f) => sum + f.size, 0);
  const newSize = newFiles.reduce((sum, f) => sum + f.size, 0);
  
  if (currentSize + newSize > MAX_TOTAL_SIZE) {
    return { valid: false, error: 'MAX_SIZE' };
  }
  
  return { valid: true };
}

/**
 * Process a single PDF file
 */
export async function processPDFFile(file: File, id: string): Promise<PDFProcessingResult> {
  try {
    // Validate file type
    if (!isPDFFile(file)) {
      return {
        success: false,
        error: 'NOT_PDF',
      };
    }
    
    // Read page count
    const pages = await readPDFPageCount(file);
    
    // Compute hash
    const hash = await computeFileHash(file);
    
    const uploadedFile: UploadedFile = {
      id,
      file,
      name: file.name,
      size: file.size,
      pages,
      hash,
      isDuplicate: false, // Will be set later after all files are processed
    };
    
    return {
      success: true,
      file: uploadedFile,
    };
  } catch (error) {
    if (error instanceof PDFReadError) {
      if (error.isPasswordProtected) {
        return {
          success: false,
          error: 'PASSWORD_PROTECTED',
          isPasswordProtected: true,
        };
      }
      return {
        success: false,
        error: 'CANNOT_OPEN',
      };
    }
    
    return {
      success: false,
      error: 'PROCESSING_ERROR',
    };
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}
