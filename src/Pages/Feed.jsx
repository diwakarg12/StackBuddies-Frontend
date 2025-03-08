/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import FeedCard from "../Components/FeedCard"
import axios from "axios"
import { BASE_URL } from "../Components/Constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../Utils/feedSlice"

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);

    const showFeed = async() => {
        try {
            const res = await axios.get(BASE_URL+"/user/feed",{withCredentials: true})
            console.log('feed', res.data.feed);
            dispatch(addFeed(res?.data?.feed))
        } catch (error) {
            console.log("Error: ",error)
        }
    }

    useEffect(()=>{
        showFeed();
    }, [])

    if(!feed || feed.length === 0){
        return <h1 className="text-center py-20 text-3xl font-semibold">No more user left in the feed</h1>
    }
    
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <FeedCard user={feed[0]}/>  
    </div>
  )
}

export default Feed