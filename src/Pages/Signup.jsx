import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField from "../Components/InputField";

const Signup = () => {
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [signup, setSignup] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: '',
        gender: ''
    });
    
    const handleChange = (e) => {
      const {name, value} = e.target;

      setSignup(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSignup = async() => {
      console.log("SignupData",signup);
      setLoading(true);
        try {
          const res = await axios.post('http://localhost:3200/auth/signup',signup,{withCredentials: true});
        console.log('signup Data', res.data.user);
        setTimeout(()=>{
          setLoading(false);
          navigate('/login')
        }, 1000)
        } catch (error) {
          console.log('Error', error.message);
        }
    }
  return (
    <>
    {
      loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <span className="loading loading-bars loading-xl"></span>
          <div className="toast toast-top toast-center">
            <div className="alert alert-success text-white font-medium">
              <span>Signup Successfully, Please Login & Update Your Profile Now.</span>
            </div>
          </div>
        </div>
      ):(
        <div className="card bg-base-100 shadow-xl mx-auto my-16 h-screen w-3/4">
          <h1 className="font-bold text-3xl text-center my-4">Signup</h1>
          <div className="flex flex-wrap items-center justify-between">
            <InputField inputType={'text'} label={'FirstName'} placeholder={'Enter Your FirstName'} name={"firstName"} value={signup.firstName} onChange={handleChange}  />
            <InputField inputType={'text'} label={'LastName'} placeholder={'Enter Your LastName'} name={"lastName"} value={signup.lastName} onChange={handleChange}  />
            <InputField inputType={'email'} label={'Email'} placeholder={'Enter Your Email'} name={"email"} value={signup.email} onChange={handleChange}  />
            <InputField inputType={'password'} label={'Password'} placeholder={'Enter Your Password'} name={"password"} value={signup.password} onChange={handleChange}  />
            <InputField inputType={'number'} label={'Age'} placeholder={'Enter Your Age'} name={"age"} value={signup.age} onChange={handleChange}  />
            <div className="w-[48%]">
              <label htmlFor="gender" className="text-white text-xl font-medium mx-3">Gender</label>
              <input type="text" name="gender" value={signup.gender} onChange={handleChange} className="input border text-xl text-gray-100 border-gray-400 rounded-md w-full" placeholder="Enter Your Gender" id="gender" list="browsers"/>
                <datalist id="browsers">
                  <option value="male" />
                  <option value="female" />
                  <option value="Other" />
                </datalist>
            </div>
          </div>
          <div className=" flex items-center justify-between my-1">
            <button className="btn btn-primary w-1/3 text-white" onClick={handleSignup}>Signup</button>
            <Link to={'/login'} className="text-blue-700 underline font-medium my-auto">Already User? Login here</Link>
          </div>
        </div>
      )
    }
    </>
  )
}

{/*  */}

export default Signup