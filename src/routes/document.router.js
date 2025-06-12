import { Router } from "express";
import {
  createDocument,
  getUserDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/document.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);

router.route("/").post(createDocument);
router.route("/").get(getUserDocuments);
router.route("/:id").get(getDocument);
router.route("/:id").put(updateDocument);
router.route("/:id").delete(deleteDocument);

export default router;
