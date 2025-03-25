import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

const navigate = useNavigate();

  return (
    <div>
      <button onClick={()=>navigate("/additem")}>Add Item</button>
      <button onClick={()=>navigate("/allItems")}>Display Items</button>
    </div>
  )
}

export default Dashboard
