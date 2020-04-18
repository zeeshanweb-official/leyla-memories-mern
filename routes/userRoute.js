const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const validateLogin = require('../validation/validateLogin');
const validateSignup = require('../validation/validateSignup');
const User = require('../models/userModel');

const router = new express.Router();

router.get('/logout', (req, res) => {
  delete req.session.authStatus;
  res.send(
    [
      'You are now logged out.',
      '&lt;br/>',
      '<a href="./secure">Return to the secure page. You will have to log in again.</a>'
    ].join('')
  );
});

// Sign up a user
router.post('/signup', async (req, res) => {
  const { errors, isValid } = validateSignup(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.find({ email: req.body.email }).exec();
    if (user.length > 0) {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    return bcrypt.hash(req.body.password, 10, (error, hash) => {
      if (error) {
        return res.status(500).json({ error });
      }
      const newUser = new User({
        firstname: req.body.firstname,
        createdAt: new Date().getTime(),
        email: req.body.email,
        username: req.body.username,
        lastname: req.body.lastname,
        gender: req.body.gender,
        password: hash
      });
      return newUser
        .save()
        .then(result => {
          res.status(201).json({ user: result._id });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

// Log in a user
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(401).json({
        email: 'Could not find email.'
      });
    }

    return bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed.'
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            avatarColor: user.avatarColor,
            createdAt: user.createdAt,
            name: user.name,
            email: user.email,
            showEmail: user.showEmail,
            userId: user._id
          },
          process.env.REACT_APP_JWT_KEY || require('../secrets').jwtKey,
          {
            expiresIn: '1h'
          }
        );
        return res.status(200).json({
          message: 'Auth successful.',
          token
        });
      }
      return res.status(401).json({
        password: 'Wrong password. Try again.'
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    await User.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: 'Successfully deleted user.' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
