import { Routes, Route } from "react-router-dom"
// import Home from "./pages/home/Home";
import Login from "./pages/login";
import Admin from "./pages/admin/Admin";
import Adminhome from "./pages/adminhome/Home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import AdminRoute from "./routes/AdminRoute";
import AdminNotloggedin from "./routes/AdminNotloggedin";
import UserHome from "./components/userhome/UserHome";
import ProfilePage from "./pages/profile";
import Community from "./pages/community/Community";
import ReportedPosts from "./pages/ReportedPosts/ReportedPosts";
import Chat from "./pages/Chat/Chat";
import AdminFeed from "./components/AdminFeed/AdminFeed";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes />} >
          <Route path="/" element={<UserHome />} exact />
          <Route path="/:type" element={<UserHome />} exact />
          <Route path="/profile" element={<ProfilePage />} exact />
          <Route path="/profile/:id" element={<ProfilePage />} exact />
          <Route path='/chat' element={<Chat />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route element={<AdminRoute />}  >
          <Route path="/authorizer/home" element={<Adminhome />} exact />
          <Route path="/authorizer/users" element={<AdminFeed />} />
          <Route path="/authorizer/reportedPosts" element={<ReportedPosts />} exact />
        </Route>
        <Route element={<AdminNotloggedin />}>
          <Route path="/authorizer" element={<Admin />} exact />
        </Route>
      </Routes>
    </div>
  )
}

export default App;