import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Form } from "react-router-dom"

export const leaveslice = createApi({
    reducerPath : "leave",
    baseQuery : fetchBaseQuery({baseUrl : `${import.meta.env.VITE_BACKEND_URL}/leave` , credentials: "include"}),
    tagTypes : ['leave'],
    endpoints : (builder)=>({
        applyleaves : builder.mutation({
            query : ({id,formData}) =>({
                url : "/applyleaves",
                method : "POST",
                body : {id , formData}
            }),
            invalidatesTags : ["leave"]
        }),
        allleaves : builder.query({
            query : (userid)=>({
                url : "/allleaves",
                method : "post",
                body : {userid}
            }),
            invalidatesTags : ["leave"]
        }),

        getallleaves : builder.query({
            query : ()=>({
                url : "/getallleaves",
                method : "get"
            })
        }),

        approvedleave : builder.mutation({
            query : (id)=>({
                url : "/approvedleave",
                method : "post",
                body : {id}
            }),
            invalidatesTags : ["leave"]
        }),

        rejectleave : builder.mutation({
            query : (id)=>({
                url : "/rejectleave",
                method : "post",
                body : {id}
            }),
            invalidatesTags : ["leave"]
        })
    }),

})

export const {useApplyleavesMutation , useAllleavesQuery , useGetallleavesQuery , useApprovedleaveMutation , useRejectleaveMutation} = leaveslice

