const blogController = require('../controllers/blogpost');
const express = require('express');
const { authenticateUser } = require('../Authentication/auth')
const { upload } = require('../controllers/cloudinaryConfig');

const router = express.Router();
router.post('/createBlog',authenticateUser,upload.single('image'),blogController.blogpost);
router.post('/blogs/:blogId/comment',authenticateUser,blogController.commentOnBlog);
router.post('/blogs/:blogId/like', authenticateUser, blogController.likeOnBlog);
router.delete('/comments/:commentId', authenticateUser, blogController.deleteOnBlog);
router.get('/blogs',blogController.getAllBlogs);
router.get('/blog/:blogId/comment',authenticateUser,blogController.viewComments);
router.get('/blogs/:blogId',authenticateUser,blogController.viewBlog);
router.post('/like/:commentId',authenticateUser,blogController.likeOnComment);
router.post('/reply/:commentId',authenticateUser,blogController.replyOnComment);
router.post('/report/:commentId',authenticateUser,blogController.reportComment);
router.get('/getProfile',authenticateUser,blogController.getProfile)

module.exports = router;