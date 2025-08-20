import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const adminapi = createApi({
    reducerPath: "adminapi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/admin`, credentials: "include" }),
    tagTypes: ["projects", "users" , "job"],

    endpoints: (builder) => ({

        verifyisadmin: builder.mutation({
            query: (id) => ({
                url: "/verifyisadmin",
                method: "post",
                body: { id }
            })
        }),

        getAllProjects: builder.query({
            query: () => ({
                url: "/getallprojects",
                method: "GET"
            }),
            providesTags: ["users", "projects"],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/getallusers",
                method: "GET",
            }),
            providesTags: ["users"],
        }),

        addproject: builder.mutation({
            query: (obj) => ({
                url: "/addproject",
                method: "POST",
                body: { obj }
            }),
            invalidatesTags: ["users", "projects"]
        }),

        getallmemebersadmin: builder.mutation({
            query: ({ userid, projectid }) => ({
                url: `${import.meta.env.VITE_BACKEND_URL}/users/getallmembers`,
                method: "POST",
                body: { userid, projectid }
            }),
            invalidatesTags: ["users"]
        }),


        getproject: builder.mutation({
            query: (projectid) => ({
                url: "/getproject",
                method: "POST",
                body: { projectid }
            }),
        }),

        getallmembersname: builder.query({
            query: () => ({
                url: "/getallmembersname",
                method: "get"
            }),
        }),

        addmemberinproject: builder.mutation({
            query: (data) => ({
                method: "post",
                url: "/addmember",
                body: { data }
            }),
            invalidatesTags: ["users"]
        }),

        addtask: builder.mutation({
            query: ({ userid, projectid, task }) => ({
                url: "/addtask",
                method: "post",
                body: { userid, projectid, task }
            }),
            invalidatesTags: ["users", "projects"]
        }),

        employee: builder.mutation({
            query: (userid) => ({
                url: "/employee",
                method: "post",
                body: { userid }
            })
        }),

        getemployeedailyreport: builder.mutation({
            query: (userid) => ({
                url: "/employeedailyreport",
                method: "post",
                body: { userid }
            })
        }),

        uploadjob: builder.mutation({
            query: (data) => ({
                url: `${import.meta.env.VITE_BACKEND_URL}/jobs/uploadjob`,
                method: "POST",
                body: { data }
            }),
            invalidatesTags : ["job"]
        }),

        getjobs: builder.query({
            query: () => ({
                url: `${import.meta.env.VITE_BACKEND_URL}/jobs/getjobs`,
                method: "GET",
            }),
            invalidatesTags : ["job"]
        }),

        deletejobs : builder.mutation({
            query : (jobid)=>({
                url :  `${import.meta.env.VITE_BACKEND_URL}/jobs/deletejobs`,
                method : "POST",
                body : {jobid}
            }),
            invalidatesTags : ["job"]
        })
    }),
});


export const { useGetallmemebersadminMutation, useGetAllProjectsQuery, useAddmemberinprojectMutation, useGetallmembersnameQuery, useGetAllUsersQuery, useVerifyisadminMutation, useAddprojectMutation, useGetprojectMutation, useAddtaskMutation, useEmployeeMutation, useGetemployeedailyreportMutation, useUploadjobMutation, useGetjobsQuery , useDeletejobsMutation} = adminapi;