import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card';
import Update from './update';
import { useGetTasksQuery, useDeleteTasksMutation } from './data.js';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterslice.js'

const Table = (props) => {

    // const a = useGetTasksQuery()
    // console.log(a)


    const count = useSelector((state) => state.counterslice.value)
  const dispatch = useDispatch()

  console.log("updated vale of counter is : " ,  count )


    const [carddata, setcarddata] = useState(null);
    const [update, setupdate] = useState(false)
    const [onebody, setonebody] = useState(null)
    const { data: task, error, isLoading, refetch } = useGetTasksQuery();


    const [deleteuser] = useDeleteTasksMutation()
    function Delete(id) {

        let p = confirm("Are you sure you want to delete this data?");

        if (p) {
            deleteuser(id)
                .then(() => {
                    refetch();
                })
                .catch((err) => {
                    console.error("Error deleting:");
                });
        }
    }


    function onclose() {
        setupdate(false)
        refetch();
    }


    return (
        <>
            {carddata && (
                <Card
                    carddata={carddata}
                    onClose={() => setcarddata(null)}
                />
            )}

            {update && (<Update onebody={onebody} onclose={onclose} />)}

            <div className='my-6 p-4  shadow-xl bg-black text-white'>
                <h1 className='font-bold text-2xl mb-4'>This is Data Table</h1>

                <div className="overflow-x-auto">
                    <table className='w-full border border-black text-center'>
                        <thead className="bg-gray-200">
                            <tr>
                                <th className='border border-white bg-black px-2 py-2'>Image</th>
                                <th className='border border-white bg-black px-4 py-2'>Name</th>
                                <th className='border border-white bg-black px-4 py-2'>Email</th>
                                <th className='border border-white bg-black px-4 py-2'>Description</th>
                                <th className='border border-white bg-black px-4 py-2'>Action</th>
                                <th className='border border-white bg-black px-4 py-2'>Delete</th>
                                <th className='border border-white bg-black px-4 py-2'>Update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {task?.map((item, index) => (
                                <tr key={index} className="transition duration-1000 hover:bg-white border-2 hover:border-white hover:text-black ">
                                    <td className=' flex justify-center'>
                                        <img src={item.body.img} alt="profile" className='object-cover h-12 w-12 rounded-full' />
                                    </td>
                                    <td className='border border-white'>{item.body.name}</td>
                                    <td className='border border-white'>{item.body.email}</td>
                                    <td className='border border-white'>{item.body.description}</td>
                                    <td className='border border-white'>
                                        <button
                                            onClick={() => setcarddata(item.body)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className='border border-white'>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => {
                                            Delete(item.id)
                                            dispatch(decrement())
                                        }}>Delete</button>
                                    </td>
                                    <td className='border border-white'>
                                        <button className='bg-gray-500 px-2 py-1 rounded' onClick={() => {
                                            setupdate(true)
                                            setonebody(item)
                                            dispatch(increment("incremented"))
                                        }}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Table;
