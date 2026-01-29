import ProductRepository from "../repository/products.repository.js";

class ProductService {
  constructor() {
    this.productRepository = ProductRepository;
  }

  async getAllProducts(params) {
    return await this.productRepository.getAllProducts(params);
  }

  async getProductById(id) {
    return await this.productRepository.getProductById(id);
  }

  async createProduct(product) {
    return await this.productRepository.createProduct(product);
  }

  async updateProduct(id, product) {
    return await this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id) {
    return await this.productRepository.deleteProduct(id);
  }
}

export default new ProductService();
