import express from 'express';

import {getProduct, updateProduct, deleteProduct, addProduct} from '../controllers/product.controller.js'


const router = express.Router();

router.get('/', getProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

router.post('/', addProduct)


export default router;