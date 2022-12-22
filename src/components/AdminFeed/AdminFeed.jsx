
import React, { useState } from 'react'
import Datatable from "react-data-table-component"
import axios from "axios"
import { useEffect } from 'react'
import './AdminFeed.css'

const style1={
  width:'60px',
  height:"30px",
  backgroundColor:"red",
  color:"white",
  padding:"4px",
  border:"1px solid",
  borderRadius:"5px",
  fontSize:'10px',
  cursor:"pointer"
}
const style2={
  width:'60px',
  height:"30px",
  backgroundColor:"green",
  color:"white",
  padding:"4px",
  border:"1px solid",
  borderRadius:"5px",
  fontSize:'10px',
  cursor:"pointer"

}

export default function AdminFeed() {
  const [users, setUsers] = useState([])
  const getAllUsers = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/authorizer/getUsers`)
    setUsers(data)
  }
  const userManagement=(id)=>{
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/authorizer/userManagement`,{id}).then((response)=>{
        console.log(response);
        getAllUsers()
      })
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  const columns = [
    {
      name: "First name",
      selector: (users) => users.first_name,
      sortable: true

    },
    {
      name: "Last name",
      selector: (users) => users.last_name,
      sortable: true

    },
    {
      name: "Email",
      selector: (users) => users.email,
      sortable: true

    },
    {
      name: "Active Status",
      selector: (users) =>
      <button  style={users.Active ? style1 : style2} onClick={()=>{
        userManagement(users._id)
      }} >
        {
          users.Active ?
          "BLOCK"
          :'ACTIVE'
        }
      </button>
      ,
      sortable: true
    },
  ]
  return (
    <>
      <div className="feedMain">
        <Datatable columns={columns} data={users} />
      </div>
    </>

  )
}
