const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const db = require('./db/connection.js');
const jwt = require('jsonwebtoken');


const users = db.get('users');
users.createIndex('username', { unique: true });

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // repeat_password: Joi.ref('password'),
});

function createJWT(user, res, next) {
    const payload = {
        _id: user._id,
        username: user.username
    };

    jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: '1d'
    }, (err, token) => {
        if(err) {
            console.log(err);
            respondError422(res, next);
        } else {
            res.json({
                token
            });
        }
    });
}

router.get('/', (req, res) => {
    res.json({
        message: "Auth"
    });
});

router.post('/signup', (req, res, next) => {
    const result = schema.validate(req.body);
    console.log(result);

    if(result.error == null) {
        users.findOne({
            username: req.body.username
        }).then(user => {
            if(user) {
                const error = new Error('That username is not OG. Please choose another one.');
                res.status(409);
                next(error);
            } else {
                bcrypt.hash(req.body.password, 12)
                    .then(hashedPassword => {   
                        console.log('Hashpassword', hashedPassword);
                        const newUser = {
                            username: req.body.username,
                            password: hashedPassword
                        };
                        users.insert(newUser)
                            .then(dbUser => {
                                createJWT(dbUser, res, next);
                            });
                    });
            }
        });
    } else {
        res.status(422);
        next(result.error);
    }
});

router.post('/login', (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error === null) {
      users.findOne({
        username: req.body.username,
      }).then(user => {
        if (user) {        
          bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
              if (result) {
                createJWT(user, res, next);
              } else {
                respondError422(res, next);
              }
            });
        } else {
          respondError422(res, next);
        }
      });
    } else {
      respondError422(res, next);
    }
  });


function respondError422(res, next) {
    res.status(422);
    const error = new Error('Unable to login.');
    next(error);
  }

module.exports = router;