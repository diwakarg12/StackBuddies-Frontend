import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./Components/Body"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import Connections from "./Components/Connections"
import { Provider } from "react-redux"
import appStore from "./Utils/appStore"
import Feed from "./Components/Feed"
import Signup from "./Components/Signup"

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes >
        <Route path="/" element={<Body />} >
        <Route path="/" element={<Feed />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/connections" element={<Connections />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
