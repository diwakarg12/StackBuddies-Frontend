/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./Header"
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../Utils/userSlice";


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchuser = async() => {
    try {
      
      const res = await axios.get('http://localhost:3200/profile/view', {
        withCredentials: true
      });
      dispatch(addUser(res.data.user))

    } catch (error) {

      if(error.status === 401){
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
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default Body