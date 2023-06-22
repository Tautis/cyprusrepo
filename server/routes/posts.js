import express from 'express'
import {deletePost, newAdvert,getAllPostsEN,getAllPostsRU,getAPost,get3Random,getRecent,getForHomeEN,getForHomeRU,searchDataEN,searchDataRU,getPosts,findOne,updatePost,getAllForHomeEN} from '../controllers/post.js'

const router = express.Router()

router.post("/postAll",newAdvert)


router.get("/getAllPostsEN",getAllPostsEN)
router.get("/getAllPostsRU",getAllPostsRU)
router.get("/getPostsEN",getPosts)

router.get("/getForHomeEN",getForHomeEN)
router.get("/getForHomeRU",getForHomeRU)
router.get("/findOne",findOne)

router.post("/updatePosts",updatePost)

router.get("/searchDataEN",searchDataEN)
router.get("/searchDataRU",searchDataRU)
router.get("/getAllForHome",getAllForHomeEN)
router.get("/getAPost",getAPost)
router.get("/getRecent",getRecent)
router.get("/get3Random",get3Random)


router.post('/deletePost',deletePost)

export default router