/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
// import FeedCard from "../Components/FeedCard"
import axios from "axios"
import { BASE_URL } from "../Components/Constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../Utils/feedSlice"
import { NoMoreProfiles } from "../Components/NoMoreProfiles"
import LoadingUI from "../Components/LoadingUI"
import SwipeArea from "../Components/SwipeArea"
import SwipeFeedback from "../Components/SwipeFeedback"
import Sidebar from "../Components/Sidebar"
// import Head from "../Components/Head"

const Feed = () => {
    const dispatch = useDispatch();
    // const feed = useSelector(store => store.feed);
    const [isLoadingUserProfiles, setIsLoadingUserProfiles] = useState(false);
    const swipeFeedback = 'liked'
    const swipeRight = (user) => {
        console.log('Swipe Right on:', user)
    }
    const swipeLeft = (user) => {
        console.log('Swipe Left on:', user)
    }

    const feed = [
        {
            _id: '12244gfrth5', 
            firstName: 'Diwakar', 
            lastName: 'Giri', 
            age: 23, 
            about: "slhirgldnvi hreu", 
            profileUrl: 'https://cdn.vectorstock.com/i/2000v/51/87/student-avatar-user-profile-icon-vector-47025187.avif'
        },
        {
            _id: '12244gfrth6', 
            firstName: 'Abhi', 
            lastName: 'Shek', 
            age: 24, 
            about: "slhirgldnvi hreugjj", 
            profileUrl: 'https://cdn.vectorstock.com/i/2000v/51/87/student-avatar-user-profile-icon-vector-47025187.avif'
        },
        {
            _id: '12244gfrth7', 
            firstName: 'yash', 
            lastName: 'raj', 
            age: 21, 
            about: "slhirgldnvi jhr snfirehin suegr", 
            profileUrl: 'https://cdn.vectorstock.com/i/2000v/51/87/student-avatar-user-profile-icon-vector-47025187.avif'
        },
        {
            _id: '12244gfrth5', 
            firstName: 'Ankit', 
            lastName: 'Giri', 
            age: 25, 
            about: "slhirgldnvi hreukfgirh sliire ughb", 
            profileUrl: 'https://cdn.vectorstock.com/i/2000v/51/87/student-avatar-user-profile-icon-vector-47025187.avif'
        },
    ]

    const showFeed = async() => {
        try {
            setIsLoadingUserProfiles(true);
            const res = await axios.get(BASE_URL+"/user/feed",{withCredentials: true})
            console.log('feed', res.data.feed);
            dispatch(addFeed(res?.data?.feed))
            setIsLoadingUserProfiles(false)
        } catch (error) {
            console.log("Error: ",error)
            setIsLoadingUserProfiles(false)
        }
    }

    useEffect(()=>{
        showFeed();
    }, [])
    
  return (
    <div className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden
	'>
        <Sidebar />
        <div className='flex-grow flex flex-col overflow-hidden'>
            {/* <Head /> */}
            <main className='flex-grow flex flex-col gap-44 justify-center items-center p-4 relative overflow-hidden'>
                {feed?.length >= 0 && !isLoadingUserProfiles && (
			    	<>
			    		<SwipeArea users={feed} swipeLeft={swipeLeft} swipeRight={swipeRight} />
                        <SwipeFeedback swipeFeedback={swipeFeedback} />
			    	</>
			    )}

			    {feed.length === 0 && !isLoadingUserProfiles && <NoMoreProfiles />}

			    {isLoadingUserProfiles && <LoadingUI />}

            </main>
        </div>
    </div>
  )
}

export default Feed