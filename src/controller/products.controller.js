import ProductService from "../services/products.service.js";

// Controller to get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { title, description, code, price, status, stock, category } =
    req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails: req.files.map(
        (file) => `/assets/img/products/${file.filename}`,
      ),
    };
    const savedProduct = await ProductService.createProduct(newProduct);
    res.status(201).redirect("/products");
  } catch (error) {
    res.status(500).redirect("/products?error=true");
  }
};

// Controller to update a product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductService.updateProduct(
      req.params.pid,
      req.body,
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductService.deleteProduct(req.params.pid);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
