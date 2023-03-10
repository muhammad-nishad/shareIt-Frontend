import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Datatable from "react-data-table-component"
import { useDispatch, useSelector } from 'react-redux'
import AdminTopbar from '../../components/AdminTopbar/AdminTopbar'

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

export default function ReportedPosts() {
  const refresh = useSelector((state) => state.admin.refresh)
  const dispatch = useDispatch()
  
  const [report,setReport]=useState([])
  const reportedPosts=()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/authorizer/reportedPosts`).then((response)=>{
      setReport(response.data)
      // dispatch({ type: 'REFRESH' })
      console.log(response.data,'report');
    })

  }

  
    const deletePost=(id)=>{
      console.log(id,'postid');
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/deletePost`,{postid:id}).then((response)=>{
        setReport((prev)=>prev.filter((r)=>r._id!==id))
        console.log(response,'response');
      })
    }



// useEffect(()=>{
//   deletePost()
// },[])

  
  useEffect(()=>{
    reportedPosts()

  },[])
  console.log(report,'report');

  const columns=[
    {
    name:"Post",
    selector:(report)=> <img maxwidth={"79px"} height={"109px"} src={report?.img}/>,
    sortable:true
  },

  {
    name:"Posted By",
    selector:(report)=> report?.userid.first_name,
    sortable:true
  },

  {
    name:"Reports",
    selector:(report)=> report?.report.length,
    sortable:true
  },
  {
    name:"Remove Post",
    selector:(report)=>
    <button style={style1}  onClick={()=>{
      deletePost(report._id)
    }}>Remove</button>,
    sortable:true
  },
  ]

 

  
  return (
    <>
    <AdminTopbar/>
     <div className="feedMain">
        <Datatable columns={columns} data={report} />
      </div>
      {
        report?.userid?.first_name
      }



   {/* {
    report?.map((data)=>(
      data.userid.first_name

    ))
   } */}





    </>
  )
}
