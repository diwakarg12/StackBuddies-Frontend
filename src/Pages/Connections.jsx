import ConnectionCard from "../Components/ConnectionCard"
import { useSelector } from "react-redux";

const Connections = () => {
  const connections = useSelector(store => store.connection);
  console.log('Connections', connections)
  
  if(!connections || connections.length==0){
    return <div className="h-[calc(100vh-8.5rem)] bg-gray-100 flex items-center justify-center">
      <h1 className="font-semibold text-3xl text-black">No Connection Found</h1>
    </div>
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-16">
      <h1 className="text-black text-5xl font-bold font-serif underline hover:text-green-700">Connections</h1>
      <div className="flex flex-col items-center justify-center mt-8">
        {
          connections?.map((user)=>(
            <ConnectionCard user={user} key={user._id} flag={false} />
          ))
        }

      </div>
    </div>
  )
}

export default Connections