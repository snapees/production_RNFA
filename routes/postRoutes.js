const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

// router. object
const router = express.Router();

// create POST || POST
router.post("/create-post", requireSignIn, createPostController);

// get all posts
router.get("/get-all-post", getAllPostsController);

// get user posts
router.get("/get-user-post", requireSignIn, getUserPostsController);

//DELEET POST
router.delete("/delete-post/:id", requireSignIn, deletePostController);

//UPDATE POST
router.put("/update-post/:id", requireSignIn, updatePostController);

// exports
module.exports = router;
