import ProductModel from "../models/products.models.js";

class ProductRepository {
  // [repository] retorna todos los productos habilitados del sistema con paginación y filtros
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
    const filter = { status: true };
    if (category) filter.category = category;
    if (params.status !== undefined) filter.status = status;
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

  // [repository] retorna un producto por su id
  async getProductById(id) {
    return await ProductModel.findOne({ _id: id, status: true });
  }

  // [repository] retorna un producto por su código
  async findProductByCode(code) {
    return await ProductModel.findOne({
      code: { $regex: new RegExp(`^${code}$`, "i") }, // Búsqueda insensible a mayúsculas/minúsculas
    });
  }

  // [repository] crea un producto
  async createProduct(product) {
    return await ProductModel.create(product);
  }

  // [repository] actualiza un producto
  async updateProduct(id, product) {
    return await ProductModel.findByIdAndUpdate(id, product, { new: true });
  }

  // Soft delete: cambia el estado de status a false y retorna el producto actualizado
  async deleteProduct(id) {
    return await ProductModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
  }
}

export default new ProductRepository();
