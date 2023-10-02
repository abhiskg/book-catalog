import FeaturedBook from "../Books/FeaturedBook";
import HomeBanner from "./sections/HomeBanner";

function HomeScreen() {
  return (
    <div>
      <HomeBanner />
      <FeaturedBook />
    </div>
  );
}

export default HomeScreen;
