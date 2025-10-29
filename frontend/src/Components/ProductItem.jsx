function ProductItem({ product }) {
  return (
    <div>
      <h2>{product.product_name}</h2>
      <p>ID: {product.id}</p>
      <p>Price: {product.product_price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}

export default ProductItem;