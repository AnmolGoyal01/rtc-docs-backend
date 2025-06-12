import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Document } from "../models/document.model.js";

const createDocument = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const user = req.user;
  if (!title) throw new ApiError(400, "Title is required");

  const document = await Document.create({
    title,
    content,
    user: user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, document, "Document created successfully"));
});

const getUserDocuments = asyncHandler(async (req, res) => {
  const user = req.user;
  const documents = await Document.find({ owner: user._id });
  if (!documents) throw new ApiError(404, "No documents found");
  return res
    .status(200)
    .json(new ApiResponse(200, documents, "Documents fetched successfully"));
});

const getDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const document = await Document.findById(id);
  if (!document) throw new ApiError(404, "Document not found");
  return res
    .status(200)
    .json(new ApiResponse(200, document, "Document fetched successfully"));
});

const updateDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const document = await Document.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  if (!document) throw new ApiError(404, "Document not found");
  return res
    .status(200)
    .json(new ApiResponse(200, document, "Document updated successfully"));
});

const deleteDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const document = await Document.findByIdAndDelete(id);
  if (!document) throw new ApiError(404, "Document not found");
  return res
    .status(200)
    .json(new ApiResponse(200, document, "Document deleted successfully"));
});

export {
  createDocument,
  getUserDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};
