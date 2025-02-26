import Header from "./Components/Header"
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";


const Body = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default Body