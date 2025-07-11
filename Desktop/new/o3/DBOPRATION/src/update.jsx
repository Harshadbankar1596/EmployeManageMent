import { useState } from 'react';
import { useUpdateTasksMutation  } from "./data.js";

const Update = (props) => {

    const [updateUser] = useUpdateTasksMutation ();

    const [form, setform] = useState({
        name: props.onebody.body.name,
        img: props.onebody.body.img,
        email: props.onebody.body.email,
        description: props.onebody.body.description
    });

    function handleChange(e) {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        updateUser({
            body:{
                id : props.onebody.id,
                body : form
            }
        })
            .then(() => {
                console.log("Updated Successfully" , form);
                props.onclose();
            })
            .catch((err) => {
                console.error("Update Error:");
            });
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center z-50 justify-center'>
            <form className='flex flex-col rounded p-2 bg-green-300 justify-center items-center' onSubmit={handleSubmit}>

                <div className='cursor-pointer self-end text-xl font-bold mb-2' onClick={() => props.onclose()}>X</div>

                <input className='w-5/6 m-2 p-2 active:bg-blue-200 rounded'
                    type="text"
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder='Enter name'
                />

                <input className='w-5/6 m-2 p-2 active:bg-blue-200 rounded'
                    type="text"
                    name='img'
                    value={form.img}
                    onChange={handleChange}
                    required
                    placeholder='Enter image URL'
                />

                <input className='w-5/6 m-2 p-2 active:bg-blue-200 rounded'
                    type="email"
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder='Enter email'
                />

                <input className='w-5/6 m-2 p-2 active:bg-blue-200 rounded'
                    type="text"
                    name='description'
                    value={form.description}
                    onChange={handleChange}
                    required
                    placeholder='Enter description'
                />

                <button className='bg-black p-2 rounded text-white font-bold m-4'>Update</button>
            </form>
        </div>
    );
};

export default Update;
