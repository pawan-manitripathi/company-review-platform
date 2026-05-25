import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import {
    FaStar,
    FaTimes,
} from "react-icons/fa";

const AddReviewModal = ({
    isOpen,
    onClose,
    companyId,
    fetchReviews,
}) => {

    const [formData, setFormData] =
        useState({
            fullName: "",
            subject: "",
            reviewText: "",
            rating: 4,
        });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post(
                `/reviews/${companyId}`,
                formData
            );

            toast.success(
                "Review Added Successfully"
            );

            fetchReviews();

            onClose();

            setFormData({
                fullName: "",
                subject: "",
                reviewText: "",
                rating: 4,
            });

        } catch (error) {

            toast.error(
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    if (!isOpen) return null;

    return (
        <div className="
      fixed
      inset-0
      bg-black/40
      z-50
      flex
      items-center
      justify-center
      px-4
    ">

            {/* MODAL */}
            <div className="
        relative
        bg-white
        w-full
        max-w-[510px]
rounded-[24px]
overflow-hidden
px-7
py-5
      ">

                {/* TOP SHAPES */}
                <div className="
          absolute
          top-[-35px]
          left-[20px]
          w-[92px]
          h-[92px]
          rounded-full
          bg-[#d8c9ff]
        "></div>

                <div className="
          absolute
          top-0
          left-[-25px]
          w-[92px]
          h-[92px]
          rounded-full
          bg-gradient-to-b
          from-fuchsia-500
          to-indigo-700
        "></div>

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="
            absolute
            top-5
            right-5
            text-gray-700
            text-lg
            cursor-pointer
          "
                >
                    <FaTimes />
                </button>

                {/* TITLE */}
                <h2 className="
          text-center
          text-[24px]
          font-bold
          mt-12
          mb-6
          text-gray-900
        ">
                    Add Review
                </h2>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* FULL NAME */}
                    <div>

                        <label className="
              text-sm
              text-gray-500
            ">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter"
                            required
                            className="
                w-full
                h-[44px]
                text-sm
                border
                border-gray-300
                rounded-md
                px-4
                mt-2
                outline-none
                focus:border-[#5b36f2]
              "
                        />

                    </div>

                    {/* SUBJECT */}
                    <div>

                        <label className="
              text-sm
              text-gray-500
            ">
                            Subject
                        </label>

                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Enter"
                            required
                            className="
                w-full
                h-[44px]
                text-sm
                border
                border-gray-300
                rounded-md
                px-4
                mt-2
                outline-none
                focus:border-[#5b36f2]
              "
                        />

                    </div>

                    {/* REVIEW */}
                    <div>

                        <label className="
              text-sm
              text-gray-500
            ">
                            Enter your Review
                        </label>

                        <textarea
                            name="reviewText"
                            value={formData.reviewText}
                            onChange={handleChange}
                            placeholder="Description"
                            rows="4"
                            required
                            className="
                w-full
                border
                border-gray-300
                rounded-md
                px-4
                py-3
                mt-2
                outline-none
                resize-none
                focus:border-[#5b36f2]
              "
                        ></textarea>

                    </div>

                    {/* RATING */}
                    <div>

                        <h3 className="
              text-[20px]
              font-bold
              mb-3
            ">
                            Rating
                        </h3>

                        <div className="
              flex
              items-center
              justify-between
            ">

                            {/* STARS */}
                            <div className="
                flex
                items-center
                gap-2
              ">

                                {[1, 2, 3, 4, 5].map(
                                    (star) => (

                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    rating: star,
                                                })
                                            }
                                            className="
                        text-[20px]
                        transition
                      "
                                        >

                                            <FaStar
                                                className={
                                                    star <=
                                                        formData.rating
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }
                                            />

                                        </button>

                                    )
                                )}

                            </div>

                            <span className="
                text-gray-500
                text-sm
              ">
                                Satisfied
                            </span>

                        </div>

                    </div>

                    {/* BUTTON */}
                    <div className="
            flex
            justify-center
            pt-1
          ">

                        <button
                            disabled={loading}
                            className="
                bg-gradient-to-br 
                from-[#D100F3] 
                to-[#002BC5]
                text-white
                w-[100px]
                h-[38px]
                text-sm
                rounded-md
                cursor-pointer
                font-medium
                hover:opacity-90
                transition
              "
                        >

                            {
                                loading
                                    ? "Saving..."
                                    : "Save"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddReviewModal;