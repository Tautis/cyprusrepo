import express from 'express'
import { insertBlog, getAllBlogs,updateBlog,deleteBlog,getOne,getABlog } from '../controllers/blogs.js'

const router = express.Router()

router.post("/post",insertBlog)
router.get("/getAll",getAllBlogs)
router.get("/getOne",getOne)
router.post("/updateBlog",updateBlog)
router.post("/deleteBlog",deleteBlog)
router.get("/getABlog",getABlog)

export default router