import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000/"}),
    endpoints:(builder)=>({
        getBlogList:builder.query({
            query:()=> "blog/list"
        }),
        login: builder.mutation({
            query:(data)=>({
                url: "auth/login",
                method: "POST",
                body: data,
                credentials: "include"
            })
        })
    })
})

export const {useGetBlogListQuery , useLoginMutation} = api;