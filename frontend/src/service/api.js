import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"https://devblogserver.vercel.app/" , credentials: "same-origin"}),
    tagTypes:['Posts'],
    endpoints:(builder)=>({
        login: builder.mutation({
            query:(data)=>({
                url: "auth/login",
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query:()=> ({
                url:"auth/logout",
                method: "POST"
            })
        }),
        refreshToken: builder.mutation({
            query:(data)=>({
                url: "auth/refresh-token",
                method: "POST",
            })
        }),
        getUser:builder.query({
            query:()=> "auth/profile",
        }),
        createBlog:builder.mutation({
            query:(data)=>({
                url: "blog/upload",
                method: "POST",
                body: data
            }),
            invalidatesTags:['Posts']
        }),
        getBlogList:builder.query({
            query:()=> "blog/list"
        }),
        getListByUser:builder.query({
            query:()=> "blog/list-by-user",
            providesTags:['Posts']
        }),
        getSlugBlog:builder.query({
            query:(slug)=> `blog/${slug}`
        }),
        deleteBlog: builder.mutation({
            query:(id)=>({
                url: `blog/${id}`,
                method: "DELETE"
            }),
            invalidatesTags:['Posts']
        })

    })
})

export const {useGetBlogListQuery , useLoginMutation , useGetUserQuery , useGetListByUserQuery , useCreateBlogMutation , useGetSlugBlogQuery , useLogoutMutation , useDeleteBlogMutation} = api;