import express from "express";

const router = express.Router();

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
  { id: 4, title: "Post Four" },
  { id: 5, title: "Post Five" },
];

// To get all posts
router.get("/", (req, res, next) => {
  // console.log(req.query);
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// To get a single post
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
});

// Create a new post
router.post("/", (req, res, next) => {
  // console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error(`Please include a title`);
    error.status = 404;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json(posts);
});

// update a post
router.put("/:id", (req, res, next) => {
  // console.log(req.body);
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  const newPost = {
    id,
    title: req.body.title,
  };

  if (!post) {
    // return res.status(404).json({ msg: `A post with id ${id} was not found` });
    const error = new Error(`A post with id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  res.status(200).json(posts);
});

// Delete a post
router.delete("/:id", (req, res, next) => {
  // console.log(req.body);
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  const newPosts = posts.filter((post) => post.id !== id);
  if (!post) {
    const error = new Error(`A post with id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  posts = newPosts;
  res.status(200).json(posts);
});

export default router;
