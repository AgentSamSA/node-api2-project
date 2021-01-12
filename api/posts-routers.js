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

