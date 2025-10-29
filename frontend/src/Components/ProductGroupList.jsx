import { useState } from "react";
import { Fetch } from "./FetchHelper";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

function ProductGroupList({ productGroups, setProductGroups }) {
  const [loadingGroups, setLoadingGroups] = useState({});
  const navigate = useNavigate();

  const handleProductFetch = async (key, ID) => {
    setLoadingGroups((prev) => ({ ...prev, [ID]: true }));
    const response = await Fetch(`http://127.0.0.1:8000/api/product-group/${ID}`, "GET");
    if (response.ok) {
      const dataVar = response.data;
      setProductGroups((prev) => ({
        ...prev,
        product_groups: {
          ...prev.product_groups,
          [key]: {
            ...prev.product_groups[key],
            products: dataVar.product_groups.products || [],
          },
        },
      }));
    }
    setLoadingGroups((prev) => ({ ...prev, [ID]: false }));
  };

  return (
    <>
      {Object.entries(productGroups.product_groups).map(([key, value]) => (
        <div key={key}>
          <h1>{value.product_group_name}</h1>
          <p>Created: {new Date(value.created_at).toLocaleString()}</p>
          <p>Updated: {new Date(value.updated_at).toLocaleString()}</p>
          <button onClick={() => handleProductFetch(key, value.id)} disabled={loadingGroups[value.id]}>
            {loadingGroups[value.id] ? "Loading..." : "Show Products"}
          </button>
          {value.products && value.products.length > 0 && (
            <div>
              {value.products.map((product) => (
                <div key={product.id}>
                  <ProductItem product={product} />
                  <button onClick={() => navigate(`/admin/panel/post/${product.id}`)}>Edit</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default ProductGroupList;