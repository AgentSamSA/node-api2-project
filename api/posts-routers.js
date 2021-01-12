const Post = require("./db-helpers");
const express = require("express");

const router = express.Router();

router.get("/api/posts", (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

router.get("/api/posts/:id", (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(404).json({ message: "The post with that specified ID does not exist." });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

router.post("/api/posts", (req, res) => {
    Post.insert(req.body)
        .then(post => {
            if (!post.title || !post.contents) {
                res.status(400).json({ errorMessage: "Please provide a title and contents for the post." });
            } else {
                res.status(201).json(post);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the post to the database." });
        });
});

router.get("api/posts/:id/comments", (req, res) => {
    Post.findPostComments(req.params.id)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ message: "The post with that specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The comments information could not be retrieved" });
        });
});

router.post("api/posts/:id/comments", (req, res) => {
    Post.insertComment(req.body)
        .then(comment => {
            if (!comment) {
                res.status(404).json({ message: "The post with that specified ID does not exist." });
            }
            if (!comment.text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the comment to the database." });
        });
});

