import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom"
import Home from "./components/Home";
import Login from "./components/Login";
import { getAccessToken, setToken } from "./redux/APISlice";
import RecentlyPlayed from "./components/RecentlyPlayed";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase-config";




function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));

  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login user={user}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/recent" element={<RecentlyPlayed />} />
      </Routes>

    </>
  );
}

export default App;
