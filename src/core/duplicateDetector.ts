/**
 * Compute SHA-256 hash of a file's content
 */
export async function computeFileHash(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Find duplicate files based on content hash
 */
export function findDuplicates(hashes: string[]): Set<string> {
  const hashCounts = new Map<string, number>();
  
  // Count occurrences of each hash
  hashes.forEach(hash => {
    hashCounts.set(hash, (hashCounts.get(hash) || 0) + 1);
  });
  
  // Return set of hashes that appear more than once
  const duplicateHashes = new Set<string>();
  hashCounts.forEach((count, hash) => {
    if (count > 1) {
      duplicateHashes.add(hash);
    }
  });
  
  return duplicateHashes;
}
