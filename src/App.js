// Init
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>Halal Catering</title>
        <meta
          name="description"
          content="H-Catering is a website to help the Muslims in DMV to find the best catering option for their upcoming event easily !We help muslim business owners to promote their business."
        />
        <meta
          name="keywords"
          content="Halal Catering, Muslim Catering, Halal Food, Food Vendors, Muslim Business, Food Business, Best Catering, Event, Event Catering"
        />
      </Helmet>
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
