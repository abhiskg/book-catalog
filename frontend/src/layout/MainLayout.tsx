import { Outlet } from "react-router-dom";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

function MainLayout() {
  return (
    <div>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}

export default MainLayout;
