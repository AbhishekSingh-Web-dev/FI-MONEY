import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    try {
       
        const products = await Product.find()
            .limit(limit)
            .skip(startIndex);
        
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


export const addProduct = async (req, res) => {
    
    const { name, type, sku, image_url, description, quantity, price } = req.body;

    try {
        
        const existingProduct = await Product.findOne({ sku });

        if (existingProduct) {
            
            return res.status(409).json({ msg: 'Product with this SKU already exists' });
        }

        
        const newProduct = new Product({
            name,
            type,
            sku,
            image_url,
            description,
            quantity,
            price
        });

        const product = await newProduct.save();

        res.status(201).json({ product_id: product._id, msg: 'Product added successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


export const updateProductQuantity = async (req, res) => {
    
    const { quantity } = req.body;

    if (quantity === undefined || typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ msg: 'Please provide a valid quantity.' });
    }

    try {
        
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.quantity = quantity;

        await product.save();

        res.json(product);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};