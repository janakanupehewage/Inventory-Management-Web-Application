import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

const navigate = useNavigate();

  return (
    <div>
      <button onClick={()=>navigate("/additem")}>Add Item</button>
      <button onClick={()=>navigate("/allItems")}>Display Items</button>
      <button onClick={()=>navigate("/register")}>Register</button>
      <button onClick={()=>navigate("/login")}>Log in</button>
    </div>
  )
}

export default Dashboard
