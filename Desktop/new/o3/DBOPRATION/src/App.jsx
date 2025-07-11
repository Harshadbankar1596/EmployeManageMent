import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Table from './table';
import { useGetTasksQuery , useAddTasksMutation} from './data.js';
import store from './storage.js';
const App = () => {

  const { data: task, error, isLoading, refetch } = useGetTasksQuery();
  // console.log("Fetched Tasks:", task);

  const [adduser] = useAddTasksMutation()
  const [refresh, setRefresh] = useState(false);
  const [data, setdata] = useState({
    name: '',
    img: '',
    email: '',
    description: '',
  })

  const handleChange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setRefresh(!refresh)
    console.log("data : ", data);
    setdata({
      name: '',
      img: '',
      email: '',
      description: '',
    })

    adduser({
      body: data
    }).then(()=>refetch())
  };

  return (
    <div className='flex flex-col items-around m-auto my-5  text-center h-auto w-2/2 md:w-1/2 lg:w-2/3 bg-red-300 rounded-lg shadow-lg'>
      <h1 className="font-bold text-2xl m-4 text-blue-9">
        Use Crud Operation
      </h1>

      <form className='lg:w-2/4 w-2/3 p-2 m-auto flex flex-col items-center shadow-xl text-center rounded-2xl bg-green-400 ' onSubmit={handleSubmit}>

        <input className=' w-2/3 lg:w-2/5 m-2 p-2 active:bg-blue-200 rounded ' type="text" name='name' value={data.name} onChange={handleChange} required placeholder='enter name' />

        <input className=' w-2/3 lg:w-2/5 m-2 p-2 active:bg-blue-200 rounded ' type="text" name='img' value={data.img} onChange={handleChange} required placeholder='enter img url' />

        <input className=' w-2/3 lg:w-2/5 m-2 p-2 active:bg-blue-200 rounded ' type="email" name='email' value={data.email} onChange={handleChange} required placeholder='entre email' />

        <input className=' w-2/3 lg:w-2/5 m-2 p-2 active:bg-blue-200 rounded ' type="text" name='description' value={data.description} onChange={handleChange} required placeholder='entre description' />

        <button className=' rounded bg-gradient-to-r from-blue-700 to-yellow-500 text-white font-bold  p-4 w-2/5 lg:w-2/10 md:w-2/5' type='submit'>Submit</button>
      </form>

      <Table refresh={refresh} />
    </div>
  )
}
export default App
