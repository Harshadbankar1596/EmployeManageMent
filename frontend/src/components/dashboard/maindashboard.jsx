import React from 'react'
import Punchsection from './punchsection'



const Maindashboard = () => {
  return (
    <div className=' flex flex-col gap-5 my-5'>
      <div className='m-2'>
        <h1 className='font-bold text-4xl [text-shadow:_0_4px_8px_#00BCD4] text-blue-900 '>Dashboard</h1>
      </div>
      <Punchsection />
    </div>
  )
}

export default Maindashboard