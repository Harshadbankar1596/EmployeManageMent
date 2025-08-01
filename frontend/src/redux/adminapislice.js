import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminapi = createApi({
    reducerPath: "adminapi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/admin" }),
    tagTypes: ["projects", "users"],
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: () => ({
                url: "/getallprojects",
                method: "GET",
            }),
            providesTags: ["projects"],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/getallusers",
                method: "GET",
            }),
            providesTags: ["users"],
        }),
    }),
});

export const { useGetAllProjectsQuery, useGetAllUsersQuery } = adminapi;