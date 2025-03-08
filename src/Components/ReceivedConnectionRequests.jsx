import { useSelector } from "react-redux"
import ConnectionCard from "./ConnectionCard"

const ReceivedConnectionRequests = () => {
    const receivedRequests = useSelector(store => store.receivedConnection)

    if(!receivedRequests || receivedRequests.length === 0){
        return <p className="font-bold text-lg py-8 text-center text-black min-h-[calc(100vh-50.9vh)] ">You haven`t Received any Connection Request</p>
    }
  return (
    <div className="my-8">
        <div className="flex flex-col items-center justify-center">
            {
                receivedRequests?.map(request =>(
                    <ConnectionCard key={request._id} user={request.fromUserId} flag={true} />
                ))
            }
        </div>
    </div>
  )
}

export default ReceivedConnectionRequests