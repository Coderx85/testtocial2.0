import { IPost } from "@/types/modal";
import { model, models, Schema } from "mongoose";

const PostSchema: Schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
}, {
  timestamps: true,
})

const Post = models.Post || model<IPost>("Post", PostSchema);

export default Post;