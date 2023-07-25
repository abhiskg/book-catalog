import BookCard from "@/components/card/BookCard";
import { useGetBooksQuery } from "@/features/book/bookApi";
import { Container } from "@mantine/core";

function AllBooksScreen() {
  const { data: books } = useGetBooksQuery();
  console.log(books);
  return (
    <Container size={"lg"}>
      <div className="grid grid-cols-3">
        {books &&
          books.length > 0 &&
          books.map((book) => <BookCard key={book._id} book={book} />)}
      </div>
    </Container>
  );
}

export default AllBooksScreen;
