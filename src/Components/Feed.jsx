/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import FeedCard from "./FeedCard"
import axios from "axios"
import { BASE_URL } from "./Constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../Utils/feedSlice"

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);
    const handleFeed = async() => {
        try {
            const res = await axios.get(BASE_URL+"/user/feed",{withCredentials: true})
            dispatch(addFeed(res?.data?.user))
        } catch (error) {
            console.log("Error: ",error)
        }
    }

    useEffect(()=>{
        handleFeed();
    }, [])
    
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
        {
            feed?.map(user=><FeedCard key={user._id} user={user}/>)
        }
    </div>
  )
}

export default Feed