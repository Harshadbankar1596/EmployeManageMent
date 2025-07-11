import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/user",
    }),

    addTasks: builder.mutation({
      query: (newTask) => ({
        url: "/user",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ['user'],
    }),

    deleteTasks: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['user'],
    }),

    updateTasks: builder.mutation({
      query: ({ body }) => ({
        url: `user/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});



export const { useGetTasksQuery, useDeleteTasksMutation, useUpdateTasksMutation, useAddTasksMutation } = api


