const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const authAdmin = require("../../middleware/authAdmin");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/blog/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const Post = require("../../models/Post");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const Category = require("../../models/Category");

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post("/", authAdmin, upload.array("blogImages", 3), async (req, res) => {
  try {
    const user = await Admin.findById(req.admin.id).select("-password");
    const newPost = new Post({
      smallImage: req.files[0].filename,
      mediumImage: req.files[1].filename,
      largeImage: req.files[2].filename,
      title: req.body.title,
      category: req.body.category,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.admin.id,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/categories/:n
// @desc     Get n categories
// @access   Public
router.get("/categories/:n", async (req, res) => {
  try {
    const posts = await Category.find()
      .sort({ date: -1 })
      .limit(parseInt(req.params.n));
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/latest/n
// @desc     Get n latest posts
// @access   Public
router.get("/latest/:n", async (req, res) => {
  try {
    const latest = await Post.find()
      .sort({ date: -1 })
      .limit(parseInt(req.params.n));
    res.json(latest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", authAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.admin.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    const { smallImage, mediumImage, largeImage } = post;
    const blogImages = [smallImage, mediumImage, largeImage];
    blogImages.map((image) => {
      fs.unlink(`client/public/blog/${image}`, (err) => {
        if (err) throw err;
        console.log(`client/public/blog/${image} was deleted`);
      });
    });

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post("/comment/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exists" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a Post
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a Post
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the Post has already been disliked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Photo already disliked" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/search
// @desc     Search posts
// @access   Public
router.post("/search", async (req, res) => {
  try {
    const results = await Post.aggregate([
      {
        $searchBeta: {
          search: {
            query: req.body.content,
            path: "title",
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          plot: 1,
          text: 1,
          smallImage: 1,
          mediumImage: 1,
          largeImage: 1,
          likes: 1,
          comments: 1,
          date: 1,
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/category
// @desc     Create a category
// @access   Private
router.post("/category", authAdmin, async (req, res) => {
  try {
    const newCategory = new Category({
      category: req.body.category,
    });

    const post = await newCategory.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/category/:cat
// @desc     Find By Category
// @access   Public
router.get("/category/:cat", async (req, res) => {
  try {
    const results = await Post.aggregate([
      {
        $searchBeta: {
          search: {
            query: req.params.cat,
            path: "category",
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          text: 1,
          smallImage: 1,
          mediumImage: 1,
          largeImage: 1,
          category: 1,
          likes: 1,
          comments: 1,
          date: 1,
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
