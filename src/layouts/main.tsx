import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";

export const MainLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
