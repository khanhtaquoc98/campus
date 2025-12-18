import { baseApi } from './baseApi'

// Admin API endpoints
export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard endpoints
    getDashboardStats: builder.query({
      query: () => '/admin/dashboard/stats',
      providesTags: ['Dashboard'],
    }),

    // User endpoints
    getUsers: builder.query({
      query: (params) => ({
        url: '/admin/users',
        params,
      }),
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: '/admin/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // Application endpoints
    getApplications: builder.query({
      query: (params) => ({
        url: '/admin/applications',
        params,
      }),
      providesTags: ['Application'],
    }),
    getApplicationById: builder.query({
      query: (id) => `/admin/applications/${id}`,
      providesTags: (result, error, id) => [{ type: 'Application', id }],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/applications/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Application', id }],
    }),
  }),
})

export const {
  useGetDashboardStatsQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
} = adminApi

