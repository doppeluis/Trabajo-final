const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// SINGIN
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});
//aqui se realiza la autenticacion del administrador
router.post('/signin', (req, res, next) => {
  req.check('username', 'Username is Required').notEmpty();
  req.check('password', 'Password is Required').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  // se pone asi para autenticar, como se llama la autenticacion local.signin y luego esto se direcciona a otro lugar 
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    //envia mensajes a la vista
    failureFlash: true
    //se pasa req, res y next
  })(req, res, next);
});


//aqui se realiza la autenticacion del cajero
router.post('/signin2', (req, res, next) => {
  req.check('username', 'Username is Required').notEmpty();
  req.check('password', 'Password is Required').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  // se pone asi para autenticar, como se llama la autenticacion local.signin y luego esto se direcciona a otro lugar 
  passport.authenticate('local.signin2', {
    successRedirect: '/links',
    failureRedirect: '/signin',
    //envia mensajes a la vista
    failureFlash: true
    //se pasa req, res y next
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

module.exports = router;