import React from 'react'
import { useSelector } from 'react-redux'
const employeprofile = () => {

    const user = useSelector((state) => state.user)

  return (
    <div>
        <h1>Employee Profile</h1>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.role}</p>
        <p>{user.id}</p>
        <p>{user.profileimg || "img"}</p>    
    </div>
  )
}

export default employeprofile