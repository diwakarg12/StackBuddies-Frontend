import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('yash@gmail.com');
  const [password, setPassword] = useState('Yash@12345');
  const [error, setError] = useState(null);
  const [Notify, setNotify] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3200/auth/login', 
        {
          email,
          password
        },{ withCredentials: true }
      );
      console.log(res.data.user)
    dispatch(addUser(res.data.user))
    setNotify(true)
    setTimeout(()=>{
      setNotify(false);
      navigate('/edit-profile')
    }, 1000);
    } catch (error) {
      console.log(error.response.data.message)
      setError(`Error: ${error.response.data.message}`)
    }
  }
  return (
    <>
    {
      Notify ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <span className="loading loading-bars loading-xl"></span>
          <div className="toast toast-top toast-center">
            <div className="alert alert-success text-white font-medium">
              <span>Login Successfully, Please Update Your Profile Now.</span>
            </div>
          </div>
        </div>
      ): (
        <div className="card bg-base-100 w-96 shadow-xl mx-auto my-16 border">
      <div className="card-body">
        <h2 className="card-title my-1 text-3xl font-bold">Login</h2>

        <label className="input input-bordered flex items-center gap-2 my-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="grow" placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2 my-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" 
            />
          </svg>
          <input type="password" placeholder="Password" value={password} onChange={(e) =>setPassword(e.target.value)} className="grow" />
        </label>
        {error && <p className="text-red-700 font-medium font-serif">{error}</p>}
        <div className=" flex items-center justify-between my-1">
          <button className="btn btn-primary w-1/3 text-white" onClick={handleLogin}>Login</button>
          <Link to={'/signup'} className="text-blue-700 underline font-medium">New User? Signup here</Link>
        </div>
      </div>
    </div>
      )
    }
    </>
  )
};

export default Login;