import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


export default function AdminNotloggedin(){
    const {admin} = useSelector((state)=>({...state}))
    console.log(admin,"kljdfljsdflkjdsl")
    return admin.token ? <Navigate to="/authorizer/home" /> : <Outlet />
}