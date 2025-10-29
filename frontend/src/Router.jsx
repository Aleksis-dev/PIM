import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import App from "./App";
import Auth from "./Components/Auth";
import EditProduct from "./Components/EditProduct";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/panel" element={<Auth Route={<App />} />} />
        <Route path="/admin/panel/post/:id" element={<Auth Route={<EditProduct />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;