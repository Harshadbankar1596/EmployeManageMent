import { React, useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom'
import Adminaction from './admindashboard/adminaction.jsx'
import { useVerifyisadminMutation } from '../../redux/adminapislice.js'
import { useSelector } from 'react-redux'
import Loader from '../loader.jsx'
const MainDashboard = () => {

  const id = useSelector((state) => state.user.id)
  const [isadmin, setisadmin] = useState(false)
  const [veryify, { isLoading, isError }] = useVerifyisadminMutation()
  const [pendingleaves, setpendingleaves] = useState(0)

  useEffect(() => {
    veryify(id).unwrap().then((v) => {
      setpendingleaves(v.pendingleaves)
      setisadmin("admin")
    })
  }, [])

  if (isadmin === "admin") {
    return (
      <div>

        {isLoading && (
          <Loader />
        )}

        <div>
          
          <div className="lg:hidden ">
            
              <Adminaction pendingleaves={pendingleaves} />
            
          </div>
          <Outlet />

        </div>

      </div>
    )
  }
}

export default MainDashboard
