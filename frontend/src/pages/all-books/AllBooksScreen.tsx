import { useGetBooksQuery } from "@/features/book/bookApi";

function AllBooksScreen() {
  const { data } = useGetBooksQuery();
  console.log(data);
  return <div>AllBooksScreen</div>;
}

export default AllBooksScreen;
