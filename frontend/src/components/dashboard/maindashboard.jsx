import React from 'react'
import Punchsection from './punchsection'
import { useVerifyTokenQuery } from '../../redux/apislice'



const Maindashboard = () => {
  return (
    <div className='py-5 flex flex-col gap-5'>
      <div className='mb-5'>
        <h1 className='font-bold text-2xl text-blue-900'>Dashboard</h1>
      </div>
      <Punchsection />
    </div>
  )
}

export default Maindashboard