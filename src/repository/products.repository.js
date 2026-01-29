import ProductModel from "../models/products.models.js";

class ProductRepository {
  async getAllProducts(params) {
    const {
      limit = 10,
      page = 1,
      sort,
      category,
      status,
      stock,
      title,
    } = params;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (stock) filter.stock = { $gte: stock };
    if (title) filter.title = { $regex: title, $options: "i" };

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      lean: true,
    };

    if (sort) {
      options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    return await ProductModel.paginate(filter, options);
  }

  async getProductById(id) {
    return await ProductModel.findById(id);
  }

  async createProduct(product) {
    return await ProductModel.create(product);
  }

  async updateProduct(id, product) {
    return await ProductModel.findByIdAndUpdate(id, product, { new: true });
  }

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default new ProductRepository();
