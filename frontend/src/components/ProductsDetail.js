import React from 'react';
import { useParams, Link } from 'react-router-dom';
import allProducts from '../data/productsData';
import '../components/main.css';

function ProductDetail() {
  const { productId } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='product-detail'>
      <div className="center-content">
        <Link to="/" className="back-button">
          Back to Home
        </Link>
        <h1>{product.title}</h1>
        <img src={product.image} alt={product.title} />
        <p className='prod-price'>${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
