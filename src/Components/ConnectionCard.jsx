/* eslint-disable react/prop-types */

import axios from "axios";
import { BASE_URL } from "./Constants";

const ConnectionCard = ({user, flag}) => {
    const {firstName, lastName, age, gender, about, skills, profileUrl, _id} = user;
    
    const handleRequest = async(status) => {
        try {
            const res = await axios.post(BASE_URL+`/request/review/${status}/${_id}`, {}, {withCredentials: true});
            console.log('Request handle ',res);
        } catch (error) {
            console.log('Error: ',error)
        }
    }

  return (
    <div className="card card-side bg-base-300 w-[30rem] border">
        {
            profileUrl && 
            <figure>
                <img
                    src={profileUrl}
                    alt={`${firstName} Profile`} className="rounded-md"
                />
            </figure>
        }
        <div className="card-body">
            <h1 className="card-title text-2xl font-bold">{`${firstName} ${lastName}`}</h1>
            <p className="">{about}</p>
            { age && gender && <div className="card-actions my-2">
                <div className="badge badge-outline py-3 px-6 text-black text-base bg-secondary">Age: {age}</div>
                <div className="badge badge-outline py-3 px-6 text-black text-base bg-secondary">Gender: {gender}</div>
            </div>}
            <div>
                <span className="font-bold text-lg">Skills:</span> {skills.join(" , ")}
            </div>
            {
                flag &&
                <div className="card-actions justify-s">
                    <button className="btn btn-success px-10 font-semibold text-lg text-white" onClick={()=>handleRequest('accept')}>Accept</button>
                    <button className="btn btn-error px-10 font-semibold text-lg text-white" onClick={()=>handleRequest('reject')}>Reject</button>
                </div>
            }
        </div>
    </div>
  )
}

export default ConnectionCard