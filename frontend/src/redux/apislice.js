import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
        credentials: 'include',
    }),

    tagTypes: ['User', 'Chat', 'Work'],
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
            invalidatesTags: ['User'],
        }),


        addpunch: builder.mutation({
            query: (id) => ({
                url: '/users/addpunch',
                method: 'post',
                body: { id }
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

        taskstatus: builder.mutation({
            query: ({ userid, objid, taskid }) => ({
                url: '/users/taskstatus',
                method: 'POST',
                body: { userid, objid, taskid }
            }),
            invalidatesTags: ['User'],
        }),

        addtask: builder.mutation({
            query: ({ userid, objid, task }) => ({
                url: '/users/addtask',
                method: 'POST',
                body: { userid, objid, task }
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


        getMessages: builder.query({
            query: (groupname) => ({
                url: '/chat/getmessages',
                method: 'POST',
                body: { groupname }
            }),
            providesTags: ['Chat'],
        }),

        createGroup: builder.mutation({
            query: (groupname) => ({
                url: '/chat/creategroup',
                method: 'POST',
                body: { groupname }
            }),
            invalidatesTags: ['Chat'],
        }),

        matchFace: builder.mutation({
            query: (image) => ({
                url: '/face/match',
                method: 'POST',
                body: { image }
            }),
        }),

        addwork: builder.mutation({
            query: ({ id, work, time, date, project }) => ({
                url: '/works/addwork',
                method: 'post',
                body: { id, work, time, date, project }
            }),
            invalidatesTags: ['Work']
        }),

        getwork: builder.query({
            query: (id) => ({
                url: '/works/getwork',
                method: 'post',
                body: { id }
            }),
            invalidatesTags: ['Work']
        }),

        screenshot: builder.mutation({
            query: ({ name, date, img }) => ({
                url: '/users/screenshot',
                method: 'POST',
                body: { name, date, img }
            }),
            invalidatesTags: ['User']
        }),

        getallmemebers: builder.mutation({
            query: ({ userid, projectid }) => ({
                url: "/users/getallmembers",
                method: "POST",
                body: { userid, projectid }
            }),
            invalidatesTags: ["User"]
        }),

        deletework: builder.mutation({
            query: (users) => ({
                url: "/works/deletework",
                method: "post",
                body: { users }
            }),
            invalidatesTags: ["Work"]
        })
    }),
})
export const {

    useCreateUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useVerifyTokenQuery,
    useAddpunchMutation,
    useWorksMutation,
    useTaskstatusMutation,
    useAddtaskMutation,
    useGetlogsMutation,
    useSummaryMutation,
    useUploadprofileimgMutation,
    useGetimageMutation,
    useUpdateprofileMutation,
    useGetMessagesQuery,
    useCreateGroupMutation,
    useMatchFaceMutation,
    useAddworkMutation,
    useGetworkQuery,
    useScreenshotMutation,
    useGetallmemebersMutation,
    useDeleteworkMutation
} = apiSlice;