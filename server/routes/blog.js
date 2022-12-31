const express = require('express')
const { requireLogin } = require('../controller/auhcontroller')
const { create, getallblogs, singleblog,remove,updated } = require('../controller/blogcontroller')
const router =  express.Router()




router.post('/create',requireLogin,create)
router.get('/blogs',getallblogs)
router.get('/blog/:slug',singleblog)
router.delete('/blog/:slug',requireLogin,remove)
router.put('/blog/edit/:slug',requireLogin,updated)

module.exports = router