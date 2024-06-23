import { createHmac } from 'crypto';

function createCustomHash(appwriteId: string) {
  const hashFactor = process.env.HASH_FACTOR || 'Testocial085';
  
  const hash = createHmac('sha256', hashFactor)
                     .update(appwriteId)
                     .digest('hex');
                     
  // Ensure the hash is 24 characters long for MongoDB ObjectId compatibility
  return hash.slice(0, 24);
}

const newappwriteId = '6673bc8a000c98392d81';
// Example usage
const hashedId = createCustomHash(newappwriteId);

console.log(`Original ID: ${newappwriteId}`);
console.log(`Hashed ID: ${hashedId}`);

export default createCustomHash;
