
import mongoose from 'mongoose';
import Product from '../models/product.model.js'

export const getProduct = async (req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({
            success : true,
            data : products
        })
    }catch(error){
        console.error('Error is getting products', error.message);
        res.status(500).json({
            success : false,
            message : "Server error"
        })
    }
}

export const updateProduct = async (req, res)=>{
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success : false,
            message : 'Invalid product id'
        })
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new : true});
        res.status(200).json({
            success : true,
            data : updatedProduct
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : 'Server error'
        })
    }
}

export const deleteProduct = async (req, res)=>{
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success : false,
            message : 'Invalid product id'
        })
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success : true,
            message : 'Product deleted successfully'
        })

    }catch(error){
        console.error('Error :: ', error.message);
        res.status(500).json({
            success : false,
            message : 'Server Error'
        })
    }
}

export const addProduct = async(req, res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        res.status(409).json({success : false, message : 'Please provide all fields'})
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success : true, data : newProduct})
    }catch(error){
        console.error("Error in create product", error.message);
        res.status(500).json({success:false, message : 'Internal Server error'})
    }
}