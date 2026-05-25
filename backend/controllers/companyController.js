import Company from "../models/Company.js";
import Review from "../models/Review.js";

export const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);

        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getCompanies = async (req, res) => {

    try {

        const search =
            req.query.search || "";

        const city =
            req.query.city || "";

        const sort =
            req.query.sort || "";

        let query = {};

        // SEARCH BY NAME
        if (search) {

            query.name = {
                $regex: search,
                $options: "i",
            };

        }

        // FILTER BY CITY
        if (city) {

            query.city = {
                $regex: city,
                $options: "i",
            };

        }

        // FETCH COMPANIES
        let companies =
            await Company.find(query);

        // ADD AVERAGE RATING
        const companiesWithRatings =
            await Promise.all(

                companies.map(async (
                    company
                ) => {

                    const reviews =
                        await Review.find({
                            companyId: company._id,
                        });

                    const averageRating =
                        reviews.length > 0
                            ? (
                                reviews.reduce(
                                    (acc, item) =>
                                        acc +
                                        item.rating,
                                    0
                                ) / reviews.length
                            ).toFixed(1)
                            : 0;

                    return {
                        ...company._doc,
                        averageRating,
                        totalReviews:
                            reviews.length,
                    };

                })

            );

        // SORTING
        if (sort === "name") {

            companiesWithRatings.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );

        }

        else if (
            sort === "location"
        ) {

            companiesWithRatings.sort(
                (a, b) =>
                    a.location.localeCompare(
                        b.location
                    )
            );

        }

        else if (
            sort === "newest"
        ) {

            companiesWithRatings.sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );

        }

        else if (
            sort === "rating"
        ) {

            companiesWithRatings.sort(
                (a, b) =>
                    b.averageRating -
                    a.averageRating
            );

        }

        res.status(200).json(
            companiesWithRatings
        );

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const getSingleCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};