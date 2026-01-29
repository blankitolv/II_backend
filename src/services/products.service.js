import ProductRepository from "../repository/products.repository.js";

export default class ProductService {
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
    const productExists = await this.productRepository.findProductByCode(
      product.code,
    );
    if (productExists) {
      throw new Error(`Product with code '${product.code}' already exists.`);
    }
    return await this.productRepository.createProduct(product);
  }

  async updateProduct(id, product) {
    return await this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id) {
    return await this.productRepository.deleteProduct(id);
  }
}


