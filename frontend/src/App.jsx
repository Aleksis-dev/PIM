import { useEffect, useState } from 'react';
 
function App() {

    const [productGroups, setProductGroups] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const handleProductFetch = async (key, ID) => {
        document.getElementById(ID).innerText = "Loading...";
        try {
            let response = await fetch(`http://127.0.0.1:8000/api/product_group/${ID}`, {
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch: " + response.status);
            }

            const dataVar = await response.json();

            console.log(dataVar);

            setProductGroups(prev => ({
                ...prev,
                product_groups: {
                    ...prev.product_groups,
                    [key]: {
                        ...prev.product_groups[key],
                        products: [
                        ...(prev.product_groups[key]?.products || []),
                        ...(dataVar.product_groups.products || [])
                        ]
                    }
                }
            }));

        } catch (error) {
            setError(error);
        } finally {
            document.getElementById(ID).innerText = "";
        }
    }

    useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/product_group", {
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch: " + response.status);
        }

        const dataVar = await response.json();

        if (isMounted) {
          setProductGroups(dataVar);
        }
      } catch (error) {
        if (isMounted) setError(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
        isMounted = false;
    };
    }, []);

    return (<>
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {productGroups && productGroups.product_groups && Object.entries(productGroups.product_groups).map(([key, value]) => {
            return (
            <div key={key}>
                <h1>{value.product_group_name}</h1>
                <p>Created at {new Date(value.created_at).toLocaleString()}</p>
                <p>Updated at {new Date(value.updated_at).toLocaleString()}</p>
                <p id={value.id}></p>
                <button onClick={() => {handleProductFetch(key, value.id)}}>{'>'}</button>
                {value.products && Object.entries(value.products).map(([key2, value2]) => (
                    <div key={value.product_group_name + key2}>
                        <h2>Product ID: {value2.id}</h2>
                        <h2>Product: {value2.product_name}</h2>
                        <h3>Price: {value2.product_price}</h3>
                        <p>Stock: {value2.stock}</p>

                    </div>
                ))}
            </div>
            )
        })}
    </>)
}

export default App;