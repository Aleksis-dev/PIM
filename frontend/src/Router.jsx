import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import App from "./App";
import Auth from "./Components/Auth";
import EditProduct from "./Components/EditProduct";
import CreateProduct from "./Components/CreateProduct";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/panel" element={<Auth Route={<App />} />} />
        <Route path="/admin/panel/post/:id" element={<Auth Route={<EditProduct />} />} />
        <Route path="/admin/panel/:ewfwerghtyjyikuik/create/product" element={<CreateProduct />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;