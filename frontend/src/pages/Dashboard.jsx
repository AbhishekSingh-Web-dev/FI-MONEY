import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch products. Please ensure the backend is running.');
        setLoading(false);
      });
  }, []);

  // Handler to update the state after a product's quantity is changed
  const handleProductUpdate = (updatedProduct) => {
    setProducts(currentProducts =>
      currentProducts.map(p => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500 mt-8">Loading products...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500 mt-8">{error}</p>;
    }

    if (products.length === 0) {
      return (
        <div className="text-center mt-8">
          <p className="text-gray-500">No products found.</p>
          <Link
            to="/add"
            className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add Your First Product
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(p => <ProductCard key={p._id} product={p} onUpdate={handleProductUpdate} />)}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">Manage and view your inventory below.</p>
          </div>
          <Link
            to="/add"
            className="mt-4 sm:mt-0 flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>
        </header>
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}