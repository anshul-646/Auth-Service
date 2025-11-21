const express = require('express');
const UserController = require('../../controllers/userController');
const { AuthRequestValidators } = require('../../middlewares');

const router = express.Router();

router.post(
    '/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
);
router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
);

module.exports = router;