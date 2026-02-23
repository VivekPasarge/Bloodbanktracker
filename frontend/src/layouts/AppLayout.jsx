import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout() {
  return (
    <>
      {/* Top navigation */}
      <Header />

      {/* All pages will render here */}
      <main className="app-root">
        <Outlet />
      </main>
    </>
  );
}
