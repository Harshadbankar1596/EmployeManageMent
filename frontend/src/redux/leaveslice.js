import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Form } from "react-router-dom"

export const leaveslice = createApi({
    reducerPath : "leave",
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000/leave" , credentials: "include"}),
    tagTypes : ['leave'],
    endpoints : (builder)=>({
        applyleaves : builder.mutation({
            query : ({id,formData}) =>({
                url : "/applyleaves",
                method : "POST",
                body : {id , formData}
            })
        })
    })
})

export const {useApplyleavesMutation} = leaveslice

