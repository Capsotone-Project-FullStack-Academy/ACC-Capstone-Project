import React, { useState } from 'react';
import allProducts from '../data/productsData';
import '../components/main.css';
import { Link } from 'react-router-dom';

function ProductList({ addToCart }) {
  const productsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const startIndex = (currentPage - 1) * productsPerPage;

  const filterAndSortProducts = () => {
    let filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOrder === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  };

  const displayedProducts = filterAndSortProducts().slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset page when category changes
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); // Reset page when sorting changes
  };

  const nextPage = () => {
    const totalPages = Math.ceil(filterAndSortProducts().length / productsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="all-products">
      <h1>Product List</h1>
      <div className="filters">
        <div className="filter-selects">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <label htmlFor="category">Filter by Category: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="ladies clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelry">Jewelry</option>
          </select>
          <label htmlFor="sort">Sort by Price: </label>
          <select id="sort" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
      <div className="product-list">
        {displayedProducts.map((product) => (
          <div key={product.id} className="product">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p className="prod-price">${product.price.toFixed(2)}</p>
            </Link>
            <button
              className="addtocart"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button
          onClick={nextPage}
          disabled={startIndex + productsPerPage >= filterAndSortProducts().length}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default ProductList;
