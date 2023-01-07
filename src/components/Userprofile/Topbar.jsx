import { PhotoCamera, Refresh } from '@mui/icons-material'
import { Avatar, Box, Button, IconButton, Modal, Typography } from '@mui/material'
import { height, margin, padding } from '@mui/system'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import './topbar.css'
import { useDispatch, useSelector } from 'react-redux'
// import { useFormik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 300,
    borderRadius: 5,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,

};

export default function Topbar({ id, profile, post, following, setFollowing }) {
    const { user } = useSelector(state => ({ ...state }))
    const navigate = useNavigate()
    let tokenData = Cookies.get('user')
    tokenData = JSON.parse(tokenData)
    const refresh = useSelector((state) => state.user.refresh)
    const { token } = tokenData
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const [image, setImage] = useState()
    const [editData, setEditData] = useState({})
    useEffect(() => setEditData({ firstName: profile?.first_name, lastName: profile?.last_name }), [profile])
    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", image)
        console.log(formData, 'formdata');
        formData.append("upload_preset", "kacy6ucl")
        axios.post("https://api.cloudinary.com/v1_1/dl0nkbe8b/image/upload", formData).then((response) => {
            const img = response.data.url
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/addProfilePicture`, { img }, { headers: { token: token } }).then(({data}) => {
                Cookies.remove('user')
                Cookies.set("user", JSON.stringify(data.user))
                dispatch({ type: 'ADD_PROFILE',payload:data.user })
                dispatch({ type:'REFRESH' })
                handleClose()
            })

        })

    }
    const followUser = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/follow`, { userid: id }, { headers: { token: token } }).then((data) => {
            setFollowing(prev => !prev)
            dispatch({ type: 'REFRESH' })
        })
    }
    const unFollowUser = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/unfollow`, { userid: id }, { headers: { token: token } }).then((data) => {
            setFollowing(prev => !prev)
            dispatch({ type: 'REFRESH' })
        })
    }

    const removeImg=()=>{
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/removeProfile`,{},{ headers: { token: token } }).then(({data})=>{
            handleClose()
            Cookies.set("user", JSON.stringify(data.user))
            dispatch({ type: 'ADD_PROFILE',payload:data.user })
            dispatch({ type: 'REFRESH' })
        })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateUserDetails`, { editData }, { headers: { token: token } }).then((data) => {
            // console.log(data, 'getuserprofile');
            handleClose2()
            dispatch({ type: 'REFRESH' })
        })
    }

    const createChat = (userid, id) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat`, { senderId: userid, receiverId: id }).then(({ data }) => {
            if (data === "ok") {
                navigate('/chat')
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    // useEffect(() => {
    //     followUser()

    // }, [])



    return (
        <div style={{ maxWidth: "600px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img onClick={handleOpen} style={{ width: "160px", height: "160px", borderRadius: '80px', cursor: 'pointer', objectFit: "cover" }}
                        src={profile && profile.profilePicture ? profile.profilePicture : '/icons/blankprofile.webp'}
                    />

                    {
                        user?._id === profile?._id ?
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <div className='profile'>
                                        <h4 style={{ display: "flex", justifyContent: "center" }}  >Change Profile Photo</h4>
                                        <hr />
                                        <div style={{ display: "flex", justifyContent: "space-evenly" }} >
 
                                            <label  style={{cursor:"pointer"}} htmlFor="profileInp">choose from your library </label>
                                            <input hidden id='profileInp' onChange={(e) => {
                                                setImage(e.target.files[0]);
                                            }} accept="image/*" type="file" />

                                            <div>

                                            <button onClick={uploadImage}
                                                style={{ color: 'rgb(71, 175, 255)', borderRadius: "7px", cursor: "pointer", border: "1px", backgroundColor: "white" }} > Upload
                                            </button>
                                            </div>

                                        </div>
                                        <hr />
                                        <div style={{ display: "flex", justifyContent: "center" }} >
                                            <button style={{ color: 'red', borderRadius: "7px", cursor: "pointer", border: "1px", backgroundColor: "white" }} onClick={removeImg}  >Remove Current Photo</button>
                                        </div>
                                        <hr />
                                        <div style={{ display: "flex", justifyContent: "center" }} >
                                            <button onClick={handleClose}  style={{ height: "34px", color: 'red', borderRadius: "7px", cursor: "pointer", border: "1px", backgroundColor: "white" }} >Cancel</button>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                            : null
                    }

                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", paddingRight: "120px", gap: "30px", fontWeight: 300 }}>
                    <h3 style={{ display: 'flex', width: "100%" }} >{profile?.first_name && profile.first_name}</h3>
                    {
                        user?._id == profile?._id ? <button onClick={() => {
                            handleOpen2()
                        }} style={{ backgroundColor: "white", color: "black", borderRadius: "7px", height: '34px', border: '1px solid', cursor: "pointer", width: "90px", marginLeft: "10px" }}>Edit profile</button>
                            :
                            <div>
                                {
                                    !following ?
                                        <button onClick={followUser} style={{ backgroundColor: '#47afff', color: "white", borderRadius: "7px", height: '34px', width: '90px', border: 'aliceblue', cursor: "pointer" }} >follow</button>
                                        :
                                        <>
                                            <button onClick={() => {
                                                createChat(user._id, id)
                                            }} style={{ backgroundColor: "white", color: "black", borderRadius: "7px", height: '34px', border: '1px solid', cursor: "pointer", width: "90px", marginLeft: "10px" }}>message</button>
                                            <button onClick={unFollowUser} style={{ backgroundColor: "#47afff", color: "white", borderRadius: "7px", height: '34px', border: '1px solid', cursor: "pointer", width: "90px", marginLeft: "10px" }}  >unfollow</button>
                                        </>

                                }

                            </div>
                    }
                    {
                        user?._id == profile?._id ?

                            <Modal
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <form >
                                        <div >
                                            <label>first name</label>
                                            <input
                                                type={"text"}
                                                onChange={(e) => { setEditData(prev => ({ ...prev, firstName: e.target.value })) }}
                                                value={editData.firstName}
                                                name='first_name'
                                            />
                                            <label>last name</label>
                                            <input
                                                type={"text"}
                                                onChange={(e) => { setEditData(prev => ({ ...prev, lastName: e.target.value })) }}
                                                value={editData.lastName}
                                                name='last_name'
                                            />
                                            <div>
                                                <button type='submit' onClick={onSubmit} style={{ width: "57px", height: "40px", marginTop: "10px", border: "aliceblue", marginLeft: "8rem", color: "white", backgroundColor: "rgb(71, 175, 255)", cursor: "pointer" }}>submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </Box>
                            </Modal>
                            : null
                    }
                    <div style={{ display: "flex", justifyContent: "space-between", width: "140%" }}>
                        <h6>{post && post.length} posts</h6>
                        <h6>{profile?.followers && profile?.followers.length} followers</h6>
                        <h6>{profile?.following && profile?.following.length} following</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
