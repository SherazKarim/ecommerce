import Product from '../Models/product.model.js'

export const createProduct = async (req, res, next) => {
    try {
        const { title, desc, subTitle, price } = req.body;
        if (!title || !desc || !price || !subTitle) {
            return res.status(404).json({ message: "required all fields", succes: false })
        }
        const newProduct = new Product({
            ...req.body
        });
        const savedProduct = await newProduct.save();
        res.status(200).json({message:"Product Added Successfully!", savedProduct})
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send("Not found")
        res.status(200).send("Product has been deleted successfully!")
    } catch (err) {
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).send("Not found")
        res.status(200).send(product)
    } catch (err) {
        next(err)
    }
}
export const getAllProducts = async (req, res, next) => {
    try {
        const product = await Product.find()
        if (!product) return res.status(404).send("Not found")
        res.status(200).send(product)
    } catch (err) {
        next(err)
    }
}

export const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const productData = req.body;
      if(!productData) return res.status(404).json({message:"couldn't found any data"})
      const updateProduct = await Product.findByIdAndUpdate(id, productData, {
        new: true,
      });

  
      if (!updateProduct) {
        return res
          .status(404)
          .json({ success: false, message: "No product found to update" });
      }
  
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        updateProduct,
      });
    } catch (error) {
      // Return an internal server error response
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  };