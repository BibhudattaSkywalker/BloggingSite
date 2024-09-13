const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment')

exports.blogpost = async (req,res)=>{
    try {
        const { title, desc } = req.body;
    
        const blog = new Blog({
          title,
          desc,
          image: req.file.path, 
          author: req.user._id, 
        });
    
        await blog.save();
        res.status(201).json(blog);
      } catch (error) {
        console.error(error);
        res.status(500).json(error.message);
      }
}

exports.commentOnBlog = async (req, res) => {
    try {
      const { comment } = req.body;
      const blog = await Blog.findById(req.params.blogId);
      if (!blog) return res.status(404).json({ error: 'Blog not found' });
      const newComment = new Comment({
        comment,
        blog: blog._id,
        author: req.user._id,
      });
      await newComment.save();
      blog.comments.push(newComment._id);
      await blog.save();
      const populatedComment = await Comment.findById(newComment._id).populate('author', 'name image');
      res.status(201).json(populatedComment);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

exports.likeOnBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.blogId);
      if (!blog) return res.status(404).json({ error: 'Blog not found' });
  
      const userIndex = blog.likes.indexOf(req.user._id);
  const userId = req.user._id;
      if (userIndex === -1) {
        blog.likes.push(req.user._id);
        blog.likeCount += 1;
      } else{
        blog.likeCount -= 1;
        blog.likes = blog.likes.filter(like => like.toString() !== userId.toString());
      }
      await blog.save();
      res.status(200).json({  blog });
    } catch (error) {
      console.error('Error liking blog:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

exports.deleteOnBlog = async(req,res)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        console.log(req.params.commentId)
        if (!comment) return res.status(404).json({ error: 'Comment not found' });
        const blog = await Blog.findById(comment.blog);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        if (blog.author.toString() !== req.user._id.toString()) {
            console.log('bibhu')
            return res.status(403).json({ error: 'Not authorized' });
          }
          await comment.deleteOne();
    blog.comments = blog.comments.filter(c => c.toString() !== comment._id.toString());
    await blog.save();

    res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        console.log(error.message)
    }
}

exports.getAllBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find().populate('author','name email image').exec();
        if(!blogs){
            return res.status(400).json({
                message:"no blog found"
            })
        }
        return res.status(200).json(blogs)
    } catch (error) {
        console.log(error.message)
    }
}

exports.viewComments = async(req,res)=>{
    try {
        console.log(req.params.blogId)
        const blog = await Blog.findById(req.params.blogId);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        const comments = await Comment.find({ blog: req.params.blogId }).populate('author', 'name');
        res.status(200).json(comments);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } 
}
exports.viewBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const loggedInUserId = req.user._id;

        const blog = await Blog.findById(blogId)
            .populate('likes', 'name email')
            .populate({
                path: 'comments',
                populate: [
                    {
                        path: 'author', // Populate the author field in comments
                        select: 'name image' // Select only the name
                    },
                    {
                        path: 'replies.author', // Populate the author field in replies
                        select: 'name image' // Select only the name
                    }
                ]
            });

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // // Filter comments based on logged-in user ID
        // const filteredComments = blog.comments.filter(comment => comment.author._id.toString() === loggedInUserId.toString());

        // // Add the filtered comments to the blog object
        // blog.comments = filteredComments;

        res.json(blog);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.likeOnComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const commentCheck = await Comment.findById(commentId).populate('author', 'name image');
      if (!commentCheck) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      const userId = req.user._id;
      const alreadyLiked = commentCheck.likess.some(like => like.author.toString() === userId.toString());
      const array = {
        author: userId
      };
  
      if (alreadyLiked) {
        // Dislike: Decrease like count and remove the user's like from the likess array
        commentCheck.like -= 1;
        commentCheck.likess = commentCheck.likess.filter(like => like.author.toString() !== userId.toString());
      } else {
        // Like: Increase like count and add the user to the likess array
        commentCheck.like += 1;
        commentCheck.likess.push(array);
      }
  
      await commentCheck.save();
      
      // Repopulate the author and replies fields after saving
      await(await commentCheck.populate('author', 'name image')).populate('replies.author', 'name image');
  
      res.status(201).json(commentCheck);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  exports.replyOnComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { text } = req.body;
      console.log(text)
      const userId = req.user._id;
  
      // Find the comment by ID
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      // Create a new reply object
      const reply = {
        author: userId,
        text
      };
  
      // Add the reply to the comment's replies array
      comment.replies.push(reply);
      await comment.save();
  
      // Populate the author field of replies
      await comment.populate({
        path: 'replies.author',
        select: 'name image'
      });
  
      // Send the updated comment with populated replies back
      res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  
exports.reportComment = async(req,res)=>{
    try {
        const { commentId } = req.params;
        const { reason } = req.body;
        const userId = req.user._id;
        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({message:"commentId not found"});
        }
        const report = {
            reported:true,
            reportedBy: userId,
            reason
        }
        comment.reports.push(report);
        await comment.save();
        res.status(201).json({message:"report created"})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}

exports.getProfile = async(req,res)=>{
    try {
        const userId = req.user._id;
        const getProfile = await User.findById(userId);
       res.status(200).json(getProfile)
    } catch (error) {
        res.status(500).json({
            message:"internal server error"
        })
    }
}