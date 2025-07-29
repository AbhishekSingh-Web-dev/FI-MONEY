import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';

export default function UpdateQuantityModal({ product, onClose, onUpdateSuccess }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      quantity: product.quantity,
    },
  });

  const onSubmit = async (data) => {
    try {
      const quantity = parseInt(data.quantity, 10);
      const response = await axios.put(`/products/${product._id}/quantity`, { quantity });
      alert('Quantity updated successfully!');
      onUpdateSuccess(response.data); 
      onClose(); 
    } catch (err) {
      alert('Failed to update quantity.');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Update Quantity for {product.name}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              New Quantity
            </label>
            <input
              type="number"
              id="quantity"
              {...register('quantity', {
                required: 'Quantity is required',
                min: { value: 0, message: 'Quantity cannot be negative' },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
          </div>
          <div className="flex justify-end gap-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}