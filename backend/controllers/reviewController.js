import Review from "../models/Review.js";

export const addReview = async (req, res) => {
    try {
        const review = await Review.create({
            ...req.body,
            companyId: req.params.companyId,
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getReviews = async (req, res) => {
    try {

        let sortOption = { createdAt: -1 };

        const sort = req.query.sort;

        if (sort === "rating") {
            sortOption = { rating: -1 };
        }

        if (sort === "date") {
            sortOption = { createdAt: -1 };
        }

        if (sort === "relevance") {
            sortOption = { likes: -1 };
        }

        const reviews = await Review.find({
            companyId: req.params.companyId,
        }).sort(sortOption);

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const likeReview = async (req, res) => {
    try {

        const review = await Review.findById(
            req.params.reviewId
        );

        review.likes += 1;

        await review.save();

        res.status(200).json(review);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};