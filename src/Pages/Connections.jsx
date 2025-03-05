/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ConnectionCard from "../Components/ConnectionCard"
import axios from "axios";
import { BASE_URL } from "../Components/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../Utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connection);
  const fetchConnection = async() => {
    try {
      const res = await axios.get(BASE_URL+'/user/connections', {withCredentials: true});
      console.log("Connections",res.data.connections);
      dispatch(addConnection(res.data.connections))
    } catch (error) {
      console.log("Error", error)
    }
  };

  useEffect(()=>{
    fetchConnection();
  }, [])
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <h1 className="text-5xl font-bold font-serif underline hover:text-green-700">Connections</h1>
      <div className="flex flex-wrap items-center justify-center gap-x-4 my-8">
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