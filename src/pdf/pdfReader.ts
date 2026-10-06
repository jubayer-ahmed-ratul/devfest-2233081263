import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export class PDFReadError extends Error {
  public readonly isPasswordProtected: boolean;
  
  constructor(message: string, isPasswordProtected = false) {
    super(message);
    this.name = 'PDFReadError';
    this.isPasswordProtected = isPasswordProtected;
  }
}

export async function readPDFPageCount(file: File): Promise<number> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    
    try {
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      
      // Clean up - destroy method may not exist in all versions
      if ('destroy' in pdf && typeof pdf.destroy === 'function') {
        await pdf.destroy();
      }
      
      return pageCount;
    } catch (error) {
      // Check if it's a password error
      if (error instanceof Error) {
        if (error.message.includes('password') || error.message.includes('encrypted')) {
          throw new PDFReadError('Password protected PDF', true);
        }
      }
      throw new PDFReadError('Cannot read PDF');
    }
  } catch (error) {
    if (error instanceof PDFReadError) {
      throw error;
    }
    throw new PDFReadError('Cannot read PDF');
  }
}
