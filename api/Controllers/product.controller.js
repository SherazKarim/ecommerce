import Product from '../Models/product.model.js'

export const createProduct = async (req, res, next) => {
    try {
        const {title, desc, subTitle, price} = req.body;
        if(!title || !desc || !price || !subTitle){
           return res.status(404).json({message:"required all fields", succes:false})
        } 
            const newProduct = new Product({
                ...req.body
            });
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct)
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
       const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).send("Not found")
        res.status(200).send("Product has been deleted")
    } catch (err) {
        next(err)
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(404).send("Not found")
        res.status(200).send(product)
    } catch (err) {
        next(err)
    }
}
export const getAllProducts = async (req, res, next) => {
    try {
        const product = await Product.find()
        if(!product) return res.status(404).send("Not found")
        res.status(200).send(product)
    } catch (err) {
        next(err)
    }
}