import React from 'react'
import Punchsection from './punchsection'



const Maindashboard = () => {
  return (
    <div className=' flex flex-col gap-5'>
      <div className='mb-5'>
        <h1 className='font-bold text-2xl text-black'>Dashboard</h1>
      </div>
      <Punchsection />
    </div>
  )
}

export default Maindashboard