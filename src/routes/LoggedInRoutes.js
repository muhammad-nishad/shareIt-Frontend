import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Login from "../pages/login"

export default function LoggedInRoutes() {
    const { user } = useSelector((state) => ({ ...state }))
    console.log(user,'usrform login in jjjjj');
    return Object.keys(user)?.length ? <Outlet /> : <Login /> 
}
