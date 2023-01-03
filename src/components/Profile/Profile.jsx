import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import { postsReducer } from '../../functions/reducers'
import Navbar from '../Navbar/Navbar'
import Post from '../Post/Post'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Userprofile/Topbar'
import './style.css'

export default function Profile({id , own}) {
  const [{ posts }, dispatch] = useReducer(postsReducer, { posts: [] })
  const [post,setPosts]= useState([])
  const [following,setFollowing] = useState(false)
  const [profile,setProfile]=useState()
  // console.log(posts, 'posts');
  const { user } = useSelector(state => ({ ...state }))
  const refresh = useSelector((state) => state.user.refresh)
  const token = user?.token

  const getUserProfile = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getUserProfile/${id ? id : user._id}`, { headers: { token: token } }).then(({ data }) => {
      console.log(data.following,'following');
      // Cookies.set("user",JSON.stringify(data.user))
      dispatch({ type:'REFRESH' })
      setProfile(data.user)
      setPosts(data.post)
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data.post
      })
      setFollowing(data.following)
    }).catch(err => {
      console.log(err, 'catch block of axios');
    })

  }
  useEffect(() => {
    getUserProfile()
  }, [refresh])
  useEffect(() => {
    console.log(following)
  }, [following])


  return (
    <>
      <Navbar />

      <Topbar id={id} profile={profile} post={post} following={following} setFollowing={setFollowing} />

      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          {
            posts?.map((post) => (<Post key={post._id} post={post} profile={profile}  />))
          }
          {/* {
      posts._id
    } */}
        </div>
      



    </>
  )
}
