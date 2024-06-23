import config from "@/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

const appwriteUrl = "https://cloud.appwrite.io/v1" || config.appwriteUrl;
const appwriteProjectId = "6674cb3c001a1c3a6da8" || config.appwriteProjectId;
const appwriteDatabaseId = "6673bc7900124a00eeef" || config.appwriteDatabaseId;
const appwriteCollectionId = "6673bc8a000c98392d81" || config.appwriteCollectionId;
const appwriteBucketId = '667708390018e13454fb' 

type uploadFile = {
  file: File;
}

export class DocumentService{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async uploadFile({file}: uploadFile){
      try {
        return await this.bucket.createFile(
          appwriteBucketId,
          ID.unique(),
          file
        )
      } catch (err: any) {
        console.error("DocumentService :: uploadFile :: error", err);
      }
    }

  }
