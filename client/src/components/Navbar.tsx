import { FaSignInAlt, FaUserPlus} from "react-icons/fa"
import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="w-full fixed top-0">
      <div className="flex justify-between border-2 py-5 sm:px-12 px-5 bg-white">
        <Link to="/"><span className="w-full italic text-blue-500 font-bold sm:text-3xl text-2xl">iWrite</span></Link>
        <div className="flex items-center sm:gap-8 gap-2 text-white text-sm sm:text-lg">
          <button className="flex gap-2 sm:py-1.5 sm:px-4 py-0.5 px-2 rounded-md bg-blue-500 font-bold">
            <FaSignInAlt className="sm:size-7 size-5" />
            Login
          </button>
          <button className="flex gap-2 sm:py-1.5 sm:px-4 py-0.5 px-2 rounded-md bg-blue-500 font-bold">
            <FaUserPlus className="sm:size-7 size-5"/>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header