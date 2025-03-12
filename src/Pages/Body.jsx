/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../Components/Header"
import Footer from "../Components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../Utils/userSlice";
import { initializeSocket } from "../Socket/socket.client";


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchuser = async() => {
    try {
      
      const res = await axios.get('http://localhost:3200/profile/view', {
        withCredentials: true
      });
      initializeSocket(res?.data?.user?._id)
      dispatch(addUser(res?.data?.user))
    } catch (error) {

      if(error.status === 401 || error.status===404){
        navigate('/login');
      }else{
        console.log("Error", error.message)
      }
      
    }
  }

  useEffect(()=>{
    fetchuser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
    <Header />
    <div className="flex-grow">
      <Outlet />
    </div>
    <Footer />
    </div>
  )
};

export default Body