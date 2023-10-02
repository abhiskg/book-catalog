import { Outlet } from "react-router-dom";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 h-full">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}

export default MainLayout;
