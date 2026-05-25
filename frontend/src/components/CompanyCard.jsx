import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {

    return (

        <div className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-[0_2px_20px_rgba(0,0,0,0.04)]
            p-5
            md:p-7
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-8
            transition
            hover:shadow-[0_4px_30px_rgba(0,0,0,0.06)]
        ">

            {/* LEFT */}
            <div className="flex gap-5">

                {/* LOGO */}
                <div className="
                    min-w-[88px]
                    h-[88px]
                    rounded-xl
                    bg-gradient-to-br
                    from-[#0b1446]
                    to-[#172c85]
                    flex
                    items-center
                    justify-center
                    text-white
                    text-[34px]
                    font-bold
                ">

                    {company.name?.charAt(0)}

                </div>

                {/* DETAILS */}
                <div>

                    {/* NAME */}
                    <h2 className="
                        text-[20px]
                        md:text-[24px]
                        font-semibold
                        text-gray-900
                    ">
                        {company.name}
                    </h2>

                    {/* LOCATION */}
                    <p className="
                        text-gray-400
                        mt-2
                        text-sm
                    ">
                        {company.location}
                    </p>

                    {/* RATINGS */}
                    <div className="
                        flex
                        items-center
                        flex-wrap
                        gap-3
                        mt-4
                    ">

                        {/* AVERAGE */}
                        <span className="
                            font-semibold
                            text-gray-900
                        ">
                            {company.averageRating}
                        </span>

                        {/* STARS */}
                        <div className="
                            flex
                            items-center
                            text-yellow-400
                            text-sm
                            gap-[2px]
                        ">

                            {[1, 2, 3, 4, 5].map((star) => (

                                <FaStar
                                    key={star}
                                    className={
                                        star <= Math.round(company.averageRating)
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }
                                />

                            ))}

                        </div>

                        {/* REVIEWS */}
                        <span className="
                            text-sm
                            font-medium
                            text-gray-700
                        ">
                            {company.totalReviews} Reviews
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

                {/* FOUNDED */}
                <p className="
                    text-sm
                    text-gray-400
                ">
                    Founded on {company.foundedOn}
                </p>

                {/* BUTTON */}
                <Link
                    to={`/company/${company._id}`}
                >

                    <button className="
                        bg-[#303030]
                        text-white
                        px-6
                        h-[44px]
                        rounded-md
                        text-sm
                        font-medium
                    ">
                        Detail Review
                    </button>

                </Link>

            </div>

        </div>
    );
};

export default CompanyCard;