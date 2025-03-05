import { useSelector } from "react-redux"
import ConnectionCard from "./ConnectionCard"

const ReceivedConnectionRequests = () => {
    const receivedRequests = useSelector(store => store.receivedConnection)

    if(!receivedRequests || receivedRequests.length === 0){
        return <p className="font-bold text-lg py-8 text-center min-h-[calc(100vh-50.9vh)] ">You don`t have any Connection Request</p>
    }
  return (
    <div className="text-center my-8">
        <h1 className="text-4xl font-bold font-serif underline hover:text-green-700">Received Connection Requests</h1>
        <div className="flex items-center justify-center gap-x-4 my-8">
            {
                receivedRequests?.map(request =>(
                    <ConnectionCard key={request._id} user={request} flag={true} />
                ))
            }
        </div>
    </div>
  )
}

export default ReceivedConnectionRequests