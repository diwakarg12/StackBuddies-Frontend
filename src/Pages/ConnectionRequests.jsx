import { useState } from "react";
import ReceivedConnectionRequests from "../Components/ReceivedConnectionRequests"
import SentConnectionRequests from "../Components/SentConnectionRequests"

const ConnectionRequests = () => {
  const [request, setRequest] = useState(1);
  const handleShowComponent = (value) => {
    setRequest(value);
  }
  
  return (
    <div className="min-h-[calc(100vh-7.35rem)] py-8 bg-gradient-to-br
		from-red-500 to-pink-500 text-white">
      <div className="flex items-center justify-center gap-x-6">
        <button className={`btn ${request===1 ? ' bg-white text-red-500': 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-stone-50'} px-8 py-1 font-bold shadow-md`} onClick={()=>handleShowComponent(1)}>Received Requests</button>
        <button className={`btn ${request===2 ? ' bg-white text-red-500 ': 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-stone-50'} px-8 py-1 font-bold shadow-md`} onClick={()=>handleShowComponent(2)}>Sent Requests</button>
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