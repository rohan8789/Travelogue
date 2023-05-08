import React, { useContext } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Memories from "./components/Memories";
import Mymemories from "./components/Mymemories";
import Memorydetail from "./components/Memorydetail";
import AddMemory from "./components/AddMemory";
import Auth from "./components/Auth";
import axios from "axios";
import AuthContext from "./store/AuthContextProvider";
import { PageNotFound } from "./components/PageNotFound";
axios.defaults.withCredentials=true;


function App() {
  const { isLoggedIn } = useContext(AuthContext);
  //adding functionality when user is not logged in show different navbar and when logged in, show different We will use redux for this
  // const isLoggedIn=useSelector(state=>state.isLoggedIn);
  // console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {isLoggedIn === false ? (
            <Route path="/Auth" element={<Auth />} />
          ) : (
            <>
              <Route exact path="/memories" element={<Memories />} />
              <Route path="/memories/add" element={<AddMemory />} />
              <Route path="/mymemories" element={<Mymemories />} />
              <Route path="/mymemories/:id" element={<Memorydetail />} />
            </>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
