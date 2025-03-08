/* eslint-disable react/prop-types */
import axios from "axios";
// import { BASE_URL } from "./Constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../Utils/feedSlice";

const FeedCard = ({user}) => {
    // const {firstName, lastName, age, gender, about, skills, profileUrl} = user
    const dispatch = useDispatch();
    const handleFeed = async(status, toUserId) => {
        try {
            const res = await axios.post(`http://localhost:3200/request/send/${status}/${toUserId}`, {}, {withCredentials: true})
            console.log(res?.data?.connectionRequest.toUserId);
            console.log(toUserId)
            dispatch(removeFeed(toUserId))
        } catch (error) {
            console.log('Error',error)
        }
    }
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
            <img
            src={user?.profile}
            alt={`${user?.firstName} ${user?.lastName} Photo`} />
        </figure>
        <div className="card-body">
            <h2 className="card-title font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
            <p>{user?.about}</p>
            { user?.age && user?.gender && <div className="card-actions my-2">
                <div className="badge badge-outline py-3 px-6 text-black text-base bg-secondary">Age: {user?.age}</div>
                <div className="badge badge-outline py-3 px-6 text-black text-base bg-secondary">Gender: {user?.gender}</div>
            </div>}
            <div>
                Skills: {user?.skills.join(" , ")}
            </div>
            <div className="card-actions justify-center my-5">
                <button className="btn btn-error px-12" onClick={()=>handleFeed('ignored', user._id)}>Ignore</button>
                <button className="btn btn-success px-12" onClick={()=>handleFeed('interested', user._id)}>Interested</button>
            </div>
        </div>
    </div>
  )
}

export default FeedCard