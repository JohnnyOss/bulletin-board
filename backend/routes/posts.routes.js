const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author title content location datePublication _id price dateLastUpdate status')
      .sort({datePublication: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try {
    const { author, title, content, status, photo, price, phone, location, datePublication, dateLastUpdate } = req.body;
    if((title.length > 9) && (content.length > 19) && author && status) {
      const newPost = new Post({ author, title, content, status, photo, price, phone, location, datePublication, dateLastUpdate });
      await newPost.save();
      res.json(newPost);
    } else {
      throw new Error('Wrong data from iputs');
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
