import { productService } from "../services/index.js";

// Controller to get all products
export const getAllProducts = async (req, res) => {
  try {
    const paginatedResult = await productService.getAllProducts(req.query);
    const {
      docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
    } = paginatedResult;

    // Construct the base URL for pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    // Build query string, removing page to avoid duplication in links
    const queryParams = { ...req.query };
    delete queryParams.page;
    const queryString = new URLSearchParams(queryParams).toString();

    const response = {
      status: "success",
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage
        ? `${baseUrl}?${queryString ? queryString + "&" : ""}page=${prevPage}`
        : null,
      nextLink: hasNextPage
        ? `${baseUrl}?${queryString ? queryString + "&" : ""}page=${nextPage}`
        : null,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Controller to get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { title, description, code, price, status, stock, category } = req.body;
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

    const savedProduct = await productService.createProduct(newProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    if (error.message.includes("Product with code")) {
      return res.status(409).json({
        status: "error",
        message: error.message,
      });
    }
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while creating the product.",
    });
  }
};

// Controller to update a product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(
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
    const deletedProduct = await productService.deleteProduct(req.params.pid);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
