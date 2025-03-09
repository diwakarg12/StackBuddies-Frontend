import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Utils/userSlice";
const Header = () => {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const res = await axios.post('http://localhost:3200/auth/logout', {}, {withCredentials: true})
      dispatch(removeUser(res.data.user))
      navigate('/login');
    } catch (error) {
      console.log("Error", error.message);
    }
  }
  return (
    <div className="bg-black flex ">
        <div className="flex-1 ml-11">
            <Link to={'/'} className="text-2xl font-bold">
              <svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" fill="none">
                <text x="10" y="34" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold" fill="#ff4081">STACKBUDDIES</text>
              </svg>
            </Link>
        </div>
        <div className="flex-none gap-2">
          {
            user ? 
            <div className="flex items-center">
            <div className="hidden md:block">Welcome {user.firstName}</div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.profileUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link to={'/profile'}>Profile</Link></li>
              <li><Link to={'/connections'}>Connections</Link></li>
              <li><Link to={'/connection-requests'}>Connection Requests</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
          </div>:<>
          <Link className="btn btn-ghost text-lg font-bold" to={'/login'}>Login</Link>
          </>
          }
          {}
        </div>
    </div>
  )
}

export default Header;