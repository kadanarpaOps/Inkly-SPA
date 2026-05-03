import { Outlet } from "react-router";
import Sidebar from "../components/navigation/Sidebar";

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default MainLayout;
