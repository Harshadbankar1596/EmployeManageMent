import React from 'react'
import Punchsection from './punchsection'

const Maindashboard = () => {
  return (
    <div className=' flex flex-col gap-5 my-5'>
      <div className='m-2'>
        <h1 className='font-bold text-2xl text-blue-900 '>Dashboard</h1>
      </div>
      <Punchsection />
    </div>
  )
}

export default Maindashboard