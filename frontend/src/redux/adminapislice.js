import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminapi = createApi({
    reducerPath: "adminapi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/admin` , credentials: "include"}),
    tagTypes: ["projects", "users"],
    
    endpoints: (builder) => ({

        verifyisadmin : builder.mutation({
            query : (id)=>({
                url : "/verifyisadmin",
                method : "post",
                body : {id}
            })
        }),

        getAllProjects: builder.query({
            query: () => ({
                url: "/getallprojects",
                method: "GET"
            }),
            providesTags: ["users" , "projects"],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/getallusers",
                method: "GET",
            }),
            providesTags: ["users"],
        }),

        addproject : builder.mutation({
            query : (obj)=>({
                url : "/addproject",
                method : "POST",
                body : {obj}
            }),
            invalidatesTags : ["users" , "projects"]
        }),

        getproject : builder.mutation({
            query : (projectid)=>({
                url : "/getproject",
                method : "POST",
                body : {projectid}
            }),
        }),

        getallmembersname : builder.query({
            query : ()=> ({
                url : "/getallmembersname",
                method : "get"
            }),
            providesTags: ["users"],
        }),

        addmemberinproject : builder.mutation({
            query : (data)=>({
                method : "post",
                url : "/addmember",
                body : {data}
            }),
            
            invalidatesTags : ["users" , "projects"]
            
        }),

        addtask : builder.mutation({
            query : ({userid , projectid , task})=>({
                url : "/addtask",
                method : "post",
                body : {userid , projectid , task}
            }),
            invalidatesTags : ["users" , "projects"]
        })
    }),
});

export const { useGetAllProjectsQuery, useAddmemberinprojectMutation , useGetallmembersnameQuery, useGetAllUsersQuery , useVerifyisadminMutation , useAddprojectMutation , useGetprojectMutation , useAddtaskMutation} = adminapi;