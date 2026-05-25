import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import ReviewCard from "../components/ReviewCard";
import AddReviewModal from "../components/AddReviewModal";
import { FaStar } from "react-icons/fa";

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [reviewSort, setReviewSort] = useState("relevance");
    const [loading, setLoading] = useState(true);

    const fetchCompany = async () => {
        try {

            const res = await api.get(
                `/companies/${id}`
            );

            setCompany(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchReviews = async () => {
        try {

            setLoading(true);
            const res = await api.get(
                `/reviews/${id}?sort=${reviewSort}`
            );

            setReviews(res.data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompany();
        fetchReviews();
    }, [reviewSort]);

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (acc, item) =>
                        acc + item.rating,
                    0
                ) / reviews.length
            ).toFixed(1)
            : 0;

    return (
        <div className="bg-[#f5f7fb] min-h-screen">

            <Navbar />

            <div className="w-[92%] max-w-6xl mx-auto py-12">

                {/* TOP BORDER */}
                <div className="border-t border-gray-200 mb-8"></div>

                {/* MAIN CARD */}
                <div className="bg-white rounded-2xl shadow-[0_2px_25px_rgba(0,0,0,0.04)] border border-gray-100 p-5 md:p-8 ">

                    {/* HEADER */}
                    <div className=" flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                        {/* LEFT */}
                        <div className="flex flex-col sm:flex-row gap-5">

                            {/* LOGO */}
                            <div className="min-w-[90px] h-[90px] rounded-xl bg-gradient-to-br from-[#0c1445] to-[#172b85] flex items-center justify-center text-white text-[42px] font-bold">

                                {company?.name?.charAt(0)}

                            </div>

                            {/* DETAILS */}
                            <div>

                                <h1 className="text-[22px] md:text-[28px] font-semibold text-gray-900">
                                    {company?.name}
                                </h1>

                                <p className="text-gray-500 mt-2 text-[15px] font-medium">
                                    {company?.location}
                                </p>

                                {/* RATINGS */}
                                <div className="flex items-center gap-3 mt-4">

                                    <span className="font-semibold">
                                        {averageRating}
                                    </span>

                                    <div className="flex text-yellow-400 text-sm gap-[2px]">

                                        {[1, 2, 3, 4, 5].map((star) => (

                                            <FaStar
                                                key={star}
                                                className={
                                                    star <= Math.round(Number(averageRating))
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />

                                        ))}

                                    </div>

                                    <span className="
                    text-sm
                    font-medium
                  ">
                                        {reviews.length} Review{reviews.length !== 1 && "s"}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="
              flex
              flex-col
              lg:items-end
              gap-5
            ">

                            <p className="text-gray-400 text-sm">
                                Founded on {company?.foundedOn}
                            </p>

                            <button
                                onClick={() =>
                                    setIsOpen(true)
                                }
                                className="
                  bg-gradient-to-br 
                  from-[#D100F3] 
                  to-[#002BC5]
                  text-white
                  px-7
                  h-[44px]
                  rounded-md
                  text-sm
                  font-medium
                "
                            >
                                + Add Review
                            </button>

                        </div>

                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-gray-200 my-8"></div>

                    {/* REVIEW TOP */}
                    <div className="flex items-center justify-between mb-8">

                        <p className="text-sm text-gray-400">
                            Result Found: {reviews.length}
                        </p>

                        {/* SORT */}
                        <div className="relative">

                            <select
                                value={reviewSort}
                                onChange={(e) =>
                                    setReviewSort(
                                        e.target.value
                                    )
                                }
                                className="
            appearance-none
            bg-white
            border
            border-gray-200
            rounded-lg
            h-[44px]
            px-4
            pr-10
            text-sm
            outline-none
            cursor-pointer
            shadow-sm
        "
                            >

                                <option value="relevance">
                                    Relevance
                                </option>

                                <option value="date">
                                    Date
                                </option>

                                <option value="rating">
                                    Rating
                                </option>

                            </select>

                            <div className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        pointer-events-none
        text-black
        text-xs
    ">
                                ▼
                            </div>

                        </div>

                    </div>

                    {/* REVIEWS */}
                    <div className="space-y-8">
                        {
                            loading ? (

                                <div className="py-20 text-center text-gray-400">
                                    Loading Reviews...
                                </div>

                            ) : (

                                reviews.map((review) => (

                                    <ReviewCard
                                        key={review._id}
                                        review={review}
                                        fetchReviews={fetchReviews}
                                    />

                                ))

                            )
                        }

                        {
                            reviews.length === 0 && (
                                <div className="py-20 text-center">

                                    <h2 className="text-2xl font-semibold text-gray-700">
                                        No Reviews Yet
                                    </h2>

                                    <p className="text-gray-400 mt-2">
                                        Be the first one to add review
                                    </p>

                                </div>
                            )
                        }

                    </div>

                </div>

            </div>

            <AddReviewModal
                isOpen={isOpen}
                onClose={() =>
                    setIsOpen(false)
                }
                companyId={id}
                fetchReviews={fetchReviews}
            />

        </div>
    );
};

export default CompanyDetails;