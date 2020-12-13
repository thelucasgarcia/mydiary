const express = require('express');
const _ = require('lodash');
const router = express.Router();
const Post = require('../models/Post');
const { authenticateToken } = require('../utils/jwt');

router.get('/', async (req, res) => {
    const posts = _.filter(Post.all(), { user: req.user });
    return res.send(posts);
});

router.get('/:id', async (req, res) => {
    const post = Post.find(req.params.id);
    return res.send(post);
});

router.post('/', async (req, res) => {
    const payload = req.body;
    payload.user = req.user;
    const post = Post.create(payload);
    return res.send(post);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updated = Post.update(id, req.body);
    return res.send(updated);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const post = Post.delete(id);
    return res.send(post);
});

module.exports = app => app.use('/posts', authenticateToken, router);