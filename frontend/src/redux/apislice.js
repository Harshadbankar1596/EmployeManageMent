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
            query: ({ id, currentHours }) => ({
                url: '/users/addpunch',
                method: 'post',
                body: { id, currentHours }
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
            query: ({ userid, objid }) => ({
                url: '/users/workstatus',
                method: 'POST',
                body: { userid, objid }
            }),
            invalidatesTags: ['User'],
        }),

        taskstatus: builder.mutation({
            query: ({ userid, objid, taskid }) => ({
                url: '/users/taskstatus',
                method: 'POST',
                body: { userid, objid, taskid }
            }),
            invalidatesTags: ['User'],
        }),

        getlogs: builder.mutation({
            query: (id) => ({
                url: '/users/getlogs',
                method: 'post',
                body: { id }
            }),
            invalidatesTags: ['User'],
        }),

        summary: builder.mutation({
            query: (id) => ({
                url: '/users/summary',
                method: 'post',
                body: { id }
            }),
            invalidatesTags: ['User'],
        }),

        uploadprofileimg: builder.mutation({
            query: ({ id, img }) => ({
                url: '/users/uploadprofileimg',
                method: 'POST',
                body: { id, img }
            }),
            invalidatesTags: ['User'],
        }),

        getimage: builder.mutation({
            query: (id) => ({
                url: '/users/getimage',
                method: 'post',
                body: { id }
            }),
            invalidatesTags: ['User'],
        }),

        updateprofile: builder.mutation({
            query: ({ id, data }) => ({
                url: '/users/updateprofile',
                method: 'POST',
                body: { id, data }
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {

    useCreateUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useVerifyTokenQuery,
    useAddpunchMutation,
    useWorksMutation,
    useWorkstatusMutation,
    useTaskstatusMutation,
    useGetlogsMutation,
    useSummaryMutation,
    useUploadprofileimgMutation,
    useGetimageMutation,
    useUpdateprofileMutation,
} = apiSlice;