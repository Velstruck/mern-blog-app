import { handleError } from '../helpers/handleError.js';
import Blog from '../models/blog.model.js';
import cloudinary from '../config/cloudinary.js'
import { encode } from 'entities';
export const addBlog = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        let featuredImage = '';
        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });

            featuredImage = uploadResult.secure_url
        }

        const blog = new Blog({
            author: data.author,
            category: data.category,
            title: data.title,
            slug: data.slug,
            featuredImage: featuredImage,
            blogContent:encode(data.blogContent),
        });

        await blog.save();

        res.status(200).json({
            success: true,
            message: 'Blog added successfully.'
        })

    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const editBlog = async (req, res, next) => {
    try {

    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const updateBlog = async (req, res, next) => {
    try {

    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const deleteBlog = async (req, res, next) => {
    try {

    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const showAllBlog = async (req, res, next) => {
    try {

    } catch (error) {
        next(handleError(500, error.message));
    }
}