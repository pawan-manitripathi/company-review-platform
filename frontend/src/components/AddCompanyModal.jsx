import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const AddCompanyModal = ({
    isOpen,
    onClose,
    fetchCompanies,
}) => {

    const [formData, setFormData] =
        useState({
            name: "",
            location: "",
            city: "",
            foundedOn: "",
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
                "/companies",
                formData
            );

            toast.success(
                "Company Added Successfully"
            );

            fetchCompanies();

            onClose();

            setFormData({
                name: "",
                location: "",
                city: "",
                foundedOn: "",
            });

        } catch (error) {

            toast.error(
                "Something went wrong"
            );

            console.log(error);

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
                rounded-[26px]
                px-8
                py-6
                overflow-hidden
            ">

                {/* TOP CIRCLES */}
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
                        cursor-pointer
                    "
                >

                    <FaTimes />

                </button>

                {/* TITLE */}
                <h2 className="
                    text-center
                    text-[28px]
                    font-bold
                    mt-10
                    mb-8
                    text-gray-900
                ">
                    Add Company
                </h2>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* COMPANY NAME */}
                    <div>

                        <label className="
                            text-sm
                            text-gray-500
                        ">
                            Company Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="
                                w-full
                                h-[46px]
                                border
                                border-gray-300
                                rounded-md
                                px-4
                                mt-2
                                outline-none
                                text-sm
                                focus:border-[#5b36f2]
                            "
                        />

                    </div>

                    {/* LOCATION */}
                    <div>

                        <label className="
                            text-sm
                            text-gray-500
                        ">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            placeholder="Enter"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="
                                w-full
                                h-[46px]
                                border
                                border-gray-300
                                rounded-md
                                px-4
                                mt-2
                                outline-none
                                text-sm
                                focus:border-[#5b36f2]
                            "
                        />

                    </div>

                    {/* FOUNDED ON */}
                    <div>

                        <label className="
                            text-sm
                            text-gray-500
                        ">
                            Founded On
                        </label>

                        <input
                            type="date"
                            name="foundedOn"
                            value={formData.foundedOn}
                            onChange={handleChange}
                            required
                            className="
                                w-full
                                h-[46px]
                                border
                                border-gray-300
                                rounded-md
                                px-4
                                mt-2
                                outline-none
                                text-sm
                                focus:border-[#5b36f2]
                            "
                        />

                    </div>

                    {/* CITY */}
                    <div>

                        <label className="
                            text-sm
                            text-gray-500
                        ">
                            City
                        </label>

                        <input
                            type="text"
                            name="city"
                            placeholder="Enter"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="
                                w-full
                                h-[46px]
                                border
                                border-gray-300
                                rounded-md
                                px-4
                                mt-2
                                outline-none
                                text-sm
                                focus:border-[#5b36f2]
                            "
                        />

                    </div>

                    {/* BUTTON */}
                    <div className="
                        flex
                        justify-center
                        pt-2
                    ">

                        <button
                            disabled={loading}
                            className="
                                bg-gradient-to-br 
                                from-[#D100F3] 
                                to-[#002BC5]
                                text-white
                                w-[120px]
                                h-[42px]
                                rounded-md
                                cursor-pointer
                                text-sm
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

export default AddCompanyModal;