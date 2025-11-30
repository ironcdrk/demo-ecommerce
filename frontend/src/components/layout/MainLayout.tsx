import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="app-root">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
