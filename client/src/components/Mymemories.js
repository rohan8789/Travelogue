import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MemoryCard from './MemoryCard';
import jwt_decode from 'jwt-decode';

const Usermemories = () => {

  const [memory, setMemory]=useState();
  const auth_id = jwt_decode(localStorage.getItem("Access Token: "));
  const id=auth_id.id;
  // console.log(id);
  const sendRequest = async ()=>{
    const res = await axios.get(`http://localhost:5000/api/memories/user/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);
    return data;
  }


  useEffect(()=>{
    sendRequest().then((data)=>setMemory(data.user));
  },[])
  // console.log(memory);
  return (
    <div>
      {memory &&
        memory.Memorys &&
        memory.Memorys.map((Memory, index) => (
          // console.log(memory.image)
          <MemoryCard
            id={Memory._id}
            key={index}
            isUser={true}
            tittle={Memory.tittle}
            description={Memory.description}
            imageURL={Memory.image}
            userName={memory.name}
          />
        ))}
    </div>
  );
}

export default Usermemories