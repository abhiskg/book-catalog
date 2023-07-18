import { IBook } from "@/types/bookType";
import apiSlice from "../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      transformResponse: (response: { data: IBook[] }, meta, arg) =>
        response.data,
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
