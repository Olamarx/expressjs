import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

// To get all posts
router.get("/", getPosts);

// To get a single post
router.get("/:id", getPost);

// Create a new post
router.post("/", createPost);

// update a post
router.put("/:id", updatePost);

// Delete a post
router.delete("/:id", deletePost);

export default router;
