import { Routes, Route } from "react-router-dom"
import './App.css'
import Dashboard from "./components/Dashboard/Dashboard"
import AddItem from "./components/AddItem/AddItem"
import DisplayItem from "./components/DisplayItem/DisplayItem"
import UpdateItem from "./components/UpdateItem/UpdateItem"

function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/additem" element={<AddItem />}/>
        <Route path="/allitems" element={<DisplayItem />}/>
        <Route path="/updateitem/:modelNo" element={<UpdateItem />}/>
      </Routes>
    </>
  )
}

export default App
