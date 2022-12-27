import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Login from "../pages/login"

export default function LoggedInRoutes() {
    const { user } = useSelector((state) => ({ ...state }))
    return Object.keys(user)?.length ? <Outlet /> : <Login /> 
}
