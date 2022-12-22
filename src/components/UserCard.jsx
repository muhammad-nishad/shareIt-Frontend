import { Button } from '@mui/material'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useEffect } from 'react';

function UserCard({ data, type }) {
    console.log(data, 'props');
    const [users, setUsers] = useState()
    let tokenData = Cookies.get('user')
    tokenData = JSON.parse(tokenData)
    const { token } = tokenData
    const [follow, setFollow] = useState(type)
    const unfollowUser = async (id) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/unfollow`, { userid: id }, { headers: { token: token } }).then((response) => {
            console.log(response);
        })
    }
    // const getAllFollowing = async (id) => {
    //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/getallFollowing`, { headers: { token: token } }).then((response) => {
    //     })
    // }
    const followuser = async (id) => {
        console.log(id, 'follwoing id');
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/follow`, { userid: id }, { headers: { token: token } }).then((response) => {
            console.log(response, 'response');
        })
    }
    return (
        <div style={{ width: "10vw", display: "flex", alignItems: "center", flexDirection: "center", paddingTop: 25, paddingLeft: 30, gap: 12 }}>
            <div style={{ border: "0px solid black", display: "flex", alignItems: "center", flexDirection: "column", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                {
                    data?.profilePicture ? <img style={{ maxWidth: "8vw", height: "20vh", borderRadius: 20, objectFit: 'cover' }} src={data.profilePicture} /> :

                        <img style={{ maxWidth: "8vw", height: '20vh', borderRadius: 20 }} src='icons/blankprofile.webp' />
                }
                <div style={{ marginTop: 10 }}>

                    {
                        data.user_name
                    }
                </div>
                {
                    follow === "follow" ?
                        <Button style={{ display: "flex", paddingTop: 10 }} onClick={() => {
                            followuser(data._id);
                            setFollow("following")
                        }} variant="contained" >Follow</Button>
                        :
                        follow === "following" ?
                            <Button onClick={() => {
                                unfollowUser(data._id);
                                setFollow("follow")
                            }}
                                variant="contained" >Unfollow</Button>
                            : ""
                }
            </div>
        </div>
    )
}
export default UserCard