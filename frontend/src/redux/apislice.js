import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: 'include'
    }),
    endpoints: (builder) => ({

        createUser: builder.mutation({
            query: (userData) => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            }),
        }),

        loginUser: builder.mutation({
            query: (userData) => ({
                url: '/users/login',
                method: 'POST',
                body: userData,
            }),
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
        }),

        verifyToken: builder.query({
            query: () => '/users/verify',
        }),

        
        addpunch: builder.mutation({
            query: (id) => ({
                url : '/users/addpunch',
                method : 'post',
                body : id
            })
        }),

        works: builder.mutation({
            query: (id) => ({
                url: '/users/works',
                method: 'POST',
                body: { id }
            })
        }),

        workstatus: builder.mutation({
            query: ({id , index}) => ({
                url: '/users/workstatus',
                method: 'POST',
                body: { id , index}
            })
        })
    }),
});

export const {
    useCreateUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useVerifyTokenQuery,
    useAddpunchMutation,
    useWorksMutation,
    useWorkstatusMutation
} = apiSlice;
