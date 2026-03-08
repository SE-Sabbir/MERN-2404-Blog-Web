import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL, credentials: "include" }),
    tagTypes: ['Posts' , 'Profile'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "auth/login",
                method: "POST",
                body: data
            })
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: "auth/register",
                method: "POST",
                body: data
            })
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: "auth/verify-otp",
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "auth/logout",
                method: "POST"
            })
        }),
        refreshToken: builder.mutation({
            query: (data) => ({
                url: "auth/refresh-token",
                method: "POST",
            })
        }),
        getUserProfile: builder.query({
            query: () => "auth/profile",
            providesTags: ['Profile']
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "auth/profile",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Profile']
        }),
        createBlog: builder.mutation({
            query: (data) => ({
                url: "blog/upload",
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Posts']
        }),
        getBlogList: builder.query({
            query: () => "blog/list"
        }),
        getListByUser: builder.query({
            query: () => "blog/list-by-user",
            providesTags: ['Posts']
        }),
        getSlugBlog: builder.query({
            query: (slug) => `blog/${slug}`
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `blog/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Posts']
        })

    })
})

export const { useGetBlogListQuery, useLoginMutation, useRegisterUserMutation, useVerifyOtpMutation, useGetUserProfileQuery, useUpdateProfileMutation, useGetListByUserQuery, useCreateBlogMutation, useGetSlugBlogQuery, useLogoutMutation, useDeleteBlogMutation } = api;