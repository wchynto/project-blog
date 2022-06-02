import Post from "../models/post_model.js";
import User from "../models/user_model.js"

const getPost = async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email}).populate('posts')
        res.render('post_dashboard', {name: 'post_dashboard', user: user})
    } catch (error) {
        
    }
}

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body)
        const user = await User.findOne({email: req.user.email})
        const savedPost = await post.save()
        user.posts.push(savedPost)
        user.save()
        res.redirect('/dashboard/posts')
    } catch (error) {
        console.log(error)
    }
}

const updatePost = async (req, res) => {
    try {
        const post = req.body
        await Post.findByIdAndUpdate(req.params.id, post)
        res.redirect('/dashboard/posts')
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/dashboard/posts')
    } catch (error) {
        console.log(error)
    }
}

export {getPost, createPost, updatePost, deletePost}