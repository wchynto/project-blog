import Post from "../models/post_model.js";
import User from "../models/user_model.js";

const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.locals.posts = posts;
        next();
    } catch (error) {
        console.log(error);
    }
};

const getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById({ _id: req.params.id });
        res.locals.post = Post;
        next();
    } catch (error) {
        console.log(erro);
    }
};

const getPostByUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.user.email }).populate(
            "posts"
        );
        res.locals.posts = user.posts;
        next();
    } catch (error) {
        console.log(error);
    }
};

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        const user = await User.findOne({ email: req.user.email });
        const savedPost = await post.save();
        user.posts.push(savedPost);
        user.save();
        res.redirect("/dashboard/posts");
    } catch (error) {
        console.log(error);
    }
};

const updatePost = async (req, res) => {
    try {
        const post = req.body;
        await Post.findByIdAndUpdate(req.params.id, post);
        res.redirect("/dashboard/posts");
    } catch (error) {
        console.log(error);
    }
};

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect("/dashboard/posts");
    } catch (error) {
        console.log(error);
    }
};

export { getPostByUser, getAllPost, createPost, updatePost, deletePost };
