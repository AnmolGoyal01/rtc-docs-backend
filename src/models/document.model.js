import { Schema, model } from "mongoose";

const versionSchema = new Schema({
  versionNumber: {
    type: Number,
    default: 1,
  },
  content: {
    type: String,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});
const documentSchema = new Schema(
  {
    title: {
      type: String,
      index: true,
    },
    content: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    collaborators: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    versions: {
      type: [versionSchema],
    },
  },
  { timestamps: true }
);

export const Document = model("Document", documentSchema);
