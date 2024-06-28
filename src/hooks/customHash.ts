import { createHmac } from 'crypto';

function createCustomHash(appwriteId: string) {
  const hashFactor = process.env.HASH_FACTOR || 'Testocial085';
  
  const hash = createHmac('sha256', hashFactor)
                     .update(appwriteId)
                     .digest('hex');
                     
  // Ensure the hash is 24 characters long for MongoDB ObjectId compatibility
  
  const hashedId = hash.slice(0, 24);
  
  console.log(`Original ID: ${appwriteId}`);
  console.log(`Hashed ID: ${hashedId}`);
  
  return hash.slice(0, 24);
}


export default createCustomHash;
