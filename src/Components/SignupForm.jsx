import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "./Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { initializeSocket } from "../Socket/socket.client";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
	const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("");
	const [age, setAge] = useState("");
    const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
    const handleSignup = async(e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const res = await axios.post(BASE_URL+'/auth/signup', {firstName, lastName, email, password, gender, age}, {withCredentials: true})
			initializeSocket(res?.data?.user?._id)
            console.log('Signup', res?.data?.user);
			dispatch(addUser(res.data.user));
            setLoading(false);
			navigate('/profile')
        } catch (error) {
            console.log('Error: ',error.message);
			setLoading(false);
        }
    }

	return (
		<form
			className='space-y-6'
			onSubmit={handleSignup}
		>
			{/* First Name */}
			<div>
				<label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
					First Name
				</label>
				<div className='mt-1'>
					<input
						id='firstName'
						name='firstName'
						type='text'
						required
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className='bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

            {/* NAME */}
			<div>
				<label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
					Last Name
				</label>
				<div className='mt-1'>
					<input
						id='lastName'
						name='lastName'
						type='text'
						required
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className='bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			{/* EMAIL */}
			<div>
				<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
					Email address
				</label>
				<div className='mt-1'>
					<input
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			{/* PASSWORD */}
			<div>
				<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
					Password
				</label>
				<div className='mt-1'>
					<input
						id='password'
						name='password'
						type='password'
						autoComplete='new-password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			{/* AGE */}
			<div>
				<label htmlFor='age' className='block text-sm font-medium text-gray-700'>
					Age
				</label>
				<div className='mt-1'>
					<input
						id='age'
						name='age'
						type='number'
						required
						value={age}
						onChange={(e) => setAge(e.target.value)}
						min='18'
						max='120'
						className='bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			{/* GENDER */}
			<div>
                <label htmlFor='gender' className='block text-sm font-medium text-gray-700'>
					Gender
			    </label>
                <input 
                    type="text" 
                    id="gender" 
                    name="gender" 
                    required
                    value={gender} 
                    onChange={(e)=>setGender(e.target.value)} 
                    list="browsers"
                    className="bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                />
                <datalist id="browsers">
                  <option value="male" />
                  <option value="female" />
                  <option value="Other" />
                </datalist>
            </div>

			<div>
				<button
					type='submit'
					className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
						loading
							? "bg-pink-400 cursor-not-allowed"
							: "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
					}`}
					disabled={loading}
				>
					{loading ? "Signing up..." : "Sign up"}
				</button>
			</div>
		</form>
	);
};
export default SignUpForm;
