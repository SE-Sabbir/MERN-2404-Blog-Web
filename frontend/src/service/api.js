import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000/" , credentials: "include"}),
    endpoints:(builder)=>({
        getBlogList:builder.query({
            query:()=> "blog/list"
        }),
        login: builder.mutation({
            query:(data)=>({
                url: "auth/login",
                method: "POST",
                body: data
            })
        }),
        getUser:builder.query({
            query:()=> "auth/profile",
        }),
        refreshToken: builder.mutation({
            query:(data)=>({
                url: "auth/refresh-token",
                method: "POST",
            })
        }),
        getListByUser:builder.query({
            query:()=> "blog/list-by-user",
        }),
    })
})

export const {useGetBlogListQuery , useLoginMutation , useGetUserQuery , useGetListByUserQuery} = api;