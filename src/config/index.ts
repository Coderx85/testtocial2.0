const config = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_ENV_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_ENV_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NODE_ENV),
  appwriteCollectionId: String(process.env.NEXT_PUBLIC_ENV_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(process.env.NEXT_PUBLIC_ENV_APPWRITE_BUCKET_ID),
}
export default config