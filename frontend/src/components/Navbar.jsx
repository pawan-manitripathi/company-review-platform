import { FaStar } from "react-icons/fa";

const Navbar = ({ search, setSearch }) => {
  return (
    <div className="w-full shadow-sm bg-white px-10 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-purple-600 text-white p-2 rounded-full">
          <FaStar />
        </div>

        <h1 className="text-2xl font-normal">
          Review<span className="text-purple-600 font-semibold">&</span><span className="text-2xl font-bold">RATE</span>
        </h1>
      </div>

      {/* Search */}
      <div className="w-full md:w-[400px]">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-md px-4 py-2 outline-none"
        />
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-8 text-sm font-semibold">
        <button>SignUp</button>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Navbar;