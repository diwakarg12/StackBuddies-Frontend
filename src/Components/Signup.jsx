import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"

const Signup = () => {
    const [signup, setSignup] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleSignup = async() => {
        const res = await axios.post('http://localhost:3200/auth/signup',signup,{withCredentials: true});
        console.log('signup Data', res.data.user);
    }
  return (
    <div className="card bg-base-100 w-96 shadow-xl mx-auto my-16 border">
      <div className="card-body">
        <h2 className="card-title my-1 text-3xl font-bold">Signup</h2>

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
          <input type="text" value={signup.email} onChange={(e)=>setSignup(e.target.value)} className="grow" placeholder="Email" />
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
          <input type="password" placeholder="Password" value={signup.password} onChange={(e) =>setSignup(e.target.value)} className="grow" />
        </label>
        <div className=" flex items-center justify-between my-1">
          <button className="btn btn-primary w-1/3 text-white" onClick={handleSignup}>Signup</button>
          <Link to={'/login'} className="text-blue-700 underline font-medium">Already User? Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup