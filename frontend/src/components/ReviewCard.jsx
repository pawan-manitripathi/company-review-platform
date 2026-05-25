import {
    FaStar,
    FaHeart,
    FaShareAlt,
} from "react-icons/fa";

import api from "../services/api";

const ReviewCard = ({
    review,
    fetchReviews,
}) => {

    const handleLike = async () => {
        try {

            await api.patch(
                `/reviews/like/${review._id}`
            );

            fetchReviews();

        } catch (error) {
            console.log(error);
        }
    };

    const handleShare = async () => {

        try {

            await navigator.share({
                title: review.subject,
                text: review.reviewText,
                url: window.location.href,
            });

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <div className="pb-8">

            {/* TOP */}
            <div className="
        flex
        justify-between
        gap-5
      ">

                {/* LEFT */}
                <div className="flex gap-4">

                    {/* IMAGE */}
                    <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-700 flex items-center justify-center text-white font-semibold text-lg shadow-sm">

                        {review.fullName.charAt(0)}

                    </div>

                    {/* DETAILS */}
                    <div>

                        <h3 className="text-[18px] md:text-[22px] font-semibold">
                            {review.fullName}
                        </h3>

                        <p className="
              text-gray-400
              text-sm
              mt-1
            ">
                            {new Date(
                                review.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>

                </div>

                {/* STARS */}
                <div className="
          flex
          text-yellow-400
          mt-1
        ">

                    {[...Array(review.rating)].map(
                        (_, index) => (
                            <FaStar key={index} />
                        )
                    )}

                </div>

            </div>

            {/* REVIEW TEXT */}
            <p className="text-gray-500 leading-7 text-[15px] mt-5 ml-[68px]">
                {review.reviewText}
            </p>

            {/* ACTIONS */}
            <div className="flex items-center gap-6 mt-5 ml-[68px] ">

                <button
                    onClick={handleLike}
                    className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-red-500 transition">

                    <FaHeart />

                    {review.likes}

                </button>

                <button onClick={handleShare} className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-indigo-600 transition">

                    <FaShareAlt />

                    Share

                </button>

            </div>
            <div className="border-b border-gray-100 mt-8">

            </div>

        </div>
    );
};

export default ReviewCard;