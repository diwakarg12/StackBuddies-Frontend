/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ConnectionCard = ({user, flag, handleRequest}) => {
    // console.log('User', user.toUserId.firstName)
    // const {firstName, lastName, age, gender, about, skills, profileUrl, _id} = user;
    

  return (
    <div className="flex items-stretch rounded w-4/6 p-2 bg-white shadow-2xl my-2">
        <Link className="w-1/4 flex" to={`/chat/${user._id}`}>
            <img
              src={user?.profileUrl}
              alt={`${user?.firstName} profile`}
              className="object-cover w-full h-full"
            />
        </Link>

        <div className="w-3/4 px-4 flex flex-col justify-center">
          {user?.firstName && user?.lastName &&
          <p className="text-black">
            {`${user?.firstName} ${user?.lastName}`}
          </p>}
          {(user?.age || user?.gender) &&
          <p className="text-black">
            Age: {user?.age}, Gender: {user?.gender}
          </p>}
          {user?.about &&
          <p className="text-black">
            {user?.about}
          </p>}
          {user?.skills && user?.skills?.length!==0 &&
          <p className="text-black font-medium text-lg">
            {user?.skills.join(" | ")}
          </p>}
          {
            flag &&
            <div className="flex my-2 gap-x-4">
                <button className="bg-green-700 py-1.5 px-8 rounded text-white font-medium hover:bg-green-500 " onClick={()=>handleRequest('accepted', user?._id)}>Accept</button>
                <button className="bg-red-700 py-1.5 px-8 rounded text-white font-medium hover:bg-red-500 " onClick={()=>handleRequest('rejected', user?._id)}>Reject</button>
          </div>
          }
        </div>
    </div>
  )
}

export default ConnectionCard