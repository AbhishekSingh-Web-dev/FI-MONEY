import { useState } from 'react';
import UpdateQuantityModal from './UpdateQuantityModal';

export default function ProductCard({ product, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col justify-between">
        <div>
          <img
            src={product.image_url || 'https://placehold.co/600x400/e2e8f0/4a5568?text=No+Image'}
            alt={product.name}
            className="w-full h-48 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/4a5568?text=No+Image'; }}
          />
          <div className="p-4">
            <div className="mb-2">
              <h3 className="text-xl font-bold text-gray-800 truncate" title={product.name}>{product.name}</h3>
              <p className="text-sm text-gray-500">{product.type}</p>
            </div>
            <p className="text-gray-600 text-sm h-20 overflow-y-auto mb-4">{product.description}</p>
            <p className="text-xs text-gray-400 mb-4">SKU: {product.sku}</p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-extrabold text-indigo-600">₹{product.price.toLocaleString()}</p>
              <div className="text-right">
                <span className="text-sm text-gray-500">Quantity</span>
                <p className="text-lg font-bold text-green-600">{product.quantity}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Update Quantity
          </button>
        </div>
      </div>
      {isModalOpen && (
        <UpdateQuantityModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          onUpdateSuccess={onUpdate}
        />
      )}
    </>
  );
}