import { FaSignInAlt, FaUserPlus} from "react-icons/fa"

function Header() {
  return (
    <div className="w-full fixed top-0">
      <div className="flex justify-between border p-5 bg-white">
        <span className="w-full italic text-blue-500 font-bold text-3xl">iWrite</span>
        <div className="flex">
          <button className="flex">
            <FaSignInAlt className="w-5 h-5" />
            Login
          </button>
          <button className="flex">
            <FaUserPlus className="w-5 h-5"/>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header