import React, { useEffect } from 'react'
import axios from 'axios'
import Post from './Post';
import { postsReducer } from '../../functions/reducers';
import { useSelector } from 'react-redux';



function Posts({ posts, dispatch }) {
  const { user } = useSelector(state => ({ ...state }))
  const refresh = useSelector((state) => state.user.refresh)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getposts`, { headers: { token: user?.token } }).then(({ data }) => {
      console.log('get all post 999999999999999999999',data);
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data
      })
      console.log("done")
    }).catch(err => {
      console.log(err, 'catch block of axios');
    })
  }, [refresh])
  return (
    <>
      {
        posts?.map((post) => (<Post key={post._id} post={post} feed />))
      }
    </>
  )
}

export default Posts
