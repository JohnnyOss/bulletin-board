const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

function escape(html) {
  return html.replace(/&/g, '')
    .replace(/</g, '')
    .replace(/>/g, '')
    .replace(/"/g, '')
    .replace(/'/g, '');
}

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

    if(title.length < 10) {
      throw new Error('Too short title (min. 10 characters)');
    }
    if(content.length < 20) {
      throw new Error('Too short content (min. 20 characters)');
    }
    if(location.length < 0) {
      throw new Error('You need to enter the location');
    }

    if((title.length > 9) && (content.length > 19) && author && status && location) {
      const newPost = new Post({ author, title: escape(title), content, status, photo, price, phone, location: escape(location), datePublication, dateLastUpdate });
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

router.put('/posts/:id/edit', async (req, res) => {
  try {
    const { title, content, author, dateLastUpdate, datePublication, status, photo, price, phone, location } = req.body;
    const editedPost = await(Post.findById(req.body._id));

    if(editedPost) {
      const changedPost = await (Post.updateOne({ _id: req.body._id }, {$set: { title: escape(title), content: content, author: author, dateLastUpdate: dateLastUpdate, datePublication: datePublication, status: status, photo: photo, price: price, phone: phone, location: escape(location) }}));
      res.json(changedPost);
    }
    else {
      throw new Error('Something wrong!');
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
