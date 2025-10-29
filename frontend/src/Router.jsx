import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import App from "./App";
import Auth from "./Components/Auth";

function Router() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/admin/panel" element={<Auth Route={<App />}/>}/>
            </Routes>
        </BrowserRouter>
    </>)
}

export default Router;