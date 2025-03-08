/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { BASE_URL } from "./Constants";
import { Link } from "react-router-dom";

const ConnectionCard = ({user, flag}) => {
    // console.log('User', user.toUserId.firstName)
    // const {firstName, lastName, age, gender, about, skills, profileUrl, _id} = user;
    
    const handleRequest = async(status, id) => {
        try {
            const res = await axios.post(BASE_URL+`/request/review/${status}/${id}`, {}, {withCredentials: true});
            console.log('Request handle ',res);
        } catch (error) {
            console.log('Error: ',error)
        }
    }
    const _id = 1;

  return (
    <div className="flex items-stretch rounded w-4/6 p-2 bg-white shadow-2xl my-2">
        <Link className="w-1/4 flex" to={`/message/${_id}`}>
            <img
              src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
              alt="profile"
              className="object-cover w-full h-full"
            />
        </Link>

        <div className="w-3/4 px-4 flex flex-col justify-center">
          <p className="text-black">Diwakar Giri</p>
          <p className="text-black">Age: 23, Gender: Male</p>
          <p className="text-black">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, quisquam ducimus! Ducimus ipsum dolorum officiis esse, quasi animi? Neque, quasi.
          </p>
          <p className="text-black font-medium text-lg">JS | TS | C++</p>
          {
            flag &&
            <div className="flex my-2 gap-x-4">
                <button className="bg-green-700 py-1.5 px-8 rounded text-white font-medium hover:bg-green-500 " onClick={()=>handleRequest('accept', _id)}>Accept</button>
                <button className="bg-red-700 py-1.5 px-8 rounded text-white font-medium hover:bg-red-500 " onClick={()=>handleRequest('reject', _id)}>Reject</button>
          </div>
          }
        </div>
    </div>
  )
}

export default ConnectionCard