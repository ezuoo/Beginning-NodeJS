// User API에 대한 라우팅 설정

const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.get('', controller.index);

// get users
router.get('/:id', controller.show);

// delete user
router.delete('/:id', controller.destroy);

// add user
router.post('', controller.create);

module.exports = router;