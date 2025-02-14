import { handleError } from '../helpers/handleError.js';
import BlogLike from '../models/bloglike.model.js';

export const doLike = async (req, res, next) => {
    try {
        const { user, blogid } = req.body;
        let like = await BlogLike.findOne({ user, blogid });
        if (!like) {
            const saveLike = new BlogLike({ user, blogid });
            like = await saveLike.save();
        } else {
            await BlogLike.findByIdAndDelete(like._id);
        }

        const likecount = await BlogLike.countDocuments({ blogid });

        res.status(200).json({ likecount });
    } catch (error) {
        next(handleError(500, error.message));
    }
};

export const likeCount = async (req, res, next) => {
    try {
        const { blogid, userid } = req.params;
        const likecount = await BlogLike.countDocuments({ blogid });
        let isUserLiked=false;
        if(userid){
            const getUserLike = await BlogLike.countDocuments({ blogid, user: userid });
            if(getUserLike>0){
                isUserLiked=true;
            }

        }
        res.status(200).json({ likecount, isUserLiked });
    } catch (error) {
        next(handleError(500, error.message));
    }
};