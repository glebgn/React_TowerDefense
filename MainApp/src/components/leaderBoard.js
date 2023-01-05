import React, { useState, useEffect}from "react";
import './leaderBoard.css';

export const LeaderBoard = () => {
  const [user, setUsers] = useState(0);
  
  let username = localStorage.getItem("user")
  
  const getUsers = async () => {
    // Simple GET request using fetch
    try{
      const response = await fetch('http://localhost:8000/users/')
      const json = await response.json();
      setUsers(json.map(function(obj) {
        return <tr><td>{obj.user_nickname}</td><td>{obj.user_score}</td></tr>
       })
      )
      }catch (error) {
        console.error(error);
      } 
    }

  useEffect(() => {getUsers()},[]);
// empty dependency array means this effect will only run once (like componentDidMount in classes)
  return (
  <div className="row content">
      <table className="users ">
         <thead>
            <th><b>Player</b></th>
            <th><b>Highest Score</b></th>
         </thead>
         <tbody>
            {user}
         </tbody>
      </table>
   </div>
  );
}