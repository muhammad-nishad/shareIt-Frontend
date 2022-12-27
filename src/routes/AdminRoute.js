import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
export default function AdminRoute() {
    const { admin } = useSelector((state) => ({ ...state }))
    console.log(admin,"kljdfljsdflkjdslfjlsdjflksd")
    return admin.token ? <Outlet /> : <Navigate to="/authorizer" />
}