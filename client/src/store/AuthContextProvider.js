import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [isLoggedIn, setLoggedIn] =useState(undefined);

    const getIsLoggedIn = async()=>{
        const res = await axios.get("http://localhost:5000/api/user/isloggedin");
        setLoggedIn(res.data);
    }

    useEffect(()=>{
        getIsLoggedIn();
    })


  return (
    <AuthContext.Provider value = {{isLoggedIn, getIsLoggedIn}}>{props.children}</AuthContext.Provider>
  )
}

export default AuthContext;
export {AuthContextProvider};
 