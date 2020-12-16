const express = require('express');
const _ = require('lodash');
const router = express.Router();
const User = require('../models/User');
const { generateAccessToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const user = User.create({ name, email, password });
    const token = generateAccessToken(user);
    return res.send({ user, token });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = _.find(User.all(), { email });
    
    if (bcrypt.compareSync(password, user.password)) {
        const token = generateAccessToken(user);
        return res.send({ user, token })
    }

    return res.status(500).send('Email or password incorrent');
});

module.exports = app => app.use('/auth', router);