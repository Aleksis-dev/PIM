import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function Auth({ Route }) {

    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    let bearerToken = localStorage.getItem("sanctum-token");

    const handleAuthorization = async () => {
        try {
            let response = await fetch("http://127.0.0.1:8000/api/admin/authorize", {
                method: "get",
                headers: {
                    "Authorization": `Bearer ${bearerToken}`,
                    "Content-Type": 'application/json',
                    "Accept": "application/json"
                }
            });

            let data = await response.json();
            setData(data);

        } catch (error) {
            setError(error.message);
        } finally {
            return data.message;
        }

    }

    if (error) {
        return error;
    }

    if (bearerToken && handleAuthorization !== "Unauthorized") {
        return <Outlet context={{ Route }}/>
    } else {
        return <Navigate to="/" replace/>
    }
}

export default Auth;