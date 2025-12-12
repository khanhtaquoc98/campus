import { baseApi } from './baseApi'

// Ví dụ API service sử dụng RTK Query
export const exampleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET request example
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      // Có thể thêm tag để cache invalidation
      // providesTags: ['User'],
    }),

    // GET với params example
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      // providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // POST request example
    createUser: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
      // invalidatesTags: ['User'],
    }),

    // PUT request example
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
      // invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),

    // DELETE request example
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['User'],
    }),
  }),
})

// Export hooks để sử dụng trong components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = exampleApi

