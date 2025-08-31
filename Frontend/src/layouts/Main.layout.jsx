// src/layouts/Main.layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../sharedComponents/Navbar.component.jsx";
import Footer from "../sharedComponents/Footer.component.jsx";

export default function MainLayout() {
  return (
    <div className="flex flex-col ">
      <header className="">
        <div className="">
          <Navbar />
        </div>
      </header>

      <main className="">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
