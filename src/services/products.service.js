import ProductRepository from "../repository/products.repository.js";

export default class ProductService {
  constructor() {
    this.productRepository = ProductRepository;
  }

  // [service] obtiene todos los productos con opciones de paginación, filtro y orden
  async getAllProducts(params) {
    return await this.productRepository.getAllProducts(params);
  }

  // [service] obtiene un producto por su id
  async getProductById(id) {
    return await this.productRepository.getProductById(id);
  }

  // [service] crea un nuevo producto
  async createProduct(product) {
    const productExists = await this.productRepository.findProductByCode(
      product.code,
    );
    if (productExists) {
      throw new Error(`Product with code '${product.code}' already exists.`);
    }
    return await this.productRepository.createProduct(product);
  }

  // [service] actualiza un producto por su id
  async updateProduct(id, product) {
    return await this.productRepository.updateProduct(id, product);
  }

  // [service] elimina un producto por su id (soft delete)
  async deleteProduct(id) {
    return await this.productRepository.deleteProduct(id);
  }
}
