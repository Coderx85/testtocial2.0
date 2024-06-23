import config from "../config";
import { Client, Account, ID } from "appwrite";

const appwriteUrl = "https://cloud.appwrite.io/v1" || config.appwriteUrl;
// const appwriteProjectId = "6674cb3c001a1c3a6da8" || config.appwriteProjectId;
const appwriteDatabaseId = "6673bc7900124a00eeef" || config.appwriteDatabaseId;
const appwriteCollectionId = "6673bc8a000c98392d81" || config.appwriteCollectionId;

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
}

type LoginUserAccount = {
  email: string;
  password: string
}

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();

      return Boolean(data);
    } catch (error) {
      console.log("Appwrite serive :: isLoggedIn :: error", error);
    }
    return false;
  }

  async createAccount({ email, password, name }: CreateUserAccount) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name);
      if (user) {
        return this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      console.log("Appwrite serive :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      const user = await this.account.createEmailPasswordSession(email, password);
      console.log("Appwrite serive :: login :: user", user);
      return user;  
    } catch (error) {
      console.log("Appwrite serive :: createAccount :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const data = await this.account.get();
      console.log("Appwrite serive :: getCurrentUser :: data", data);
      return data;
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error \n", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
  
}

const authService = new AuthService();

export default authService