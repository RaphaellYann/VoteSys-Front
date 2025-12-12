import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import ScrollBar from "../scrollbar";
import "./index.css";

function LayoutAdmin() {
  return (
    <div className="admin-layout">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <ScrollBar>
            {/* Outlet renderiza a página atual */}
            <div className="p-4">
              <Outlet />
            </div>
            <Footer />
          </ScrollBar>
        </div>
      </main>
    </div>
  );
}

export default LayoutAdmin;