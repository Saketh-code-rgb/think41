import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <Link to="/" className="back-button">← Back to Products</Link>
      <div className="detail-container">
        <img 
          src={product.image || 'https://via.placeholder.com/400'} 
          alt={product.name} 
          className="product-image"
        />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">${product.price?.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          <div className="meta">
            {product.category && <span>Category: {product.category}</span>}
            {product.rating && <span>Rating: {product.rating}/5</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
