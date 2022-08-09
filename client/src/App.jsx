//Import
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./config/firebase.js";

import { useRecoilState } from "recoil";
import { userState } from "./recoil/LoginAtom.js";

//Component
import Login from "./component/login/Login.jsx";
import Home from "./component/home/Home.jsx";
import Detail from "./component/post/PostDetail.jsx"

//Style
import "./App.css";

function App() {
  const [user, setUser] = useRecoilState(userState);

  

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (userInfo) => {
      console.log(user) 
      console.log(userInfo)

      if (userInfo) {
        setUser(() => {
          return {
            isLogin: true,
            userDoc: userInfo,
          };
        });
      } else {
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:postId" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
