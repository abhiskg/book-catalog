import apiSlice from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/product`,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
