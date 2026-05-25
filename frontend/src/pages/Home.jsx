import Navbar from "../components/Navbar";
import CompanyCard from "../components/CompanyCard";
import { useEffect, useState } from "react";
import api from "../services/api";
import AddCompanyModal from "../components/AddCompanyModal";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");
    const [city, setCity] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [sort, setSort] = useState("");

    const fetchCompanies = async () => {
        try {

            const res = await api.get(
                `/companies?search=${search}&city=${selectedCity}&sort=${sort}`
            );

            setCompanies(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, [search, selectedCity, sort]);

    return (
        <div className="bg-gray-100 min-h-screen">

            <Navbar
                search={search}
                setSearch={setSearch}
            />

            <div className="max-w-6xl mx-auto py-10">

                {/* Filters */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

                    {/* Left */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                        <input
                            type="text"
                            placeholder="Select City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border border-gray-200 px-4 h-[46px] rounded-md w-full sm:w-[320px] bg-white outline-none text-sm"
                        />

                        <button
                            onClick={() => setSelectedCity(city)}
                            className="bg-gradient-to-br from-[#D100F3] to-[#002BC5] text-white px-6 h-[46px] rounded-md text-sm font-medium">
                            Find Company
                        </button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gradient-to-br from-[#D100F3] to-[#002BC5] text-white px-6 h-[46px] rounded-md text-sm font-medium">
                            + Add Company
                        </button>
                    </div>

                    {/* Sort */}
                    <div>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border border-gray-200 px-4 h-[46px] rounded-md bg-white outline-none text-sm min-w-[160px]"
                        >
                            <option value="">Sort</option>

                            <option value="name">
                                Name
                            </option>

                            <option value="rating">
                                Average Rating
                            </option>

                            <option value="location">
                                Location
                            </option>

                            <option value="newest">
                                Newest
                            </option>
                        </select>
                    </div>
                </div>

                {/* Result */}
                <p className="mb-6 text-gray-500">
                    Result Found: {companies.length}
                </p>

                {/* Cards */}
                <div className="space-y-6">

                    {companies.length > 0 ? (

                        companies.map((company) => (
                            <CompanyCard
                                key={company._id}
                                company={company}
                            />
                        ))

                    ) : (

                        <div className="bg-white p-10 rounded-xl text-center text-gray-500">
                            No Companies Found
                        </div>

                    )}

                </div>
                <AddCompanyModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    fetchCompanies={fetchCompanies}
                />
            </div>
        </div>
    );
};

export default Home;