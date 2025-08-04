import { React, useState, useEffect , useRef } from 'react'
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom'
import AllUsers from './admindashboard/allusers'
import ProjectSummary from './admindashboard/projectsummary'
import Adminaction from './admindashboard/adminaction.jsx'
import CalendarComponent from '../calender/calender.jsx'
import Chat from '../groupchats/chat.jsx'
import { useVerifyisadminMutation } from '../../redux/adminapislice.js'
import { useSelector } from 'react-redux'
const MainDashboard = () => {
  const location = useLocation();

  const id = useSelector((state) => state.user.id)
  // const isActive = (path) => location.pathname === `/admin/${path}`;
  const [isadmin, setisadmin] = useState(false)
  const [veryify] = useVerifyisadminMutation()
  const [pendingleaves , setpendingleaves] = useState(0)

  useEffect(() => {
    veryify(id).unwrap().then((v) => {
      console.log("is admin" , v)
      setpendingleaves(v.pendingleaves)
      setisadmin(true)
    })
  }, [])

  if (isadmin) {

    return (
      <div>
        <Adminaction pendingleaves={pendingleaves} />
        <Outlet />
      </div>
    )
  }
}

export default MainDashboard
