import { Button } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useEffect } from 'react'
import UserCard from '../UserCard'

export default function People() {
    let tokenData = Cookies.get('user')
    tokenData = JSON.parse(tokenData)
    const { token } = tokenData

    const [users, setUsers] = useState([])
    const getUser = async () => {
         axios.get(`${process.env.REACT_APP_BACKEND_URL}/getPeopleMayKnow`,{ headers: { token: token } }).then(({data})=>{
            console.log(data,'people you may know')
            setUsers(data)
        })
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
         {
            users?.map((data) =>(
                <UserCard type="follow" data={data} />
            )
                )}

        </>
    )
}
