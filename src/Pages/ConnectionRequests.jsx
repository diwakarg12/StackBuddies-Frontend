import axios from "axios"
import { BASE_URL } from "../Components/Constants"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addReceivedConection } from "../Utils/receivedConnectionSlice"
import ReceivedConnectionRequests from "../Components/ReceivedConnectionRequests"
import SentConnectionRequests from "../Components/SentConnectionRequests"
import { addSentConnection } from "../Utils/sentConnectionSlice"

const ConnectionRequests = () => {
  const [request, setRequest] = useState(1);
  const dispatch = useDispatch();
  const handleShowComponent = (value) => {
    setRequest(value);
  }
  const fetchRequests = async() => {
    try {
      const receivedRequests = await axios.get(BASE_URL+'/user/reviewReceivedRequest', {},{withCredentials: true});
      const sentRequests = await axios.get(BASE_URL+'/user/reviewSentRequests', {}, {withCredentials: true});
      console.log('Sent',sentRequests.data.SentRequests);
      console.log('Received',receivedRequests.data.receivedRequests);
      dispatch(addReceivedConection(receivedRequests.data.connections))
      dispatch(addSentConnection(sentRequests.data.SentRequest))
    } catch (error) {
      console.log('Error: ',error)
    }
  }

  useEffect(()=>{
    fetchRequests();
  })
  return (
    <div className="text-center my-8">
      <div className="flex items-center justify-center gap-x-6 my-8">
        <button className={`btn ${request===1 ? 'btn-success text-white': 'btn-soft'} px-8 py-1 font-bold`} onClick={()=>handleShowComponent(1)}>Received Requests</button>
        <button className={`btn ${request===2 ? 'btn-success text-white': 'btn-soft'} px-8 py-1 font-bold`} onClick={()=>handleShowComponent(2)}>Sent Requests</button>
      </div>
      {
        request === 1 ?(
          <ReceivedConnectionRequests />
        ):(
          <SentConnectionRequests />
        )
      }
    </div>
  )
}

export default ConnectionRequests