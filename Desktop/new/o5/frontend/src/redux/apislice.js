import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001'}),
  tagTypes: ['Blog', 'User'], 
  endpoints: (builder) => ({

   
    getPosts: builder.query({
      query: () => '/blog',
      providesTags: ['Blog'],
    }),

    
    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/blog',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Blog'], 
    }),

  
    getusers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),

   
    addusers: builder.mutation({
      query: (newuser) => ({
        url: '/users',
        method: 'POST',
        body: newuser,
      }),
      invalidatesTags: ['User'],
    }),

  }),
});


export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetusersQuery,
  useAddusersMutation,
} = api;
