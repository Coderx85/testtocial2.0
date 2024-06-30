import { connectDB } from "@/lib/connectdb";
import Post from "@/models/Post.modal";
import { revalidatePath } from "next/cache";

class DBService {
  static async connect() {
    await connectDB();
  }

  static async createPost(formData: FormData) {
    await this.connect();
    const content = formData.get('content') as string;
    const result = await Post.create({ content });
    revalidatePath('/');
    return result;
  }

  static async getPosts() {
    await this.connect();
    const result = await Post.find();
    return result;
  }

  static async getPostById(id: string) {
    await this.connect();
    const result = await Post.findById(id);
    return result;
  }
}

export default DBService;
// Example usage:
// const newPost = await DBService.createPost(formData);
// const posts = await DBService.getPosts();
// const postById = await DBService.getPostById('some-id');