// Init
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Files
import Index from "./routes/index";
import "./css/index.css";
import Api from "./api/index";
import { UpdateStore } from "./StoreContext";

// Component
function App() {
  const updateStore = UpdateStore();
  const { pathname } = useLocation();

  useEffect(() => {
    checkingAuth();
    window.scrollTo(0, 0);
  }, [pathname]);

  const checkingAuth = async () => {
    const { data } = await Api("get", "/api/vendors/check-auth");
    updateStore({ user: data.user });
  };

  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        transition={Flip}
      />

      {/* Routes */}
      <Index />
    </div>
  );
}

// Export
export default App;
