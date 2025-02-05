import { handleError } from '../helpers/handleError.js';
import Category from '../models/category.model.js';

// functions to add, update , delete and get categories

export const addCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body;
        const category = new Category({ name, slug });

        await category.save();

        res.status(200).json({
            success: true,
            message: "Category added successfully!",
            category
        })

    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const showCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params;

        const category = await Category.findById(categoryid)
        if (!category) {
            next(handleError(404, "Category not found!"));
        }
        return res.status(200).json({
            category
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const updateCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body;
        const { categoryid } = req.params;
        const category = await Category.findByIdAndUpdate(categoryid, {
            name, slug
        }, { new: true });

        res.status(200).json({
            success: true,
            message: "Category updated successfully!",
            category
        })

    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params;
        await Category.findByIdAndDelete(categoryid);

        res.status(200).json({
            success: true,
            message: "Category Deleted successfully!",
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
}
export const getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find().sort({ name: 1 }).lean().exec();
        return res.status(200).json({
            category
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
}