/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import ConnectionCard from "./ConnectionCard";
import { useEffect } from "react";
import { addSentConnection } from "../Utils/sentConnectionSlice";
import axios from "axios";
import { BASE_URL } from "./Constants";

const SentConnectionRequests = () => {
    const dispatch = useDispatch();
    const sentRequests = useSelector(store => store.sentConnection);
    console.log('sentReqs', sentRequests)

     const fetchSentRequests = async() =>{
    try {
      const sentRequests = await axios.get(BASE_URL+"/user/reviewSentRequests", {withCredentials: true});
      console.log('Sent',sentRequests?.data?.sentRequests);
      dispatch(addSentConnection(sentRequests?.data?.sentRequests))
    } catch (error) {
      console.log('Error: ',error)
    }
  }
  useEffect(()=>{
    fetchSentRequests();
  }, [])
    if(!sentRequests || sentRequests.length === 0){
        return <p className="font-bold text-lg py-8 text-center min-h-[calc(100vh-50.9vh)] ">You have&apos;t sent any Connection Request</p>
    }
  return (
    <div className="my-8">
        <div className="flex flex-col items-center justify-center">
            {
                sentRequests?.map((request, index) =>(
                    <ConnectionCard key={index} user={request?.toUserId} flag={false}  />
                ))
            }

        </div>
    </div>
  )
}

export default SentConnectionRequests