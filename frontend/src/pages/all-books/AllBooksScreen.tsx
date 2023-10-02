import { Container } from "@mantine/core";
import { useLocation } from "react-router-dom";
import SearchBar from "./components/SearchBar";

function AllBooksScreen() {
  const location = useLocation();

  console.log(location);
  return (
    <Container size={"lg"}>
      <SearchBar />
      <div className="grid grid-cols-3">hh</div>
    </Container>
  );
}

export default AllBooksScreen;
