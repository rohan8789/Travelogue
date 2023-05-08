import React, { useState, useEffect } from "react";
import axios from "axios";
import MemoryCard from "./MemoryCard";
import jwt_decode from "jwt-decode";
// axios.defaults.withCredentials=true;


const Memories = () => {
  const [memories, setMemories] = useState();
  const [uid, setUid] = useState();
  // const token = localStorage.getItem("Access Token");
  //it will allow us to run after every render. once any dependency in the array will change then useEffect will render the whole component again
  const auth_id=jwt_decode(localStorage.getItem("Access Token: "));
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/memories",{
        withCredentials:true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);
    return data;
    //we get data as array of blocks so we need to store the blocks also. so, declare useState
  };
  useEffect(() => {
    sendRequest().then((data) => setMemories(data.m_cards));
    
  }, []);

  console.log("Memories")
  // console.log(memories);

  return (
    <div>
      {memories &&
        memories.map((memory, index) =>(
          
          <MemoryCard 
            id = {memory._id}
            key={index}
            isUser={auth_id.id===memory?.creator?._id}
            tittle={memory.tittle}
            description={memory.description}
            imageURL={memory.image}
            userName={memory?.creator?.name}
          />
      ))}
    </div>
  );
};

export default Memories;
