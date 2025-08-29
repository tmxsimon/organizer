import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col text-xl">
      <Navbar />
      <main className="bg-main text-text flex flex-1 flex-col items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
