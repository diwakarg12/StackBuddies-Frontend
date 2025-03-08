import { useSelector } from "react-redux"
import ConnectionCard from "./ConnectionCard";

const SentConnectionRequests = () => {
    const sentRequests = useSelector(store => store.sentConnection);
    console.log('sentReqs', sentRequests)
    if(!sentRequests || sentRequests.length === 0){
        return <p className="font-bold text-lg py-8 text-center text-black min-h-[calc(100vh-50.9vh)] ">You have`t sent any Connection Request</p>
    }
  return (
    <div className="my-8">
        <div className="flex flex-col items-center justify-center">
            {
                sentRequests?.map(request =>(
                    <ConnectionCard key={request._id} user={request.toUserId} flag={false}  />
                ))
            }

        </div>
    </div>
  )
}

export default SentConnectionRequests