import { useForm } from 'react-hook-form';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      
      const payload = {
        ...data,
        quantity: parseInt(data.quantity, 10),
        price: parseFloat(data.price),
      };
      await axios.post('/products', payload);
      alert('Product added successfully');
      navigate('/dashboard');
    } catch {
      alert('Failed to add product. Please check the console for errors.');
    }
  };

  
  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

  return (
    <div className="bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-6">
            <div className="border-b border-gray-900/10 pb-8">
              <h2 className="text-2xl font-bold leading-7 text-gray-900">Add a New Product</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Fill in the details below to add a new item to the inventory.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                <input type="text" {...register('name', { required: 'Name is required' })} id="name" className={inputClasses} />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Product Type / Category</label>
                <input type="text" {...register('type', { required: 'Type is required' })} id="type" className={inputClasses} />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="image_url" className="block text-sm font-medium leading-6 text-gray-900">Image URL</label>
                <input type="text" {...register('image_url')} id="image_url" className={inputClasses} />
              </div>
              
              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <textarea {...register('description')} id="description" rows={3} className={inputClasses}></textarea>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-900">SKU (Stock Keeping Unit)</label>
                <input type="text" {...register('sku', { required: 'SKU is required' })} id="sku" className={inputClasses} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">Quantity</label>
                <input type="number" {...register('quantity', { required: 'Quantity is required', valueAsNumber: true })} id="quantity" className={inputClasses} />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price (₹)</label>
                <input type="number" step="0.01" {...register('price', { required: 'Price is required', valueAsNumber: true })} id="price" className={inputClasses} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-x-6">
            <button type="button" onClick={() => navigate('/dashboard')} className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
