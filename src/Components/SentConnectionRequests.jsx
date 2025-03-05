import { useSelector } from "react-redux"
import ConnectionCard from "./ConnectionCard";

const SentConnectionRequests = () => {
    const sentRequests = useSelector(store => store.sentConnection);
    if(!sentRequests || sentRequests.length === 0){
        return <p className="font-bold text-lg py-8 text-center min-h-[calc(100vh-50.9vh)] ">You have not sent any Connection Request</p>
    }
  return (
    <div className="text-center my-8">
        <h1 className="text-4xl font-bold font-serif underline hover:text-green-700">Sent Connection Requests</h1>
        <div className="flex items-center justify-center gap-x-4 my-8">
            {
                sentRequests?.map(request =>(
                    <ConnectionCard key={request._id} user={request} flag={false}  />
                ))
            }
        </div>
    </div>
  )
}

export default SentConnectionRequests