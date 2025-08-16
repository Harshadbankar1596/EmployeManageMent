import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const superadmin = createApi({
    reducerPath : "superadmin",
    baseQuery : fetchBaseQuery({baseUrl : `${import.meta.env.VITE_BACKEND_URL}/superadmin` , credentials: 'include'} ),
    endpoints : (builder)=>({
        getallemployees : builder.query({
            query : ()=>({
                url : "/getallemployees",
                method : "get"
            })
        }),

        getemployeedetail : builder.mutation({
            query : (userid)=>({
                url : "/getemployeedetail",
                method : "post",
                body : {userid}
            })
        }),

        superadminveryfy : builder.query({
            query : ()=>({
                url : "/superadminveryfy",
                method : "get",
            })
        })
    })
})

export const {useGetallemployeesQuery , useGetemployeedetailMutation , useSuperadminveryfyQuery} = superadmin