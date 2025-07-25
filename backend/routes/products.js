
import express from 'express';
import { getProducts, addProduct, updateProductQuantity } from '../controllers/productController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router()

router.get('/', auth, getProducts);

router.post('/', auth, addProduct);

router.put('/:id/quantity', auth, updateProductQuantity);

export default router;