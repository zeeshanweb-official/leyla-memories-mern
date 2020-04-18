const express = require('express');
// const { ObjectID } = require('mongodb');
const Post = require('../models/postModel');

const router = new express.Router();

router.get('/memories', async (req, res) => {
  const posts = await Post.find().sort({ timestamp: -1 });
  res.status(200).json(posts);
});

router.post('/memories', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    createdAt: new Date().getTime()
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post('/update', async (req, res) => {
  Post.findById(req.body._id, (err, obj) => {
    // res.send(obj);
    obj.title = req.body.title;
    obj.body = req.body.body;
    obj.save((error, newObj) => {
      if (error) {
        res.send(error);
      } else {
        res.send(newObj);
      }
    });
  });
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = router;
