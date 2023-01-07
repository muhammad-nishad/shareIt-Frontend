import { Box } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Post from '../Post/Post'

export default function SavedPosts() {
  const [post,setPost]=useState([])
  const [users,setUsers]=useState()
  const refresh = useSelector((state) => state.user.refresh)
  let tokenData = Cookies.get('user')
  tokenData = JSON.parse(tokenData)
  const { token } = tokenData
  const savedPosts=()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getallSavedPosts`,{headers:{token:token}}).then(({data})=>{
      console.log(data,'getallsavedposts');
      setPost(data.savedPosts)
    })
  }
  useEffect(()=>{
    savedPosts()

  },[refresh])
  return (
    <>
    <Box flex={4} p={1} sx={{
        display:'flex',
        flexDirection: 'column',
        alignContent: 'center',
        flexWrap: 'wrap',
    }}   >
      

    { 
    post &&
    post.map((post)=> (<Post   post={post} savedPost  />))  
    
  }
  </Box>
  

    




    </>
  )
}
