import BookCard from "@/components/card/BookCard";
import { useGetBooksQuery } from "@/features/book/bookApi";
import { Container } from "@mantine/core";
import { useLocation } from "react-router-dom";
import SearchBar from "./components/SearchBar";

function AllBooksScreen() {
  const location = useLocation();
  const { data: books } = useGetBooksQuery(location.search);
  console.log(location);
  return (
    <Container size={"lg"}>
      <SearchBar />
      <div className="grid grid-cols-3">
        {books &&
          books.length > 0 &&
          books.map((book) => <BookCard key={book._id} book={book} />)}
      </div>
    </Container>
  );
}

export default AllBooksScreen;
