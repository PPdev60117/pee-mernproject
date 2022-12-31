const express = require('express')
const { login } = require('../controller/auhcontroller')
const router = express.Router()

router.post('/login',login)

module.exports = router