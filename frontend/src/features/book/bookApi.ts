import { IBook } from "@/types/bookType";
import apiSlice from "../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], string>({
      query: (queryString: string) => `/books${queryString}`,
      transformResponse: (response: { data: IBook[] }, meta, arg) =>
        response.data,
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
