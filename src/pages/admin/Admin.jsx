import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { StarRate } from '@mui/icons-material';


export default function Admin() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password1: '',
        },
        onSubmit: values => {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/authorizer/login`, values).then(({data}) => {
                // console.log(data,'adminlogin');
                localStorage.setItem('admin',JSON.stringify(data.admin))
                dispatch({type:"ADMIN_LOGIN",payload:data.admin})
                if (data.admin) {
                    navigate('/authorizer/home')
                } else {
                    console.log('failed');
                }
            })
        }
    }

    )
    const paperStyle = { padding: '30px 20px', width: 480, margin: "140px auto" }
    const headerStyle = { margin: 10 }
    const avatarStyle = { backgroundColor: 'black' }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle} >
                <Grid align='center' >
                    <Avatar style={avatarStyle}>
                    </Avatar>
                    <h2 style={headerStyle}>ADMIN LOGIN</h2>
                    <Typography variant='caption'>Please fill this form to login !!</Typography>
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                    <TextField fullWidth size='small' variant='standard' onChange={formik.handleChange} label="Email" name='email' placeholder='Enter your Email' value={formik.values.email} />
                    <TextField fullWidth size='small' variant='standard' onChange={formik.handleChange} label="Password" name='password1' type='password' placeholder='Enter your Password' value={formik.values.password1} />
                    <Button type='submit' sx={{ marginTop: '25px' }} fullWidth variant='contained' color='primary' >Sign IN</Button>
                </form>
            </Paper>

        </Grid>

    )
}
