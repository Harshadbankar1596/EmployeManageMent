import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: 'include'
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({

        createUser: builder.mutation({
            query: (userData) => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),

        loginUser: builder.mutation({
            query: (userData) => ({
                url: '/users/login',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),

        verifyToken: builder.query({
            query: () => '/users/verify',
        }),

        
        addpunch: builder.mutation({
            query: (id) => ({
                url : '/users/addpunch',
                method : 'post',
                body : id
            }),
            invalidatesTags: ['User'],
        }),

        works: builder.mutation({
            query: (id) => ({
                url: '/users/works',
                method: 'POST',
                body: { id }
            }),
            invalidatesTags: ['User'],
        }),

        workstatus: builder.mutation({
            query: ({id , index}) => ({
                url: '/users/workstatus',
                method: 'POST',
                body: { id , index}
            }),
            invalidatesTags: ['User'],
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
