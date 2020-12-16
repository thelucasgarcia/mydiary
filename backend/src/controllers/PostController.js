const express = require('express');
const _ = require('lodash');
const router = express.Router();
const Post = require('../models/Post');
const { authenticateToken } = require('../utils/jwt');

router.get('/all', (req, res) => {
    const posts = Post.all();
    return res.send(posts);
});

router.get('/', authenticateToken, (req, res) => {
    const posts = _.filter(Post.all(), { user: req.user });
    return res.send(posts);
});

router.get('/:id', (req, res) => {
    const post = Post.find(req.params.id);
    return res.send(post);
});

router.post('/', authenticateToken, (req, res) => {
    const payload = req.body;
    payload.user = req.user;
    const currentDate = new Date();
    payload.created_at = currentDate.toISOString().slice(0, 10);
    const post = Post.create(payload);
    return res.send(post);
});

router.put('/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const updated = Post.update(id, req.body);
    return res.send(updated);
});

router.delete('/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const post = Post.delete(id);
    return res.send(post);
});

module.exports = app => app.use('/posts', router);