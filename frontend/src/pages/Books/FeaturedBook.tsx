import Card from "@/components/Card";
import { useGetFeaturedBookQuery } from "@/redux/api/bookApi";

const FeaturedBook = () => {
  const { data, isLoading } = useGetFeaturedBookQuery(undefined);
  console.log("data", data);

  if (isLoading) {
    return (
      <p className="min-h-[100vh] flex items-center justify-center">
        Loading...
      </p>
    );
  }
  return (
    <section className="my-10 px-20">
      <h3 className="text-blue-400 font-semibold text-xl mb-3">
        Featured Books
      </h3>

      {data?.data?.length > 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-10">
          {data?.data?.map((book: any) => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[70vh]">
          No book found
        </div>
      )}
    </section>
  );
};

export default FeaturedBook;
