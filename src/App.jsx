import { BrowserRouter, Routes, Route } from "react-router-dom"
import Body from "./Pages/Body"
import Login from "./Pages/Login"
import Profile from "./Pages/Profile"
import Connections from "./Pages/Connections"
import { Provider } from "react-redux"
import appStore from "./Utils/appStore"
import Feed from "./Pages/Feed"
import Signup from "./Pages/Signup"
import ConnectionRequests from "./Pages/ConnectionRequests"
import NotFound from "./Pages/NotFound"

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
          <Route path="/connection-requests" element={<ConnectionRequests />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
